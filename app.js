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
    // calculateLeftWallClip(perspective, 0, -screen.data.y - portalBox.height/2, -screen.data.y + portalBox.height/2);

    clipPathOnPortal(document.querySelector('.left-wall'), perspective, screen.data.x, screen.data.y, portalBox.width, portalBox.height, document.documentElement.clientWidth / 100 * 330.333);

    // console.log(screen.data);
}
clipPathOnPortal(document.querySelector('.left-wall'), perspective, screen.data.x, screen.data.y, portalBox.width, portalBox.height, document.documentElement.clientWidth / 100 * 330.333);

// calculateLeftWallClip(perspective, 0, -screen.data.y - portalBox.height/2, -screen.data.y + portalBox.height/2);

/**
 * from bottom only
 * @param {number} perspective 
 * @param {number} distance 
 * @param {number} centerToBottom 
 * @param {number} centerToTop 
 */
function calculateLeftWallClip(perspective, distance, centerToBottom, centerToTop) {
    if (centerToBottom <= 0) {
        // all wall is visible
    }
    const allDistance = perspective + distance;
    const beforeZLeg = allDistance;
    const beforeYLeg = centerToBottom;
    const afterYLeg = centerToTop-centerToBottom; // height of portal
    const afterZLeg = beforeZLeg * afterYLeg / beforeYLeg; // result
    document.querySelector('.left-wall').style.clipPath = `polygon(0px 0px, ${afterZLeg}px 0px, 0px ${afterYLeg}px)`;
}

/**
 * 
 * @param {HTMLElement} element
 * @param {number} distance distance from POV to the plane with etrance to tunnel. Must be +
 * @param {number} x x coordinate of center, if 0,0 is POV. + is right
 * @param {number} y y coordinate of center, if 0,0 is POV. + is bottom
 * @param {number} width width of tunnel
 * @param {number} height leight if tunnel
 * @param {number} length length or depth of tunnel. always +
 */
function clipPathOnPortal(element, distance, x, y, width, height, length) {
    // LEFT
    if (x > width/2) { // invisible
        element.style.width = '0px';
    } else if ( x < -(width * distance / length + width/2)) { // length must be cropped
        const newLength = width * distance / (-x - width/2);
        element.style.width = newLength + 'px';
    } else { // full length is visible
        element.style.width = length + 'px';
    }

    if (-y > height/2) { // top side is visible
        const topLength = height * distance / (-y - height/2);
        element.style.clipPath = `polygon(0px 0px, ${topLength}px 0px, 0px ${height}px`;
    } else if (y > height/2) { // bottom side is visible
        const bottomLength = height * distance / (y - height/2);
        element.style.clipPath = `polygon(0px 0px, ${bottomLength}px ${height}px, 0px ${height}px`;
    } else { // all sides are visible
        element.style.clipPath = `none`;
    }
}
