import { Walls } from './Walls';
import { CONFIG } from './Configurations';
import { map } from './map';
 
export class PortalHTML extends HTMLElement {
    public context?: Portal;
}

export class Portal {
    /** x coordinate of center depending on screen center. right is + */
    public readonly x: number;
    /** y coordinate of center depending on screen center. bottom is + */
    public readonly y: number;
    /** z coordinate of center. always - */
    public distance: number;
    public readonly width: number;
    public readonly height: number;
    /** length or depth */
    public readonly length: number;
    /** px/ms */
    public readonly speed: number;
    public readonly walls: Walls;
    public readonly root: PortalHTML;

    /**
     * 
     * @param x center depenting on center of screen
     * @param y center depenting on center of screen
     * @param distance 
     * @param width 
     * @param height 
     * @param {number} length 
     * @param speed 
     */
    constructor(
        x: number, 
        y: number, 
        distance: number, 
        width: number, 
        height: number, 
        length: number, 
        speed: number) {

        // if (typeof(x) !== 'number') x = CONFIG.portalDefaults.x;
        // if (typeof(y) !== 'number') y = CONFIG.portalDefaults.y;
        // if (typeof(distance) !== 'number') distance = CONFIG.portalDefaults.distance;
        // if (typeof(width) !== 'number') width = CONFIG.portalDefaults.width;
        // if (typeof(height) !== 'number') height = CONFIG.defaults.height;
        // if (typeof(length) !== 'number') length = CONFIG.defaults.length;
        // if (typeof(speed) !== 'number') speed = CONFIG.defaults.speed;
        // if (typeof(onPortalEnter) !== 'function') onPortalEnter = (p) => { };

        this.x = x;
        this.y = y;
        this.distance = distance;
        this.width = width;
        this.height = height;
        this.length = length;
        this.speed = speed;

        this.root = document.createElement('div');
        this.root.context = this;
        this.root.classList.add('portal');
        this.root.style.width = this.width + 'px';
        this.root.style.height = this.height + 'px';
        this.walls = this.drawWalls();
        this.onresize();
        this.redraw();
        CONFIG.consts.container.appendChild(this.root);
    }

    /**
     * changes x, y, z
     */
    public redraw(): void {
        const realX = CONFIG.screen.width/2 + this.x - this.width/2;
        const realY = CONFIG.screen.height/2 + this.y - this.height/2;
        const realZ = this.distance;
        this.root.style.top = realY + 'px';
        this.root.style.left = realX + 'px';
        this.root.style.transform = `translateZ(${realZ}px)`;
        this.onresize();
    }

    public tick(ms: number): void {
        const pixelDelta = this.speed * ms;
        this.distance += pixelDelta;
        this.root.style.transform = `translateZ(${this.distance}px)`;
        
        const minDistance = CONFIG.consts.perspective;
        const maxDistance = this.length + CONFIG.consts.perspective;

        if (CONFIG.screen.data.portalIn === this) {
            console.log('this portal');
            const endWallOpacity = map(this.distance, minDistance, maxDistance, 1, 0);
            this.walls.end.style.opacity = '' + endWallOpacity;

            if (this.distance >= maxDistance) {
                CONFIG.screen.data.portalIn = undefined;
                this.root.remove();
                return;
            }
        } else {
            this.clipPath();
            if (this.distance >= minDistance) {
                const portalEntered = this.isUserInPortal(CONFIG.screen.data.x, CONFIG.screen.data.y);

                if (portalEntered) {
                    // We're in this tunnel
                    CONFIG.screen.data.portalIn = this;
                    console.log('entered');
                    return;
                } else {
                    console.log('deleted');
                    this.root.remove();
                    return;
                }
            }
        }
    }

    protected drawWalls(): Walls {
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
        

        this.root.appendChild(leftWall);
        this.root.appendChild(rightWall);
        this.root.appendChild(topWall);
        this.root.appendChild(bottomWall);
        this.root.appendChild(endWall);
        return walls;
    }

    protected onresize() {
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

    public clipPath() {
        const walls = this.walls;
        const distance = -1 * this.distance + CONFIG.consts.perspective;
        const x = CONFIG.screen.data.x + this.x;
        const y = CONFIG.screen.data.y + this.y;
        const width = this.width;
        const height = this.height;
        const length = this.length;

        /* @param {number} distance distance from POV to the plane with etrance to tunnel. Must be +
        @param {number} x x coordinate of center, if 0,0 is POV. + is right
        @param {number} y y coordinate of center, if 0,0 is POV. + is bottom
        @param {number} width width of tunnel
        @param {number} height leight if tunnel
        @param {number} length length or depth of tunnel. always + */

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

    /**
     * 
     * @param userX x of POV div (no need to *= -1)
     * @param userY y of POV div (no need to *= -1)
     */
    public isUserInPortal(userX: number, userY: number): boolean {
        const realX = -userX;
        const realY = -userY;
        const leftX = this.x - this.width/2;
        const rightX = this.x + this.width/2;
        const topY = this.y - this.height/2;
        const bottomY = this.y + this.height/2;
        const result = realX > leftX && realX < rightX && realY > topY && realY < bottomY;

        return result;
    }
}