import { Component } from "../Component.js";
import { MoveTowards } from "./MoveTowards.js";
import { Phase, Phases } from "./Phase.js";
import { Transform } from "./Transform.js";
export class Move extends Component {
    Update() {
        let phase = this.entity.GetComponent(Phase);
        if (phase.phase == Phases.Moving) {
            let allGoals = this.State.GetComponents(MoveTowards);
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
                        phase.phase = Phases.Idle;
                    }
                }
            }
        }
    }
}
