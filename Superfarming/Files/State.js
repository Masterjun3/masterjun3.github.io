import { InputState } from "./InputState.js";
import { SoundEffect } from "./SoundEffect.js";
export class State {
    constructor() {
        this.entities = [];
        this.history = [];
        this.inputHistory = [];
    }
    InitializeAudio(context) {
        this.audio_treasurespawns = [new SoundEffect(context, "Assets/treasurespawn_1.wav", 0.3), new SoundEffect(context, "Assets/treasurespawn_2.wav", 0.3), new SoundEffect(context, "Assets/treasurespawn_3.wav", 0.3)];
        this.audio_treasureget = new SoundEffect(context, "Assets/treasureget.wav", 0.02);
    }
    get CurrentFrame() {
        return this.history.length - 1;
    }
    get CurrentInput() {
        return this.inputHistory.length >= 1 ? this.inputHistory[this.inputHistory.length - 1] : new InputState();
    }
    get CurrentInputNewlyPressed() {
        return InputState.and(InputState.not(this.inputHistory.length >= 2 ? this.inputHistory[this.inputHistory.length - 2] : new InputState()), this.CurrentInput);
    }
    AddEntity(entity) {
        entity.state = this;
        this.entities.push(entity);
    }
    RemoveEntity(entity) {
        let index = this.entities.indexOf(entity);
        if (index != -1) {
            this.entities.splice(index, 1);
        }
    }
    GetEntity(id) {
        for (let entity of this.entities) {
            if (entity.id == id) {
                return entity;
            }
        }
        return undefined;
    }
    Update(input) {
        this.AddToInputHistory(input);
        this.entities.forEach(entity => {
            entity.components.forEach(component => {
                component.Update();
            });
        });
        this.AddToHistory();
    }
    AddToHistory() {
        let newEntry = [];
        for (let entity of this.entities) {
            newEntry.push({ [entity.constructor.name]: entity.Stringify() });
        }
        this.history.push(newEntry);
    }
    SetStateFromHistory(frame) {
        frame = frame | 0;
        if (frame < 0) {
            frame = 0;
        }
        if (frame >= this.history.length) {
            frame = this.history.length - 1;
        }
        this.entities = [];
        let frameEntities = this.history[frame];
        for (let entityString of frameEntities) {
            let entityClassString = Object.keys(entityString)[0];
            let entityClass = State.allEntities.find(value => value.prototype.constructor.name == entityClassString);
            if (entityClass) {
                let entity = new entityClass();
                entity.Assign(entityString[entityClassString], this);
                this.entities.push(entity);
            }
        }
        this.history.splice(frame + 1, this.history.length - (frame + 1));
        this.inputHistory.splice(frame, this.inputHistory.length - frame);
    }
    AddToInputHistory(input) {
        this.inputHistory.push(Object.assign({}, input));
    }
    GetComponents(constructor) {
        let components = new Array();
        for (let entity of this.entities) {
            let component = entity.GetComponent(constructor);
            if (component) {
                components.push(component);
            }
        }
        return components;
    }
    Stringify() {
        return JSON.stringify(this, (key, value) => {
            if (key == "entities") {
                let castValue = value;
                let newValue = [];
                castValue.forEach((element, index) => {
                    newValue.push({ [element.constructor.name]: element.Stringify() });
                });
                return newValue;
            }
            return value;
        });
    }
    Assign(json) {
        Object.assign(this, JSON.parse(json, (key, value) => {
            let entityClass = State.allEntities.find(value => value.prototype.constructor.name == key);
            if (entityClass) {
                let entity = new entityClass();
                entity.Assign(value, this);
                return entity;
            }
            if (key == "entities") {
                let entitiesNew = [];
                value.forEach((element, index) => {
                    entitiesNew[index] = element[Object.keys(element)[0]];
                });
                return entitiesNew;
            }
            return value;
        }));
    }
}
State.allEntities = [];
