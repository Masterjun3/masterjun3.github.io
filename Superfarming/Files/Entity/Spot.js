import { MoveTowards } from "../Component/MoveTowards.js";
import { Diggable } from "../Component/Diggable.js";
import { Texture } from "../Component/Texture.js";
import { Transform } from "../Component/Transform.js";
import { Entity } from "../Entity.js";
export class Spot extends Entity {
    constructor(xpos, ypos, xhitbox, yhitbox) {
        super();
        let transform = new Transform(xpos, ypos);
        this.AddComponent(transform);
        let texture = new Texture("S");
        this.AddComponent(texture);
        let moveTowards = new MoveTowards();
        this.AddComponent(moveTowards);
        let diggable = new Diggable();
        this.AddComponent(diggable);
    }
}
