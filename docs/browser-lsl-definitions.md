---
layout: default
title: ll library
---

<div id="loading">Loading definitions...</div>

 <script type="module">
    import jsyaml from 'https://esm.sh/js-yaml@4.1.0';
    const RAW_URL = "https://raw.githubusercontent.com/secondlife/lsl-definitions/main/lsl_definitions.yaml";
    const DATA_KEY = "lsl_definitions_data";
    const ETAG_KEY = "lsl_definitions_etag";
    let lslData = null;

    async function fetchDefinitions() {      
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
        }
    }

    fetchDefinitions();
</script>
