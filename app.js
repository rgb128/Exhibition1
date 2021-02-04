'use strict';

const creationMs = 1000; //px
const creationDistance = -10000; //px
const speed = 1; // px/ms
const deletingDistance = 5000; //px
const movingDelta = 5; //px
const angleDelta = .2; // deg
const perspective = 1000; //px
const portalBox = {
    x: document.documentElement.clientWidth / 3,
    y: document.documentElement.clientHeight / 3,
    width: document.documentElement.clientWidth / 3,
    height: document.documentElement.clientHeight / 3
}
const border = 5; //px

let previousTime = performance.now();
let millisFromLastCreation = undefined;

const screen = document.getElementById('screen');
screen.data = {
    x: 0,
    y: 0,
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
        portal.style.top = portalBox.x - border + 'px';
        portal.style.left = portalBox.y - border + 'px';
        portal.style.width = portalBox.width + 'px';
        portal.style.height = portalBox.height + 'px';
        document.getElementById('screen').appendChild(portal);
    }
    millisFromLastCreation += delta;

    const pixelDelta = speed * delta;
    const portals = Array.from(document.querySelectorAll('#screen > .portal'));
    for (const portal of portals) {
        portal.distance += pixelDelta;
        portal.style.transform = `translateZ(${portal.distance}px)`;
        if (portal.distance >= perspective) {
            if (Math.abs(screen.data.x) <= portalBox.width / 2 && Math.abs(screen.data.y) <= portalBox.height / 2) {
                // Check getting into portal
                console.log('portal got');
            }
            portal.remove();
        }
    }
    screen.style.transform = `translate3d(${screen.data.x}px, ${screen.data.y}px, 0px) rotateX(${screen.data.rotateX}deg) rotateY(${screen.data.rotateY}deg)`;

    requestAnimationFrame(animate);
}

animate();

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
}
