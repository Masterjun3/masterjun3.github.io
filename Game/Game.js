import { Hitbox } from "./FullGame/Component/Hitbox.js";
import { Texture } from "./FullGame/Component/Texture.js";
import { Transform } from "./FullGame/Component/Transform.js";
import { Block } from "./FullGame/Entity/Block.js";
import { Player } from "./FullGame/Entity/Player.js";
import { InputState } from "./FullGame/InputState.js";
import { State } from "./FullGame/State.js";
class PianoRoll {
    constructor() {
        this.imgs = {};
        this.aimedTimeDelta = 1000 / 60;
        this.lastTime = window.performance.now();
        this.state = new State();
        this.input = new InputState();
        this.rewind = false;
        this.imgs["player"] = document.getElementById("player");
        this.imgs["obstacle"] = document.getElementById("obstacle");
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext("2d");
        this.context.imageSmoothingEnabled = false;
        this.state.AddEntity(new Block(0x1000, 0x1000, 0x1000, 0x6000));
        this.state.AddEntity(new Block(0x1000, 0x7000, 0x1000, 0x6000));
        this.state.AddEntity(new Block(0x2000, 0xC000, 0x4000, 0x1000));
        this.state.AddEntity(new Block(0x6000, 0xC000, 0x4000, 0x1000));
        this.state.AddEntity(new Block(0xA000, 0xC000, 0x4000, 0x1000));
        this.state.AddEntity(new Block(0xE000, 0x1000, 0x1000, 0x6000));
        this.state.AddEntity(new Block(0xE000, 0x7000, 0x1000, 0x6000));
        this.state.AddEntity(new Block(0x5000, 0x5000, 0x2000, 0x2000));
        this.state.AddEntity(new Block(0x9000, 0x8000, 0x1000, 0x1000));
        this.state.AddEntity(new Player(0x2000, 0x8000));
        this.state.AddToHistory();
        addEventListener("keydown", (e) => this.updateInputKey(e, true));
        addEventListener("keyup", (e) => this.updateInputKey(e, false));
        this.canvas.addEventListener("touchstart", (e) => this.updateInputTouch(e));
        this.canvas.addEventListener("touchend", (e) => this.updateInputTouch(e));
        this.canvas.addEventListener("touchmove", (e) => this.updateInputTouch(e));
        this.redraw();
        this.maybeRedraw(window.performance.now());
    }
    updateInputKey(e, state) {
        e.preventDefault();
        if (e.code == "ArrowLeft") {
            this.input.left = state;
        }
        else if (e.code == "ArrowRight") {
            this.input.right = state;
        }
        else if (e.code == "Space") {
            this.input.jump = state;
        }
        else if (e.code == "KeyH") {
            this.input.action = state;
        }
        else if (e.code == "KeyY") {
            this.rewind = state;
        }
    }
    updateInputTouch(e) {
        e.preventDefault();
        this.input.left = false;
        this.input.right = false;
        this.input.jump = false;
        this.input.action = false;
        this.rewind = false;
        for (let touch of e.touches) {
            console.log(touch.clientX);
            let x = touch.clientX / this.canvas.getBoundingClientRect().width;
            let y = touch.clientY / this.canvas.getBoundingClientRect().height;
            if (x < (1 / 3)) {
                this.input.left = true;
                continue;
            }
            if (x > (2 / 3)) {
                this.input.right = true;
                continue;
            }
            if (y < (1 / 3)) {
                this.input.jump = true;
                continue;
            }
            if (y > (2 / 3)) {
                this.rewind = true;
                continue;
            }
        }
    }
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
        for (let entity of this.state.entities) {
            let transform = entity.GetComponent(Transform);
            if (!transform) {
                continue;
            }
            let texture = entity.GetComponent(Texture);
            let textureId = (_a = texture === null || texture === void 0 ? void 0 : texture.textureId) !== null && _a !== void 0 ? _a : "obstacle";
            let hitbox = entity.GetComponent(Hitbox);
            if (hitbox) {
                this.context.drawImage(this.imgs[textureId], (transform.xpos >> 7) | 0, (transform.ypos >> 7) | 0, (hitbox.width >> 7) | 0, (hitbox.height >> 7) | 0);
            }
        }
        this.context.fillStyle = "#000000";
        const count = 63;
        for (let i = 0; i < count; i++) {
            let index = this.state.inputHistory.length - (count - i);
            if (index < 0) {
                continue;
            }
            let input = this.state.inputHistory[index];
            let add = this.state.inputHistory.length - count;
            if (add > 0) {
                add = 0;
            }
            let xoff = 500;
            let yoff = (i + add) * 8 + 8;
            this.context.fillText(`${index + 1}`, xoff, yoff);
            this.context.fillText(`Left: ${input.left}, Right: ${input.right}, Jump: ${input.jump}, Action: ${input.action}`, xoff + 30, yoff);
        }
    }
}
window.onload = () => new PianoRoll();
