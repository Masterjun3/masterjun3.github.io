import { Component } from "../Component.js";
import { Treasure } from "../Entity/Treasure.js";
export class Diggable extends Component {
    constructor() {
        super();
        this.digcount = 0;
    }
    Update() {
        for (let i = 0; i < this.digcount; i++) {
            if (Math.random() < 0.1) {
                this.State.AddEntity(new Treasure((Math.random() * 0x10) | 0, (Math.random() * 0x10) | 0));
                //this.State.audio_treasureget.volume = 0.5;
                this.State.audio_treasurespawns[Math.floor(Math.random() * this.State.audio_treasurespawns.length)].Play();
            }
        }
    }
}
