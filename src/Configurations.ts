class Configurations {
    defaults = {
        x: 0,
        y: 0
    };
    portalsMoveWhenYouAreInPortal = true;
    screen = {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        data: {
            /** x for div shifting. To get real x POV position, *= -1 */
            x: this.defaults.x,
            /** x for div shifting. To get real x POV position, *= -1 */
            y: this.defaults.y,
            /** @type {undefined|Portal} */
            portalIn: undefined
        }
    };
    one = (this.screen.width + this.screen.height - Math.abs(this.screen.width - this.screen.height)) / 2;
    portalDefaults = {
        speed: (this.screen.height > this.screen.width) ? .4 : .7,
        z: -this.one*5,
        x: 0,
        y: 0,
        width: this.one/4,
        height: this.one/4,
        length: this.one*3,
        xCreationRadius: this.one*1,
        yCreationRadius: this.one*1,
    };
    consts = {
        perspective: this.one/3,
        container: document.getElementById('screen'),
        movingDelta: this.one*.1,
        creationMs: 1500,
        maxTouchMoveSpeed: 2, // px/ms
    };
    position = {
        x: this.defaults.x,
        y: this.defaults.y,
    }
}
export { CONFIG };


let CONFIG: Configurations;


const container = document.getElementById('container');
function updateConfig() {
    CONFIG = new Configurations();
    container.style.perspective = CONFIG.consts.perspective + 'px';
}
updateConfig();

window.addEventListener('resize', (e: UIEvent) => {
    updateConfig();
});



const currentTouchMoveSpeed = {
    x: 0,
    y: 0
};
export { currentTouchMoveSpeed };
