import { CONFIG, currentTouchMoveSpeed } from './Configurations';
import { PortalHTML, Portal } from './Portal';
import { map } from './map';

let previousTime = performance.now();
let millisFromLastCreation: number|undefined = undefined;

/** Main function for all animations */
export function animate (time?: number): void {
    if (typeof time !== 'number') time = 0;

    const delta = time - previousTime;
    previousTime = time;
    
    if (millisFromLastCreation === undefined) millisFromLastCreation = CONFIG.consts.creationMs;
    if (millisFromLastCreation >= CONFIG.consts.creationMs && !CONFIG.screen.data.portalIn) {
        millisFromLastCreation = 0;
        // x, y depending on POV (CONFIG.screen.data.x, y)
        new Portal(
            - CONFIG.screen.data.x + map(Math.random(), 0, 1, -CONFIG.portalDefaults.xCreationRadius, CONFIG.portalDefaults.xCreationRadius), 
            - CONFIG.screen.data.y + map(Math.random(), 0, 1, -CONFIG.portalDefaults.yCreationRadius, CONFIG.portalDefaults.yCreationRadius), 
            CONFIG.portalDefaults.z, 
            CONFIG.portalDefaults.width, 
            CONFIG.portalDefaults.width, 
            CONFIG.portalDefaults.length, 
            CONFIG.portalDefaults.speed);
    }
    millisFromLastCreation += delta;

    // touch moving
    let newX = CONFIG.screen.data.x;
    let newY = CONFIG.screen.data.y;
    const xDelta = currentTouchMoveSpeed.x * delta;
    newX += xDelta;
    const yDelta = currentTouchMoveSpeed.y * delta;
    newY += yDelta;
    if (CONFIG.screen.data.portalIn) {
        const portalIn = CONFIG.screen.data.portalIn as Portal;
        if (portalIn.isUserInPortal(newX, newY)) {
            CONFIG.screen.data.x = newX;
            CONFIG.screen.data.y = newY;
        };
    } else {
        CONFIG.screen.data.x = newX;
        CONFIG.screen.data.y = newY;
    }
    

    CONFIG.consts.container.style.left = CONFIG.screen.data.x + 'px';
    CONFIG.consts.container.style.top = CONFIG.screen.data.y + 'px';

    if (CONFIG.screen.data.portalIn && !CONFIG.portalsMoveWhenYouAreInPortal) {
        const portalIn = CONFIG.screen.data.portalIn as Portal;
        portalIn.tick(delta);
    } else {
        const portals = Array.from(document.querySelectorAll('#screen > .portal'));
        for (const portal of portals) {
            const context = (portal as PortalHTML).context;
            context.tick(delta);
        }
    }

    // document.title = `x: ${Math.round(CONFIG.screen.data.x)}, y: ${Math.round(CONFIG.screen.data.y)}`;
    requestAnimationFrame(animate);
}
