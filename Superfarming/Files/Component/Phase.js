import { Component } from "../Component.js";
import { Bring } from "./Bring.js";
import { Bringable } from "./Bringable.js";
export var Phases;
(function (Phases) {
    Phases[Phases["Idle"] = 0] = "Idle";
    Phases[Phases["Digging"] = 1] = "Digging";
    Phases[Phases["Bringing"] = 2] = "Bringing";
})(Phases || (Phases = {}));
export class Phase extends Component {
    constructor() {
        super();
        this.phase = Phases.Idle;
    }
    Update() {
        if (this.phase == Phases.Idle) {
            let bring = this.entity.GetComponent(Bring);
            if (bring) {
                let bringables = this.State.GetComponents(Bringable);
                for (let bringable of bringables) {
                    if (!bringable.beingBrought) {
                        this.phase = Phases.Bringing;
                        return;
                    }
                }
            }
            this.phase = Phases.Digging;
        }
    }
}
