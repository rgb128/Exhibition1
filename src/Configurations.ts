export class Configurations {
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
        data: new ScreenData()
    };
    position = {
        x: this.defaults.x,
        y: this.defaults.y,
    }
}

export class ScreenData {
    x = CONFIG.defaults.x;
    y = CONFIG.defaults.y;
    /** @type {undefined|Portal} */
    portalIn: any = undefined;
};




let CONFIG: Configurations;


const container = document.getElementById('container');
export function updateConfig() {
    CONFIG = new Configurations();
    container.style.perspective = CONFIG.consts.perspective + 'px';
    CONFIG.screen.data = new ScreenData();
    console.log('hhhhhh');
}

export { CONFIG };
