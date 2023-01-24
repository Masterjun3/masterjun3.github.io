import { Component } from "../Component.js";
import { Transform } from "./Transform.js";
export class Speed extends Component {
    constructor(xvel, yvel) {
        super();
        this.xvel = xvel;
        this.yvel = yvel;
    }
    Update() {
        var _a;
        let transform = (_a = this.entity) === null || _a === void 0 ? void 0 : _a.GetComponent(Transform);
        if (transform) {
            transform.xpos += this.xvel;
            transform.ypos += this.yvel;
        }
    }
}
