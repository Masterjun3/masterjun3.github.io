import { Component } from "../Component.js";
import { Speed } from "./Speed.js";
export class Jump extends Component {
    constructor() {
        super(...arguments);
        this.canJump = false;
    }
    Update() {
        var _a;
        if (this.canJump && this.State.CurrentInputNewlyPressed.jump) {
            let speed = (_a = this.entity) === null || _a === void 0 ? void 0 : _a.GetComponent(Speed);
            if (speed) {
                speed.yvel = -0x600;
            }
        }
    }
}
