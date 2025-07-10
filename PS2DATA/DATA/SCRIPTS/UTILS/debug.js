export const DebugManager = {
    enabled: false,
    font: new Font("default"),
    scale: 0.8,
    lineHeight: 20,
    x: 5,
    y: 5,
    maxY: 220,
    data: {},
    _lastTime: 0,
    _frameCount: 0,
    _startTime: Date.now(),

    toggle() {
        this.enabled = !this.enabled;
    },

    update() {
        if (!this.enabled) return;

        const now = Date.now();
        this._frameCount++;

        if (now - this._lastTime >= 1000) {
            this._lastTime = now;

            try {
                this.data.fps = this._frameCount;
                this._frameCount = 0;

                this.data.frameTime = (1000 / this.data.fps).toFixed(2);
                this.data.uptime = Math.floor((now - this._startTime) / 1000);
                this.data.time = new Date(now).toLocaleString();

                this.data.ram = System.getMemoryStats();
                this.data.vram = Screen.getFreeVRAM();
                this.data.resolution = { width: 640, height: 448 };
                this.data.cpu = System.getCPUInfo();
                this.data.gpu = System.getGPUInfo();
                this.data.temp = System.getTemperature?.() || null;

                const ramTotal = this.data.cpu.RAMSize;
                const ramCore = this.data.ram.core;
                const ramUsable = ramTotal - ramCore;
                const ramUsed = this.data.ram.used - ramCore;

                this.data.ram.usedUser = ramUsed;
                this.data.ram.totalUser = ramUsable;

            } catch (e) {
                this.data.error = e.message || "Unknown Error";
            }
        }
    },

    draw() {
        if (!this.enabled || !this.data.fps) return;

        this.font.scale = this.scale;

        let x1 = this.x;
        let x2 = this.x + 400;
        let y1 = this.y;
        let y2 = this.y;

        const write = (text, useSecondColumn = false) => {
            const x = useSecondColumn ? x2 : x1;
            const y = useSecondColumn ? y2 : y1;
            this.font.print(x, y, text);
            if (useSecondColumn) y2 += this.lineHeight;
            else y1 += this.lineHeight;
        };

        const line = (text) => {
            const useSecondColumn = y1 >= this.maxY;
            write(text, useSecondColumn);
        };

        line(`FPS: ${this.data.fps}`);
        line(`Uptime: ${this.data.uptime}s`);

        const used = (this.data.ram.usedUser / 1048576).toFixed(1);
        const total = (this.data.ram.totalUser / 1048576).toFixed(1);
        line(`RAM Used: ${used} MB / ${total} MB`);

        line(`RAM Core: ${(this.data.ram.core / 1048576).toFixed(1)} MB`);
        line(`RAM Allocs: ${this.data.ram.allocs}`);

        if (this.data.error) {
            line(`ERROR: ${this.data.error}`);
        }
    }
};
