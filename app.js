'use strict';

const creationMs = 1000;
const creationDistance = -10000;//px
const speed = 1; // px/ms
const deletingDistance = 5000;

let previousTime = performance.now();
let millisFromLastCreation = undefined;

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
        document.getElementById('screen').appendChild(portal);
    }
    millisFromLastCreation += delta;

    const pixelDelta = speed * delta;
    const portals = Array.from(document.querySelectorAll('#screen > .portal'));
    for (const portal of portals) {
        portal.distance += pixelDelta;
        portal.style.transform = `translateZ(${portal.distance}px)`;
        if (portal.distance >= deletingDistance) {
            portal.remove();
        }
    }

    requestAnimationFrame(animate);
}

animate();
