Prism.languages.sluab = {
    'slua-beta-comment': /--(.*SLua Beta.*)/,
    'comment': /^#!.+|--(?:\[(=*)\[[\s\S]*?\]\1\]|.*)/m,
    'html-string': {
        pattern: /\[(=+)\[\s*(<[\s\S]*?>)\s*\]\1\]/,
        greedy: true,
        alias: 'language-html',
        inside: {
            'rest': Prism.languages.markup
        }
    },
    'builtin-event-string': {
        pattern: /(LLEvents:(?:on|off|once|listeners)\()\s*(['"])(?:at_rot_target|at_target|attach|changed|collision|collision_end|collision_start|control|dataserver|email|experience_permissions|experience_permissions_denied|final_damage|game_control|http_request|http_response|land_collision|land_collision_end|land_collision_start|link_message|linkset_data|listen|money|moving_end|moving_start|no_sensor|not_at_rot_target|not_at_target|object_rez|on_damage|on_death|on_rez|path_update|remote_data|run_time_permissions|sensor|touch|touch_end|touch_start|transaction_result)\2/,
        lookbehind: true,
        alias: 'builtin'
    },
    'string': {
        pattern: /(["'])(?:(?!\1)[^\\\r\n]|\\z(?:\r\n|\s)|\\(?:\r\n|[^z]))*\1|\[(=*)\[[\s\S]*?\]\2\]/,
        greedy: true
    },
    'number': /\b0x[a-f\d]+(?:_[a-f\d]+)*(?:\.[a-f\d]*)?(?:p[+-]?\d+)?\b|\b0b[01]+(?:_[01]+)*\b|\b\d+(?:_\d+)*(?:\.\B|(?:\.\d*)?(?:e[+-]?\d+)?\b)|\B\.\d+(?:e[+-]?\d+)?\b/i,
    'keyword': /\b(?:and|break|do|else|elseif|end|false|for|function|if|in|local|nil|not|or|repeat|return|then|true|until|while)\b/,
    'continue': {
        pattern: /\bcontinue\b(?!\s*(\.|\[|:|{|=|"|'|,|\())/,
        alias: 'keyword'
    },
    'builtin-math': {
        pattern: /\bmath\.(?:abs|acos|asin|atan|atan2|ceil|clamp|cos|cosh|deg|exp|floor|fmod|frexp|ldexp|log|log10|max|min|modf|noise|pow|rad|random|randomseed|round|sign|sin|sinh|sqrt|tan|tanh)\b(?=\s*(?:[({]))/,
        alias: 'builtin'
    },
    'builtin-math-constant': {
        pattern: /\bmath\.(?:pi|huge)\b/,
        alias: 'builtin'
    },
    'builtin-table': {
        pattern: /\btable\.(?:clear|clone|concat|create|find|foreach|foreachi|freeze|getn|insert|isfrozen|maxn|move|pack|remove|sort|unpack)\b(?=\s*(?:[({]))/,
        alias: 'builtin'
    },
    'builtin-string': {
        pattern: /\bstring\.(?:byte|char|find|format|gmatch|gsub|len|lower|match|pack|packsize|rep|reverse|split|sub|unpack|upper)\b(?=\s*(?:[({]))/,
        alias: 'builtin'
    },
    'builtin-coroutine': {
        pattern: /\bcoroutine\.(?:close|create|isyieldable|resume|running|status|wrap|yield)\b(?=\s*(?:[({]))/,
        alias: 'builtin'
    },
    'builtin-bit32': {
        pattern: /\bbit32\.(?:arshift|band|bnot|bor|btest|bxor|byteswap|countlz|countrz|extract|lrotate|lshift|replace|rrotate|rshift)\b(?=\s*(?:[({]))/,
        alias: 'builtin'
    },
    'builtin-utf8': {
        pattern: /\butf8\.(?:char|codepoint|codes|len|offset)\b(?=\s*(?:[({]))/,
        alias: 'builtin'
    },
    'builtin-os': {
        pattern: /\bos\.(?:clock|date|difftime|time)\b(?=\s*(?:[({]))/,
        alias: 'builtin'
    },
    'builtin-debug': {
        pattern: /\bdebug\.(?:info|traceback)\b(?=\s*(?:[({]))/,
        alias: 'builtin'
    },
    'builtin-buffer': {
        pattern: /\bbuffer\.(?:copy|create|fill|fromstring|len|readf32|readf64|readi16|readi32|readi8|readstring|readu16|readu32|readu8|tostring|writef32|writef64|writei16|writei32|writei8|writestring|writeu16|writeu32|writeu8)\b(?=\s*(?:[({]))/,
        alias: 'builtin'
    },
    'builtin-vector': {
        pattern: /\bvector\.(?:abs|angle|ceil|clamp|create|cross|dot|floor|magnitude|max|min|normalize|sign)\b(?=\s*(?:[({]))/,
        alias: 'builtin'
    },
    'builtin-vector-constant': {
        pattern: /\bvector\.(?:one|zero)\b/,
        alias: 'builtin'
    },
    'builtin-ll': {
         pattern: /\bll\.\w+(?=\s*(?:[({]))/,
        alias: 'builtin'
    },
    'builtin-llbase64': {
        pattern: /\bllbase64\.(?:decode|encode)\b(?=\s*(?:[({]))/,
        alias: 'builtin'
    },
    'builtin-lljson': {
        pattern: /\blljson\.(?:decode|encode)\b(?=\s*(?:[({]))/,
        alias: 'builtin'
    },
    'builtin-llevents': {
        pattern: /LLEvents:(?:on|once|off|eventNames|listeners)\b/,
        alias: 'builtin'
    },
    'builtin-llevents-alternative': {
        pattern: /LLEvents\.(?:at_rot_target|at_target|attach|changed|collision|collision_end|collision_start|control|dataserver|email|experience_permissions|experience_permissions_denied|final_damage|game_control|http_request|http_response|land_collision|land_collision_end|land_collision_start|link_message|linkset_data|listen|money|moving_end|moving_start|no_sensor|not_at_rot_target|not_at_target|object_rez|on_damage|on_death|on_rez|path_update|remote_data|run_time_permissions|sensor|touch|touch_end|touch_start|transaction_result)\b/,
        alias: 'builtin'
    },
    'builtin-lltimers': {
        pattern: /LLTimers:(?:on|once|off)\b/,
        alias: 'builtin'
    },
    'builtin-get': {
        pattern: /(:)(Get(?:Damage|Grab|Group|Key|LinkNumber|Name|Owner|Pos|Rezzer|Rot|TouchBinormal|TouchFace|TouchNormal|TouchPos|TouchST|TouchUV|Type|Vel))(?=\(\))/,
        lookbehind: true,
        alias: 'builtin'
    },
    'builtin-standalone': {
        pattern: /\b(?:assert|error|gcinfo|getmetatable|ipairs|newproxy|next|pairs|pcall|print|rawequal|rawget|rawlen|rawset|select|setmetatable|tonumber|tostring|type|typeof|unpack|xpcall|integer|quaternion|rotation|toquaternion|torotation|tovector|uuid|vector)\b(?=\s*(?:[({]))/,
        alias: 'builtin'
    },
    'builtin-libraries': {
        pattern: /\b(?:bit32|buffer|coroutine|debug|os|string|table|utf8|vector|ll|llbase64|llcompat|llevents|lljson|lltimers)\b/,
        alias: 'builtin'
    },
    'builtin-metamethods': {
        pattern: /\b__(?:add|call|concat|div|eq|idiv|index|iter|len|le|lt|metatable|mode|mod|mul|newindex|pow|sub|tostring|unm|tojson)\b/,
        alias: 'builtin'
    },
    'function': /(?!\d)\w+(?=\s*(?:[({]))/,
    'constant': /\b[A-Z_][A-Z0-9_]*\b/,
    'variable': /\b[a-zA-Z_]\w*\b/,
    'operator': [
        /[-+*%^&|#]|\/\/?|<[<=]?|>[>=]?|[=~]=?/,
        {
            // Match ".." but don't break "..."
            pattern: /(^|[^.])\.\.(?!\.)/,
            lookbehind: true
        }
    ],
    'punctuation': /[\[\](){},;]|\.+|:+/
};
Prism.languages.insertBefore('sluab', 'string', {
    'template-string': {
        pattern: /`[^\\`{\r\n}]*(?:(?:\\.|{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+})[^\\`{\r\n}]*)*`/,
        greedy: true,
        inside: {
            'template-punctuation': {
                pattern: /^`|`$/,
                alias: 'string'
            },
            'interpolation': {
                pattern: /\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
                inside: {
                   'interpolation-punctuation': {
                        pattern: /^\{|\}$/,
                        alias: 'punctuation'
                    },
                    rest: Prism.languages.sluab
                }
            },
            'escape': {
                pattern: /\\./,
                alias: 'string'
            },
            'string': /[\s\S]+/
        }
    },
});
