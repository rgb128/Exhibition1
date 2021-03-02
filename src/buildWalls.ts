import { Walls } from './Walls';
/** Builds all walls, and returns it */
export function buildWalls(width: number, height: number, length: number): Walls {
    const leftWall = buildLeftWall(width / 33);
    const rightWall = document.createElement('div');
    rightWall.classList.add('right-wall');
    const topWall = buildTopWall();
    const bottomWall = buildBottomWall();
    const endWall = buildEndWall();
    

    const walls = new Walls(leftWall, rightWall, topWall, bottomWall, endWall);
    return walls;
}

function buildTopWall(): HTMLElement {
    const topWall = document.createElement('div');
    topWall.classList.add('top-wall');
    return topWall;
}
function buildBottomWall(): HTMLElement {
    const bottomWall = document.createElement('div');
    bottomWall.classList.add('bottom-wall');
    return bottomWall;
}
function buildEndWall(): HTMLElement {
    const endWall = document.createElement('div');
    endWall.classList.add('end');
    return endWall;
}

function buildLeftWall(borderWidth: number): HTMLElement {
    const leftWall = document.createElement('div');
    leftWall.classList.add('left-wall');
    const grid = document.createElement('div');
    grid.classList.add('grid');
    grid.style.borderWidth = borderWidth + 'px';
    leftWall.appendChild(grid);
    return leftWall;
}
