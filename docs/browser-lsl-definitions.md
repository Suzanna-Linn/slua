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
                lslData = JSON.parse(cachedData);
            } 
            else if (response.status === 200) {
                console.log("200 OK. File updated, downloading new version...");
                
                const newEtag = response.headers.get("ETag");
                const rawText = await response.text();
                
                lslData = jsyaml.load(rawText); 
                localStorage.setItem(DATA_KEY, JSON.stringify(lslData));
                if (newEtag) {
                    localStorage.setItem(ETAG_KEY, newEtag);
                }
            } 
            else {
                throw new Error(`Unexpected response status: ${response.status}`);
            }
        } catch (error) {
            console.error("Fetch failed. Falling back to cache:", error);
            if (cachedData) {
                lslData = JSON.parse(cachedData);
            }
        }

        if (lslData) {
            document.getElementById('loading').style.display = 'none';
        } else {
            document.getElementById('loading').innerText = "Failed to load definitions. Please reload the page.";
        }
    }

    fetchDefinitions();
</script>
