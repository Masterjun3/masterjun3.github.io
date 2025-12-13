#!/bin/bash
emcc $(ls lua-5.4.8/src/*.c | grep -vE 'lua\.c|luac\.c') lua_wasm.c -Os -s EXPORTED_FUNCTIONS='["_run_lua"]' -s EXPORTED_RUNTIME_METHODS='["cwrap","
UTF8ToString"]' -o Luawasm.js