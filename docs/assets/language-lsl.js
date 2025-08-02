Prism.languages.lsl = {
    'comment': {
        pattern: /(^|[^\\])\/\*[\s\S]*?\*\/|(^|[^\\:])\/\/.*/,
        lookbehind: true,
        greedy: true
    },
    'string': {
        pattern: /"(?:\\.|[^"\\])*"/,
        greedy: true
    },
    'number': {
        pattern: /(^|[^\w$])(?:0[xX][\dA-Fa-f]+|\d+(?:\.\d*)?(?:[Ee][+-]?\d+)?|\.\d+(?:[Ee][+-]?\d+)?)(?![\w$])/,
        lookbehind: true
    },
    'keyword': /\b(?:default|do|else|for|if|jump|print|return|state|while)\b/,
    'type': {
        pattern: /\b(?:float|integer|key|list|quaternion|rotation|string|vector)\b/,
        alias: 'keyword'
    },
    'builtin': /\b(?:at_rot_target|at_target|attach|changed|collision|collision_end|collision_start|control|dataserver|email|experience_permissions|experience_permissions_denied|final_damage|game_control|http_request|http_response|land_collision|land_collision_end|land_collision_start|link_message|linkset_data|listen|money|moving_end|moving_start|no_sensor|not_at_rot_target|not_at_target|object_rez|on_damage|on_death|on_rez|path_update|remote_data|run_time_permissions|sensor|state_entry|state_exit|timer|touch|touch_end|touch_start|transaction_result)\b/,
    'builtin-ll': {
        pattern: /\bll\w+(?=\s*(?:[({]))/,
        alias: 'builtin'
    },
    'label': {
        pattern: /@[a-zA-Z_]\w*\b/,
        alias: 'constant'
    },
    'function': /\b(?!\d)\w+(?=\s*\()/,
    'constant': /\b[A-Z_][A-Z0-9_]*\b/,
    'variable': /\b[a-zA-Z_]\w*\b/,
    'operator': /--|\+\+|&&|\|\||==|!=|<=|>=|<<|>>|[-+*/%&|^]=?|[<>!~?:=]/,
    'punctuation': /[{}()<>[\];.,]/
};
