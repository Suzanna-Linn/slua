---
layout: default
title: ll library
slua_beta: true
---

<style>
    .sticky-navbar {
        position: sticky;
        top: 0;
        z-index: 100;
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        border-bottom: 1px solid var(--border-color, rgba(128, 128, 128, 0.25));
        padding: 0.75rem 1.5rem;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
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
        border: 1.5px solid rgba(128, 128, 128, 0.5); 
        border-radius: 0.375rem;
        outline: none;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .search-input:focus {
        border-color: var(--primary-color, #4f46e5);
        box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
    }

    .nav-buttons-container {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .nav-btn {
        background-color: rgba(128, 128, 128, 0.12); 
        border: 1px solid rgba(128, 128, 128, 0.3);
        color: inherit;
        padding: 0.5rem 1rem;
        border-radius: 0.375rem;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
    }

    .nav-btn:hover {
        background-color: rgba(128, 128, 128, 0.25);
    }

    .nav-btn.active {
        background-color: var(--primary-color, #4f46e5);
        border-color: var(--primary-color, #4f46e5);
        color: #ffffff;
    }

    .nav-extra-space {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .content-container {
        padding: 2rem 1.5rem;
        max-width: 1200px;
        margin: 0 auto;
    }

    #loading {
        font-size: 1rem;
        color: inherit;
        opacity: 0.7;
        text-align: center;
        margin-top: 2rem;
    }

    .results-wrapper {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        margin-top: 1rem;
    }

    .results-group {
        width: 100%;
    }

    .results-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 0.5rem;
        max-width: 1000px;
        width: 100%;
        margin: 0 auto;
    }

    .result-btn {
        background-color: rgba(128, 128, 128, 0.08);
        border: 1px solid rgba(128, 128, 128, 0.2);
        color: inherit;
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
        font-size: 0.85rem;
        font-family: monospace;
        text-align: center; 
        width: 100%; 
        box-sizing: border-box;
        cursor: pointer;
        transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.1s ease;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .result-btn:hover {
        background-color: var(--primary-color, #4f46e5);
        border-color: var(--primary-color, #4f46e5);
        color: #ffffff;
        transform: translateY(-1px);
    }

    .result-btn:active {
        transform: translateY(0);
    }

    .no-results {
        text-align: center;
        opacity: 0.6;
        padding: 2rem;
        font-size: 0.95rem;
    }

        :root {
            --bg-color: #f9f9f9; --text-color: #2c3e50; --header-bg: #ffffff;
            --border-color: #dee2e6; --accent-lsl: #007bff; --accent-lua: #e67e22;
            --table-head: #f2f2f2; --card-bg: #ffffff; --code-bg: #f1f1f1;
        }
        body.dark-mode {
            --bg-color: #121212; --text-color: #e0e0e0; --header-bg: #1f1f1f;
            --border-color: #333; --accent-lsl: #3796ff; --accent-lua: #ff9f43;
            --table-head: #2a2a2a; --card-bg: #1e1e1e; --code-bg: #2d2d2d;
        }

        body { font-family: system-ui, sans-serif; background-color: var(--bg-color); color: var(--text-color); margin: 0; transition: background 0.3s; line-height: 1.5; }
        header { position: sticky; top: 0; background: var(--header-bg); border-bottom: 1px solid var(--border-color); padding: 10px 20px; display: flex; justify-content: space-between; align-items: center; z-index: 10; }
        .controls { display: flex; gap: 15px; font-size: 0.9em; font-weight: bold; }
        main { width: 100%; margin: 20px auto; padding: 0 20px; }
        
        body.hide-lua .lua-block { display: none !important; }
        body.hide-lsl .lsl-block { display: none !important; }
        body.hide-lua .lua-section { display: none !important; }
        body.hide-lsl .lsl-section { display: none !important; }

        .item-card { background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 8px; padding: 25px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }

        .lsl-block, .lua-block {
            display: block;
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            overflow: hidden;
            margin: 20px 0;
            padding: 12px 15px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            border-left: 6px solid var(--accent-lsl); 
        }
        .lua-block { 
            border-left-color: var(--accent-lua); 
        }
        .lsl-block pre, .lua-block pre {
            margin: 0;
            background: var(--code-bg);
            border-radius: 6px;
            border: 1px solid rgba(0,0,0,0.05);
        }

        h2 { color: #2c3e50; border-bottom: 2px solid #eee; padding-bottom: 5px; margin-top: 30px; }
        h3 { color: #34495e; margin-top: 20px; }
        p { margin-bottom: 15px; }
        a { color: #2980b9; text-decoration: none; }
        a:hover { text-decoration: underline; }
        ul, ol { margin-bottom: 15px; }
        li { margin-bottom: 5px; }
        
        pre { background: var(--code-bg); padding: 12px; border-radius: 5px; overflow-x: auto; font-family: monospace; }
        table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        th, td { border: 1px solid var(--border-color); padding: 10px; text-align: left; }
        th { background: var(--table-head); }
        .tag { display: inline-block; padding: 2px 10px; border-radius: 9999px; font-size: 0.7em; text-transform: uppercase; color: white; margin-bottom: 8px; margin-right: 10px; }
        .lsl-tag { background: var(--accent-lsl); }
        .lua-tag { background: var(--accent-lua); }
        
        #loader { text-align: center; margin-top: 100px; font-size: 1.2em; color: #888; }

          .dashboard {
              display: flex;
              flex-direction: column;
              background: var(--card-bg);
              border: 1px solid var(--border-color);
              border-radius: 12px;
              overflow: hidden;
              margin-bottom: 30px;
              box-shadow: 0 4px 15px rgba(0,0,0,0.08);
          }
          .dashboard.summary-function { border-left: 6px solid #3498db; }
          .dashboard.summary-constant { border-left: 6px solid #27ae60; }
          .dashboard.summary-event    { border-left: 6px solid #8e44ad; }
          .dashboard-header {
              padding: 20px;
              background: rgba(128,128,128,0.05);
              border-bottom: 1px solid var(--border-color);
          }
          .dashboard-body {
              display: grid;
              grid-template-columns: 1fr 150px 100px;
              gap: 25px;
              padding: 25px;
          }
          .dash-section-title {
              font-size: 0.7em;
              font-weight: bold;
              text-transform: uppercase;
              color: #95a5a6;
              margin-bottom: 12px;
              border-bottom: 1px solid var(--border-color);
              padding-bottom: 4px;
              letter-spacing: 0.5px;
          }
        
          /* Left Column Styles */
          .description-text { 
              margin-top: 0; 
              font-style: italic; 
              font-size: 1.05em; 
              line-height: 1.5;
              margin-bottom: 25px;
          }
          .param-table { 
              border-collapse: collapse; 
              border: none; 
              width: auto; 
          }
          .param-table td { 
              border: none; 
              padding: 0 15px 12px 0; 
              vertical-align: top; 
          }
        
          /* Middle Column Styles */
          .meta-list { list-style: none; padding: 0; margin: 0 0 20px 0; }
          .meta-list li { 
              padding: 5px 10px; 
              margin-bottom: 5px; 
              background: rgba(128,128,128,0.08); 
              border-radius: 4px; 
              font-size: 0.85em; 
              border: 1px solid rgba(128,128,128,0.1);
          }
        
          /* Right Column Styles */
          .tech-item { display: flex; justify-content: space-between; font-size: 0.85em; margin-bottom: 6px; padding-bottom: 4px; border-bottom: 1px inset rgba(128,128,128,0.05); }
          .tech-label { color: #7f8c8d; font-weight: 500; }
          .tech-val { font-family: monospace; font-weight: bold; }
          
          .label-stack { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 15px; }
          .attr-label { 
              font-size: 0.65em; 
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
          .bg-experience { background: #d35400; }
          .bg-detected   { background: #8e44ad; }
          .bg-deprecated { background: #c0392b; }
          .bg-godmode    { background: #f1c40f; }
          .bg-lindenexp { background: #1abc9c; }
        
          .alt-code {
              display: block;
              background: #fdf2f2;
              color: #c0392b;
              padding: 8px;
              border-radius: 4px;
              font-family: monospace;
              font-size: 0.9em;
              border: 1px solid #f5c6cb;
          }
          body.dark-mode .alt-code { background: #2d1a1a; border-color: #602020; color: #ff8080; }
        
          @media (max-width: 1000px) {
              .dashboard-body { grid-template-columns: 1.5fr 1fr; }
              .dash-col:last-child { grid-column: span 2; }
          }
          @media (max-width: 700px) {
              .dashboard-body { grid-template-columns: 1fr; }
              .dash-col:last-child { grid-column: span 1; }
          }
</style>

<header class="sticky-navbar">
    <a href="#" class="navbar-brand">LL Definitions</a>

    <div class="search-container">
        <input 
            type="text" 
            id="search-input" 
            class="search-input" 
            placeholder="Search functions, events, or constants..." 
            aria-label="Search all definitions"
        />
    </div>

    <nav class="nav-buttons-container" aria-label="Alternative searches">
        <button type="button" class="nav-btn" data-search-type="functions">Functions</button>
        <button type="button" class="nav-btn" data-search-type="events">Events</button>
        <button type="button" class="nav-btn" data-search-type="constants">Constants</button>
        <label><input type="checkbox" id="lsl-toggle" checked> LSL</label>
        <label><input type="checkbox" id="lua-toggle" checked> Lua</label>
    </nav>

    <div class="nav-extra-space" id="extra-nav-controls">

    </div>
</header>

<main class="content-container">
    <div id="loading">Loading definitions...</div>
    <div id="definitions-display"></div>
</main>

<script type="module">
    import jsyaml from 'https://esm.sh/js-yaml@4.1.0';
    
    const API_URL = "https://api.github.com/repos/secondlife/lsl-definitions/contents/lsl_definitions.yaml";
    const DATA_KEY = "lsl_definitions_data";
    const ETAG_KEY = "lsl_definitions_etag";
    let lslData = null;

    function decodeBase64Utf8(base64Str) {
        const cleaned = base64Str.replace(/\s/g, '');
        const binaryString = atob(cleaned);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return new TextDecoder("utf-8").decode(bytes);
    }

    async function fetchDefinitions() {      
        const cachedData = localStorage.getItem(DATA_KEY);
        const cachedEtag = localStorage.getItem(ETAG_KEY);
    
        const headers = {
            "Accept": "application/vnd.github+json"
        };
        
        if (cachedEtag) {
            headers["If-None-Match"] = cachedEtag;
        }
    
        try {
            const response = await fetch(API_URL, { headers });
    
            if (response.status === 304) {
                console.log("304 Not Modified. Using local cache.");
                lslData = JSON.parse(cachedData);
            } 
            else if (response.status === 200) {
                console.log("200 OK. File updated, downloading and parsing new version...");
                
                const newEtag = response.headers.get("ETag");
                const apiResponse = await response.json();
                
                const rawYamlText = decodeBase64Utf8(apiResponse.content);
                
                lslData = jsyaml.load(rawYamlText); 
                
                localStorage.setItem(DATA_KEY, JSON.stringify(lslData));
                if (newEtag) {
                    localStorage.setItem(ETAG_KEY, newEtag);
                }
            } 
            else {
                throw new Error(`Unexpected status code: ${response.status}`);
            }
        } catch (error) {
            console.error("Fetch failed. Falling back to cache:", error);
            if (cachedData) {
                lslData = JSON.parse(cachedData);
            }
        }

        if (lslData) {
            document.getElementById('loading').style.display = 'none';
            initUIListeners();
        } else {
            document.getElementById('loading').innerText = "Failed to load definitions. Please try reloading.";
        }
    }

    function initUIListeners() {
        const searchInput = document.getElementById('search-input');
        const searchButtons = document.querySelectorAll('.nav-btn');
        const displayContainer = document.getElementById('definitions-display');

        let currentViewState = {
            type: 'empty', // 'search', 'category-list', 'category-items', 'empty'
            data: {}
        };

        searchInput.focus();

        function normalizeArrayOrObject(data) {
            if (!data) return [];
            if (Array.isArray(data)) {
                return data;
            }
            if (typeof data === 'object') {
                return Object.entries(data).map(([key, val]) => {
                    if (val && typeof val === 'object') {
                        return { name: val.name || key, ...val };
                    } else {
                        return { name: key, value: val };
                    }
                });
            }
            return [];
        }

        function getCategoriesForType(type) {
            const categoriesSet = new Set();

            if (type === 'functions') {
                const rawFunctions = normalizeArrayOrObject(lslData.functions);
                rawFunctions.forEach(f => {
                    let cats = [];
                    if (f.categories) {
                        if (Array.isArray(f.categories)) cats = f.categories;
                        else if (typeof f.categories === 'string') cats = [f.categories];
                    }
                    if (cats.length === 0) cats = ["[uncategorized]"];
                    cats.forEach(c => categoriesSet.add(c));
                });
            } else if (type === 'events') {
                const rawEvents = normalizeArrayOrObject(lslData.events);
                rawEvents.forEach(e => {
                    let cats = [];
                    if (e.categories) {
                        if (Array.isArray(e.categories)) cats = e.categories;
                        else if (typeof e.categories === 'string') cats = [e.categories];
                    }
                    if (cats.length === 0) cats = ["[uncategorized]"];
                    cats.forEach(c => categoriesSet.add(c));
                });
            } else if (type === 'constants') {
                const rawConstants = normalizeArrayOrObject(lslData.constants);
                rawConstants.forEach(c => {
                    let cats = [];
                    if (c['member-of']) {
                        if (Array.isArray(c['member-of'])) cats = c['member-of'];
                        else if (typeof c['member-of'] === 'string') cats = [c['member-of']];
                    }
                    if (cats.length === 0) cats = ["[uncategorized]"];
                    cats.forEach(c => categoriesSet.add(c));
                });
            }

            return Array.from(categoriesSet).sort((a, b) => 
                a.localeCompare(b, undefined, { sensitivity: 'base' })
            );
        }

        function renderCategories(type) {
            currentViewState = { type: 'category-list', data: { searchType: type } };
            const categories = getCategoriesForType(type);

            if (categories.length === 0) {
                displayContainer.innerHTML = `<div class="no-results">No categories found for ${escapeHtml(type)}.</div>`;
                return;
            }

            const htmlOutput = `
                <div class="results-wrapper">
                    <div class="results-group">
                        <div class="results-grid">
                            ${categories.map(cat => `
                                <button type="button" class="result-btn category-btn" data-search-type="${type}" data-category-name="${escapeHtml(cat)}">
                                    ${escapeHtml(cat)}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;

            displayContainer.innerHTML = htmlOutput;
            bindCategoryBtnHandlers();
        }

        function renderCategoryItems(type, categoryName) {
            currentViewState = { type: 'category-items', data: { searchType: type, categoryName: categoryName } };
            let matchedItems = [];

            if (type === 'functions') {
                const rawFunctions = normalizeArrayOrObject(lslData.functions);
                matchedItems = rawFunctions.filter(f => {
                    let cats = [];
                    if (f.categories) {
                        if (Array.isArray(f.categories)) cats = f.categories;
                        else if (typeof f.categories === 'string') cats = [f.categories];
                    }
                    return (categoryName === '[uncategorized]') ? (cats.length === 0) : cats.includes(categoryName);
                });
            } else if (type === 'events') {
                const rawEvents = normalizeArrayOrObject(lslData.events);
                matchedItems = rawEvents.filter(e => {
                    let cats = [];
                    if (e.categories) {
                        if (Array.isArray(e.categories)) cats = e.categories;
                        else if (typeof e.categories === 'string') cats = [e.categories];
                    }
                    return (categoryName === '[uncategorized]') ? (cats.length === 0) : cats.includes(categoryName);
                });
            } else if (type === 'constants') {
                const rawConstants = normalizeArrayOrObject(lslData.constants);
                matchedItems = rawConstants.filter(c => {
                    let cats = [];
                    if (c['member-of']) {
                        if (Array.isArray(c['member-of'])) cats = c['member-of'];
                        else if (typeof c['member-of'] === 'string') cats = [c['member-of']];
                    }
                    return (categoryName === '[uncategorized]') ? (cats.length === 0) : cats.includes(categoryName);
                });
            }

            matchedItems.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));

            if (matchedItems.length === 0) {
                displayContainer.innerHTML = `<div class="no-results">No items found in category "${escapeHtml(categoryName)}".</div>`;
                return;
            }

            const singularType = type === 'functions' ? 'function' : (type === 'events' ? 'event' : 'constant');
            const htmlOutput = `
                <div class="results-wrapper">
                    <div class="results-group">
                        <div class="results-grid">
                            ${matchedItems.map(item => `
                                <button type="button" class="result-btn" data-type="${singularType}" data-name="${escapeHtml(item.name)}">
                                    ${escapeHtml(item.name)}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;

            displayContainer.innerHTML = htmlOutput;
            bindResultBtnHandlers();
        }

        function renderItemDetails(type, name) {
            let item = null;

            if (type === 'function') {
                const rawFunctions = normalizeArrayOrObject(lslData.functions);
                item = rawFunctions.find(f => f.name === name);
            } else if (type === 'event') {
                const rawEvents = normalizeArrayOrObject(lslData.events);
                item = rawEvents.find(e => e.name === name);
            } else if (type === 'constant') {
                const rawConstants = normalizeArrayOrObject(lslData.constants);
                item = rawConstants.find(c => c.name === name);
            }

            if (!item) {
                displayContainer.innerHTML = `<div class="no-results">Error: Details for ${escapeHtml(type)} "${escapeHtml(name)}" not found.</div>`;
                return;
            }

            const backButtonHtml = currentViewState.type !== 'empty' ? `
                <button type="button" id="details-back-btn" class="nav-btn" style="margin-bottom: 1.5rem;">
                    &larr; Back
                </button>
            ` : '';

            let detailsHtml = backButtonHtml;
            detailsHtml += `<div class="details-container">`;

            detailsHtml += `
                <div class="details-header">
                    <h2 class="details-title">${escapeHtml(item.name)}</h2>
                    <span class="details-type-badge">${escapeHtml(type)}</span>
                </div>
            `;

            if (type === 'function' || type === 'event') {
                const paramsSig = (item.parameters || []).map(p => {
                    const isOptional = p.optional || (p.type && p.type.endsWith('?'));
                    return `${p.name}: ${p.type || 'any'}${isOptional ? '?' : ''}`;
                }).join(', ');
                const returnSig = item['return-type'] ? ` -> ${item['return-type']}` : '';
                detailsHtml += `
                    <div class="details-signature">${escapeHtml(item.name)}(${escapeHtml(paramsSig)})${escapeHtml(returnSig)}</div>
                `;

                let flagsHtml = '';
                if (item.deprecated) {
                    let depText = 'Deprecated';
                    if (typeof item.deprecated === 'object') {
                        const reason = item.deprecated.reason ? ` - ${item.deprecated.reason}` : '';
                        const useInstead = item.deprecated.use ? ` (Use instead: ${item.deprecated.use})` : '';
                        depText += `${reason}${useInstead}`;
                    }
                    flagsHtml += `<div class="badge-flag badge-deprecated" style="display:inline-block; margin-right:0.5rem; margin-bottom:0.5rem; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-weight: bold;">${escapeHtml(depText)}</div>`;
                }
                if (item['local-only']) flagsHtml += `<span class="badge-flag" style="margin-right:0.5rem; margin-bottom:0.5rem; display:inline-block;">Local Only</span>`;
                if (item['slua-removed']) flagsHtml += `<span class="badge-flag" style="margin-right:0.5rem; margin-bottom:0.5rem; display:inline-block;">Removed in SLua</span>`;
                if (item['must-use']) flagsHtml += `<span class="badge-flag" style="margin-right:0.5rem; margin-bottom:0.5rem; display:inline-block;">Must Use Return</span>`;
                if (item.fastcall) flagsHtml += `<span class="badge-flag" style="margin-right:0.5rem; margin-bottom:0.5rem; display:inline-block;">Fastcall VM Bytecode</span>`;
                
                if (flagsHtml) {
                    detailsHtml += `<div style="margin-bottom: 1.5rem;">${flagsHtml}</div>`;
                }

                if (item.comment) {
                    detailsHtml += `
                        <div class="details-comment">
                            ${escapeHtml(item.comment)}
                        </div>
                    `;
                }

                if (item.parameters && item.parameters.length > 0) {
                    detailsHtml += `<div class="details-section-title">Parameters</div>`;
                    detailsHtml += `<ul class="details-list">`;
                    item.parameters.forEach(p => {
                        const isOptional = p.optional || (p.type && p.type.endsWith('?'));
                        const optText = isOptional ? ' (optional)' : '';
                        const obsText = (p.observes && p.observes !== 'read-write') ? ` [${p.observes}]` : '';
                        detailsHtml += `
                            <li class="details-list-item">
                                <span class="param-name">${escapeHtml(p.name)}</span>: 
                                <span class="param-type">${escapeHtml(p.type || 'any')}</span>${optText}${obsText}
                                ${p.comment ? ` &mdash; ${escapeHtml(p.comment)}` : ''}
                            </li>
                        `;
                    });
                    detailsHtml += `</ul>`;
                }

                if (item.overloads && item.overloads.length > 0) {
                    detailsHtml += `<div class="details-section-title">Overloads</div>`;
                    item.overloads.forEach(o => {
                        const oParamsSig = (o.parameters || []).map(p => {
                            const isOpt = p.optional || (p.type && p.type.endsWith('?'));
                            return `${p.name}: ${p.type || 'any'}${isOpt ? '?' : ''}`;
                        }).join(', ');
                        const oReturnSig = o['return-type'] ? ` -> ${o['return-type']}` : '';
                        detailsHtml += `
                            <div class="details-signature" style="margin-bottom:0.5rem;">${escapeHtml(item.name)}(${escapeHtml(oParamsSig)})${escapeHtml(oReturnSig)}</div>
                            ${o.comment ? `<div class="details-comment" style="font-size:0.9rem; margin-left: 1rem; margin-bottom:1rem;">${escapeHtml(o.comment)}</div>` : ''}
                        `;
                    });
                }

            } else if (type === 'constant') {
                const isModifiable = item.modifiable && item.modifiable !== 'read-only';
                const typeText = item.type ? `: ${item.type}` : '';
                const valText = item.value !== undefined ? ` = ${item.value}` : '';
                
                detailsHtml += `
                    <div class="details-signature">const ${escapeHtml(item.name)}${escapeHtml(typeText)}${escapeHtml(valText)}</div>
                `;

                if (isModifiable) {
                    detailsHtml += `<div style="margin-bottom: 1.5rem;"><span class="badge-flag">Modifiable: ${escapeHtml(item.modifiable)}</span></div>`;
                }

                if (item.comment) {
                    detailsHtml += `
                        <div class="details-comment">
                            ${escapeHtml(item.comment)}
                        </div>
                    `;
                }
            }

            detailsHtml += `</div>`;
            displayContainer.innerHTML = detailsHtml;

            const backBtn = document.getElementById('details-back-btn');
            if (backBtn) {
                backBtn.addEventListener('click', () => {
                    if (currentViewState.type === 'search') {
                        searchInput.value = currentViewState.data.query;
                        renderSearchResults(currentViewState.data.query);
                        searchInput.focus();
                    } else if (currentViewState.type === 'category-list') {
                        renderCategories(currentViewState.data.searchType);
                    } else if (currentViewState.type === 'category-items') {
                        renderCategoryItems(currentViewState.data.searchType, currentViewState.data.categoryName);
                    } else {
                        displayContainer.innerHTML = '';
                    }
                });
            }
        }

        searchButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const searchType = e.currentTarget.getAttribute('data-search-type');
                
                searchButtons.forEach(btn => btn.classList.remove('active'));
                e.currentTarget.classList.add('active');

                searchInput.value = '';
                renderCategories(searchType);
            });
        });

        searchInput.addEventListener('focus', () => {
            searchButtons.forEach(btn => btn.classList.remove('active'));
            
            const query = searchInput.value.toLowerCase().trim();
            if (!query) {
                displayContainer.innerHTML = '';
                currentViewState = { type: 'empty', data: {} };
            } else {
                renderSearchResults(query);
            }
        });

        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.toLowerCase().trim();
                if (!query) return;

                const rawFunctions = normalizeArrayOrObject(lslData.functions);
                const rawEvents = normalizeArrayOrObject(lslData.events);
                const rawConstants = normalizeArrayOrObject(lslData.constants);

                let exactMatch = null;
                let exactType = '';

                const foundFunc = rawFunctions.find(f => f.name && f.name.toLowerCase() === query);
                if (foundFunc) {
                    exactMatch = foundFunc;
                    exactType = 'function';
                } else {
                    const foundEvent = rawEvents.find(e => e.name && e.name.toLowerCase() === query);
                    if (foundEvent) {
                        exactMatch = foundEvent;
                        exactType = 'event';
                    } else {
                        const foundConst = rawConstants.find(c => c.name && c.name.toLowerCase() === query);
                        if (foundConst) {
                            exactMatch = foundConst;
                            exactType = 'constant';
                        }
                    }
                }

                if (exactMatch) {
                    e.preventDefault();
                    renderItemDetails(exactType, exactMatch.name);
                    return;
                }

                const results = displayContainer.querySelectorAll('.result-btn:not(.category-btn)');
                if (results.length === 1) {
                    e.preventDefault();
                    const name = results[0].getAttribute('data-name');
                    const type = results[0].getAttribute('data-type');
                    renderItemDetails(type, name);
                }
            }
        });

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            renderSearchResults(query);
        });

        function renderSearchResults(query) {
            if (!query) {
                displayContainer.innerHTML = '';
                currentViewState = { type: 'empty', data: {} };
                return;
            }

            currentViewState = { type: 'search', data: { query: query } };

            const rawFunctions = normalizeArrayOrObject(lslData.functions);
            const rawEvents = normalizeArrayOrObject(lslData.events);
            const rawConstants = normalizeArrayOrObject(lslData.constants);

            const matchedFunctions = rawFunctions.filter(item => item.name && item.name.toLowerCase().includes(query));
            const matchedEvents = rawEvents.filter(item => item.name && item.name.toLowerCase().includes(query));
            const matchedConstants = rawConstants.filter(item => item.name && item.name.toLowerCase().includes(query));

            const totalMatches = matchedFunctions.length + matchedEvents.length + matchedConstants.length;

            if (totalMatches === 0) {
                displayContainer.innerHTML = `<div class="no-results">No matches found for "${escapeHtml(query)}"</div>`;
                return;
            }

            let htmlOutput = '<div class="results-wrapper">';

            if (matchedFunctions.length > 0) {
                htmlOutput += `
                    <div class="results-group">
                        <div class="results-grid">
                            ${matchedFunctions.map(f => `<button type="button" class="result-btn" data-type="function" data-name="${escapeHtml(f.name)}">${escapeHtml(f.name)}</button>`).join('')}
                        </div>
                    </div>
                `;
            }

            if (matchedEvents.length > 0) {
                htmlOutput += `
                    <div class="results-group">
                        <div class="results-grid">
                            ${matchedEvents.map(e => `<button type="button" class="result-btn" data-type="event" data-name="${escapeHtml(e.name)}">${escapeHtml(e.name)}</button>`).join('')}
                        </div>
                    </div>
                `;
            }

            if (matchedConstants.length > 0) {
                htmlOutput += `
                    <div class="results-group">
                        <div class="results-grid">
                            ${matchedConstants.map(c => `<button type="button" class="result-btn" data-type="constant" data-name="${escapeHtml(c.name)}">${escapeHtml(c.name)}</button>`).join('')}
                        </div>
                    </div>
                `;
            }

            htmlOutput += '</div>';
            displayContainer.innerHTML = htmlOutput;

            bindResultBtnHandlers();
        }

        function bindResultBtnHandlers() {
            const resultButtons = displayContainer.querySelectorAll('.result-btn:not(.category-btn)');
            resultButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const name = e.currentTarget.getAttribute('data-name');
                    const type = e.currentTarget.getAttribute('data-type');
                    console.log(`Clicked result button: [${type}] ${name}`);
                    
                    renderItemDetails(type, name);
                });
            });
        }

        function bindCategoryBtnHandlers() {
            const catButtons = displayContainer.querySelectorAll('.category-btn');
            catButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const catName = e.currentTarget.getAttribute('data-category-name');
                    const searchType = e.currentTarget.getAttribute('data-search-type');
                    console.log(`Clicked category button: "${catName}" inside "${searchType}"`);
                    
                    renderCategoryItems(searchType, catName);
                });
            });
        }

        function escapeHtml(str) {
            return str
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        }
    }

    fetchDefinitions();

    if (localStorage.getItem('theme') === 'dark') body.classList.add('dark-mode');
    
    const lsl = localStorage.getItem('lsl') !== 'off';
    const lua = localStorage.getItem('lua') !== 'off';
    document.getElementById('lsl-toggle').checked = lsl;
    document.getElementById('lua-toggle').checked = lua;
    if (!lsl) body.classList.add('hide-lsl');
    if (!lua) body.classList.add('hide-lua');

    const updateToggleState = (key, isChecked) => {
        body.classList.toggle(`hide-${key}`, !isChecked);
        localStorage.setItem(key, isChecked ? 'on' : 'off');
    };

    const lslToggle = document.getElementById('lsl-toggle');
    const luaToggle = document.getElementById('lua-toggle');

    lslToggle.onchange = (e) => {
        if (!e.target.checked) {
            luaToggle.checked = true;
            updateToggleState('lua', true);
        }
        updateToggleState('lsl', e.target.checked);
    };

    luaToggle.onchange = (e) => {
        if (!e.target.checked) {
            lslToggle.checked = true;
            updateToggleState('lsl', true);
        }
        updateToggleState('lua', e.target.checked);
    };
</script>
