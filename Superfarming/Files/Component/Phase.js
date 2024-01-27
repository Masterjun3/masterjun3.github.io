import { Component } from "../Component.js";
import { Bring } from "./Bring.js";
import { Bringable } from "./Bringable.js";
import { Dig } from "./Dig.js";
import { Diggable } from "./Diggable.js";
import { Transform } from "./Transform.js";
export var Phases;
(function (Phases) {
    Phases[Phases["Idle"] = 0] = "Idle";
    Phases[Phases["Moving"] = 1] = "Moving";
    Phases[Phases["Digging"] = 2] = "Digging";
    Phases[Phases["Bringing"] = 3] = "Bringing";
})(Phases || (Phases = {}));
export class Phase extends Component {
    constructor() {
        super();
        this.phase = Phases.Idle;
    }
    Update() {
        if (this.phase == Phases.Idle) {
            let ourTransform = this.entity.GetComponent(Transform);
            let transforms = this.State.GetComponents(Transform);
            for (let theirTransform of transforms) {
                if (theirTransform.entity == this.entity) {
                    continue;
                }
                if (theirTransform.xpos == ourTransform.xpos && theirTransform.ypos == ourTransform.ypos) {
                    let bringable = theirTransform.entity.GetComponent(Bringable);
                    if (bringable) {
                        let bring = this.entity.GetComponent(Bring);
                        if (bring) {
                            this.phase = Phases.Bringing;
                            bring.bringingId = theirTransform.entity.id;
                            break;
                        }
                    }
                    let diggable = theirTransform.entity.GetComponent(Diggable);
                    if (diggable) {
                        let dig = this.entity.GetComponent(Dig);
                        if (dig) {
                            dig.StartDigging(this, theirTransform.entity.id, 30);
                            break;
                        }
                    }
                }
            }
            if (this.phase == Phases.Idle) {
                this.phase = Phases.Moving;
            }
        }
    }
}
