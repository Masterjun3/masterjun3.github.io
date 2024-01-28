import { Dig } from "../Component/Dig.js";
import { Phase } from "../Component/Phase.js";
import { Texture } from "../Component/Texture.js";
import { Transform } from "../Component/Transform.js";
import { Entity } from "../Entity.js";
import { Bring } from "../Component/Bring.js";
export class Farmer extends Entity {
    constructor(xpos, ypos, xhitbox, yhitbox) {
        super();
        let transform = new Transform(xpos, ypos);
        this.AddComponent(transform);
        let texture = new Texture("F");
        this.AddComponent(texture);
        let dig = new Dig();
        this.AddComponent(dig);
        let bring = new Bring();
        this.AddComponent(bring);
        let phase = new Phase();
        this.AddComponent(phase);
    }
}
