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
        movingDelta: 5,
        creationMs: 1000
    };
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
