'use strict';


const container = document.getElementById('container');
const screen = document.getElementById('screen');
/** @type {Configurations} */
let CONFIG;

class Configurations {
    portalDefaults = {
        speed: 1,
        z: 1000,
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        length: 1000
    };
    defaults = {
        x: 0,
        y: 0
    }
    consts = {
        perspective: 1000,
        container: document.getElementById('screen'),
        movingDelta: 5
    };
    screen = {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    };
    position = {
        x: this.defaults.x,
        y: this.defaults.y,
    }
}
class ScreenData {
    x = CONFIG.defaults.x;
    y = CONFIG.defaults.y;
};
class Walls {
    /** @type {HTMLElement} */
    left;
    /** @type {HTMLElement} */
    right;
    /** @type {HTMLElement} */
    top;
    /** @type {HTMLElement} */
    bottom;
    /** @type {HTMLElement} */
    end;
};

function updateConfig() {
    CONFIG = new Configurations();
    container.style.perspective = CONFIG.consts.perspective + 'px';
    screen.data = new ScreenData();
}
updateConfig();


window.addEventListener('resize', (e) => {
    updateConfig();
});

// function move(x, y) {

// }

/**
 * Ehen user enters portal
 * @callback onPortalEnter
 * @param {Portal} portal
 * @returns {void}
 */



// const creationMs = 1000; //px
// const creationDistance = -10000; //px
// const speed = 1; // px/ms
// const deletingDistance = 5000; //px
// const movingDelta = 5; //px
// const angleDelta = 0; // deg (.2)
// const perspective = 1000; //px
// const portalBox = {
//     x: document.documentElement.clientWidth / 3,
//     y: document.documentElement.clientHeight / 3,
//     width: document.documentElement.clientWidth / 3,
//     height: document.documentElement.clientHeight / 3
// }
// const border = 0; //px

let previousTime = performance.now();
let millisFromLastCreation = undefined;

// const tunnelWalls = new Walls;
// tunnelWalls.left = document.querySelector('.left-wall');
// tunnelWalls.right = document.querySelector('.right-wall');
// tunnelWalls.top = document.querySelector('.top-wall');
// tunnelWalls.bottom = document.querySelector('.bottom-wall');
// tunnelWalls.end = document.querySelector('.end');

/**
 * Main function for all animations
 * @param {number} time 
 */
// const animate = function (time) {
//     if (typeof time !== 'number') time = 0;

//     const delta = time - previousTime;
//     previousTime = time;
    
//     if (millisFromLastCreation === undefined) millisFromLastCreation = creationMs;
//     // Create new portion(s) of clocks
//     while (millisFromLastCreation >= creationMs) {
//         millisFromLastCreation -= creationMs;
//         const portal = document.createElement('div');
//         portal.classList.add('portal');
//         portal.distance = creationDistance;
//         portal.style.transform = `translateZ(${creationDistance}px)`;
//         portal.style.top = portalBox.y - border + 'px';
//         portal.style.left = portalBox.x - border + 'px';
//         portal.style.width = portalBox.width + 'px';
//         portal.style.height = portalBox.height + 'px';
//         // document.getElementById('screen').appendChild(portal);
//     }
//     millisFromLastCreation += delta;

//     const pixelDelta = speed * delta;
//     const portals = Array.from(document.querySelectorAll('#screen > .portal'));
//     for (const portal of portals) {
//         portal.distance += pixelDelta;
//         portal.style.transform = `translateZ(${portal.distance}px)`;
//         if (portal.distance >= perspective) {
//             if (Math.abs(screen.data.x) <= (portalBox.width / 2) && Math.abs(screen.data.y) <= (portalBox.height / 2)) {
//                 // Check getting into portal
//                 console.log('portal got');
//             }
//             portal.remove();
//         }
//     }
//     screen.style.transform = `translate3d(${screen.data.x}px, ${screen.data.y}px, 0px) rotateX(${screen.data.rotateX}deg) rotateY(${screen.data.rotateY}deg)`;

//     // requestAnimationFrame(animate);
// }

// animate();


// screen.style.transform = `translate3d(${screen.data.x}px, ${screen.data.y}px, 0px) rotateX(${screen.data.rotateX}deg) rotateY(${screen.data.rotateY}deg)`;

window.onkeydown = (e) => {
    const code = e.code;
    if (code === 'ArrowUp' || code === 'KeyW') {
        screen.data.y += CONFIG.consts.movingDelta;
        // screen.data.y += CONFIG.consts.movingDelta;
    } else if (code === 'ArrowDown' || code === 'KeyS') {
        screen.data.y -= CONFIG.consts.movingDelta;
        // screen.data.y -= CONFIG.consts.movingDelta;
    } else if (code === 'ArrowRight' || code === 'KeyD') {
        screen.data.x -= CONFIG.consts.movingDelta;
        // screen.data.x -= CONFIG.consts.movingDelta;
    } else if (code === 'ArrowLeft' || code === 'KeyA') {
        screen.data.x += CONFIG.consts.movingDelta;
        // screen.data.x += CONFIG.consts.movingDelta;
    }

    screen.style.left = screen.data.x + 'px';
    screen.style.top = screen.data.y + 'px';
    // console.log(screen.data);

    const portals = Array.from(document.querySelectorAll('#screen > .portal'));
    for (const portal of portals) {
        /** @type {Portal} */
        const context = portal.context;
        context.clipPath();
        // portal.context.clipPath();
    }
}
// clipPathOnPortal(tunnelWalls, perspective, screen.data.x, screen.data.y, portalBox.width, portalBox.height, document.documentElement.clientWidth / 100 * 330.333);


/**
 * 
 * @param {Walls} walls
 * @param {number} distance distance from POV to the plane with etrance to tunnel. Must be +
 * @param {number} x x coordinate of center, if 0,0 is POV. + is right
 * @param {number} y y coordinate of center, if 0,0 is POV. + is bottom
 * @param {number} width width of tunnel
 * @param {number} height leight if tunnel
 * @param {number} length length or depth of tunnel. always +
 */
function clipPathOnPortal(walls, distance, x, y, width, height, length) {
    if (walls.left) {
        if (x > width/2) { // invisible
            walls.left.style.width = '0px';
        } else if ( x < -(width * distance / length + width/2)) { // length must be cropped
            const newLength = width * distance / (-x - width/2);
            walls.left.style.width = newLength + 'px';
        } else { // full length is visible
            walls.left.style.width = length + 'px';
        }

        if (-y > height/2) { // top side is visible
            const topLength = height * distance / (-y - height/2);
            walls.left.style.clipPath = `polygon(0px 0px, ${topLength}px 0px, 0px ${height}px`;
        } else if (y > height/2) { // bottom side is visible
            const bottomLength = height * distance / (y - height/2);
            walls.left.style.clipPath = `polygon(0px 0px, ${bottomLength}px ${height}px, 0px ${height}px`;
        } else { // all sides are visible
            walls.left.style.clipPath = `none`;
        }
    }

    if (walls.right) {
        if (-x > width/2) { // invisible
            walls.right.style.width = '0px';
        } else if ( x > (width * distance / length + width/2)) { // length must be cropped
            const newLength = width * distance / (x - width/2);
            walls.right.style.width = newLength + 'px';
        } else { // full length is visible
            walls.right.style.width = length + 'px';
        }
    
        if (-y > height/2) { // top side is visible
            const topLength = height * distance / (-y - height/2);
            walls.right.style.clipPath = `polygon(0px 0px, ${topLength}px 0px, 0px ${height}px`;
        } else if (y > height/2) { // bottom side is visible
            const bottomLength = height * distance / (y - height/2);
            walls.right.style.clipPath = `polygon(0px 0px, ${bottomLength}px ${height}px, 0px ${height}px`;
        } else { // all sides are visible
            walls.right.style.clipPath = `none`;
        }
    }


    if (walls.top) {
        if (y > height/2) { // invisible
            walls.top.style.height = '0px';
        } else if ( y < -(height * distance / length + height/2)) { // length must be cropped
            const newLength = height * distance / (-y - height/2);
            walls.top.style.height = newLength + 'px';
        } else { // full length is visible
            walls.top.style.height = length + 'px';
        }

        if (x > width/2) { // right side is visible
            const rightLength = width * distance / (x - width/2);
            walls.top.style.clipPath = `polygon(0px 0px, ${width}px ${rightLength}px, ${width}px 0px)`;
        } else if (-x > width/2) { // left side is visible
            const leftLength = width * distance / (-x - width/2);
            walls.top.style.clipPath = `polygon(${width}px 0px, 0px ${leftLength}px, 0px 0px)`;
        } else { // all sides are visible
            walls.top.style.clipPath = `none`;
        }
    }
    
    if (walls.bottom) {
        if (-y > height/2) { // invisible
            walls.bottom.style.height = '0px';
        } else if (y > (height * distance / length + height/2)) { // length must be cropped
            const newLength = height * distance / (y - height/2);
            walls.bottom.style.height = newLength + 'px';
        } else { // full length is visible
            walls.bottom.style.height = length + 'px';
        }

        if (x > width/2) { // right side is visible
            const rightLength = width * distance / (x - width/2);
            walls.bottom.style.clipPath = `polygon(0px 0px, ${width}px ${rightLength}px, ${width}px 0px)`;
        } else if (-x > width/2) { // left side is visible
            const leftLength = width * distance / (-x - width/2);
            walls.bottom.style.clipPath = `polygon(${width}px 0px, 0px ${leftLength}px, 0px 0px)`;
        } else { // all sides are visible
            walls.bottom.style.clipPath = `none`;
        }
    }
    
    if (walls.end) {
        let cropLeft = length * (-x - width/2) / distance;
        cropLeft = width - cropLeft;
        cropLeft = cropLeft < 0 ? 0 : cropLeft > width ? width : cropLeft;
        let cropRight = length * (x - width/2) / distance;
        cropRight = cropRight < 0 ? 0 : cropRight > width ? width : cropRight;

        let cropTop = length * (-y - height/2) / distance;
        cropTop = height - cropTop;
        cropTop = cropTop < 0 ? 0 : cropTop > height ? height : cropTop;
        let cropBottom = length * (y - height/2) / distance;
        cropBottom = cropBottom < 0 ? 0 : cropBottom > height ? height : cropBottom;

        walls.end.style.clipPath = `polygon(${cropLeft}px ${cropTop}px, ${cropRight}px ${cropTop}px, ${cropRight}px ${cropBottom}px, ${cropLeft}px ${cropBottom}px)`;
    }
}



class Portal {
    /** @type {number} x coordinate of center. right is + */
    x;
    /** @type {number} y coordinate of center. bottom is + */
    y;
    /** @type {number} z coordinate of center. always - */
    distance;
    /** @type {number} */
    width;
    /** @type {number} */
    height;
    /** @type {number} length or depth */
    length;
    /** @type {number} px/ms */
    speed;
    /** @type {Walls} */
    walls;
    /** @type {HTMLElement} */
    root;
    /** @type {onPortalEnter} */
    onPortalEnter;

    /**
     * 
     * @param {number} x center depenting on center of POV
     * @param {number} y center depenting on center of POV
     * @param {number} distance 
     * @param {number} width 
     * @param {number} height 
     * @param {number} length 
     * @param {number} speed 
     * @param {onPortalEnter|undefined}
     */
    constructor(x, y, distance, width, height, length, speed, onPortalEnter) {
        if (typeof(x) !== 'number') x = CONFIG.portalDefaults.x;
        if (typeof(y) !== 'number') y = CONFIG.portalDefaults.y;
        if (typeof(distance) !== 'number') distance = CONFIG.portalDefaults.distance;
        if (typeof(width) !== 'number') width = CONFIG.portalDefaults.width;
        if (typeof(height) !== 'number') height = CONFIG.defaults.height;
        if (typeof(length) !== 'number') length = CONFIG.defaults.length;
        if (typeof(speed) !== 'number') speed = CONFIG.defaults.speed;
        if (typeof(onPortalEnter) !== 'function') onPortalEnter = (p) => { };

        this.x = x;
        this.y = y;
        this.distance = distance;
        this.width = width;
        this.height = height;
        this.length = length;
        this.speed = speed;
        this.onPortalEnter = onPortalEnter;

        this.root = document.createElement('div');
        this.root.context = this;
        this.root.classList.add('portal');
        this.root.style.width = this.width + 'px';
        this.root.style.height = this.height + 'px';
        this.drawWalls();
        this.redraw();
        screen.appendChild(this.root);
    }

    /**
     * changes x, y, z
     */
    redraw() {
        const realX = CONFIG.screen.width/2 + this.x - this.width/2;
        const realY = CONFIG.screen.height/2 + this.y - this.height/2;
        const realZ = this.distance;
        this.root.style.top = realY + 'px';
        this.root.style.left = realX + 'px';
        this.root.style.transform = `translateZ(${realZ}px)`;
        this.onresize();
    }

    /**
     * 
     * @param {number} ms 
     */
    tick(ms) {

    }

    drawWalls() {
        const leftWall = document.createElement('div');
        leftWall.classList.add('left-wall');
        const rightWall = document.createElement('div');
        rightWall.classList.add('right-wall');
        const topWall = document.createElement('div');
        topWall.classList.add('top-wall');
        const bottomWall = document.createElement('div');
        bottomWall.classList.add('bottom-wall');
        const endWall = document.createElement('div');
        endWall.classList.add('end');
        
        const walls = new Walls();
        walls.left = leftWall;
        walls.right = rightWall;
        walls.top = topWall;
        walls.bottom = bottomWall;
        walls.end = endWall;
        
        this.walls = walls;
        this.onresize();

        this.root.appendChild(leftWall);
        this.root.appendChild(rightWall);
        this.root.appendChild(topWall);
        this.root.appendChild(bottomWall);
        this.root.appendChild(endWall);
    }

    onresize() {
        this.walls.left.style.width = this.length + 'px';
        this.walls.left.style.height = this.height + 'px';

        this.walls.right.style.left = this.width + 'px';
        this.walls.right.style.width = this.length + 'px';
        this.walls.right.style.height = this.height + 'px';
        
        this.walls.top.style.width = this.width + 'px';
        this.walls.top.style.height = this.length + 'px';
        
        this.walls.bottom.style.top = this.height + 'px';
        this.walls.bottom.style.width = this.width + 'px';
        this.walls.bottom.style.height = this.length + 'px';

        this.walls.end.style.width = this.width + 'px';
        this.walls.end.style.height = this.height + 'px';
        this.walls.end.style.transform = `translateZ(-${this.length}px)`;

        this.clipPath();
    }

    clipPath() {
        const walls = this.walls;
        const distance = -1 * this.distance + CONFIG.consts.perspective;
        /** @type {number} */
        const x = screen.data.x + this.x;
        /** @type {number} */
        const y = screen.data.y + this.y;
        const width = this.width;
        const height = this.height;
        const length = this.length;

        if (walls.left) {
            if (x > width/2) { // invisible
                walls.left.style.width = '0px';
            } else if ( x < -(width * distance / length + width/2)) { // length must be cropped
                const newLength = width * distance / (-x - width/2);
                walls.left.style.width = newLength + 'px';
            } else { // full length is visible
                walls.left.style.width = length + 'px';
            }
    
            if (-y > height/2) { // top side is visible
                const topLength = height * distance / (-y - height/2);
                walls.left.style.clipPath = `polygon(0px 0px, ${topLength}px 0px, 0px ${height}px`;
            } else if (y > height/2) { // bottom side is visible
                const bottomLength = height * distance / (y - height/2);
                walls.left.style.clipPath = `polygon(0px 0px, ${bottomLength}px ${height}px, 0px ${height}px`;
            } else { // all sides are visible
                walls.left.style.clipPath = `none`;
            }
        }
    
        if (walls.right) {
            if (-x > width/2) { // invisible
                walls.right.style.width = '0px';
            } else if ( x > (width * distance / length + width/2)) { // length must be cropped
                const newLength = width * distance / (x - width/2);
                walls.right.style.width = newLength + 'px';
            } else { // full length is visible
                walls.right.style.width = length + 'px';
            }
        
            if (-y > height/2) { // top side is visible
                const topLength = height * distance / (-y - height/2);
                walls.right.style.clipPath = `polygon(0px 0px, ${topLength}px 0px, 0px ${height}px`;
            } else if (y > height/2) { // bottom side is visible
                const bottomLength = height * distance / (y - height/2);
                walls.right.style.clipPath = `polygon(0px 0px, ${bottomLength}px ${height}px, 0px ${height}px`;
            } else { // all sides are visible
                walls.right.style.clipPath = `none`;
            }
        }
    
    
        if (walls.top) {
            if (y > height/2) { // invisible
                walls.top.style.height = '0px';
            } else if ( y < -(height * distance / length + height/2)) { // length must be cropped
                const newLength = height * distance / (-y - height/2);
                walls.top.style.height = newLength + 'px';
            } else { // full length is visible
                walls.top.style.height = length + 'px';
            }
    
            if (x > width/2) { // right side is visible
                const rightLength = width * distance / (x - width/2);
                walls.top.style.clipPath = `polygon(0px 0px, ${width}px ${rightLength}px, ${width}px 0px)`;
            } else if (-x > width/2) { // left side is visible
                const leftLength = width * distance / (-x - width/2);
                walls.top.style.clipPath = `polygon(${width}px 0px, 0px ${leftLength}px, 0px 0px)`;
            } else { // all sides are visible
                walls.top.style.clipPath = `none`;
            }
        }
        
        if (walls.bottom) {
            if (-y > height/2) { // invisible
                walls.bottom.style.height = '0px';
            } else if (y > (height * distance / length + height/2)) { // length must be cropped
                const newLength = height * distance / (y - height/2);
                walls.bottom.style.height = newLength + 'px';
            } else { // full length is visible
                walls.bottom.style.height = length + 'px';
            }
    
            if (x > width/2) { // right side is visible
                const rightLength = width * distance / (x - width/2);
                walls.bottom.style.clipPath = `polygon(0px 0px, ${width}px ${rightLength}px, ${width}px 0px)`;
            } else if (-x > width/2) { // left side is visible
                const leftLength = width * distance / (-x - width/2);
                walls.bottom.style.clipPath = `polygon(${width}px 0px, 0px ${leftLength}px, 0px 0px)`;
            } else { // all sides are visible
                walls.bottom.style.clipPath = `none`;
            }
        }
        
        if (walls.end) {
            let cropLeft = length * (-x - width/2) / distance;
            cropLeft = width - cropLeft;
            cropLeft = cropLeft < 0 ? 0 : cropLeft > width ? width : cropLeft;
            let cropRight = length * (x - width/2) / distance;
            cropRight = cropRight < 0 ? 0 : cropRight > width ? width : cropRight;
    
            let cropTop = length * (-y - height/2) / distance;
            cropTop = height - cropTop;
            cropTop = cropTop < 0 ? 0 : cropTop > height ? height : cropTop;
            let cropBottom = length * (y - height/2) / distance;
            cropBottom = cropBottom < 0 ? 0 : cropBottom > height ? height : cropBottom;
    
            walls.end.style.clipPath = `polygon(${cropLeft}px ${cropTop}px, ${cropRight}px ${cropTop}px, ${cropRight}px ${cropBottom}px, ${cropLeft}px ${cropBottom}px)`;
        }
    }
}


new Portal(0, 0, 0, 100, 100, 1000, 0);