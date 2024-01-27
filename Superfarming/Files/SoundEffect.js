export class SoundEffect {
    constructor(path, layers = 1, volume = 1) {
        this.next_i = 0;
        this.layers = [];
        for (let i = 0; i < layers; i++) {
            let audio = new Audio(path);
            audio.volume = volume;
            this.layers.push(audio);
        }
    }
    Play() {
        let audio = this.layers[this.next_i];
        if (audio.paused || audio.currentTime > 0.1) {
            this.next_i = (this.next_i + 1) % this.layers.length;
            audio.pause();
            audio.currentTime = 0;
            audio.play();
        }
    }
}
