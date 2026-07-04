---
layout: default
title: lua library
slua_beta: true
---

<style>
    .sticky-navbar {
        position: sticky;
        top: 0;
        z-index: 100;
        background-color: var(--header-bg);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        border-bottom: 1px solid var(--border-color);
        padding: 0.75rem 1.5rem;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: flex-start;
        gap: 1.5rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    }

    .navbar-brand {
        font-weight: 700;
        font-size: 1.25rem;
        color: inherit;
        text-decoration: none;
        letter-spacing: -0.025em;
    }

    .search-container {
        flex: 1;
        min-width: 200px;
        max-width: 400px;
        position: relative;
    }

    .search-input {
        width: 100%;
        padding: 0.5rem 1rem;
        font-size: 0.95rem;
        color: inherit;
        background-color: transparent;
        border: 1.5px solid var(--border-color); 
        border-radius: 0.375rem;
        outline: none;
        box-sizing: border-box;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .search-input:focus {
        border-color: var(--accent-color);
        box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.15);
    }

    .content-container {
        padding: 2rem 1.5rem;
        max-width: 1200px;
        margin: 0 auto;
    }

    #loading {
        font-size: 1rem;
        opacity: 0.7;
        text-align: center;
        margin-top: 2rem;
    }

    .section-title {
        font-size: 1.1rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: 1rem;
        margin-top: 2rem;
        opacity: 0.8;
        border-bottom: 1px solid var(--border-color);
        padding-bottom: 0.5rem;
    }

    .main-menu-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 1rem;
        margin-bottom: 2rem;
    }

    .menu-btn {
        background-color: var(--card-bg);
        border: 1px solid var(--border-color);
        color: inherit;
        padding: 1rem;
        border-radius: 0.5rem;
        font-size: 0.95rem;
        font-weight: 500;
        text-align: left;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }

    .menu-btn:hover {
        border-color: var(--accent-color);
        transform: translateY(-2px);
        box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    }

    .menu-btn .count {
        font-size: 0.8rem;
        background-color: var(--badge-bg);
        color: var(--badge-text);
        padding: 0.15rem 0.5rem;
        border-radius: 9999px;
        font-weight: 600;
    }

    .nav-btn {
        background-color: var(--card-bg); 
        border: 1px solid var(--border-color);
        color: inherit;
        padding: 0.5rem 1rem;
        border-radius: 0.375rem;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .nav-btn:hover {
        background-color: var(--border-color);
    }

    .results-wrapper {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        margin-top: 1rem;
    }

    .results-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        gap: 0.75rem;
        width: 100%;
    }

    .result-btn {
        background-color: var(--card-bg);
        border: 1px solid var(--border-color);
        color: inherit;
        padding: 0.6rem 1rem;
        border-radius: 0.375rem;
        font-size: 0.9rem;
        font-family: monospace;
        text-align: left; 
        width: 100%; 
        box-sizing: border-box;
        cursor: pointer;
        transition: all 0.2s ease;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .result-btn:hover {
        background-color: var(--accent-color);
        border-color: var(--accent-color);
        color: #ffffff;
        transform: translateY(-1px);
    }

    .no-results {
        text-align: center;
        opacity: 0.6;
        padding: 2rem;
        font-size: 0.95rem;
    }

    :root {
        --bg-color: #f9f9f9;
        --text-color: #2c3e50;
        --header-bg: #ffffff;
        --border-color: #dee2e6;
        --accent-color: #007bff;
        --table-head: #f2f2f2;
        --card-bg: #ffffff;
        --code-bg: #f1f1f1;
        --badge-bg: #e0f0ff;
        --badge-text: #0066cc;
    }

    .content.dark-theme {
        --bg-color: #121212;
        --text-color: #e0e0e0;
        --header-bg: #1e1e1e;
        --border-color: #2e2e2e;
        --accent-color: #3796ff;
        --table-head: #2a2a2a;
        --card-bg: #1e1e1e;
        --code-bg: #2d2d2d;
        --badge-bg: #1a3a5c;
        --badge-text: #82bfff;
    }

    .dashboard {
        display: flex;
        flex-direction: column;
        background: var(--card-bg);
        border: 1px solid var(--border-color);
        border-radius: 12px;
        overflow: hidden;
        margin-bottom: 30px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    }

    .dashboard-header {
        padding: 20px;
        background: rgba(128,128,128,0.05);
        border-bottom: 1px solid var(--border-color);
    }

    .dashboard-body {
        display: grid;
        grid-template-columns: 1fr 100px;
        gap: 25px;
        padding: 25px;
    }

    .dash-section-title {
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        color: #888;
        margin-bottom: 12px;
        border-bottom: 1px solid var(--border-color);
        padding-bottom: 4px;
        letter-spacing: 0.5px;
    }

    .description-text { 
        margin-top: 0; 
        font-size: 1.05rem; 
        line-height: 1.6;
        margin-bottom: 25px;
    }

    .param-table { 
        border-collapse: collapse; 
        width: 100%; 
        margin-top: 1rem;
    }

    .param-table th, .param-table td {
        border-bottom: 1px solid var(--border-color);
        padding: 10px 12px;
        text-align: left;
        font-size: 0.9rem;
    }

    .param-table th {
        background: var(--table-head);
        font-weight: 600;
    }

    .param-type {
        font-family: monospace;
        color: var(--accent-color);
        font-weight: 600;
    }

    .param-name {
        font-family: monospace;
        font-weight: 600;
    }

    .tech-item { 
        display: flex; 
        justify-content: space-between; 
        font-size: 0.85rem; 
        margin-bottom: 8px; 
        padding-bottom: 6px; 
        border-bottom: 1px inset var(--border-color); 
    }

    .tech-label { 
        color: #7f8c8d; 
        font-weight: 500; 
    }

    .tech-val { 
        font-family: monospace; 
        font-weight: bold; 
    }
    
    .label-stack { 
        display: flex; 
        flex-wrap: wrap; 
        gap: 6px; 
        margin-top: 15px; 
    }

    .attr-label { 
        font-size: 0.65rem; 
        font-weight: bold; 
        padding: 4px 8px; 
        border-radius: 4px; 
        color: white; 
        text-transform: uppercase;
        white-space: nowrap;
    }

    .header-options {
        margin-left: auto;
        display: flex;
        align-items: center;
    }

    body.simple-types-active .full-type {
        display: none !important;
    }
    body:not(.simple-types-active) .simple-type {
        display: none !important;
    }

    .bg-mandatory  { background: #e67e22; }
    .bg-native     { background: #2980b9; }
    .bg-deprecated { background: #c0392b; }
    .bg-fastcall   { background: #8e44ad; }
    .bg-magic      { background: #d35400; }
    .bg-modifiable { background: #7f8c8d; }

    @media (max-width: 900px) {
        .dashboard-body { grid-template-columns: 1fr; }
    }
</style>

<header class="sticky-navbar">
    <a href="#" class="navbar-brand">Lua Definitions</a>

    <div class="search-container">
        <input 
            type="text" 
            id="search-input" 
            class="search-input" 
            placeholder="Search..." 
            aria-label="Search all definitions"
        />
    </div>

    <div class="header-options">
        <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; cursor: pointer; user-select: none;">
            <input type="checkbox" id="simple-types-checkbox" />
            <span>Simple Types</span>
        </label>
    </div>
</header>

<main class="content-container">
    <div id="loading">Loading definitions...</div>
    <div id="definitions-display"></div>
</main>

<script type="module">
    import jsyaml from 'https://esm.sh/js-yaml@4.1.0';
    // const API_URL = "https://api.github.com/repos/secondlife/lsl-definitions/contents/slua_definitions.yaml";
    const API_URL = "https://raw.githubusercontent.com/Suzanna-Linn/lua/main/updated-lua.yaml";
    
    let searchIndex = [];
    let currentViewState = { type: 'empty', data: {} };

    function decodeBase64Utf8(base64Str) {
        const cleaned = base64Str.replace(/\s/g, '');
        const binaryString = atob(cleaned);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return new TextDecoder("utf-8").decode(bytes);
    }

    function escapeHtml(str) {
        if (!str) return '';
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    /**
     *  - Strips generic angle brackets (e.g., `setmetatable<T, MT>` -> `table`).
     *  - Normalizes generic letters (e.g., `T`, `V`, `K`, `A...`) to `any` or `...any`.
     *  - Collapses inline table definitions `{ ... }` to `table`.
     *  - Collapses function signatures `(...) -> ...` to `function`.
     *  - Detects Lua iterator triplets `(function, table, ...)` and simplifies them to `iterator`.
     *  - Cleans up redundant outer parentheses.
     */
    function simplifyLuauType(typeStr) {
        if (!typeStr) return "";
    
        // Step 1: Tokenize the input string
        const tokens = tokenize(typeStr);
    
        // Step 2a: Normalize generic placeholders (e.g. T, V, A...) to 'any' or '...any'
        normalizeGenerics(tokens);

        // Step 2b: Simplify LL types
        normalizeLLTypes(tokens);
    
        // Step 3: Strip generic type instantiations (e.g., <T, MT>) and map their base if necessary
        collapseGenericInstantiations(tokens);
    
        // Step 4: Collapse inline tables { ... } down to 'table'
        collapseTables(tokens);
    
        // Step 5: Collapse function structures (...) -> ... down to 'function'
        collapseFunctions(tokens);
    
        // Step 6: Clean up redundant parentheses like (any) -> any
        cleanupParentheses(tokens);
    
        // Step 7: Detect if the entire structure is an iterator triplet (e.g., (function, table, number))
        const finalTokens = collapseIterators(tokens);
    
        // Step 8: Convert the simplified token list back to a string
        return tokensToString(finalTokens);
    }
    
    function tokenize(str) {
        const tokens = [];
        let i = 0;
        while (i < str.length) {
            const char = str[i];
            if (/\s/.test(char)) {
                i++;
                continue;
            }
            
            // Handle String Literals (Double or Single Quotes)
            if (char === '"' || char === "'") {
                const quote = char;
                let val = quote;
                let j = i + 1;
                while (j < str.length && str[j] !== quote) {
                    if (str[j] === '\\' && str[j + 1] === quote) {
                        val += '\\' + quote;
                        j += 2;
                    } else {
                        val += str[j];
                        j++;
                    }
                }
                if (j < str.length) {
                    val += quote;
                    j++;
                }
                tokens.push({ type: "STRING", value: val });
                i = j;
                continue;
            }
    
            if (str.slice(i, i + 2) === "->") {
                tokens.push({ type: "ARROW", value: "->" });
                i += 2;
                continue;
            }
            if (str.slice(i, i + 3) === "...") {
                tokens.push({ type: "VARARG", value: "..." });
                i += 3;
                continue;
            }
            if ("{}()<>|:,?".includes(char)) {
                tokens.push({ type: char, value: char });
                i++;
                continue;
            }
            // Identifiers
            let word = "";
            while (i < str.length && /[a-zA-Z0-9_.]/.test(str[i])) {
                word += str[i];
                i++;
            }
            if (word) {
                if (str.slice(i, i + 3) === "...") {
                    word += "...";
                    i += 3;
                }
                tokens.push({ type: "ID", value: word });
                continue;
            }
            tokens.push({ type: "CHAR", value: char });
            i++;
        }
        return tokens;
    }
    
    function normalizeGenerics(tokens) {
        for (let i = 0; i < tokens.length; i++) {
            const tok = tokens[i];
            if (tok.type === "ID") {
                // Match uppercase generic varargs like A..., R..., R1...
                if (/^[A-Z]\d?\.\.\.$/.test(tok.value)) {
                    tok.value = "...any";
                } 
                // Match single uppercase generic letters like T, V, K, E, MT
                else if (/^[A-Z]\d?$/.test(tok.value)) {
                    tok.value = "any";
                }
            }
        }
        // Handle explicitly prepended varargs (e.g., ...V)
        let i = 0;
        while (i < tokens.length - 1) {
            if (tokens[i].type === "VARARG" && tokens[i + 1].type === "ID" && (tokens[i + 1].value === "any" || /^[A-Z]\d?$/.test(tokens[i + 1].value))) {
                tokens.splice(i, 2, { type: "ID", value: "...any" });
                continue;
            }
            i++;
        }
    }

    function normalizeLLTypes(tokens) {
        for (let i = 0; i < tokens.length; i++) {
            const tok = tokens[i];
            if (tok.type === "ID" && tok.value.startsWith("LL")) {
                const val = tok.value;
                if (val.endsWith("Name")) {
                    tok.value = "string";
                } else if (val.endsWith("Type") || val.endsWith("Options")) {
                    tok.value = "table";
                } else if (val.endsWith("Handler") || val.endsWith("Callback")) {
                    tok.value = "function";
                }
            }
            if (tok.type === "ID" && (tok.value.startsWith("DateType") || tok.value.startsWith("PrimParams"))) {
                tok.value = "table";
            }
        }
    }
    
    function collapseGenericInstantiations(tokens) {
        let i = 0;
        while (i < tokens.length) {
            if (tokens[i].type === "<") {
                let depth = 1;
                let j = i + 1;
                while (j < tokens.length && depth > 0) {
                    if (tokens[j].type === "<") depth++;
                    else if (tokens[j].type === ">") depth--;
                    j++;
                }
                if (depth === 0) {
                    // Strip the generic bracket contents
                    tokens.splice(i, j - i);
                    // If the prefix was a metatable handler type, simplify its name to 'table'
                    if (i > 0 && tokens[i - 1].type === "ID") {
                        const base = tokens[i - 1].value;
                        if (base === "setmetatable" || base === "getmetatable") {
                            tokens[i - 1].value = "table";
                        }
                    }
                    continue;
                }
            }
            i++;
        }
    }
    
    function collapseTables(tokens) {
        let i = 0;
        while (i < tokens.length) {
            if (tokens[i].type === "{") {
                let depth = 1;
                let j = i + 1;
                while (j < tokens.length && depth > 0) {
                    if (tokens[j].type === "{") depth++;
                    else if (tokens[j].type === "}") depth--;
                    j++;
                }
                if (depth === 0) {
                    // Replace the entire braces block with 'table'
                    tokens.splice(i, j - i, { type: "ID", value: "table" });
                    continue;
                }
            }
            i++;
        }
    }
    
    function findLeftBoundary(tokens, arrowIdx) {
        let idx = arrowIdx - 1;
        if (tokens[idx] && tokens[idx].type === ")") {
            let depth = 1;
            idx--;
            while (idx >= 0 && depth > 0) {
                if (tokens[idx].type === ")") depth++;
                else if (tokens[idx].type === "(") depth--;
                idx--;
            }
            return idx + 1;
        }
        return idx;
    }
    
    function findRightBoundary(tokens, arrowIdx) {
        let idx = arrowIdx + 1;
        if (tokens[idx] && tokens[idx].type === "(") {
            let depth = 1;
            idx++;
            while (idx < tokens.length && depth > 0) {
                if (tokens[idx].type === "(") depth++;
                else if (tokens[idx].type === ")") depth--;
                idx++;
            }
            return idx - 1;
        }
        if (tokens[idx + 1] && tokens[idx + 1].type === "?") {
            return idx + 1;
        }
        return idx;
    }
    
    function collapseFunctions(tokens) {
        let arrowIdx;
        while ((arrowIdx = tokens.findIndex(t => t.type === "ARROW")) !== -1) {
            const left = findLeftBoundary(tokens, arrowIdx);
            const right = findRightBoundary(tokens, arrowIdx);
            tokens.splice(left, right - left + 1, { type: "ID", value: "function" });
        }
    }
    
    function cleanupParentheses(tokens) {
        let i = 0;
        while (i < tokens.length - 2) {
            if (tokens[i].type === "(" && tokens[i + 2].type === ")") {
                tokens.splice(i + 2, 1); // remove ')'
                tokens.splice(i, 1);     // remove '('
                i = 0; // restart search
                continue;
            }
            i++;
        }
    }
    
    function collapseIterators(tokens) {
        if (tokens.length >= 3 && tokens[0].type === "(" && tokens[tokens.length - 1].type === ")") {
            let depth = 0;
            let hasFunctionFirst = false;
            let hasComma = false;
            for (let i = 1; i < tokens.length - 1; i++) {
                if (tokens[i].type === "(") depth++;
                else if (tokens[i].type === ")") depth--;
                else if (depth === 0) {
                    if (tokens[i].type === "ID" && tokens[i].value === "function" && !hasComma) {
                        hasFunctionFirst = true;
                    }
                    if (tokens[i].type === ",") {
                        hasComma = true;
                    }
                }
            }
            if (hasFunctionFirst && hasComma) {
                return [{ type: "ID", value: "iterator" }];
            }
        }
        return tokens;
    }
    
    function tokensToString(tokens) {
        let result = "";
        for (let i = 0; i < tokens.length; i++) {
            const tok = tokens[i];
            const prev = tokens[i - 1];
    
            if (tok.type === "?") {
                result += "?";
            } else if (tok.type === ",") {
                result += ", ";
            } else if (tok.type === "|") {
                result += " | ";
            } else if (tok.type === ":") {
                result += ": ";
            } else {
                if (prev) {
                    const needsSpace = 
                        prev.type !== "(" && 
                        prev.type !== ":" && 
                        prev.type !== "|" && 
                        tok.type !== ")" && 
                        tok.type !== "," && 
                        tok.type !== "?";
                    
                    if (needsSpace && !result.endsWith(" ")) {
                        result += " ";
                    }
                }
                result += tok.value;
            }
        }
        return result.replace(/\s+/g, " ").trim();
    }

    function buildSearchIndex(data) {
        searchIndex = [];
        
        // 1. Global Functions
        data.functions.forEach(f => {
             if (f["slua-removed"] || f["local-only"]) {
                return;
            }

            searchIndex.push({
                id: `global-function:${f.name}`,
                type: 'function',
                category: 'Global Functions',
                name: f.name,
                displayName: `${f.name}()`,
                item: f,
                parent: null
            });
        });
        
        // 2. Classes
        data.classes.forEach(cls => {
            searchIndex.push({
                id: `class:${cls.name}`,
                type: 'class',
                category: 'Classes',
                name: cls.name,
                displayName: cls.name,
                item: cls,
                parent: null
            });
            
            if (cls.methods) {
                cls.methods.forEach(m => {
                    searchIndex.push({
                        id: `class-method:${cls.name}:${m.name}`,
                        type: 'class-method',
                        category: cls.name,
                        name: `${cls.name}:${m.name}`,
                        displayName: `${cls.name}:${m.name}()`,
                        item: m,
                        parent: cls
                    });
                });
            }
            
            if (cls.functions) {
                cls.functions.forEach(f => {
                    searchIndex.push({
                        id: `class-function:${cls.name}.${f.name}`,
                        type: 'class-function',
                        category: cls.name,
                        name: `${cls.name}.${f.name}`,
                        displayName: `${cls.name}.${f.name}()`,
                        item: f,
                        parent: cls
                    });
                });
            }
        });
        
        // 3. Modules
        data.modules.forEach(mod => {
             if (!(mod.functions && mod.functions.length > 0) && !(mod.constants && mod.constants.length > 0)) {
                return;
            }

            searchIndex.push({
                id: `module:${mod.name}`,
                type: 'module',
                category: 'Modules',
                name: mod.name,
                displayName: mod.name,
                item: mod,
                parent: null
            });
            
            if (mod.callable) {
                searchIndex.push({
                    id: `module-callable:${mod.name}:${mod.callable.name || 'callable'}`,
                    type: 'module-function',
                    category: mod.name,
                    name: mod.name,
                    displayName: `${mod.name}()`,
                    item: mod.callable,
                    parent: mod
                });
            }
            
            if (mod.functions) {
                mod.functions.forEach(f => {
                    searchIndex.push({
                        id: `module-function:${mod.name}.${f.name}`,
                        type: 'module-function',
                        category: mod.name,
                        name: `${mod.name}.${f.name}`,
                        displayName: `${mod.name}.${f.name}()`,
                        item: f,
                        parent: mod
                    });
                });
            }
            
            if (mod.constants) {
                mod.constants.forEach(c => {
                    searchIndex.push({
                        id: `module-constant:${mod.name}.${c.name}`,
                        type: 'module-constant',
                        category: mod.name,
                        name: `${mod.name}.${c.name}`,
                        displayName: `${mod.name}.${c.name}`,
                        item: c,
                        parent: mod
                    });
                });
            }
        });
        
        // 4. Metamethods
        data.metamethods.forEach(meta => {
            searchIndex.push({
                id: `metamethod:${meta.name}`,
                type: 'metamethod',
                category: 'Metamethods',
                name: meta.name,
                displayName: meta.name,
                item: meta,
                parent: null
            });
        });

        // 5. Base Classes
        data["base-classes"].forEach(cls => {
            if (!searchIndex.some(x => x.name === cls.name)) {
                return;
            }
            
            if (cls.properties) {
                cls.properties.forEach(p => {
                    searchIndex.push({
                        id: `class-property:${cls.name}.${p.name}`,
                        type: 'class-property',
                        category: cls.name,
                        name: `${cls.name}.${p.name}`,
                        displayName: `${cls.name}.${p.name}`,
                        item: p,
                        parent: cls
                    });
                });
            }
        });
    }

    async function fetchDefinitions() {      
        const headers = {
            // "Accept": "application/vnd.github+json"
            'Accept': 'text/yaml, text/plain, */*'
        };

        try {
            const response = await fetch(API_URL, { headers });
            if (response.status === 200) {
                // const apiResponse = await response.json();
                // const rawYamlText = decodeBase64Utf8(apiResponse.content);
                const rawYamlText = await response.text();
                const rawYaml = jsyaml.load(rawYamlText); 
                
                buildSearchIndex(rawYaml);
                document.getElementById('loading').style.display = 'none';
                renderMainMenu();
                initSearch();
            } else {
                throw new Error(`Unexpected status code: ${response.status}`);
            }
        } catch (error) {
            console.error("Fetch failed.", error);
            document.getElementById('loading').innerText = "Failed to load SLua definitions.";
        }
    }

    function renderMainMenu() {
        currentViewState = { type: 'empty', data: {} };
        document.getElementById('search-input').value = '';
        
        let html = `
            <div class="main-menu-grid">
                <button type="button" class="menu-btn" data-category="functions">
                    <span>Global Functions</span>
                </button>
                <button type="button" class="menu-btn" data-category="metamethods">
                    <span>Metamethods</span>
                </button>
            </div>

            <div class="main-menu-grid">
                ${searchIndex.filter(x => x.type === "class").map(entry => {
                    return `
                        <button type="button" class="menu-btn" data-module="${escapeHtml(entry.name)}">
                            <span>${escapeHtml(entry.name)}</span>
                        </button>
                    `;
                }).join('')}
            </div>

            <div class="main-menu-grid">
                ${searchIndex.filter(x => x.type === "module").map(entry => {
                    return `
                        <button type="button" class="menu-btn" data-module="${escapeHtml(entry.name)}">
                            <span>${escapeHtml(entry.name)}</span>
                        </button>
                    `;
                }).join('')}
            </div>
        `;

        document.getElementById('definitions-display').innerHTML = html;

        document.querySelectorAll('.menu-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const cat = e.currentTarget.getAttribute('data-category');
                const mod = e.currentTarget.getAttribute('data-module');
                
                if (cat) {
                    renderCategoryList(cat);
                } else if (mod) {
                    renderCategoryList('module', mod);
                }
            });
        });
    }

    function renderCategoryList(categoryKey, moduleName = null) {
        currentViewState = {
            type: 'category-list',
            data: { categoryKey, moduleName },
            scrollY: window.scrollY
        };

        let items = [];
        let title = "";

        if (categoryKey === 'functions') {
            title = "Global Functions";
            items = searchIndex.filter(x => x.type === 'function' && x.category === 'Global Functions')
                .concat(searchIndex.filter(x => x.type === 'constant' && x.category === 'Global Constants'));
        } else if (categoryKey === 'metamethods') {
            title = "Metamethods";
            items = searchIndex.filter(x => x.type === 'metamethod');
        } else if (categoryKey === 'module') {
            title = `${moduleName}`;
            items = searchIndex.filter(x => x.parent && x.parent.name === moduleName);
        }

        let html = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h2 style="margin: 0;">${escapeHtml(title)}</h2>
                <button type="button" class="nav-btn" id="category-back-btn">← Back to Menu</button>
            </div>
            <div class="results-wrapper">
        `;

        if (categoryKey === 'module') {
            // Sort and filter distinct groups
            const funcs = items.filter(x => x.type === 'module-function' || x.type === 'class-function' || x.type === 'class-method')
                .sort((a, b) => a.displayName.localeCompare(b.displayName, undefined, { sensitivity: 'base' }));

            const props = items.filter(x => x.type === 'class-property')
                .sort((a, b) => a.displayName.localeCompare(b.displayName, undefined, { sensitivity: 'base' }));

            const consts = items.filter(x => x.type === 'module-constant' || x.type === 'constant')
                .sort((a, b) => a.displayName.localeCompare(b.displayName, undefined, { sensitivity: 'base' }));

            if (funcs.length > 0) {
                html += `
                    <div class="results-grid">
                        ${funcs.map(item => `
                            <button type="button" class="result-btn" data-id="${escapeHtml(item.id)}">
                                ${escapeHtml(item.displayName)}
                            </button>
                        `).join('')}
                    </div>
                `;
            }

            if (props.length > 0) {
                html += `
                    <div class="results-grid">
                        ${props.map(item => `
                            <button type="button" class="result-btn" data-id="${escapeHtml(item.id)}">
                                ${escapeHtml(item.displayName)}
                            </button>
                        `).join('')}
                    </div>
                `;
            }

            if (consts.length > 0) {
                html += `
                    <div class="results-grid">
                        ${consts.map(item => `
                            <button type="button" class="result-btn" data-id="${escapeHtml(item.id)}">
                                ${escapeHtml(item.displayName)}
                            </button>
                        `).join('')}
                    </div>
                `;
            }
        } else {
            // Default alphabetic listing for general categories
            items.sort((a, b) => a.displayName.localeCompare(b.displayName, undefined, { sensitivity: 'base' }));
            
            html += `
                <div class="results-grid">
                    ${items.map(item => `
                        <button type="button" class="result-btn" data-id="${escapeHtml(item.id)}">
                            ${escapeHtml(item.displayName)}
                        </button>
                    `).join('')}
                </div>
            `;
        }

        html += `</div>`;

        const display = document.getElementById('definitions-display');
        display.innerHTML = html;

        display.querySelectorAll('.result-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                renderItemDetails(id);
            });
        });

        document.getElementById('category-back-btn').addEventListener('click', () => {
            renderMainMenu();
        });
    }

    function renderSingleSignature(fObj, parentName, isSimp, isMethod, isCallable, baseName) {
        isSimp = !!isSimp;
        isCallable = !!isCallable;
        const separator = isMethod ? ":" : ".";
        const prefix = isCallable ? "" : (parentName ? (parentName + separator) : "");
        const nameToUse = isCallable ? parentName : (baseName || fObj.name);
        let sig = prefix + nameToUse;

        let params = [];
        if (fObj.parameters) {
            fObj.parameters.forEach(p => {
                if (isMethod && p.name === "self") return;
                let pStr = p.name === "..." && isSimp ? "args" : p.name;
                if (p.type) {
                    pStr += ": " + (isSimp ? simplifyLuauType(p.type) : p.type);
                }
                params.push(pStr);
            });
        }
        sig += "(" + params.join(", ") + ")";
        if (fObj["return-type"]) {
            sig += ": " + (isSimp ? simplifyLuauType(fObj["return-type"]) : fObj["return-type"]);
        }
        return sig;
    }

    function renderSignatures(func, parentName, isSimp, isMethod, isCallable) {
        let sigs = [renderSingleSignature(func, parentName, isSimp, isMethod, isCallable)];
        if (func.overloads) {
            func.overloads.forEach(ov => {
                sigs.push(renderSingleSignature(ov, parentName, isSimp, isMethod, isCallable, func.name));
            });
        }
        return sigs;
    }

    function renderPropertySignature(prop, parentName, isSimp) {
        isSimp = !!isSimp;
        let sig = parentName ? (parentName + "." + prop.name) : prop.name;
        sig += ": " + (isSimp ? simplifyLuauType(prop.type) : prop.type);
        if (prop.value !== undefined) {
            sig += " = " + prop.value;
        }
        return sig;
    }

    function renderParamsTable(func, isMethod) {
        if (!func.parameters || func.parameters.length === 0) return '';
        
        const displayParams = isMethod 
            ? func.parameters.filter(p => p.name !== "self") 
            : func.parameters;
            
        if (displayParams.length === 0) return '';
        
        let html = `
            <table class="param-table">
                <thead>
                    <tr>
                        <th>Parameter</th>
                        <th>Type</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        displayParams.forEach(p => {
            html += `
                <tr>
                    ${p.name === "..." ?
                        '<td class="param-name"><span class="full-type">...</span><span class="simple-type">args</span></td>'
                    :
                        `<td class="param-name">${escapeHtml(p.name)}</td>`}
                    <td class="param-type">
                        <span class="full-type">${escapeHtml(p.type || 'any')}</span>
                        <span class="simple-type">${escapeHtml(simplifyLuauType(p.type || 'any'))}</span>
                    </td>
                    <td>
                        ${escapeHtml(p.comment || '')}
                        ${p.optional ? ' <span style="font-style: italic; opacity: 0.7;">(optional)</span>' : ''}
                        ${p.observes ? ` <span style="font-style: italic; opacity: 0.7;">(${p.observes})</span>` : ''}
                    </td>
                </tr>
            `;
        });
        
        html += `</tbody></table>`;
        return html;
    }

    function renderClassFunctionBlock(func, parentName, isMethod) {
        const hasVariants = func.variants && func.variants.length > 0;
        let html = "";

        if (hasVariants) {
            // Full type container
            html += `<div class="full-type" style="margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--border-color);">`;
            if (func.comment) {
                html += `<p style="margin: 0 0 1rem 0; font-size: 0.95rem; opacity: 0.85;">${escapeHtml(func.comment)}</p>`;
            }
            func.variants.forEach((variant, index) => {
                const varSigFull = renderSingleSignature(variant, parentName, false, isMethod, false, func.name);
                const showBorder = index < func.variants.length - 1;
                html += `
                    <div style="margin-bottom: ${showBorder ? '1.5rem' : '0'}; padding-bottom: ${showBorder ? '1.5rem' : '0'}; border-bottom: ${showBorder ? '1px dashed var(--border-color)' : 'none'};">
                        <code class="language-sluab">${escapeHtml(varSigFull)}</code>
                        ${variant.comment ? `<p style="margin: 0.5rem 0 0.5rem 0; font-size: 0.9rem; opacity: 0.8;">${escapeHtml(variant.comment)}</p>` : ''}
                        ${renderParamsTable(variant, isMethod)}
                    </div>
                `;
            });
            html += `</div>`;

            // Simple type container
            html += `<div class="simple-type" style="margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--border-color);">`;
            if (func.comment) {
                html += `<p style="margin: 0 0 1rem 0; font-size: 0.95rem; opacity: 0.85;">${escapeHtml(func.comment)}</p>`;
            }
            func.variants.forEach((variant, index) => {
                const varSigSimple = renderSingleSignature(variant, parentName, true, isMethod, false, func.name);
                const showBorder = index < func.variants.length - 1;
                html += `
                    <div style="margin-bottom: ${showBorder ? '1.5rem' : '0'}; padding-bottom: ${showBorder ? '1.5rem' : '0'}; border-bottom: ${showBorder ? '1px dashed var(--border-color)' : 'none'};">
                        <code class="language-sluab">${escapeHtml(varSigSimple)}</code>
                        ${variant.comment ? `<p style="margin: 0.5rem 0 0.5rem 0; font-size: 0.9rem; opacity: 0.8;">${escapeHtml(variant.comment)}</p>` : ''}
                        ${renderParamsTable(variant, isMethod)}
                    </div>
                `;
            });
            html += `</div>`;
        } else {
            // Normal function block
            let signatures = renderSignatures(func, parentName, false, isMethod);
            html += `
                <div class="full-type" style="margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--border-color);">
                    ${signatures.map(signature => `<code class="language-sluab">${escapeHtml(signature)}</code>`).join('<br>')}
                    ${func.comment ? `<p style="margin: 0.75rem 0 0.5rem 0; font-size: 0.95rem; opacity: 0.85;">${escapeHtml(func.comment)}</p>` : ''}
                    ${renderParamsTable(func, isMethod)}
                </div>
            `;
            signatures = renderSignatures(func, parentName, true, isMethod);
            html += `
                <div class="simple-type" style="margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--border-color);">
                    ${signatures.map(signature => `<code class="language-sluab">${escapeHtml(signature)}</code>`).join('<br>')}
                    ${func.comment ? `<p style="margin: 0.75rem 0 0.5rem 0; font-size: 0.95rem; opacity: 0.85;">${escapeHtml(func.comment)}</p>` : ''}
                    ${renderParamsTable(func, isMethod)}
                </div>
            `;
        }
        return html;
    }
    
    function renderClassDetails(cls) {
        let html = `
            <div class="dashboard class-detail">
                <div class="dashboard-header">
                    <h2 style="margin: 0 0 10px 0;">Class: ${escapeHtml(cls.name)}</h2>
                    ${cls.comment ? `<p class="description-text" style="margin:0;">${escapeHtml(cls.comment)}</p>` : ''}
                </div>
                <div class="dashboard-body" style="grid-template-columns: 1fr;">
                    <div class="dash-col">
        `;

        if (cls.properties && cls.properties.length > 0) {
            html += `
                <h3 class="dash-section-title" style="margin-top: 1.5rem;">Properties</h3>
                <table class="param-table" style="margin-bottom: 2rem;">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            cls.properties.forEach(prop => {
                html += `
                    <tr>
                        <td class="param-name">${escapeHtml(prop.name)}</td>
                        <td class="param-type">
                            <span class="full-type">${escapeHtml(prop.type)}</span>
                            <span class="simple-type">${escapeHtml(simplifyLuauType(prop.type))}</span>
                        </td>
                        <td>${escapeHtml(prop.comment || '')}</td>
                    </tr>
                `;
            });
            html += `</tbody></table>`;
        }

        if (cls.methods && cls.methods.length > 0) {
            html += `<h3 class="dash-section-title">Methods</h3>`;
            cls.methods.forEach(method => {
                html += renderClassFunctionBlock(method, cls.name, true);
            });
        }

        if (cls.functions && cls.functions.length > 0) {
            html += `<h3 class="dash-section-title">Static Functions</h3>`;
            cls.functions.forEach(func => {
                html += renderClassFunctionBlock(func, cls.name, false);
            });
        }

        html += `
                    </div>
                </div>
            </div>
        `;
        return html;
    }

    function renderFunctionDetails(entry) {
        const func = entry.item;
        const parentName = entry.parent ? entry.parent.name : null;
        const isMethod = entry.type === 'class-method';
        const isCallable = entry.id && entry.id.startsWith('module-callable:');
        
        const hasVariants = func.variants && func.variants.length > 0;

        let depr = "";
        if (func.deprecated) {
            depr = "Deprecated: ";
            if (func.deprecated.use) {
                depr += " use " + func.deprecated.use;
            }
            if (func.deprecated.reason) {
                depr += (func.deprecated.use ? "   Reason: " : "") + func.deprecated.reason;
            }
        }

        let headerHtml = "";
        let bodyHtml = "";

        if (hasVariants) {
            const separator = isMethod ? ":" : ".";
            const prefix = isCallable ? "" : (parentName ? (parentName + separator) : "");
            headerHtml = `<h2 style="margin: 0;">${escapeHtml(prefix + func.name)}</h2>`;

            bodyHtml = `
                <div class="dash-col">
                    ${depr ? `<p class="deprecated-text">${depr}</p>` : ''}
                    ${func.comment ? `<p class="description-text" style="margin-bottom: 2rem; font-style: italic; opacity: 0.85;">${escapeHtml(func.comment)}</p>` : ''}
            `;

            func.variants.forEach((variant, index) => {
                const varSigFull = renderSingleSignature(variant, parentName, false, isMethod, isCallable, func.name);
                const varSigSimple = renderSingleSignature(variant, parentName, true, isMethod, isCallable, func.name);
                const showBorder = index < func.variants.length - 1;

                bodyHtml += `
                    <div style="margin-bottom: ${showBorder ? '2.5rem' : '0'}; padding-bottom: ${showBorder ? '2rem' : '0'}; border-bottom: ${showBorder ? '1px dashed var(--border-color)' : 'none'};">
                        <div class="full-type" style="margin-bottom: 0.5rem;">
                            <code class="language-sluab">${escapeHtml(varSigFull)}</code>
                        </div>
                        <div class="simple-type" style="margin-bottom: 0.5rem;">
                            <code class="language-sluab">${escapeHtml(varSigSimple)}</code>
                        </div>
                        ${variant.comment ? `<p class="description-text" style="margin-top: 0.75rem; margin-bottom: 1rem;">${escapeHtml(variant.comment)}</p>` : ''}
                        ${renderParamsTable(variant, isMethod)}
                    </div>
                `;
            });

            bodyHtml += `</div>`;
        } else {
            const signatures = renderSignatures(func, parentName, false, isMethod, isCallable);
            const signaturesB = renderSignatures(func, parentName, true, isMethod, isCallable);

            headerHtml = `
                <span class="full-type">${signatures.map(signature => `<code class="language-sluab">${escapeHtml(signature)}</code>`).join('<br>')}</span>
                <span class="simple-type">${signaturesB.map(signature => `<code class="language-sluab">${escapeHtml(signature)}</code>`).join('<br>')}</span>
            `;

            bodyHtml = `
                <div class="dash-col">
                    ${depr ? `<p class="deprecated-text">${depr}</p>` : ''}
                    ${func.comment ? `<p class="description-text">${escapeHtml(func.comment)}</p>` : ''}
                    ${renderParamsTable(func, isMethod)}
                </div>
            `;
        }
        
        let html = `
            <div class="dashboard function-detail">
                <div class="dashboard-header">
                    ${headerHtml}
                </div>
                <div class="dashboard-body">
                    ${bodyHtml}
                    <div class="dash-col">
                        <div class="dash-section-title">Specs</div>
        `;
        
        html += `<div class="label-stack">`;
        if (func["must-use"]) {
            html += `<span class="attr-label bg-mandatory">Use Return</span>`;
        }
        if (func.fastcall) {
            html += `<span class="attr-label bg-fastcall">Fastcall</span>`;
        }
        if (func.typechecker) {
            if (func.typechecker.magic) {
                html += `<span class="attr-label bg-magic">Typechecker</span>`;
            }
            if (func.typechecker.builtin) {
                html += `<span class="attr-label bg-native">Builtin</span>`;
            }
        }
        if (func.deprecated) {
            html += `<span class="attr-label bg-deprecated">Deprecated</span>`;
        }
        html += `</div>`;
        
        html += `
                    </div>
                </div>
            </div>
        `;
        return html;
    }

    function renderConstantDetails(entry) {
        const prop = entry.item;
        const parentName = entry.parent ? entry.parent.name : null;
        const sig = renderPropertySignature(prop, parentName, false);
        const sigB = renderPropertySignature(prop, parentName, true);
        
        let html = `
            <div class="dashboard constant-detail">
                <div class="dashboard-header">
                    <span class="full-type"><code class="language-sluab">${escapeHtml(sig)}</code></span>
                    <span class="simple-type"><code class="language-sluab">${escapeHtml(sigB)}</code></span>
                </div>
                <div class="dashboard-body">
                    <div class="dash-col">
                        ${prop.comment ? `<p class="description-text">${escapeHtml(prop.comment)}</p>` : ''}
                    </div>
                    <div class="dash-col">
                        <div class="dash-section-title">Specs</div>
                        <div class="label-stack">
                            <span class="attr-label bg-modifiable">${escapeHtml(prop.modifiable || 'read-only')}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        return html;
    }

    function renderMetamethodSignature(metaDef, isSimp) {
        let sig = metaDef.name;

        // Determine if it is a function-style metamethod
        if (metaDef.parameters || (metaDef.type && metaDef.type.includes("->"))) {
            let params = [];
            if (metaDef.parameters) {
                metaDef.parameters.forEach(p => {
                    let pStr = p.name === "..." && isSimp ? "args" : p.name;
                    if (p.type) {
                        pStr += ": " + (isSimp ? simplifyLuauType(p.type) : p.type);
                    }
                    params.push(pStr);
                });
            }
            sig += `(${params.join(", ")})`;
            
            // Extract or assign return type
            let retType = metaDef["return-type"];
            if (!retType && metaDef.type && metaDef.type.includes("->")) {
                const parts = metaDef.type.split("->");
                retType = parts[parts.length - 1].trim();
            }

            if (retType) {
                const returnType = isSimp ? simplifyLuauType(retType) : retType;
                if (returnType.trim() !== '()') {
                    sig += `: ${returnType}`;
                }
            }
        } 
        // fallback to property/variable type mapping
        else if (metaDef.type) {
            sig += `: ${isSimp ? simplifyLuauType(metaDef.type) : metaDef.type}`;
        }

        return sig;
    }
    
    function renderMetamethodDetails(entry) {
        const meta = entry.item;
        const hasVariants = meta.variants && meta.variants.length > 0;

        let headerHtml = "";
        if (hasVariants) {
            // Skip main definition signature in header if variants are present
        } else {
            const sigFull = renderMetamethodSignature(meta, false);
            const sigSimple = renderMetamethodSignature(meta, true);
            headerHtml = `
                <span class="full-type"><code class="language-sluab">${escapeHtml(sigFull)}</code></span>
                <span class="simple-type"><code class="language-sluab">${escapeHtml(sigSimple)}</code></span>
            `;
        }

        let html = `
            <div class="dashboard metamethod-detail">
                <div class="dashboard-header">
                    ${headerHtml}
                </div>
                <div class="dashboard-body" style="grid-template-columns: 1fr;">
                    <div class="dash-col">
        `;

        if (hasVariants) {
            meta.variants.forEach((variant, index) => {
                const varSigFull = renderMetamethodSignature({ ...variant, name: meta.name }, false);
                const varSigSimple = renderMetamethodSignature({ ...variant, name: meta.name }, true);
                const showBorder = index < meta.variants.length - 1;

                html += `
                    <div style="margin-bottom: ${showBorder ? '2.5rem' : '0'}; padding-bottom: ${showBorder ? '2rem' : '0'}; border-bottom: ${showBorder ? '1px dashed var(--border-color)' : 'none'};">
                        <div class="full-type" style="margin-bottom: 0.5rem;">
                            <code class="language-sluab">${escapeHtml(varSigFull)}</code>
                        </div>
                        <div class="simple-type" style="margin-bottom: 0.5rem;">
                            <code class="language-sluab">${escapeHtml(varSigSimple)}</code>
                        </div>
                        ${variant.comment ? `<p class="description-text" style="margin-top: 0.75rem; margin-bottom: 1rem;">${escapeHtml(variant.comment)}</p>` : ''}
                        ${renderParamsTable(variant, false)}
                    </div>
                `;
            });
        } else {
            // Standard layout when there are no variants
            html += `
                ${meta.comment ? `<p class="description-text">${escapeHtml(meta.comment)}</p>` : ''}
                ${renderParamsTable(meta, false)}
            `;
        }

        html += `
                    </div>
                </div>
            </div>
        `;
        return html;
    }
    
    function renderItemDetails(id) {
        const entry = searchIndex.find(x => x.id === id);
        if (!entry) return;

        const prevState = { ...currentViewState };
        currentViewState = {
            type: 'details',
            data: { id, prevState },
            scrollY: window.scrollY
        };

        let html = `
            <div style="display: flex; justify-content: flex-end; margin-bottom: 1.5rem;">
                <button type="button" class="nav-btn" id="details-back-btn">← Back</button>
            </div>
        `;

        const item = entry.item;
        const type = entry.type;

        if (type === 'class') {
            html += renderClassDetails(item);
        } else if (type === 'function' || type === 'module-function' || type === 'class-function' || type === 'class-method') {
            html += renderFunctionDetails(entry);
        } else if (type === 'constant' || type === 'module-constant' || type === 'class-property') {
            html += renderConstantDetails(entry);
        } else if (type === 'metamethod') {
            html += renderMetamethodDetails(entry);
        }

        const display = document.getElementById('definitions-display');
        display.innerHTML = html;

        // Apply highlights if prism is loaded
        if (window.Prism) {
            Prism.highlightAllUnder(display);
        }

        document.getElementById('details-back-btn').addEventListener('click', () => {
            if (prevState && prevState.type === 'category-list') {
                renderCategoryList(prevState.data.categoryKey, prevState.data.moduleName);
                window.scrollTo(0, prevState.scrollY || 0);
            } else if (prevState && prevState.type === 'search') {
                renderSearchResults(prevState.data.query);
                window.scrollTo(0, prevState.scrollY || 0);
            } else {
                renderMainMenu();
            }
        });
    }

    function initSearch() {
        const searchInput = document.getElementById('search-input');

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            if (query === '') {
                renderMainMenu();
            } else {
                renderSearchResults(query);
            }
        });

        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.toLowerCase().trim();
                if (!query) return;

                const exact = searchIndex.find(x => 
                    x.displayName.toLowerCase() === query && 
                    x.type !== 'module' && 
                    x.type !== 'class'
                );
                if (exact) {
                    e.preventDefault();
                    renderItemDetails(exact.id);
                    return;
                }

                const visibleButtons = document.querySelectorAll('.results-grid .result-btn');
                if (visibleButtons.length === 1) {
                    e.preventDefault();
                    const id = visibleButtons[0].getAttribute('data-id');
                    renderItemDetails(id);
                }
            }
        });
    }

    function renderSearchResults(query) {
        currentViewState = {
            type: 'search',
            data: { query },
            scrollY: window.scrollY
        };

        const hasDot = query.includes('.');

        const matches = searchIndex.filter(entry => {
            // Rule 1: Exclude class and module definitions themselves from search hits
            if (entry.type === 'class' || entry.type === 'module') {
                return false;
            }

            const parentName = entry.parent ? entry.parent.name.toLowerCase() : '';
            const itemName = (entry.item && entry.item.name) ? entry.item.name.toLowerCase() : entry.name.toLowerCase();

            if (hasDot) {
                // Rule 2: If the text has a point, match against class.name or module.name namespaces
                const fullNameDot = parentName ? `${parentName}.${itemName}` : itemName;
                const fullNameColon = parentName ? `${parentName}:${itemName}` : itemName;
                return fullNameDot.includes(query) || fullNameColon.includes(query);
            } else {
                // Rule 3: If the text has no point, match only against the item's own short name
                return itemName.includes(query);
            }
        });

        const display = document.getElementById('definitions-display');

        if (matches.length === 0) {
            display.innerHTML = `
                <div class="no-results">No matches found for "${escapeHtml(query)}"</div>
            `;
            return;
        }

        const grouped = {};
        matches.forEach(m => {
            if (!grouped[m.category]) grouped[m.category] = [];
            grouped[m.category].push(m);
        });

        let html = "";
        
        Object.entries(grouped).forEach(([catTitle, items]) => {
            html += `
                <div class="section-title">${escapeHtml(catTitle)}</div>
                <div class="results-grid" style="margin-bottom: 1.5rem;">
                    ${items.map(item => `
                        <button type="button" class="result-btn" data-id="${escapeHtml(item.id)}">
                            ${escapeHtml(item.displayName)}
                        </button>
                    `).join('')}
                </div>
            `;
        });

        display.innerHTML = html;

        display.querySelectorAll('.result-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                renderItemDetails(id);
            });
        });
    }

    const simpleTypesCheckbox = document.getElementById('simple-types-checkbox');
    const storageKey = 'simple-types-enabled';

    function setSimpleTypesState(isEnabled) {
        if (isEnabled) {
            document.body.classList.add('simple-types-active');
        } else {
            document.body.classList.remove('simple-types-active');
        }
        localStorage.setItem(storageKey, isEnabled);
    }

    const initialSimpleTypesState = localStorage.getItem(storageKey) === 'true';
    simpleTypesCheckbox.checked = initialSimpleTypesState;
    setSimpleTypesState(initialSimpleTypesState);

    simpleTypesCheckbox.addEventListener('change', (e) => {
        setSimpleTypesState(e.target.checked);
    });
    
    fetchDefinitions();
</script>
