import { Bringable } from "../Component/Bringable.js";
import { Texture } from "../Component/Texture.js";
import { Transform } from "../Component/Transform.js";
import { Entity } from "../Entity.js";
export class Treasure extends Entity {
    constructor(xpos, ypos) {
        super();
        let transform = new Transform(xpos, ypos);
        this.AddComponent(transform);
        let texture = new Texture("T");
        this.AddComponent(texture);
        let bringable = new Bringable();
        this.AddComponent(bringable);
    }
}
