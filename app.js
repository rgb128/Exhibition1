'use strict';

const creationMs = 1000; //px
const creationDistance = -10000; //px
const speed = 1; // px/ms
const deletingDistance = 5000; //px
const movingDelta = 5; //px
const angleDelta = 0; // deg (.2)
const perspective = 1000; //px
const portalBox = {
    x: document.documentElement.clientWidth / 3,
    y: document.documentElement.clientHeight / 3,
    width: document.documentElement.clientWidth / 3,
    height: document.documentElement.clientHeight / 3
}
const border = 0; //px

let previousTime = performance.now();
let millisFromLastCreation = undefined;

const screen = document.getElementById('screen');
screen.data = {
    x: 0,
    y: -250,
    rotateX: 0,
    rotateY: 0
}

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
}
const tunnelWalls = new Walls;
tunnelWalls.left = document.querySelector('.left-wall');
tunnelWalls.right = document.querySelector('.right-wall');
tunnelWalls.top = document.querySelector('.top-wall');
tunnelWalls.bottom = document.querySelector('.bottom-wall');
tunnelWalls.end = document.querySelector('.end');

/**
 * Main function for all animations
 * @param {number} time 
 */
const animate = function (time) {
    if (typeof time !== 'number') time = 0;

    const delta = time - previousTime;
    previousTime = time;
    
    if (millisFromLastCreation === undefined) millisFromLastCreation = creationMs;
    // Create new portion(s) of clocks
    while (millisFromLastCreation >= creationMs) {
        millisFromLastCreation -= creationMs;
        const portal = document.createElement('div');
        portal.classList.add('portal');
        portal.distance = creationDistance;
        portal.style.transform = `translateZ(${creationDistance}px)`;
        portal.style.top = portalBox.y - border + 'px';
        portal.style.left = portalBox.x - border + 'px';
        portal.style.width = portalBox.width + 'px';
        portal.style.height = portalBox.height + 'px';
        // document.getElementById('screen').appendChild(portal);
    }
    millisFromLastCreation += delta;

    const pixelDelta = speed * delta;
    const portals = Array.from(document.querySelectorAll('#screen > .portal'));
    for (const portal of portals) {
        portal.distance += pixelDelta;
        portal.style.transform = `translateZ(${portal.distance}px)`;
        if (portal.distance >= perspective) {
            if (Math.abs(screen.data.x) <= (portalBox.width / 2) && Math.abs(screen.data.y) <= (portalBox.height / 2)) {
                // Check getting into portal
                console.log('portal got');
            }
            portal.remove();
        }
    }
    screen.style.transform = `translate3d(${screen.data.x}px, ${screen.data.y}px, 0px) rotateX(${screen.data.rotateX}deg) rotateY(${screen.data.rotateY}deg)`;

    // requestAnimationFrame(animate);
}

// animate();


screen.style.transform = `translate3d(${screen.data.x}px, ${screen.data.y}px, 0px) rotateX(${screen.data.rotateX}deg) rotateY(${screen.data.rotateY}deg)`;

window.onkeydown = (e) => {
    const code = e.code;
    if (code === 'ArrowUp' || code === 'KeyW') {
        screen.data.y += movingDelta;
        screen.data.rotateX -= angleDelta;
    } else if (code === 'ArrowDown' || code === 'KeyS') {
        screen.data.y -= movingDelta;
        screen.data.rotateX += angleDelta;
    } else if (code === 'ArrowRight' || code === 'KeyD') {
        screen.data.x -= movingDelta;
        screen.data.rotateY -= angleDelta;
    } else if (code === 'ArrowLeft' || code === 'KeyA') {
        screen.data.x += movingDelta;
        screen.data.rotateY += angleDelta;
    }

    screen.style.transform = `translate3d(${screen.data.x}px, ${screen.data.y}px, 0px) rotateX(${screen.data.rotateX}deg) rotateY(${screen.data.rotateY}deg)`;

    clipPathOnPortal(tunnelWalls, perspective, screen.data.x, screen.data.y, portalBox.width, portalBox.height, document.documentElement.clientWidth / 100 * 330.333);

    // console.log(screen.data);
}
clipPathOnPortal(tunnelWalls, perspective, screen.data.x, screen.data.y, portalBox.width, portalBox.height, document.documentElement.clientWidth / 100 * 330.333);


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
