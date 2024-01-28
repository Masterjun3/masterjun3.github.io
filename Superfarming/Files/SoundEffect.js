export class SoundEffect {
    constructor(context, path, volume = 1) {
        this.context = context;
        this.volume = volume;
        fetch(path)
            .then(response => response.arrayBuffer())
            .then(buffer => {
            this.context.decodeAudioData(buffer, decodedData => {
                this.buffer = decodedData;
            });
        });
    }
    Play() {
        if (this.buffer) {
            let source = this.context.createBufferSource();
            source.buffer = this.buffer;
            const gainNode = this.context.createGain();
            gainNode.gain.value = this.volume;
            source.connect(gainNode).connect(this.context.destination);
            source.start();
        }
    }
}
