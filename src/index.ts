import { PortalHTML, Portal } from './Portal';
import { addMovingListeners } from './addMovingListeners';
import { animate } from './animate';

addMovingListeners();

window.addEventListener('resize', (e: UIEvent) => {
    const portals = Array.from(document.querySelectorAll('#screen > .portal'));
    for (const portal of portals) {
        const context = (portal as PortalHTML).context;
        context.redraw();
    }
});

animate();

// new Portal(
//     0, 
//     0, 
//     CONFIG.consts.perspective, 
//     CONFIG.portalDefaults.width, 
//     CONFIG.portalDefaults.width, 
//     CONFIG.portalDefaults.length, 
//     CONFIG.portalDefaults.speed);
