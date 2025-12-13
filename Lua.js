const outEl = document.getElementById("out");
const code = document.getElementById("code");

var runCode = function() {}

function handleChange() {
  code.style.height = "auto";
  code.style.height = (25 + document.getElementById("code").scrollHeight) + "px";

  runCode();
}

console.log = (msg) => {
  outEl.innerHTML += he.encode(msg) + "\n"
}

var Module = {};

Module.onRuntimeInitialized = () => {
  const runLua = Module.cwrap(
    "run_lua",
    "number",
    ["string"]
  );

  runCode = function () {
    outEl.innerHTML = "";
    const errPtr = runLua(code.value);

    if (errPtr) {
      const err = UTF8ToString(errPtr);
      outEl.innerHTML = he.encode(err);
    }
  }
  runCode()
}
