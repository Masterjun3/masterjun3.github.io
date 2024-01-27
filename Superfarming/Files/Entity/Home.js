import { BringTowards } from "../Component/BringTowards.js";
import { Texture } from "../Component/Texture.js";
import { Transform } from "../Component/Transform.js";
import { Entity } from "../Entity.js";
export class Home extends Entity {
    constructor(xpos, ypos) {
        super();
        let transform = new Transform(xpos, ypos);
        this.AddComponent(transform);
        let texture = new Texture("H");
        this.AddComponent(texture);
        let bringTowards = new BringTowards();
        this.AddComponent(bringTowards);
    }
}
