import {Walls} from './Walls';
/**
 * 
 * @param walls
 * @param distance distance from POV to the plane with etrance to tunnel. Must be +
 * @param x x coordinate of center, if 0,0 is POV. + is right
 * @param y y coordinate of center, if 0,0 is POV. + is bottom
 * @param width width of tunnel
 * @param height leight if tunnel
 * @param length length or depth of tunnel. always +
 */
export function clipPathOnPortal(
    walls: Walls, 
    distance: number,
    x: number,
    y: number,
    width: number,
    height: number,
    length: number) {


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