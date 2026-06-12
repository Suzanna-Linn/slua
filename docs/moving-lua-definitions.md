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
        justify-content: space-between;
        gap: 1rem;
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

    content.dark-theme {
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
        grid-template-columns: 1fr 280px;
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

    .bg-pure       { background: #27ae60; }
    .bg-mandatory  { background: #e67e22; }
    .bg-native     { background: #2980b9; }
    .bg-deprecated { background: #c0392b; }
    .bg-fastcall   { background: #8e44ad; }
    .bg-magic      { background: #d35400; }
    .bg-local      { background: #7f8c8d; }

    pre { 
        background: var(--code-bg) !important; 
        padding: 14px; 
        border-radius: 8px; 
        overflow-x: auto; 
        font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
        font-size: 0.95rem;
        margin: 0;
        border: 1px solid var(--border-color);
    }

    @media (max-width: 900px) {
        .dashboard-body { grid-template-columns: 1fr; }
    }
</style>

<header class="sticky-navbar">
    <a href="#" class="navbar-brand">SLua Definitions</a>

    <div class="search-container">
        <input 
            type="text" 
            id="search-input" 
            class="search-input" 
            placeholder="Search variables, functions, or classes..." 
            aria-label="Search all definitions"
        />
    </div>
</header>

<main class="content-container">
    <div id="loading">Loading definitions...</div>
    <div id="definitions-display"></div>
</main>

<script type="module">
    import jsyaml from 'https://esm.sh/js-yaml@4.1.0';
    const API_URL = "https://api.github.com/repos/secondlife/lsl-definitions/contents/slua_definitions.yaml";
    
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

    function buildSearchIndex(data) {
        searchIndex = [];
        
        // 1. Global Functions
        if (data.functions) {
            data.functions.forEach(f => {
                searchIndex.push({
                    id: `global-function:${f.name}`,
                    type: 'function',
                    category: 'Global Functions',
                    name: f.name,
                    displayName: f.name,
                    item: f,
                    parent: null
                });
            });
        }
        
        // 2. Global Constants & Variables
        const globalProps = [
            ...(data['global-variables'] || []),
            ...(data['constants'] || []),
            ...(data['builtin-constants'] || [])
        ];
        globalProps.forEach(c => {
            searchIndex.push({
                id: `global-constant:${c.name}`,
                type: 'constant',
                category: 'Global Constants',
                name: c.name,
                displayName: c.name,
                item: c,
                parent: null
            });
        });
        
        // 3. Classes (Merge base-classes and classes)
        const allClasses = [
            ...(data['base-classes'] || []),
            ...(data['classes'] || [])
        ];
        allClasses.forEach(cls => {
            searchIndex.push({
                id: `class:${cls.name}`,
                type: 'class',
                category: 'Classes',
                name: cls.name,
                displayName: cls.name,
                item: cls,
                parent: null
            });
            
            if (cls.properties) {
                cls.properties.forEach(p => {
                    searchIndex.push({
                        id: `class-property:${cls.name}.${p.name}`,
                        type: 'class-property',
                        category: `Class Property (${cls.name})`,
                        name: `${cls.name}.${p.name}`,
                        displayName: `${cls.name}.${p.name}`,
                        item: p,
                        parent: cls
                    });
                });
            }
            
            if (cls.methods) {
                cls.methods.forEach(m => {
                    searchIndex.push({
                        id: `class-method:${cls.name}:${m.name}`,
                        type: 'class-method',
                        category: `Class Method (${cls.name})`,
                        name: `${cls.name}:${m.name}`,
                        displayName: `${cls.name}:${m.name}`,
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
                        category: `Class Static Function (${cls.name})`,
                        name: `${cls.name}.${f.name}`,
                        displayName: `${cls.name}.${f.name}`,
                        item: f,
                        parent: cls
                    });
                });
            }
        });
        
        // 4. Modules
        if (data.modules) {
            data.modules.forEach(mod => {
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
                        category: `Module Callable (${mod.name})`,
                        name: mod.name,
                        displayName: `${mod.name} (callable)`,
                        item: mod.callable,
                        parent: mod
                    });
                }
                
                if (mod.functions) {
                    mod.functions.forEach(f => {
                        searchIndex.push({
                            id: `module-function:${mod.name}.${f.name}`,
                            type: 'module-function',
                            category: `Module Function (${mod.name})`,
                            name: `${mod.name}.${f.name}`,
                            displayName: `${mod.name}.${f.name}`,
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
                            category: `Module Constant (${mod.name})`,
                            name: `${mod.name}.${c.name}`,
                            displayName: `${mod.name}.${c.name}`,
                            item: c,
                            parent: mod
                        });
                    });
                }
            });
        }
        
        // 5. Metamethods
        if (data.metamethods) {
            Object.entries(data.metamethods).forEach(([name, meta]) => {
                searchIndex.push({
                    id: `metamethod:${name}`,
                    type: 'metamethod',
                    category: 'Metamethods',
                    name: name,
                    displayName: name,
                    item: meta,
                    parent: null
                });
            });
        }
    }

    async function fetchDefinitions() {      
        const headers = {
            "Accept": "application/vnd.github+json"
        };

        try {
            const response = await fetch(API_URL, { headers });
            if (response.status === 200) {
                const apiResponse = await response.json();
                const rawYamlText = decodeBase64Utf8(apiResponse.content);
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
        
        const globalFuncCount = searchIndex.filter(x => x.type === 'function' && x.category === 'Global Functions').length;
        const globalConstCount = searchIndex.filter(x => x.type === 'constant' && x.category === 'Global Constants').length;
        const totalGlobal = globalFuncCount + globalConstCount;
        
        const classCount = searchIndex.filter(x => x.type === 'class').length;
        const metamethodCount = searchIndex.filter(x => x.type === 'metamethod').length;

        const modules = [...new Set(searchIndex.filter(x => x.parent && x.parent.name).map(x => x.parent.name))].sort();

        let html = `
            <div class="section-title">General Categories</div>
            <div class="main-menu-grid">
                <button type="button" class="menu-btn" data-category="functions">
                    <span>Global Functions & Constants</span>
                    <span class="count">${totalGlobal}</span>
                </button>
                <button type="button" class="menu-btn" data-category="classes">
                    <span>Classes</span>
                    <span class="count">${classCount}</span>
                </button>
                <button type="button" class="menu-btn" data-category="metamethods">
                    <span>Metamethods</span>
                    <span class="count">${metamethodCount}</span>
                </button>
            </div>

            <div class="section-title">Libraries / Modules</div>
            <div class="main-menu-grid">
                ${modules.map(modName => {
                    const count = searchIndex.filter(x => x.parent && x.parent.name === modName).length;
                    return `
                        <button type="button" class="menu-btn" data-module="${escapeHtml(modName)}">
                            <span>${escapeHtml(modName)}</span>
                            <span class="count">${count}</span>
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
            title = "Global Functions & Constants";
            items = searchIndex.filter(x => x.type === 'function' && x.category === 'Global Functions')
                .concat(searchIndex.filter(x => x.type === 'constant' && x.category === 'Global Constants'));
        } else if (categoryKey === 'classes') {
            title = "Classes";
            items = searchIndex.filter(x => x.type === 'class');
        } else if (categoryKey === 'metamethods') {
            title = "Metamethods";
            items = searchIndex.filter(x => x.type === 'metamethod');
        } else if (categoryKey === 'module') {
            title = `Module: ${moduleName}`;
            items = searchIndex.filter(x => x.parent && x.parent.name === moduleName);
        }

        items.sort((a, b) => a.displayName.localeCompare(b.displayName, undefined, { sensitivity: 'base' }));

        let html = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h2 style="margin: 0;">${escapeHtml(title)}</h2>
                <button type="button" class="nav-btn" id="category-back-btn">← Back to Menu</button>
            </div>
            <div class="results-wrapper">
                <div class="results-grid">
                    ${items.map(item => `
                        <button type="button" class="result-btn" data-id="${escapeHtml(item.id)}">
                            ${escapeHtml(item.displayName)}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

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

    function renderSignatures(func, parentName, isMethod) {
        const separator = isMethod ? ":" : ".";
        const prefix = parentName ? (parentName + separator) : "";
        
        function buildSig(fObj) {
            let sig = prefix + (fObj.name || func.name);
            if (fObj["type-parameters"] && fObj["type-parameters"].length > 0) {
                sig += "<" + fObj["type-parameters"].join(", ") + ">";
            }
            
            let params = [];
            if (fObj.parameters) {
                fObj.parameters.forEach(p => {
                    if (isMethod && p.name === "self") return;
                    let pStr = p.name;
                    if (p.type) {
                        pStr += ": " + p.type;
                    }
                    params.push(pStr);
                });
            }
            sig += "(" + params.join(", ") + ")";
            if (fObj["return-type"]) {
                sig += ": " + fObj["return-type"];
            }
            return sig;
        }
        
        let sigs = [buildSig(func)];
        if (func.overloads) {
            func.overloads.forEach(ov => {
                sigs.push(buildSig({ ...ov, name: func.name }));
            });
        }
        return sigs;
    }

    function renderPropertySignature(prop, parentName) {
        let sig = parentName ? (parentName + "." + prop.name) : prop.name;
        sig += ": " + prop.type;
        if (prop.value !== undefined) {
            sig += " = " + prop.value;
        }
        return sig;
    }

    function renderParamsTable(func) {
        if (!func.parameters || func.parameters.length === 0) return '';
        
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
        
        func.parameters.forEach(p => {
            html += `
                <tr>
                    <td class="param-name">${escapeHtml(p.name)}</td>
                    <td class="param-type">${escapeHtml(p.type || 'any')}</td>
                    <td>
                        ${escapeHtml(p.comment || '')}
                        ${p.optional ? ' <span style="font-style: italic; opacity: 0.7;">(Optional)</span>' : ''}
                    </td>
                </tr>
            `;
        });
        
        html += `</tbody></table>`;
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
                        <td class="param-type">${escapeHtml(prop.type)}</td>
                        <td>${escapeHtml(prop.comment || '')}</td>
                    </tr>
                `;
            });
            html += `</tbody></table>`;
        }

        if (cls.methods && cls.methods.length > 0) {
            html += `<h3 class="dash-section-title">Methods</h3>`;
            cls.methods.forEach(method => {
                const signatures = renderSignatures(method, cls.name, true);
                html += `
                    <div style="margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--border-color);">
                        <pre><code class="language-lua">${escapeHtml(signatures.join('\n'))}</code></pre>
                        ${method.comment ? `<p style="margin: 0.75rem 0 0.5rem 0; font-size: 0.95rem; opacity: 0.85;">${escapeHtml(method.comment)}</p>` : ''}
                        ${renderParamsTable(method)}
                    </div>
                `;
            });
        }

        if (cls.functions && cls.functions.length > 0) {
            html += `<h3 class="dash-section-title">Static Functions</h3>`;
            cls.functions.forEach(func => {
                const signatures = renderSignatures(func, cls.name, false);
                html += `
                    <div style="margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--border-color);">
                        <pre><code class="language-lua">${escapeHtml(signatures.join('\n'))}</code></pre>
                        ${func.comment ? `<p style="margin: 0.75rem 0 0.5rem 0; font-size: 0.95rem; opacity: 0.85;">${escapeHtml(func.comment)}</p>` : ''}
                        ${renderParamsTable(func)}
                    </div>
                `;
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
        
        const signatures = renderSignatures(func, parentName, isMethod);
        
        let html = `
            <div class="dashboard function-detail">
                <div class="dashboard-header">
                    <pre><code class="language-lua">${escapeHtml(signatures.join('\n'))}</code></pre>
                </div>
                <div class="dashboard-body">
                    <div class="dash-col">
                        ${func.comment ? `<p class="description-text">${escapeHtml(func.comment)}</p>` : ''}
                        ${renderParamsTable(func)}
                    </div>
                    <div class="dash-col">
                        <div class="dash-section-title">Specs</div>
        `;
        
        if (func.sleep) {
            html += `<div class="tech-item"><span class="tech-label">Sleep</span><span class="tech-val">${func.sleep}s</span></div>`;
        }
        if (func["mono-sleep"]) {
            html += `<div class="tech-item"><span class="tech-label">Mono Sleep</span><span class="tech-val">${func["mono-sleep"]}s</span></div>`;
        }
        if (func.energy) {
            html += `<div class="tech-item"><span class="tech-label">Energy</span><span class="tech-val">${func.energy}</span></div>`;
        }
        
        html += `<div class="label-stack">`;
        if (func["must-use"]) {
            html += `<span class="attr-label bg-mandatory">Must Use Return</span>`;
        }
        if (func.fastcall) {
            html += `<span class="attr-label bg-fastcall">Fastcall</span>`;
        }
        if (func["local-only"]) {
            html += `<span class="attr-label bg-local">Local Only</span>`;
        }
        if (func["slua-removed"]) {
            html += `<span class="attr-label bg-deprecated">Removed in SLua</span>`;
        }
        if (func.typechecker) {
            if (func.typechecker.magic) {
                html += `<span class="attr-label bg-magic">Magic Typecheck</span>`;
            }
            if (func.typechecker.builtin) {
                html += `<span class="attr-label bg-native">Builtin</span>`;
            }
        }
        if (func.deprecated) {
            html += `<span class="attr-label bg-deprecated">Deprecated</span>`;
        }
        html += `</div>`;
        
        if (func.deprecated && typeof func.deprecated === 'object') {
            html += `<div style="margin-top: 1rem; font-size: 0.85rem; color: #c0392b;">`;
            if (func.deprecated.reason) html += `<strong>Reason:</strong> ${escapeHtml(func.deprecated.reason)}<br>`;
            if (func.deprecated.use) html += `<strong>Use instead:</strong> <code>${escapeHtml(func.deprecated.use)}</code>`;
            html += `</div>`;
        }
        
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
        const sig = renderPropertySignature(prop, parentName);
        
        let html = `
            <div class="dashboard constant-detail">
                <div class="dashboard-header">
                    <pre><code class="language-lua">${escapeHtml(sig)}</code></pre>
                </div>
                <div class="dashboard-body">
                    <div class="dash-col">
                        ${prop.comment ? `<p class="description-text">${escapeHtml(prop.comment)}</p>` : ''}
                    </div>
                    <div class="dash-col">
                        <div class="dash-section-title">Attributes</div>
                        <div class="tech-item">
                            <span class="tech-label">Modifiable</span>
                            <span class="tech-val">${escapeHtml(prop.modifiable || 'read-only')}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        return html;
    }

    function renderMetamethodDetails(entry) {
        const meta = entry.item;
        
        let html = `
            <div class="dashboard metamethod-detail">
                <div class="dashboard-header">
                    <pre><code class="language-lua">${escapeHtml(entry.name)}</code></pre>
                </div>
                <div class="dashboard-body" style="grid-template-columns: 1fr;">
                    <div class="dash-col">
                        ${meta.tooltip ? `<p class="description-text">${escapeHtml(meta.tooltip)}</p>` : ''}
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

                const exact = searchIndex.find(x => x.displayName.toLowerCase() === query);
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

        const matches = searchIndex.filter(item => {
            return item.displayName.toLowerCase().includes(query) || 
                   (item.item && item.item.comment && item.item.comment.toLowerCase().includes(query)) ||
                   (item.item && item.item.tooltip && item.item.tooltip.toLowerCase().includes(query));
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

        let html = `<h2 style="margin-bottom: 2rem;">Search Results for "${escapeHtml(query)}"</h2>`;
        
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

    fetchDefinitions();
</script>
