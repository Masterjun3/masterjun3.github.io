import { Hitbox } from "../Component/Hitbox.js";
import { Texture } from "../Component/Texture.js";
import { Transform } from "../Component/Transform.js";
import { Entity } from "../Entity.js";
export class Block extends Entity {
    constructor(xpos, ypos, xhitbox, yhitbox) {
        super();
        let transform = new Transform(xpos, ypos);
        this.AddComponent(transform);
        let hitbox = new Hitbox(xhitbox !== null && xhitbox !== void 0 ? xhitbox : 0x1000, yhitbox !== null && yhitbox !== void 0 ? yhitbox : 0x1000);
        this.AddComponent(hitbox);
        let texture = new Texture("obstacle");
        this.AddComponent(texture);
    }
}
