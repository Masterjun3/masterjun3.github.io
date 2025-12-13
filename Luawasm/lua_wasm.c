#include <stdio.h>
#include <string.h>
#include "lua-5.4.8/src/lua.h"
#include "lua-5.4.8/src/lauxlib.h"
#include "lua-5.4.8/src/lualib.h"

static lua_State *L;

static int l_print(lua_State *L) {
    int n = lua_gettop(L);
    for (int i = 1; i <= n; i++) {
        const char *s = lua_tostring(L, i);
        if (s) printf("%s", s);
        if (i < n) printf("\t");
    }
    printf("\n");
    return 0;
}

const char *run_lua(const char *code) {
    static char error[512];

    if (!L) {
        L = luaL_newstate();
        luaL_openlibs(L);
        lua_pushcfunction(L, l_print);
        lua_setglobal(L, "print");
    }

    if (luaL_dostring(L, code) != LUA_OK) {
        snprintf(error, sizeof(error), "%s", lua_tostring(L, -1));
        lua_pop(L, 1);
        return error;
    }

    return NULL;
}
