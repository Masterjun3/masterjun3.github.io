import { Clickbox } from "../Component/Clickbox.js";
import { Transform } from "../Component/Transform.js";
import { Entity } from "../Entity.js";
export class Spawnbox extends Entity {
    constructor(xpos, ypos, width, height, spawntype, costMultiplier) {
        super();
        let transform = new Transform(xpos, ypos);
        this.AddComponent(transform);
        let clickbox = new Clickbox(width, height, spawntype, costMultiplier);
        this.AddComponent(clickbox);
    }
}
