import { CONFIG } from './Configurations';

const TEXT_MOBILE = 'Перемещайся. Тыкни, и начинай игру.';
const TEXT_COMPUTER = 'Перемещайся. Клацни, и начинай игру.';

export class Popup {
    protected readonly root: HTMLElement;

    public constructor() {
        this.root = this.createRoot();
    }

    public show(): void {
        document.body.appendChild(this.root);
        document.documentElement.addEventListener('click', this.ondocumentclick);
    }

    protected createRoot(): HTMLElement {
        const div = document.createElement('div');
        div.classList.add('popup');
        const orientationHorizontal = CONFIG.screen.width > CONFIG.screen.height;
        div.innerHTML = orientationHorizontal ? TEXT_COMPUTER : TEXT_MOBILE;
        return div;
    }

    protected ondocumentclick = (e: any) => {
        this.root.remove();
        document.documentElement.requestFullscreen();
        document.documentElement.removeEventListener('click', this.ondocumentclick);
    }
}
