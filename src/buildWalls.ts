import { Walls } from './Walls';
/** Builds all walls, and returns it */
export function buildWalls(width: number, height: number, length: number): Walls {
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
    
    
    const walls = new Walls(leftWall, rightWall, topWall, bottomWall, endWall);
    return walls;
}
