import { Component } from "../Component.js";
import { Diggable } from "./Diggable.js";
import { Phase, Phases } from "./Phase.js";
import { Transform } from "./Transform.js";
export class Dig extends Component {
    constructor() {
        super();
        this.diggingFrames = 0;
    }
    Update() {
        let phase = this.entity.GetComponent(Phase);
        if (phase.phase == Phases.Digging) {
            if (this.diggingFrames == 0) {
                let allGoals = this.State.GetComponents(Diggable);
                if (allGoals.length > 0) {
                    let ourTransform = this.entity.GetComponent(Transform);
                    let closestTransform;
                    let closestDistance;
                    for (let goal of allGoals) {
                        let theirTransform = goal.entity.GetComponent(Transform);
                        let distance = theirTransform.distanceFrom(ourTransform);
                        if (closestDistance == undefined || distance < closestDistance) {
                            closestTransform = theirTransform;
                            closestDistance = distance;
                        }
                    }
                    if (closestTransform) {
                        let speed = 0.2;
                        if (closestDistance > speed) {
                            ourTransform.xpos += ((closestTransform.xpos - ourTransform.xpos) / closestDistance) * speed;
                            ourTransform.ypos += ((closestTransform.ypos - ourTransform.ypos) / closestDistance) * speed;
                        }
                        else {
                            ourTransform.xpos = closestTransform.xpos;
                            ourTransform.ypos = closestTransform.ypos;
                            this.diggingId = closestTransform.entity.id;
                            this.diggingFrames = 30;
                            closestTransform.entity.GetComponent(Diggable).digcount += 1;
                        }
                    }
                }
                else {
                    phase.phase = Phases.Idle;
                }
            }
            else {
                this.diggingFrames -= 1;
                if (this.diggingFrames == 0) {
                    phase.phase = Phases.Idle;
                    this.State.GetEntity(this.diggingId).GetComponent(Diggable).digcount -= 1;
                }
            }
        }
    }
}
