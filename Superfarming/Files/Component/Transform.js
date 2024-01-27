import { Component } from "../Component.js";
export class Transform extends Component {
    constructor(xpos, ypos) {
        super();
        this.xpos = xpos;
        this.ypos = ypos;
    }
    distanceFrom(transform) {
        return Math.hypot(this.xpos - transform.xpos, this.ypos - transform.ypos);
    }
}
