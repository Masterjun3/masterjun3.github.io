import { Component } from "../Component.js";
import { Bring } from "./Bring.js";
import { Bringable } from "./Bringable.js";
import { Dig } from "./Dig.js";
import { Diggable } from "./Diggable.js";
import { Move } from "./Move.js";
import { Transform } from "./Transform.js";
export class Interact extends Component {
    constructor() {
        super();
    }
    Update() {
        let move = this.entity.GetComponent(Move);
        if (move && move.moving) {
            return;
        }
        let dig = this.entity.GetComponent(Dig);
        if (dig && dig.digging) {
            return;
        }
        let bring = this.entity.GetComponent(Bring);
        if (bring && bring.bringing) {
            return;
        }
        let ourTransform = this.entity.GetComponent(Transform);
        let transforms = this.State.GetComponents(Transform);
        for (let theirTransform of transforms) {
            if (theirTransform.entity == this.entity) {
                continue;
            }
            if (theirTransform.xpos == ourTransform.xpos && theirTransform.ypos == ourTransform.ypos) {
                let diggable = theirTransform.entity.GetComponent(Diggable);
                if (diggable) {
                    let dig = this.entity.GetComponent(Dig);
                    if (dig) {
                        dig.StartDigging(theirTransform.entity.id, 30);
                        break;
                    }
                }
                let bringable = theirTransform.entity.GetComponent(Bringable);
                if (bringable) {
                    let bring = this.entity.GetComponent(Bring);
                    if (bring) {
                        bring.bringingId = theirTransform.entity.id;
                        bring.bringing = true;
                        break;
                    }
                }
            }
        }
    }
}
