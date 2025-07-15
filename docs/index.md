<link rel="stylesheet" href="/slua/assets/style.css">

# Hello!

Testing my site and styles.

```lua
local slUpdate

function browse(tab, spacing, exclude)
    spacing = (spacing or "") .. "        "
    exclude = exclude or {}
    local valType = ""
    local totType = {}
    for key, value in pairs(tab) do
        valType = type(value)
        if valType == "table" and tab[key] ~= _G then
            print(`{spacing}table: {key}`)
            browse(tab[key], spacing)
        else
            if tab == _G and key == key:upper() then
                valType = "LL " .. valType
            end
        end
        totType[valType] = (totType[valType] or 0) + 1
    end
    for valType, total in totType do
         print(`{spacing}{valType}: {total}`)
    end
end

browse(_G)
```
