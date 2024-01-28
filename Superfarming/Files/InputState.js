export class InputState {
    constructor() {
        this.click = false;
    }
    static not(input) {
        input = Object.assign({}, input);
        input.click = !input.click;
        return input;
    }
    static and(input1, input2) {
        input1 = Object.assign({}, input1);
        input1.click && (input1.click = input2.click);
        return input1;
    }
}
