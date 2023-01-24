import { Component } from "../Component.js";
import { Speed } from "./Speed.js";
export class Input extends Component {
    Update() {
        var _a;
        let speed = (_a = this.entity) === null || _a === void 0 ? void 0 : _a.GetComponent(Speed);
        if (!speed) {
            return;
        }
        if (!this.State.CurrentInput.jump) {
            speed.yvel += 0x30;
        }
        if (this.State.CurrentInput.right) {
            if (speed.xvel < 0) {
                speed.xvel += 0x50;
            }
            else {
                speed.xvel += 0x18;
            }
            if (speed.xvel > 0x300) {
                speed.xvel = 0x300;
            }
        }
        else if (this.State.CurrentInput.left) {
            if (speed.xvel > 0) {
                speed.xvel -= 0x50;
            }
            else {
                speed.xvel -= 0x18;
            }
            if (speed.xvel < -0x300) {
                speed.xvel = -0x300;
            }
        }
    }
}
