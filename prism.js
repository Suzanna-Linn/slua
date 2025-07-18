Prism.languages.luau = (function(Prism) {
  var OPENING_LONG_BRACKET = /\[=*\[/;
  var CLOSING_LONG_BRACKET = /\]=*\]/;
  var INTERPOLATION_OPEN = /`\{/;
  var INTERPOLATION_CLOSE = /\}`/;

  // Long brackets
  var longBracket = {
    pattern: RegExp(OPENING_LONG_BRACKET.source + '[\\s\\S]*?' + CLOSING_LONG_BRACKET.source),
    greedy: true
  };

  // Comments
  var comment = [
    {
      pattern: /--(?!\[=*\[).*/,
      greedy: true,
      alias: 'comment'
    },
    {
      pattern: RegExp('--' + OPENING_LONG_BRACKET.source + '[\\s\\S]*?' + CLOSING_LONG_BRACKET.source),
      greedy: true,
      alias: 'comment'
    }
  ];

  // Built-in functions and globals
  var builtIns = (
    '_G _VERSION __index __newindex __mode __call __metatable __tostring __len ' +
    '__gc __add __sub __mul __div __mod __pow __concat __unm __eq __lt __le assert ' +
    '__idiv __iter newproxy rawlen ' +
    'collectgarbage error getfenv getmetatable ipairs loadstring ' +
    'module next pairs pcall print rawequal rawget rawset require select setfenv ' +
    'setmetatable tonumber tostring type unpack xpcall self ' +
    'coroutine resume yield status wrap create running ' +
    'debug traceback ' +
    'math log max acos huge ldexp pi cos tanh pow deg tan cosh sinh random randomseed frexp ceil floor rad abs sqrt modf asin min mod fmod log10 atan2 exp sin atan ' +
    'os date difftime time clock ' +
    'string sub upper len rep find match char gmatch reverse byte format gsub lower ' +
    'table insert getn foreachi maxn foreach concat sort remove'
  ).split(' ');

  return {
    name: 'luau',
    keywords: {
      pattern: /\b(?:and|break|do|else|elseif|end|for|if|in|local|not|or|repeat|return|then|until|while)\b/,
      greedy: true
    },
    literal: /\b(?:true|false|nil)\b/,
    built_in: new RegExp('\\b(?:' + builtIns.join('|') + ')\\b'),
    comment: comment,
    string: [
      // Long bracket strings
      longBracket,
      // Interpolated string with `...`
      {
        pattern: /`(?:\\[\s\S]|(?![`\\])[\s\S])*`/,
        greedy: true,
        inside: {
          'interpolation': {
            pattern: INTERPOLATION_OPEN.source + '[\\s\\S]+?' + INTERPOLATION_CLOSE.source,
            inside: {
              'punctuation': /[`{}]/,
              'expression': {
                pattern: /[\s\S]+/,
                alias: 'language-luau',
                inside: null // will be linked to Luau itself
              }
            }
          },
          'string': /[\s\S]+/
        }
      },
      // Single-quoted or double-quoted strings
      {
        pattern: /(["'])(?:\\.|(?!\1)[^\\\r\n])*\1/,
        greedy: true
      }
    ],
    number: /\b\d+(\.\d+)?([eE][-+]?\d+)?\b/,
    function: {
      pattern: /(\bfunction\s+)[_a-zA-Z]\w*(?:\.[_a-zA-Z]\w*)*(?::[_a-zA-Z]\w*)?/,
      lookbehind: true,
      inside: {
        punctuation: /\./
      }
    },
    'function-params': {
      pattern: /function\s+.*?\((.*?)\)/,
      lookbehind: true,
      inside: {
        comment: comment,
        punctuation: /[(),]/
      }
    },
    operator: /[-+*/%^#=<>~]=?|::?|\.{1,3}/,
    punctuation: /[{}[\];(),.:]/
  };
}(Prism));
