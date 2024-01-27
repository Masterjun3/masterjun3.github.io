export class InputState {
    constructor() {
        this.left = false;
        this.right = false;
        this.jump = false;
        this.action = false;
    }
    static not(input) {
        input = Object.assign({}, input);
        input.left = !input.left;
        input.right = !input.right;
        input.jump = !input.jump;
        input.action = !input.action;
        return input;
    }
    static and(input1, input2) {
        input1 = Object.assign({}, input1);
        input1.left && (input1.left = input2.left);
        input1.right && (input1.right = input2.right);
        input1.jump && (input1.jump = input2.jump);
        input1.action && (input1.action = input2.action);
        return input1;
    }
}
