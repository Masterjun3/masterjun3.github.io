import { Entity } from "../Entity.js";
import { Speed } from "../Component/Speed.js";
import { Transform } from "../Component/Transform.js";
import { Input } from "../Component/Input.js";
import { Hitbox } from "../Component/Hitboxx.js";
import { Jump } from "../Component/Jump.js";
import { Collision } from "../Component/Collision.js";
import { Direction } from "../Direction.js";
import { Gravity } from "../Component/Gravity.js";
import { Texture } from "../Component/Texture.js";
export class Player extends Entity {
    constructor(xpos, ypos) {
        super();
        let transform = new Transform(xpos, ypos);
        this.AddComponent(transform);
        let speed = new Speed(0, 0);
        this.AddComponent(speed);
        let input = new Input();
        this.AddComponent(input);
        let hitbox = new Hitbox(0x0F00, 0x1000);
        this.AddComponent(hitbox);
        this.AddComponent(new Collision(0x400, 0, 0x800, 0x800, Direction.Up));
        this.AddComponent(new Collision(0x400, 0x800, 0x800, 0x800, Direction.Down));
        this.AddComponent(new Collision(0, 0x200, 0x800, 0xC00, Direction.Left));
        this.AddComponent(new Collision(0x800, 0x200, 0x700, 0xC00, Direction.Right));
        let jump = new Jump();
        this.AddComponent(jump);
        let gravity = new Gravity();
        this.AddComponent(gravity);
        let texture = new Texture("player");
        this.AddComponent(texture);
    }
}
