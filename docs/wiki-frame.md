<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LSL & SLua Reference</title>
    <style>
        :root {
            --bg-color: #f9f9f9; --text-color: #2c3e50; --header-bg: #ffffff;
            --border-color: #dee2e6; --accent-lsl: #007bff; --accent-slua: #e67e22;
            --table-head: #f2f2f2; --card-bg: #ffffff; --code-bg: #f1f1f1;
        }
        body.dark-mode {
            --bg-color: #121212; --text-color: #e0e0e0; --header-bg: #1f1f1f;
            --border-color: #333; --accent-lsl: #3796ff; --accent-slua: #ff9f43;
            --table-head: #2a2a2a; --card-bg: #1e1e1e; --code-bg: #2d2d2d;
        }
        body { font-family: system-ui, sans-serif; background-color: var(--bg-color); color: var(--text-color); margin: 0; transition: background 0.3s; line-height: 1.5; }
        header { position: sticky; top: 0; background: var(--header-bg); border-bottom: 1px solid var(--border-color); padding: 10px 20px; display: flex; justify-content: space-between; align-items: center; z-index: 10; }
        .controls { display: flex; gap: 15px; font-size: 0.9em; font-weight: bold; }
        main { max-width: 800px; margin: 20px auto; padding: 0 20px; }
        
        /* State Hiding */
        body.hide-slua .slua-block { display: none !important; }
        body.hide-lsl .lsl-block { display: none !important; }

        .item-card { background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 8px; padding: 25px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
        .lsl-block, .slua-block { border-left: 4px solid var(--accent-lsl); padding: 10px 15px; margin: 20px 0; background: rgba(128,128,128,0.05); }
        .slua-block { border-left-color: var(--accent-slua); }
        
        pre { background: var(--code-bg); padding: 12px; border-radius: 5px; overflow-x: auto; font-family: monospace; }
        table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        th, td { border: 1px solid var(--border-color); padding: 10px; text-align: left; }
        th { background: var(--table-head); }
        .tag { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 0.7em; text-transform: uppercase; color: white; margin-bottom: 8px; }
        .lsl-tag { background: var(--accent-lsl); }
        .slua-tag { background: var(--accent-slua); }
        
        #loader { text-align: center; margin-top: 100px; font-size: 1.2em; color: #888; }
    </style>
</head>
<body id="page-body">

    <header>
        <div>LSL Reference</div>
        <div class="controls">
            <label><input type="checkbox" id="lsl-toggle" checked> LSL</label>
            <label><input type="checkbox" id="slua-toggle" checked> SLua</label>
            <button id="theme-toggle">🌓 Mode</button>
        </div>
    </header>

    <main id="content">
        <div id="loader">Fetching data...</div>
    </main>

    <script>
        // REPLACE THIS WITH YOUR DEPLOYED GOOGLE APPS SCRIPT URL
        const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzWVwgYOTSqZW-uc_1ND_DVY7rQV3R33bykutdGJjBmp6nAI6ks5-bsyyhBOq_b-ipn/exec";

        const body = document.getElementById('page-body');
        const content = document.getElementById('content');

        // 1. Initial State from Storage
        function initSettings() {
            if (localStorage.getItem('theme') === 'dark') body.classList.add('dark-mode');
            
            const lsl = localStorage.getItem('lsl') !== 'off';
            const slua = localStorage.getItem('slua') !== 'off';
            
            document.getElementById('lsl-toggle').checked = lsl;
            document.getElementById('slua-toggle').checked = slua;
            
            if (!lsl) body.classList.add('hide-lsl');
            if (!slua) body.classList.add('hide-slua');
        }

        // 2. Event Listeners
        document.getElementById('lsl-toggle').onchange = (e) => {
            body.classList.toggle('hide-lsl', !e.target.checked);
            localStorage.setItem('lsl', e.target.checked ? 'on' : 'off');
        };
        document.getElementById('slua-toggle').onchange = (e) => {
            body.classList.toggle('hide-slua', !e.target.checked);
            localStorage.setItem('slua', e.target.checked ? 'on' : 'off');
        };
        document.getElementById('theme-toggle').onclick = () => {
            body.classList.toggle('dark-mode');
            localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
        };

        // 3. The Fetch Logic
        async function fetchItem() {
            const params = new URLSearchParams(window.location.search);
            const item = params.get('item');

            if (!item) {
                content.innerHTML = "<h1>Explorer</h1><p>Append <code>?item=NAME</code> to the URL.</p>";
                return;
            }

            try {
                const response = await fetch(`${SCRIPT_URL}?item=${item}`);
                const data = await response.text();
                content.innerHTML = data;
            } catch (err) {
                content.innerHTML = "<h1>Error</h1><p>Failed to load data from script.</p>";
                console.error(err);
            }
        }

        initSettings();
        fetchItem();
    </script>
</body>
</html>
