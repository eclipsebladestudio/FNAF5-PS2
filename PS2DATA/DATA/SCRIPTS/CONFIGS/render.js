let debugMemoryEnabled = true;
let font = new Font("default"); 

function DebugMemory() {
    const ramStats = System.getMemoryStats();
    const ramUsedMB = (ramStats.used / 1048576).toFixed(2);
    const ramFreeMB = (32 - ramUsedMB).toFixed(2);

    const debugText = [
        `Using RAM: ${ramUsedMB}MB / 32MB`,
        `Free RAM: ${ramFreeMB}MB / 32MB`,
        `Used RAM: ${ramStats.used} B`
    ];

    return debugText;
}

export function renderScreen(callback) {
    Screen.display(() => {
        callback();

        if (debugMemoryEnabled) {
            const debugOutput = DebugMemory();
            let y = 20;
            for (const line of debugOutput) {
                font.print(20, y, line); 
                y += 20; 
            }
        }
    });
}
