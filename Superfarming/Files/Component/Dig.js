import { Component } from "../Component.js";
import { Diggable } from "./Diggable.js";
import { Phase, Phases } from "./Phase.js";
export class Dig extends Component {
    constructor() {
        super();
    }
    Update() {
        let phase = this.entity.GetComponent(Phase);
        if (phase.phase == Phases.Digging) {
            this.diggingFrames -= 1;
            if (this.diggingFrames == 0) {
                this.StopDigging(phase);
            }
        }
    }
    StartDigging(phase, diggingId, diggingFrames) {
        phase.phase = Phases.Digging;
        this.diggingId = diggingId;
        this.diggingFrames = diggingFrames;
        this.State.GetEntity(this.diggingId).GetComponent(Diggable).digcount += 1;
    }
    StopDigging(phase) {
        phase.phase = Phases.Bringing;
        this.State.GetEntity(this.diggingId).GetComponent(Diggable).digcount -= 1;
    }
}
