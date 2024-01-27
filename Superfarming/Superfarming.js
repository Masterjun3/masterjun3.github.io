import { Texture } from "./Files/Component/Texture.js";
import { Transform } from "./Files/Component/Transform.js";
import { Farmer } from "./Files/Entity/Farmer.js";
import { Home } from "./Files/Entity/Home.js";
import { Spot } from "./Files/Entity/Spot.js";
import { InputState } from "./Files/InputState.js";
import { State } from "./Files/State.js";
class PianoRoll {
    constructor() {
        this.imgs = {};
        this.aimedTimeDelta = 1000 / 60;
        this.lastTime = window.performance.now();
        this.state = new State();
        this.input = new InputState();
        this.rewind = false;
        // this.imgs["player"] = document.getElementById("player");
        // this.imgs["obstacle"] = document.getElementById("obstacle");
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext("2d");
        this.context.imageSmoothingEnabled = false;
        //this.state.AddEntity(new Farmer(0x2000, 0x5000));
        //this.state.AddEntity(new Home(10, 7));
        //this.state.AddEntity(new Spot(5, 5));
        for (let i = 0; i < 2; i++) {
            //this.state.AddEntity(new Farmer(Math.random()*0x10, Math.random()*0x10));
        }
        // for (let i = 0; i<10; i++) {
        //     this.state.AddEntity(new Spot(Math.random()*0x10000, Math.random()*0x10000));
        // }
        this.state.AddToHistory();
        // addEventListener("keydown", (e) => this.updateInputKey(e, true));
        // addEventListener("keyup", (e) => this.updateInputKey(e, false));
        // this.canvas.addEventListener("touchstart", (e) => this.updateInputTouch(e));
        // this.canvas.addEventListener("touchend", (e) => this.updateInputTouch(e));
        // this.canvas.addEventListener("touchmove", (e) => this.updateInputTouch(e));
        this.canvas.addEventListener("mousedown", (e) => this.updateMouseDown(e));
        this.canvas.addEventListener("contextmenu", (e) => { e.preventDefault(); });
        this.redraw();
        this.maybeRedraw(window.performance.now());
    }
    updateMouseDown(e) {
        let rect = this.canvas.getBoundingClientRect();
        let xoff = 200;
        let yoff = 16;
        let scale = 29;
        let gridX = Math.floor((e.clientX - rect.left - xoff) / scale);
        let gridY = Math.floor((e.clientY - rect.top - yoff) / scale);
        if (gridX >= 0 && gridX < 0x10 && gridY >= 0 && gridY < 0x10) {
            for (let transform of this.state.GetComponents(Transform)) {
                if (transform.xpos == gridX && transform.ypos == gridY) {
                    return;
                }
            }
            if (e.button == 0) {
                this.state.AddEntity(new Home(gridX, gridY));
            }
            else if (e.button == 2) {
                this.state.AddEntity(new Spot(gridX, gridY));
            }
            else if (e.button == 1) {
                this.state.AddEntity(new Farmer(gridX, gridY));
            }
        }
    }
    // private updateInputKey(e: KeyboardEvent, state: boolean) {
    //     e.preventDefault();
    //     if (e.code == "ArrowLeft") {
    //         this.input.left = state;
    //     } else if (e.code == "ArrowRight") {
    //         this.input.right = state;
    //     } else if (e.code == "Space") {
    //         this.input.jump = state;
    //     } else if (e.code == "KeyH") {
    //         this.input.action = state;
    //     } else if (e.code == "KeyY") {
    //         this.rewind = state;
    //     }
    // }
    // private updateInputTouch(e: TouchEvent) {
    //     e.preventDefault();
    //     this.input.left = false;
    //     this.input.right = false;
    //     this.input.jump = false;
    //     this.input.action = false;
    //     this.rewind = false;
    //     for (let touch of e.touches) {
    //         let rect = this.canvas.getBoundingClientRect();
    //         let x = (touch.clientX - rect.left) / rect.width;
    //         let y = (touch.clientY - rect.top) / rect.height;
    //         if (x < (1 / 3)) {
    //             this.input.left = true;
    //             continue;
    //         }
    //         if (x > (2 / 3)) {
    //             this.input.right = true;
    //             continue;
    //         }
    //         if (y < (1 / 3)) {
    //             this.input.jump = true;
    //             continue;
    //         }
    //         if (y > (2 / 3)) {
    //             this.rewind = true;
    //             continue;
    //         }
    //     }
    // }
    maybeRedraw(time) {
        window.requestAnimationFrame((time) => this.maybeRedraw(time));
        let timeDelta = time - this.lastTime;
        if (this.aimedTimeDelta <= timeDelta) {
            this.lastTime = time - (timeDelta % this.aimedTimeDelta);
            if (this.rewind) {
                this.state.SetStateFromHistory(this.state.CurrentFrame - 2);
            }
            else {
                this.state.Update(this.input);
            }
            this.redraw();
        }
    }
    redraw() {
        var _a;
        this.context.fillStyle = "#6495ED";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.font = "18px sans-serif";
        this.context.fillStyle = "#000000";
        //this.context.fillText(String(this.state.CurrentFrame), 10, 20);
        this.context.font = "14px sans-serif";
        this.context.fillText("Left-click: (H)ome", 10, 40);
        this.context.fillText("Right-click: (S)pot for digging", 10, 60);
        this.context.fillText("Middle-click: (F)armer", 10, 80);
        this.context.fillText("(T)reasure", 10, 110);
        // for (let y = 0; y < 20; y++) {
        //     for (let x = 0; x < 20; x++) {
        //         this.context.fillText(String(x+y), 20+x*16, 20+y*16);
        //     }
        // }
        let xoff = 200;
        let yoff = 16;
        let scale = 29;
        this.context.fillStyle = "#000000";
        this.context.beginPath();
        for (let y = 0; y <= 0x10; y++) {
            this.context.moveTo(xoff, yoff + y * scale);
            this.context.lineTo(xoff + 0x10 * scale, yoff + y * scale);
        }
        for (let x = 0; x <= 0x10; x++) {
            this.context.moveTo(xoff + x * scale, yoff);
            this.context.lineTo(xoff + x * scale, yoff + 0x10 * scale);
        }
        this.context.stroke();
        this.context.font = "bold 36px monospace";
        for (let entity of this.state.entities) {
            let transform = entity.GetComponent(Transform);
            if (!transform) {
                continue;
            }
            let texture = entity.GetComponent(Texture);
            let letter = (_a = texture === null || texture === void 0 ? void 0 : texture.letter) !== null && _a !== void 0 ? _a : "?";
            this.context.fillText(letter, (xoff + 4 + transform.xpos * scale) | 0, (yoff + 26 + transform.ypos * scale) | 0);
            // let hitbox = entity.GetComponent(Hitbox);
            // if (hitbox) {
            //     this.context.drawImage(
            //         this.imgs[textureId],
            //         (transform.xpos >> 7) | 0,
            //         (transform.ypos >> 7) | 0,
            //         (hitbox.width >> 7) | 0,
            //         (hitbox.height >> 7) | 0);
            // }
        }
        // this.context.fillStyle = "#000000";
        // const count = 63;
        // for (let i = 0; i < count; i++) {
        //     let index = this.state.inputHistory.length - (count - i);
        //     if (index < 0) {
        //         continue;
        //     }
        //     let input = this.state.inputHistory[index];
        //     let add = this.state.inputHistory.length - count;
        //     if (add > 0) {
        //         add = 0;
        //     }
        //     let xoff = 500;
        //     let yoff = (i+add)*8 + 8;
        //     this.context.fillText(`${index + 1}`, xoff, yoff);
        //     this.context.fillText(`Left: ${input.left}, Right: ${input.right}, Jump: ${input.jump}, Action: ${input.action}`, xoff + 30, yoff);
        // }
    }
}
window.onload = () => new PianoRoll();
