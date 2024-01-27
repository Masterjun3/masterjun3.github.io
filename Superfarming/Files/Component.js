export class Component {
    get State() { return this.entity.state; }
    Update() { }
    Stringify() {
        return JSON.stringify(this, (key, value) => {
            if (key == "entity") {
                return;
            }
            return value;
        });
    }
    Assign(json, entity) {
        Object.assign(this, JSON.parse(json));
        this.entity = entity;
    }
}
