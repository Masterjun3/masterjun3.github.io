import { Component } from "../Component.js";
import { Farmer } from "../Entity/Farmer.js";
import { Home } from "../Entity/Home.js";
import { Spot } from "../Entity/Spot.js";
import { Transform } from "./Transform.js";
export var Spawntype;
(function (Spawntype) {
    Spawntype[Spawntype["Home"] = 0] = "Home";
    Spawntype[Spawntype["Spot"] = 1] = "Spot";
    Spawntype[Spawntype["Farmer"] = 2] = "Farmer";
})(Spawntype || (Spawntype = {}));
export class Clickbox extends Component {
    constructor(width, height, spawntype, costMultiplier) {
        super();
        this.costMax = 50;
        this.width = width;
        this.height = height;
        this.active = false;
        this.spawntype = spawntype;
        this.costMultiplier = costMultiplier;
        this._cost = 0;
    }
    get cost() {
        return Math.floor(this._cost);
    }
    get canSpawn() {
        return this.State.availableMoney >= this.cost;
    }
    Update() {
        if (this.State.CurrentInputNewlyPressed.click) {
            let clickX = this.State.CurrentInput.clickX;
            let clickY = this.State.CurrentInput.clickY;
            let transform = this.entity.GetComponent(Transform);
            if (transform.xpos <= clickX && clickX < transform.xpos + this.width
                && transform.ypos <= clickY && clickY < transform.ypos + this.height) {
                if (this.active) {
                    this.active = false;
                }
                else {
                    this.State.GetComponents(Clickbox).forEach(clickbox => { clickbox.active = false; });
                    this.active = true;
                }
            }
            else if (this.active && this.canSpawn) {
                let xoff = 240;
                let yoff = 16;
                let scale = 29;
                let gridX = Math.floor((clickX - xoff) / scale);
                let gridY = Math.floor((clickY - yoff) / scale);
                if (gridX >= 0 && gridX < 0x10 && gridY >= 0 && gridY < 0x10) {
                    for (let transform of this.State.GetComponents(Transform)) {
                        if (transform.xpos == gridX && transform.ypos == gridY) {
                            return;
                        }
                    }
                    if (this.spawntype == Spawntype.Home) {
                        this.State.AddEntity(new Home(gridX, gridY));
                    }
                    else if (this.spawntype == Spawntype.Spot) {
                        this.State.AddEntity(new Spot(gridX, gridY));
                    }
                    else if (this.spawntype == Spawntype.Farmer) {
                        this.State.AddEntity(new Farmer(gridX, gridY));
                    }
                    this.State.spentMoney += this.cost;
                    if (this._cost == 0) {
                        this._cost = 5;
                    }
                    else {
                        this._cost *= this.costMultiplier;
                    }
                    if (this._cost > this.costMax) {
                        this._cost = this.costMax;
                    }
                }
            }
        }
    }
}
