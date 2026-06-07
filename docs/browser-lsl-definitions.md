---
layout: default
title: ll library
---

<div id="loading">Loading definitions...</div>

<div id="sidebar">
    <input type="text" id="search" placeholder="Search functions...">
    <div id="list-container"></div>
</div>

<div id="content">
    <h1 id="doc-title">Select a function</h1>
    <div id="doc-body">Please select an item from the sidebar to view details.</div>
</div>

 <script type="module">
    const RAW_URL = "https://raw.githubusercontent.com/secondlife/lsl-definitions/main/lsl_definitions.yaml";
    const DATA_KEY = "lsl_definitions_data";
    const ETAG_KEY = "lsl_definitions_etag";
    let lslData = null;

    async function init() {
        try {
            const response = await fetch(SOURCE_URL);
            const yamlText = await response.text();
            lslData = jsyaml.load(yamlText);

            document.getElementById('loading').style.display = 'none';

            renderList("");
        } catch (e) {
            document.getElementById('loading').innerText = "Failed to load definitions. Please refresh.";
            console.error(e);
        }
    }

    function renderList(query) {
        const container = document.getElementById('list-container');
        container.innerHTML = "";

        const q = query.toLowerCase();
        
        const functions = lslData.functions || {};
        Object.keys(functions).forEach(name => {
            if (name.toLowerCase().includes(q)) {
                const div = document.createElement('div');
                div.className = "list-item";
                div.innerText = name;
                div.onclick = () => showDetails(name, functions[name]);
                container.appendChild(div);
            }
        });
    }

    function showDetails(name, details) {
        document.getElementById('doc-title').innerText = name;
        
        let html = `<p><strong>Return Type:</strong> ${details.return || 'void'}</p>`;
        html += `<p>${details.tooltip || 'No description available.'}</p>`;
        
        if (details.arguments && details.arguments.length > 0) {
            html += `<h3>Arguments:</h3><ul>`;
            details.arguments.forEach(argObj => {
                const argName = Object.keys(argObj)[0];
                const argDetails = argObj[argName];
                html += `<li><strong>${argName}</strong> (${argDetails.type}): ${argDetails.tooltip || ''}</li>`;
            });
            html += `</ul>`;
        }

        document.getElementById('doc-body').innerHTML = html;
    }
    
    async function fetchDefinitions() {
        import jsyaml from 'https://esm.sh/js-yaml@4.1.0';
        
        const cachedData = localStorage.getItem(DATA_KEY);
        const cachedEtag = localStorage.getItem(ETAG_KEY);
    
        const headers = {};
        if (cachedEtag) {
            headers["If-None-Match"] = cachedEtag;
        }
    
        try {
            const response = await fetch(RAW_URL, { headers });
    
            if (response.status === 304) {
                console.log("304 Not Modified. Using local cache.");
                return JSON.parse(cachedData);
            }
    
            if (response.status === 200) {
                console.log("200 OK. File updated, downloading new version...");
                
                const newEtag = response.headers.get("ETag");
                const rawText = await response.text();
                
                const parsedData = jsyaml.load(rawText); 
                localStorage.setItem(DATA_KEY, JSON.stringify(parsedData));
                if (newEtag) {
                    localStorage.setItem(ETAG_KEY, newEtag);
                }
    
                lslData = parsedData;
                document.getElementById('loading').style.display = 'none';
                renderList("");
            } else {
                throw new Error(`Unexpected response status: ${response.status}`);
            }
        } catch (error) {
            console.error("Fetch failed. Falling back to cache:", error);
            return cachedData ? JSON.parse(cachedData) : null;
        }
    }

    document.getElementById('search').oninput = (e) => {
        renderList(e.target.value);
    };

    fetchDefinitions();
</script>
