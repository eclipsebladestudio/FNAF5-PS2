class LanguageSystemClass {
    constructor() {
        this.currentLanguage = null;
        this.translations = {};
        this.languages = [];
        this.defaultLanguage = "en";
        this.initialized = false;
        this.assetCache = {
            images: {},
            audio: {}
        };
    }

    init() {
        const configData = std.loadFile("PS2DATA/DATA/languages.json");
        if (!configData) {
            console.log("Could not load languages.json");
            return false;
        }

        const config = JSON.parse(configData);
        this.languages = config.languages;
        this.defaultLanguage = config.defaultLanguage;

        this.setLanguage(this.defaultLanguage);
        this.initialized = true;
        return true;
    }

    setLanguage(languageId) {
        const language = this.languages.find(lang => lang.id === languageId);
        if (!language) {
            console.log(`Language ${languageId} not found`);
            return false;
        }

        const translationData = std.loadFile(language.translationFile);
        if (!translationData) {
            console.log(`Could not load translation file: ${language.translationFile}`);
            return false;
        }

        const translations = this.parseTranslationFile(translationData);

        this.currentLanguage = language;
        this.translations = translations;

        this.clearCache();

        console.log(`Language set to: ${language.name}`);
        return true;
    }

    parseTranslationFile(data) {
        const translations = {};
        const lines = data.split('\n');

        for (const line of lines) {
            const trimmedLine = line.trim();
            if (trimmedLine && !trimmedLine.startsWith('#')) {
                const equalIndex = trimmedLine.indexOf('=');
                if (equalIndex !== -1) {
                    const key = trimmedLine.substring(0, equalIndex).trim();
                    const value = trimmedLine.substring(equalIndex + 1).trim();
                    translations[key] = value.replace(/^["']|["']$/g, '');
                }
            }
        }

        return translations;
    }

    getText(key) {
        if (!this.initialized) {
            console.log("Language system not initialized");
            return key;
        }

        return this.translations[key] || key;
    }

    getImage(basePath, fallbackToDefault = true) {
        if (!this.initialized) {
            console.log("Language system not initialized");
            return null;
        }

        const cacheKey = `${this.currentLanguage.id}_${basePath}`;

        if (this.assetCache.images[cacheKey]) {
            return this.assetCache.images[cacheKey];
        }

        const localizedPath = this.buildLocalizedPath(basePath, "images");

        try {

            if (std.exists(localizedPath)) {
                const image = new ImageManager(localizedPath);
                this.assetCache.images[cacheKey] = image;
                return image;
            }

            if (fallbackToDefault && this.currentLanguage.id !== this.defaultLanguage) {
                const defaultPath = this.buildLocalizedPath(basePath, "images", this.defaultLanguage);
                if (std.exists(defaultPath)) {
                    const image = new ImageManager(defaultPath);
                    this.assetCache.images[cacheKey] = image;
                    console.log(`Using default language image for: ${basePath}`);
                    return image;
                }
            }

            if (std.exists(basePath)) {
                const image = new ImageManager(basePath);
                this.assetCache.images[cacheKey] = image;
                console.log(`Using original path for image: ${basePath}`);
                return image;
            }

        } catch (error) {
            console.log(`Error loading image: ${error}`);
        }

        console.log(`Image not found: ${basePath}`);
        return null;
    }

    getAudio(basePath, type = "stream", fallbackToDefault = true) {
        if (!this.initialized) {
            console.log("Language system not initialized");
            return null;
        }

        const cacheKey = `${this.currentLanguage.id}_${basePath}_${type}`;

        if (this.assetCache.audio[cacheKey]) {
            return this.assetCache.audio[cacheKey];
        }

        const localizedPath = this.buildLocalizedPath(basePath, "audio");

        try {

            if (std.exists(localizedPath)) {
                const audio = this.createAudioManager(localizedPath, type);
                this.assetCache.audio[cacheKey] = audio;
                return audio;
            }

            if (fallbackToDefault && this.currentLanguage.id !== this.defaultLanguage) {
                const defaultPath = this.buildLocalizedPath(basePath, "audio", this.defaultLanguage);
                if (std.exists(defaultPath)) {
                    const audio = this.createAudioManager(defaultPath, type);
                    this.assetCache.audio[cacheKey] = audio;
                    console.log(`Using default language audio for: ${basePath}`);
                    return audio;
                }
            }

            if (std.exists(basePath)) {
                const audio = this.createAudioManager(basePath, type);
                this.assetCache.audio[cacheKey] = audio;
                console.log(`Using original path for audio: ${basePath}`);
                return audio;
            }

        } catch (error) {
            console.log(`Error loading audio: ${error}`);
        }

        console.log(`Audio not found: ${basePath}`);
        return null;
    }

    createAudioManager(path, type) {
        switch (type.toLowerCase()) {
            case "stream":
                return new StreamManager(path);
            case "sfx":
            case "sound":
                return new SfxManager(path);
            default:
                console.log(`Unknown audio type: ${type}, defaulting to stream`);
                return new StreamManager(path);
        }
    }

    buildLocalizedPath(originalPath, assetType, languageId = null) {
        const lang = languageId || this.currentLanguage.id;
        const langName = this.getLanguageName(lang);

        if (assetType === "audio") {
    return originalPath.replace(
        /PS2DATA\/DATA\/ASSETS\/SOUND\/([^\/]+)\//,
        `PS2DATA/DATA/ASSETS/SOUND/$1/${lang.toUpperCase()}/`
    );
} else if (assetType === "images") {
    const pathParts = originalPath.split('/');
    const filename = pathParts[pathParts.length - 1];
    const directory = pathParts.slice(0, -1).join('/');
    return `${directory}/${lang.toUpperCase()}/${filename}`;
}

        return originalPath;
    }

    getLanguageName(languageId) {
        const language = this.languages.find(lang => lang.id === languageId);
        return language ? language.name : languageId;
    }

    getLocalizedImage(path) {
        return this.getImage(path, true);
    }

    getLocalizedStream(path) {
        return this.getAudio(path, "stream", true);
    }

    getLocalizedSfx(path) {
        return this.getAudio(path, "sfx", true);
    }

    clearCache() {

        Object.values(this.assetCache.images).forEach(image => {
            if (image && typeof image.free === 'function') {
                image.free();
            }
        });

        Object.values(this.assetCache.audio).forEach(audio => {
            if (audio && typeof audio.free === 'function') {
                audio.free();
            }
        });

        this.assetCache = {
            images: {},
            audio: {}
        };
    }

    getCurrentLanguage() {
        return this.currentLanguage;
    }

    getLanguages() {
        return this.languages;
    }

    getCurrentLanguageId() {
        return this.currentLanguage ? this.currentLanguage.id : this.defaultLanguage;
    }

    hasTranslation(key) {
        return this.translations.hasOwnProperty(key);
    }

    destroy() {
        this.clearCache();
        this.initialized = false;
    }
}

export const LanguageSystem = new LanguageSystemClass();