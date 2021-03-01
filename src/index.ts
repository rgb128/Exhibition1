import { CONFIG } from './Configurations';
import { PortalHTML, Portal } from './Portal';
import { map } from './map';

window.onkeydown = (e: KeyboardEvent) => {
    const code = e.code;
    if (code === 'ArrowUp' || code === 'KeyW') {
        CONFIG.screen.data.y += CONFIG.consts.movingDelta;
    } else if (code === 'ArrowDown' || code === 'KeyS') {
        CONFIG.screen.data.y -= CONFIG.consts.movingDelta;
    } else if (code === 'ArrowRight' || code === 'KeyD') {
        CONFIG.screen.data.x -= CONFIG.consts.movingDelta;
    } else if (code === 'ArrowLeft' || code === 'KeyA') {
        CONFIG.screen.data.x += CONFIG.consts.movingDelta;
    }

    const portals = Array.from(document.querySelectorAll('#screen > .portal'));
    for (const portal of portals) {
        const context = (portal as PortalHTML).context;
        context.clipPath();
        // portal.context.clipPath();
    }
}




let previousTime = performance.now();
let millisFromLastCreation: number|undefined = undefined;

/** Main function for all animations */
function animate (time?: number): void {
    if (typeof time !== 'number') time = 0;

    const delta = time - previousTime;
    previousTime = time;
    
    if (millisFromLastCreation === undefined) millisFromLastCreation = CONFIG.consts.creationMs;
    if (millisFromLastCreation >= CONFIG.consts.creationMs && !CONFIG.screen.data.portalIn) {
        millisFromLastCreation = 0;
        // x, y depending on POV (CONFIG.screen.data.x, y)
        new Portal(
            map(Math.random(), 0, 1, -200, 200), 
            map(Math.random(), 0, 1, -200, 200), 
            -5000, 
            100, 
            100, 
            10000, 
            1);
    }
    millisFromLastCreation += delta;

    CONFIG.consts.container.style.left = CONFIG.screen.data.x + 'px';
    CONFIG.consts.container.style.top = CONFIG.screen.data.y + 'px';
    if (CONFIG.screen.data.portalIn) {
        const portalIn = CONFIG.screen.data.portalIn as Portal;
        portalIn.tick(delta);
    } else {
        // CONFIG.consts.container.style.left = CONFIG.screen.data.x + 'px';
        // CONFIG.consts.container.style.top = CONFIG.screen.data.y + 'px';
        const portals = Array.from(document.querySelectorAll('#screen > .portal'));
        for (const portal of portals) {
            const context = (portal as PortalHTML).context;
            context.tick(delta);
        }
    }

    // document.title = `x: ${Math.round(CONFIG.screen.data.x)}, y: ${Math.round(CONFIG.screen.data.y)}`;
    requestAnimationFrame(animate);
}

animate();
