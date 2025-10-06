let debugMemoryEnabled = false;


function DebugMemory() {
    const ramStats = System.getMemoryStats();
    
    const totalRAM = 32 * 1048576;
    
    const availableRAM = totalRAM - ramStats.core;

    const userUsedRAM = ramStats.used - ramStats.core;
    
    const userFreeRAM = availableRAM - userUsedRAM;
    
    const availableMB = (availableRAM / 1048576).toFixed(2);
    const userUsedMB = (userUsedRAM / 1048576).toFixed(2);
    const userFreeMB = (userFreeRAM / 1048576).toFixed(2);
    const coreMB = (ramStats.core / 1048576).toFixed(2);
    
    const debugText = [
        `Used: ${userUsedMB}MB / ${availableMB}MB`,
        `Free: ${userFreeMB}MB`,
        `Core (Engine): ${coreMB}MB`
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