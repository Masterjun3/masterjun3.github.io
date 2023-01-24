import { Component } from "../Component.js";
import { Speed } from "./Speed.js";
export class Gravity extends Component {
    Update() {
        var _a;
        let speed = (_a = this.entity) === null || _a === void 0 ? void 0 : _a.GetComponent(Speed);
        if (speed) {
            speed.yvel += 0x30;
            if (speed.yvel > 0x460) {
                speed.yvel = 0x460;
            }
        }
    }
}
