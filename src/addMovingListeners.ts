import { CONFIG, currentTouchMoveSpeed } from './Configurations';
import { map } from './map';
import { PortalHTML, Portal } from './Portal';

let startX: number|undefined = undefined;
let startY: number|undefined = undefined;

export function addMovingListeners(): void {
    window.addEventListener('keydown', (e: KeyboardEvent) => {
        const code = e.code;
    
        let newX = CONFIG.screen.data.x;
        let newY = CONFIG.screen.data.y;
    
        if (code === 'ArrowUp' || code === 'KeyW') {
            newY += CONFIG.consts.movingDelta;
        } else if (code === 'ArrowDown' || code === 'KeyS') {
            newY -= CONFIG.consts.movingDelta;
        } else if (code === 'ArrowRight' || code === 'KeyD') {
            newX -= CONFIG.consts.movingDelta;
        } else if (code === 'ArrowLeft' || code === 'KeyA') {
            newX += CONFIG.consts.movingDelta;
        }
    
        if (CONFIG.screen.data.portalIn) {
            const portalIn = CONFIG.screen.data.portalIn as Portal;
            if (!portalIn.isUserInPortal(newX, newY)) return;
        }
        CONFIG.screen.data.x = newX;
        CONFIG.screen.data.y = newY;
    
        const portals = Array.from(document.querySelectorAll('#screen > .portal'));
        for (const portal of portals) {
            const context = (portal as PortalHTML).context;
            if (context && context !== CONFIG.screen.data.portalIn) {
                context.clipPath();
            }
        }
    });

    window.addEventListener('touchstart', (e: UIEvent) => {
        const coords = getCoordsOfTouch(e);
        startX = coords.x;
        startY = coords.y;
        currentTouchMoveSpeed.x = 0;
        currentTouchMoveSpeed.y = 0;
    });
    window.addEventListener('touchend', (e: UIEvent) => {
        startX = undefined;
        startY = undefined;
        currentTouchMoveSpeed.x = 0;
        currentTouchMoveSpeed.y = 0;
    });
    window.addEventListener('touchmove', (e: UIEvent) => {
        const coords = getCoordsOfTouch(e);
        if (startX === undefined || startY === undefined) return;

        const xDelta = coords.x - startX;
        const yDelta = coords.y - startY;
        const screenWidth = CONFIG.screen.width;
        const screenHeight = CONFIG.screen.height;
        const maxSpeed = CONFIG.consts.maxTouchMoveSpeed;

        const xSpeed = map(xDelta, -screenWidth, screenWidth, -maxSpeed, maxSpeed);
        const ySpeed = map(yDelta, -screenHeight, screenHeight, -maxSpeed, maxSpeed);
        
        currentTouchMoveSpeed.x = xSpeed;
        currentTouchMoveSpeed.y = ySpeed;
    });
    window.addEventListener('touchcancel', (e: UIEvent) => {
        startX = undefined;
        startY = undefined;
        currentTouchMoveSpeed.x = 0;
        currentTouchMoveSpeed.y = 0;
    });
}

class Coords {
    constructor(
        public readonly x: number,
        public readonly y: number
    ) { }
}

function getCoordsOfTouch(e: any): Coords {
    const touchX = e.touches[0].screenX;
    const touchY = e.touches[0].screenY;
    return new Coords(touchX, touchY);
}
