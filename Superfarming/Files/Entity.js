export class Entity {
    constructor() {
        this.components = [];
        this.id = Entity.nextId++;
    }
    AddComponent(component) {
        component.entity = this;
        this.components.push(component);
    }
    GetComponent(constructor) {
        for (let component of this.components) {
            if (component instanceof constructor) {
                return component;
            }
        }
        return undefined;
    }
    Stringify() {
        return JSON.stringify(this, (key, value) => {
            if (key == "state") {
                return;
            }
            if (key == "components") {
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
    Assign(json, state) {
        Object.assign(this, JSON.parse(json, (key, value) => {
            let componentClass = Entity.allComponents.find(value => value.prototype.constructor.name == key);
            if (componentClass) {
                let component = new componentClass();
                component.Assign(value, this);
                return component;
            }
            if (key == "components") {
                let componentsNew = [];
                value.forEach((element, index) => {
                    componentsNew[index] = element[Object.keys(element)[0]];
                });
                return componentsNew;
            }
            return value;
        }));
        this.state = state;
    }
}
Entity.nextId = 0;
Entity.allComponents = [];
