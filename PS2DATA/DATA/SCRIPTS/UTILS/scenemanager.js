export class SfxManager {
    constructor(path) {
        this.path = path;
        this.sfx = null;
        this.channel = null;
        this.loaded = false;
        this.freed = false;
        this.volume = 100;
        this.pan = 0;
        this.pitch = 0;

        SceneManager.trackSound(this);
        this.load();
    }

    load() {
        if (!this.loaded && !this.freed) {
            try {
                this.sfx = new Sound.Sfx(this.path);
                this.loaded = true;
                console.log(`SFX loaded: ${this.path}`);
            } catch (error) {
                console.log(`Failed to load SFX: ${this.path}`);
            }
        }
    }

    play(channel = null) {
        if (!this.loaded || this.freed || !this.sfx) return null;

        try {
            this.sfx.volume = this.volume;
            this.sfx.pan = this.pan;
            this.sfx.pitch = this.pitch;

            if (channel !== null) {
                this.channel = this.sfx.play(channel);
                console.log(`Playing SFX on channel: ${channel}`);
            } else {
                const availableChannel = Sound.findChannel();
                this.channel = this.sfx.play(availableChannel);
                console.log(`Playing SFX on available channel: ${availableChannel}`);
            }

            return this.channel;
        } catch (error) {
            console.log(`Failed to play SFX: ${this.path}`);
            return null;
        }
    }

    isPlaying() {
        if (!this.loaded || this.freed || !this.sfx || this.channel === null) return false;

        try {
            return this.sfx.playing(this.channel);
        } catch {
            return false;
        }
    }

    setVolume(volume) {
        this.volume = volume;
        if (this.sfx) this.sfx.volume = volume;
    }

    setPan(pan) {
        this.pan = pan;
        if (this.sfx) this.sfx.pan = pan;
    }

    setPitch(pitch) {
        this.pitch = pitch;
        if (this.sfx) this.sfx.pitch = pitch;
    }

    free() {
        if (this.freed) return;
        this.freed = true;

        try {
            if (this.sfx) {
                this.sfx.free();
                console.log(`Freed SFX: ${this.path}`);
            }
        } catch (error) {
            console.log(`Error freeing SFX: ${this.path}`);
        }

        this.sfx = null;
        this.channel = null;
        this.loaded = false;
        SceneManager.untrackSound(this);
    }
}

export class StreamManager {
  static loadedStreams = [];
  static MAX_STREAMS = 1;

  constructor(path) {
    this.path = path;
    this.stream = null;
    this.loaded = false;
    this.freed = false;
    this.loop = false;
    SceneManager.trackSound(this);
  }

  load() {
    if (this.loaded || this.freed) return;
    try {
      this.stream = new Sound.Stream(this.path);
      this.loaded = true;
      StreamManager.loadedStreams.push(this);

      while (StreamManager.loadedStreams.length > StreamManager.MAX_STREAMS) {
        const oldest = StreamManager.loadedStreams.shift();
        if (oldest !== this) oldest.free();
      }
      console.log(`Stream loaded: ${this.path}`);
    } catch {
      console.log(`Failed to load stream: ${this.path}`);
    }
  }

  play() {
    if (!this.loaded) this.load();
    if (!this.loaded || this.freed || !this.stream) return;


    StreamManager.loadedStreams = StreamManager.loadedStreams.filter(s => !s.freed);
    while (StreamManager.loadedStreams.length > StreamManager.MAX_STREAMS) {
      const oldest = StreamManager.loadedStreams.shift();
      if (oldest !== this) oldest.free();
    }

    try {
      this.stream.loop = this.loop;
      this.stream.play();
      console.log(`Playing stream: ${this.path}`);
    } catch {
      console.log(`Failed to play stream: ${this.path}`);
    }
  }

  pause() {
    if (!this.loaded || this.freed || !this.stream) return;
    try {
      this.stream.pause();
      console.log(`Paused stream: ${this.path}`);
    } catch {
      console.log(`Failed to pause stream: ${this.path}`);
    }
  }

  rewind() {
    if (!this.loaded || this.freed || !this.stream) return;
    try {
      this.stream.rewind();
      console.log(`Rewound stream: ${this.path}`);
    } catch {
      console.log(`Failed to rewind stream: ${this.path}`);
    }
  }

  isPlaying() {
    if (!this.loaded || this.freed || !this.stream) return false;
    try {
      return this.stream.playing();
    } catch {
      return false;
    }
  }

  setLoop(loop) {
    this.loop = loop;
    if (this.stream) this.stream.loop = loop;
  }

  setPosition(position) {
    if (this.stream) this.stream.position = position;
  }

  getPosition() {
    return this.stream ? this.stream.position : 0;
  }

  getLength() {
    return this.stream ? this.stream.length : 0;
  }

  free() {
    if (this.freed) return;
    this.freed = true;
    try {
      if (this.stream) {
        this.stream.pause();
        this.stream.free();
        console.log(`Freed stream: ${this.path}`);
      }
    } catch {
      console.log(`Error freeing stream: ${this.path}`);
    }
    this.stream = null;
    this.loaded = false;
    SceneManager.untrackSound(this);


    StreamManager.loadedStreams = StreamManager.loadedStreams.filter(s => s !== this);
  }
}


export class ImageManager {
    constructor(path) {
        this.path = path;
        this.image = null;
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.color = null;
        this.loaded = false;
        this.freed = false;

        SceneManager.trackImage(this);
        this.load();
    }

    load() {
        if (!this.loaded && !this.freed) {
            try {
                this.image = new Image(this.path);
                this.width = this.image.width;
                this.height = this.image.height;
                this.loaded = true;
                console.log(`Image loaded: ${this.path}`);
            } catch (error) {
                console.log(`Failed to load image: ${this.path}`);
            }
        }
    }

    draw(x, y) {
        if (!this.loaded || this.freed || !this.image) return;

        try {
            this.image.width = this.width;
            this.image.height = this.height;
            if (this.color) this.image.color = this.color;
            this.image.draw(x, y);
        } catch (error) {
            console.log(`Error drawing image: ${this.path}`);
        }
    }

    free() {
        if (this.freed) return;
        this.freed = true;

        try {
            if (this.image) {
                this.image.free();
                console.log(`Freed image: ${this.path}`);
            }
        } catch (error) {
            console.log(`Error freeing image: ${this.path}`);
        }

        this.image = null;
        this.loaded = false;
        SceneManager.untrackImage(this);
    }
}

export const SceneManager = {
    currentScene: null,
    loadedImages: new Set(),
    loadedSounds: new Set(),
    sceneLoading: false,

    isCurrentSceneActive() {
        return !this.sceneLoading && this.currentScene !== null;
    },

    trackImage(image) {
        console.log(`Tracking image: ${image.path}`);
        this.loadedImages.add(image);
    },

    untrackImage(image) {
        this.loadedImages.delete(image);
        console.log(`Untracked image: ${image.path}`);
    },

    trackSound(sound) {
        console.log(`Tracking sound: ${sound.path}`);
        this.loadedSounds.add(sound);
    },

    untrackSound(sound) {
        this.loadedSounds.delete(sound);
        console.log(`Untracked sound: ${sound.path}`);
    },

    clear() {
        this.currentScene = null;

        const imagesToFree = Array.from(this.loadedImages);
        this.loadedImages.clear();

        imagesToFree.forEach(image => {
            if (image && typeof image.free === 'function') {
                try {
                    image.free();
                } catch (error) {
                    console.log(`Error freeing image during scene clear: ${image.path}`);
                }
            }
        });

        const soundsToFree = Array.from(this.loadedSounds);
        this.loadedSounds.clear();

        soundsToFree.forEach(sound => {
            if (sound && typeof sound.free === 'function') {
                try {
                    sound.free();
                } catch (error) {
                    console.log(`Error freeing sound during scene clear: ${sound.path}`);
                }
            }
        });

        if (typeof std !== 'undefined' && std.gc) {
            std.gc();
        }

        console.log(`Scene cleared - Images freed: ${imagesToFree.length}, Sounds freed: ${soundsToFree.length}`);
    },

    load(sceneFunction) {
        this.sceneLoading = true;

        try {
            this.clear();
            this.currentScene = sceneFunction;
            sceneFunction();
        } catch (error) {
            this.currentScene = null;
            console.log(`Error loading scene: ${error.message}`);
        } finally {
            this.sceneLoading = false;
        }
    },

    update() {
        if (!this.sceneLoading && this.currentScene) {
            try {
                this.currentScene();
            } catch (error) {
                console.log(`Error updating scene: ${error.message}`);
                this.currentScene = null;
            }
        }
    },

    forceCleanup() {
        this.clear();
        if (typeof std !== 'undefined' && std.gc) {
            std.gc();
        }
    },

    getStats() {
        return {
            loadedImages: this.loadedImages.size,
            loadedSounds: this.loadedSounds.size,
            sceneLoading: this.sceneLoading,
            hasCurrentScene: this.currentScene !== null
        };
    }
};

