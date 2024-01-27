import { Component } from "../Component.js";
import { BringTowards } from "./BringTowards.js";
import { Bringable } from "./Bringable.js";
import { Phase, Phases } from "./Phase.js";
import { Transform } from "./Transform.js";
export class Bring extends Component {
    constructor() {
        super();
    }
    Update() {
        let phase = this.entity.GetComponent(Phase);
        if (phase.phase == Phases.Bringing) {
            let allGoals;
            let carrying = this.bringingId != undefined;
            if (carrying) {
                allGoals = this.State.GetComponents(BringTowards);
            }
            else {
                allGoals = this.State.GetComponents(Bringable).filter((bringable) => !bringable.beingBrought);
            }
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
                    let bringingEntity;
                    let bringingTransform;
                    if (carrying) {
                        bringingEntity = this.State.GetEntity(this.bringingId);
                        bringingTransform = bringingEntity.GetComponent(Transform);
                    }
                    let speed = 0.2;
                    if (carrying) {
                        speed = speed / 2;
                    }
                    if (closestDistance > speed) {
                        ourTransform.xpos += ((closestTransform.xpos - ourTransform.xpos) / closestDistance) * speed;
                        ourTransform.ypos += ((closestTransform.ypos - ourTransform.ypos) / closestDistance) * speed;
                        if (carrying) {
                            bringingTransform.xpos = ourTransform.xpos;
                            bringingTransform.ypos = ourTransform.ypos;
                        }
                    }
                    else {
                        ourTransform.xpos = closestTransform.xpos;
                        ourTransform.ypos = closestTransform.ypos;
                        if (carrying) {
                            this.bringingId = undefined;
                            this.State.RemoveEntity(bringingEntity);
                            if (this.State.GetComponents(Bringable).filter((bringable) => !bringable.beingBrought).length == 0) {
                                phase.phase = Phases.Idle;
                            }
                        }
                        else {
                            this.bringingId = closestTransform.entity.id;
                            closestTransform.entity.GetComponent(Bringable).beingBrought = true;
                        }
                    }
                }
            }
            else {
                phase.phase = Phases.Idle;
            }
        }
    }
}
