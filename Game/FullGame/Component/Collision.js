import { Component } from "../Component.js";
import { Direction } from "../Direction.js";
import { Hitbox } from "./Hitboxx.js";
import { Jump } from "./Jump.js";
import { Speed } from "./Speed.js";
import { Transform } from "./Transform.js";
export class Collision extends Component {
    constructor(relxpos, relypos, width, height, direction) {
        super();
        this.relxpos = relxpos;
        this.relypos = relypos;
        this.width = width;
        this.height = height;
        this.direction = direction;
    }
    Update() {
        var _a, _b, _c, _d;
        let ourSpeed = (_a = this.entity) === null || _a === void 0 ? void 0 : _a.GetComponent(Speed);
        let canJump = false;
        if (this.DirectionMatches(this.direction, ourSpeed)) {
            let ourTransform = (_b = this.entity) === null || _b === void 0 ? void 0 : _b.GetComponent(Transform);
            for (let theirHitbox of this.State.GetComponents(Hitbox)) {
                if (theirHitbox.entity !== this.entity) {
                    let theirTransform = (_c = theirHitbox.entity) === null || _c === void 0 ? void 0 : _c.GetComponent(Transform);
                    if (this.Intersect(ourTransform.xpos + this.relxpos, ourTransform.xpos + this.relxpos + this.width, ourTransform.ypos + this.relypos, ourTransform.ypos + this.relypos + this.height, theirTransform.xpos, theirTransform.xpos + theirHitbox.width, theirTransform.ypos, theirTransform.ypos + theirHitbox.height)) {
                        switch (this.direction) {
                            case Direction.Left:
                                ourSpeed.xvel = 0;
                                ourTransform.xpos += 0x100;
                                break;
                            case Direction.Right:
                                ourSpeed.xvel = 0;
                                ourTransform.xpos -= 0x100;
                                break;
                            case Direction.Up:
                                ourSpeed.yvel = 0;
                                ourTransform.ypos = theirTransform.ypos + theirHitbox.height - this.relypos;
                                break;
                            case Direction.Down:
                                ourSpeed.yvel = 0;
                                ourTransform.ypos = theirTransform.ypos - (this.relypos + this.height);
                                if (!this.State.CurrentInput.left && !this.State.CurrentInput.right) {
                                    if (-0x10 <= ourSpeed.xvel && ourSpeed.xvel <= 0x10) {
                                        ourSpeed.xvel = 0;
                                    }
                                    else if (ourSpeed.xvel < 0) {
                                        ourSpeed.xvel += 0x10;
                                    }
                                    else if (ourSpeed.xvel > 0) {
                                        ourSpeed.xvel -= 0x10;
                                    }
                                }
                                canJump = true;
                                break;
                        }
                    }
                }
            }
        }
        if (this.direction == Direction.Down) {
            let jump = (_d = this.entity) === null || _d === void 0 ? void 0 : _d.GetComponent(Jump);
            if (jump) {
                jump.canJump = canJump;
            }
        }
    }
    DirectionMatches(direction, speed) {
        switch (direction) {
            case Direction.Left:
                return speed.xvel <= 0;
            case Direction.Right:
                return speed.xvel >= 0;
            case Direction.Up:
                return speed.yvel <= 0;
            case Direction.Down:
                return speed.yvel >= 0;
        }
    }
    Intersect(left1, right1, top1, bottom1, left2, right2, top2, bottom2) {
        return !(left2 >= right1 ||
            right2 <= left1 ||
            top2 >= bottom1 ||
            bottom2 <= top1);
    }
}
