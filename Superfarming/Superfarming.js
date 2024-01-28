import { BringTowards } from "./Files/Component/BringTowards.js";
import { Clickbox, Spawntype } from "./Files/Component/Clickbox.js";
import { Texture } from "./Files/Component/Texture.js";
import { Transform } from "./Files/Component/Transform.js";
import { Spawnbox } from "./Files/Entity/Spawnbox.js";
import { InputState } from "./Files/InputState.js";
import { SoundEffect } from "./Files/SoundEffect.js";
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
        this.state.AddEntity(new Spawnbox(10, 100, 170, 50, Spawntype.Home));
        this.state.AddEntity(new Spawnbox(10, 160, 170, 50, Spawntype.Spot));
        this.state.AddEntity(new Spawnbox(10, 220, 170, 50, Spawntype.Farmer));
        this.state.AddToHistory();
        // addEventListener("keydown", (e) => this.updateInputKey(e, true));
        // addEventListener("keyup", (e) => this.updateInputKey(e, false));
        // this.canvas.addEventListener("touchstart", (e) => this.updateInputTouch(e));
        // this.canvas.addEventListener("touchend", (e) => this.updateInputTouch(e));
        // this.canvas.addEventListener("touchmove", (e) => this.updateInputTouch(e));
        this.canvas.addEventListener("mousedown", (e) => this.updateMouseDown(e));
        this.canvas.addEventListener("mouseup", (e) => this.updateMouseUp(e));
        this.canvas.addEventListener("mouseleave", (e) => this.updateMouseLeave(e));
        this.canvas.addEventListener("contextmenu", (e) => { e.preventDefault(); });
        this.canvas.addEventListener("touchstart", (e) => this.updateTouchStart(e));
        this.canvas.addEventListener("touchend", (e) => this.updateTouchEnd(e));
        this.redraw();
        this.maybeRedraw(window.performance.now());
    }
    assureAudioContext() {
        if (!this.audioContext) {
            this.audioContext = new window.AudioContext();
            this.audio_click = new SoundEffect(this.audioContext, "Assets/click.wav", 0.05);
            this.audio_declick = new SoundEffect(this.audioContext, "Assets/declick.wav", 0.05);
            this.state.InitializeAudio(this.audioContext);
        }
    }
    updateMouseLeave(e) {
        this.input.click = false;
    }
    updateMouseUp(e) {
        if (e.button == 0) {
            this.input.click = false;
            this.audio_declick.Play();
        }
    }
    updateMouseDown(e) {
        if (e.button == 0) {
            let rect = this.canvas.getBoundingClientRect();
            let canvasX = (e.clientX - rect.left) * (this.canvas.width / rect.width);
            let canvasY = (e.clientY - rect.top) * (this.canvas.height / rect.height);
            this.input.click = true;
            this.input.clickX = canvasX;
            this.input.clickY = canvasY;
            this.assureAudioContext();
            this.audio_click.Play();
        }
    }
    updateTouchStart(e) {
        e.preventDefault();
        if (e.touches.length == 1) {
            let rect = this.canvas.getBoundingClientRect();
            let canvasX = (e.touches[0].clientX - rect.left) * (this.canvas.width / rect.width);
            let canvasY = (e.touches[0].clientY - rect.top) * (this.canvas.height / rect.height);
            this.input.click = true;
            this.input.clickX = canvasX;
            this.input.clickY = canvasY;
            this.assureAudioContext();
            this.audio_click.Play();
        }
    }
    updateTouchEnd(e) {
        e.preventDefault();
        if (e.touches.length == 0) {
            this.input.click = false;
            this.audio_declick.Play();
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
        // this.context.fillText("Left-click: (H)ome", 10, 40);
        // this.context.fillText("Right-click: (S)pot for digging", 10, 60);
        // this.context.fillText("Middle-click: (F)armer", 10, 80);
        this.context.fillText("(T)reasure", 10, 80);
        let money = 0;
        for (let component of this.state.GetComponents(BringTowards)) {
            money += component.money;
        }
        this.context.font = "18px sans-serif";
        this.context.fillText(`Money: $${money}`, 10, 50);
        // for (let y = 0; y < 20; y++) {
        //     for (let x = 0; x < 20; x++) {
        //         this.context.fillText(String(x+y), 20+x*16, 20+y*16);
        //     }
        // }
        let xoff = 200;
        let yoff = 16;
        let scale = 29;
        this.context.fillStyle = "#000000";
        this.context.strokeStyle = "#000000";
        this.context.lineWidth = 1;
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
        for (let transform of this.state.GetComponents(Transform)) {
            let texture = transform.entity.GetComponent(Texture);
            if (texture) {
                this.context.font = "bold 36px monospace";
                let letter = (_a = texture.letter) !== null && _a !== void 0 ? _a : "?";
                if (letter == "F") {
                    this.context.fillStyle = "#008000";
                }
                else if (letter == "H") {
                    this.context.fillStyle = "#800000";
                }
                else if (letter == "T") {
                    this.context.fillStyle = "#808000";
                }
                else {
                    this.context.fillStyle = "#FFFFFF";
                }
                this.context.strokeStyle = "#000000";
                this.context.lineWidth = 4;
                this.context.strokeText(letter, (xoff + 4 + transform.xpos * scale) | 0, (yoff + 26 + transform.ypos * scale) | 0);
                this.context.fillText(letter, (xoff + 4 + transform.xpos * scale) | 0, (yoff + 26 + transform.ypos * scale) | 0);
                continue;
            }
            let clickbox = transform.entity.GetComponent(Clickbox);
            if (clickbox) {
                this.context.fillStyle = "#C0C0C0";
                this.context.strokeStyle = "#000000";
                this.context.lineWidth = 4;
                if (clickbox.active) {
                    this.context.lineWidth = 8;
                    this.context.fillStyle = "#FFFFFF";
                    this.context.strokeStyle = "#0000FF";
                }
                this.context.strokeRect(transform.xpos, transform.ypos, clickbox.width, clickbox.height);
                this.context.fillRect(transform.xpos, transform.ypos, clickbox.width, clickbox.height);
                this.context.font = "18px sans-serif";
                this.context.fillStyle = "#C0C0C0";
                this.context.strokeStyle = "#000000";
                this.context.lineWidth = 4;
                let text = clickbox.spawntype == Spawntype.Home ? "[H]ome"
                    : clickbox.spawntype == Spawntype.Spot ? "[S]pot for digging"
                        : clickbox.spawntype == Spawntype.Farmer ? "[F]armer" : "";
                this.context.strokeText(text, transform.xpos + 10, transform.ypos + 30);
                this.context.fillText(text, transform.xpos + 10, transform.ypos + 30);
                continue;
            }
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
