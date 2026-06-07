---
layout: default
title: ll library
---

<!-- Scoped Styles for the Menu Bar, Modern UI Elements, and Search Grid -->
<style>
    /* Sticky container for the top navigation bar */
    .sticky-navbar {
        position: sticky;
        top: 0;
        z-index: 100;
        background-color: var(--navbar-bg, rgba(255, 255, 255, 0.85));
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

    /* Brand/Title styling */
    .navbar-brand {
        font-weight: 700;
        font-size: 1.25rem;
        color: inherit;
        text-decoration: none;
        letter-spacing: -0.025em;
    }

    /* Search Input Group */
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

    /* Action / Navigation Buttons */
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

    /* Reserved space for future extensions */
    .nav-extra-space {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    /* Main Content Wrapper below sticky navbar */
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

    /* Search Results Styling (Grid and Centered Table representation) */
    .results-wrapper {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        margin-top: 1rem;
    }

    .results-group {
        text-align: center;
    }

    .results-group-title {
        font-size: 0.8rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        opacity: 0.6;
        margin-bottom: 0.75rem;
    }

    /* Layout representing rows centered with several items each */
    .results-grid {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.5rem;
        max-width: 1000px;
        margin: 0 auto;
    }

    .result-btn {
        background-color: rgba(128, 128, 128, 0.08);
        border: 1px solid rgba(128, 128, 128, 0.2);
        color: inherit;
        padding: 0.4rem 0.85rem;
        border-radius: 0.25rem;
        font-size: 0.85rem;
        font-family: monospace;
        cursor: pointer;
        transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.1s ease;
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
</style>

<!-- Top Horizontal Menu Bar -->
<header class="sticky-navbar">
    <!-- Short Title -->
    <a href="#" class="navbar-brand">SL Definitions</a>

    <!-- Textbox to Search (Always searches all types) -->
    <div class="search-container">
        <input 
            type="text" 
            id="search-input" 
            class="search-input" 
            placeholder="Search functions, events, or constants..." 
            aria-label="Search all definitions"
        />
    </div>

    <!-- Category Trigger Buttons -->
    <nav class="nav-buttons-container" aria-label="Alternative searches">
        <button type="button" class="nav-btn" data-search-type="functions">Functions</button>
        <button type="button" class="nav-btn" data-search-type="events">Events</button>
        <button type="button" class="nav-btn" data-search-type="constants">Constants</button>
    </nav>

    <!-- Free space for future expansion -->
    <div class="nav-extra-space" id="extra-nav-controls">
        <!-- Future buttons or toggles can be appended here -->
    </div>
</header>

<!-- Main Page Content -->
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

        // Autofocus the textbox on start
        searchInput.focus();

        // Buttons trigger their respective specialized flows and set active styles
        searchButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const searchType = e.currentTarget.getAttribute('data-search-type');
                console.log(`Action triggered: Open specialized search/browse for "${searchType}"`);
                
                searchButtons.forEach(btn => btn.classList.remove('active'));
                e.currentTarget.classList.add('active');
            });
        });

        // Clear active styles from buttons when the search box is focused
        searchInput.addEventListener('focus', () => {
            searchButtons.forEach(btn => btn.classList.remove('active'));
        });

        // Global search input always searches across all types
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            renderSearchResults(query);
        });

        // Helper function to extract and filter results from yaml structure
        function renderSearchResults(query) {
            // Clear content if search is empty
            if (!query) {
                displayContainer.innerHTML = '';
                return;
            }

            // Extract distinct lists of items. Handle missing keys gracefully.
            const rawFunctions = lslData.functions || [];
            const rawEvents = lslData.events || [];
            
            // Gather constants from regular constants, builtin-constants, and global variables
            const rawConstants = [
                ...(lslData.constants || []),
                ...(lslData['builtin-constants'] || []),
                ...(lslData['global-variables'] || [])
            ];

            // Perform case-insensitive string containment filtering
            const matchedFunctions = rawFunctions.filter(item => item.name && item.name.toLowerCase().includes(query));
            const matchedEvents = rawEvents.filter(item => item.name && item.name.toLowerCase().includes(query));
            
            // Remove duplicate constants if they overlap between lists
            const uniqueConstantsMap = new Map();
            rawConstants.forEach(item => {
                if (item.name && item.name.toLowerCase().includes(query)) {
                    uniqueConstantsMap.set(item.name, item);
                }
            });
            const matchedConstants = Array.from(uniqueConstantsMap.values());

            const totalMatches = matchedFunctions.length + matchedEvents.length + matchedConstants.length;

            if (totalMatches === 0) {
                displayContainer.innerHTML = `<div class="no-results">No matches found for "${escapeHtml(query)}"</div>`;
                return;
            }

            // Build structural row blocks
            let htmlOutput = '<div class="results-wrapper">';

            // 1. Functions Row Block
            if (matchedFunctions.length > 0) {
                htmlOutput += `
                    <div class="results-group">
                        <div class="results-group-title">Functions</div>
                        <div class="results-grid">
                            ${matchedFunctions.map(f => `<button type="button" class="result-btn" data-type="function" data-name="${escapeHtml(f.name)}">${escapeHtml(f.name)}</button>`).join('')}
                        </div>
                    </div>
                `;
            }

            // 2. Events Row Block (Always starts a new row/block, never mixing with functions)
            if (matchedEvents.length > 0) {
                htmlOutput += `
                    <div class="results-group">
                        <div class="results-group-title">Events</div>
                        <div class="results-grid">
                            ${matchedEvents.map(e => `<button type="button" class="result-btn" data-type="event" data-name="${escapeHtml(e.name)}">${escapeHtml(e.name)}</button>`).join('')}
                        </div>
                    </div>
                `;
            }

            // 3. Constants Row Block (Always starts a new row/block, never mixing with other types)
            if (matchedConstants.length > 0) {
                htmlOutput += `
                    <div class="results-group">
                        <div class="results-group-title">Constants</div>
                        <div class="results-grid">
                            ${matchedConstants.map(c => `<button type="button" class="result-btn" data-type="constant" data-name="${escapeHtml(c.name)}">${escapeHtml(c.name)}</button>`).join('')}
                        </div>
                    </div>
                `;
            }

            htmlOutput += '</div>';
            displayContainer.innerHTML = htmlOutput;

            // Optional future feature: Add click handlers to search result buttons
            bindResultBtnHandlers();
        }

        function bindResultBtnHandlers() {
            const resultButtons = displayContainer.querySelectorAll('.result-btn');
            resultButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const name = e.currentTarget.getAttribute('data-name');
                    const type = e.currentTarget.getAttribute('data-type');
                    console.log(`Clicked result button: [${type}] ${name}`);
                    // Trigger detailed view display in subsequent steps
                });
            });
        }

        // Helper function to escape HTML special characters
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
</script>
