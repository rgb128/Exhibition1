import { PortalHTML, Portal } from './Portal';
import { addMovingListeners } from './addMovingListeners';
import { animate } from './animate';
import { Popup } from './Popup';

addMovingListeners();

window.addEventListener('resize', (e: UIEvent) => {
    const portals = Array.from(document.querySelectorAll('#screen > .portal'));
    for (const portal of portals) {
        const context = (portal as PortalHTML).context;
        context.redraw();
    }
});

new Popup().show();

animate();
