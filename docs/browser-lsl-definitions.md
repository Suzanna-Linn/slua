---
layout: default
title: ll library
---

<div id="loading">Loading definitions...</div>

<script type="module">
    import jsyaml from 'https://esm.sh/js-yaml@4.1.0';
    
    // Use the official GitHub REST API endpoint
    const API_URL = "https://api.github.com/repos/secondlife/lsl-definitions/contents/lsl_definitions.yaml";
    const DATA_KEY = "lsl_definitions_data";
    const ETAG_KEY = "lsl_definitions_etag";
    let lslData = null;

    // A robust, UTF-8/emoji-safe Base64 decoder for browser JS
    function decodeBase64Utf8(base64Str) {
        // Strip out any newlines or spaces that GitHub inserts in base64
        const cleaned = base64Str.replace(/\s/g, '');
        const binaryString = atob(cleaned);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return new TextDecoder("utf-8").decode(bytes);
    }

    function renderList(query) {
        console.log("Rendering list...");
        // Your UI rendering code here...
    }

    async function fetchDefinitions() {      
        const cachedData = localStorage.getItem(DATA_KEY);
        const cachedEtag = localStorage.getItem(ETAG_KEY);
    
        const headers = {
            "Accept": "application/vnd.github+json" // Recommended API header
        };
        
        if (cachedEtag) {
            headers["If-None-Match"] = cachedEtag;
        }
    
        try {
            const response = await fetch(API_URL, { headers });
    
            if (response.status === 304) {
                console.log("304 Not Modified. Using local cache. (Rate limit spared!)");
                lslData = JSON.parse(cachedData);
            } 
            else if (response.status === 200) {
                console.log("200 OK. File updated, downloading and parsing new version...");
                
                // GitHub REST API explicitly exposes the ETag header via CORS
                const newEtag = response.headers.get("ETag");
                const apiResponse = await response.json();
                
                // Decode the Base64 content field returned by GitHub's API
                const rawYamlText = decodeBase64Utf8(apiResponse.content);
                
                lslData = jsyaml.load(rawYamlText); 
                
                // Save the parsed data and the new ETag
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

        // Update the UI
        if (lslData) {
            document.getElementById('loading').style.display = 'none';
            renderList("");
        } else {
            document.getElementById('loading').innerText = "Failed to load definitions. Please check your connection.";
        }
    }

    fetchDefinitions();
</script>
