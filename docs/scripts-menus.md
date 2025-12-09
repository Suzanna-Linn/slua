---
layout: default
title: Floating texts
slua_beta: true
---

## Menus

### Examples

Example 1: a yes/no menu:

<pre class="language-sluab"><code class="language-sluab">-- the definition of the menu is an array table
local mainMenu = {
    -- in the first index there are the parameters of the menu
    -- name of the menu: "choose yes or no"
    -- close = true adds a "close" option to the menu
    { "choose yes or no", close = true },
    -- in the next indexes there are the options
    -- name of the option: "Yes"
    -- action to execute when the user chooses the option: yesno
    { "Yes", yesno },
    -- the function is called with the name of the option: yesno(name)
    -- several options can have the same function
    { "No", yesno },
}</code></pre>

Example 2: a movement menu:

<pre class="language-sluab"><code class="language-sluab">local mainMenu = {
    { "Object control", close = true },
    -- menu = {} defines a submenu that opens when the user chooses "move"
    { "move", menu = {
        -- it has the same format than the main menu
        -- name of the submenu: "Movements"
        -- by default a "back" option is added
        { "Movements" },
        -- options of the submenu
        -- the name of the option can be a table of names
        -- in this case all have the same action: setPosition(name)
        { { "North", "West", "Up", "South", "East", "Down" }, setPosition },
        { { "faster", "slower" }, setSpeed },
        -- this submenu has 8 options
    }},
    { { "bigger", "smaller" }, setSize },
    -- another submenu
    { "color", menu = {
        -- ret = true goes back to the previous menu after choosing an option
        -- otherwise it would stay in the same menu
        { "Color", ret = true },
        -- a table COLOR_NAMES with the names of the options
        -- the menu uses several pages if necessary
        { COLOR_NAMES, setColor },
    }},
}
</code></pre>

Example 3: an information menu

<pre class="language-sluab"><code class="language-sluab">
local mainMenu = {
    { "Information", close = true },
    { "Height", sayHeight },
    { "Complexity", sayComplexity },
    { "Language", sayLanguage },
    { "Attachments", menu = {
        -- say = true says the options of the menu to the user in chat
        -- useful when the option names are too long to show in the buttons
        { "Attachments", back = true, say = true },
        -- a function peopleButtons() that returns the names of the options
        -- option can be a name, a table of names, or a function that returns names
        -- the menu fits the names in the options if they are too long
        { peopleButtons, sayAttachments },
    }},
}
</code></pre>

Example 4: a photoalbum menu:

<pre class="language-sluab"><code class="language-sluab">-- the table "context"
--     it's a table to store internal values used in menu
--     it's passed to all the functions called by the menu that use and can modify the table
--     initially it contains the id of the user of the menu in the key userId
--         context.userId = id of the user
--
local mainMenu = {
    -- init = a function executed only once at the start
    -- entry = a function executed each time that the menu is shown
    --    if it returns false the menu is not shown
    --        if it returns a second value a menu with this value and the option "ok" is shown
    -- timeout = seconds until the menu timeouts
    --    when used in the main menu becomes the default timeout for the submenus
    --    back_default = becomes the default "back" option for the submenus
    --    ret_default = becomes the default "ret" option for the submenus
    { "Manage albums and options", init = initMain, entry = entryMain, close = true, timeout = 60, back_default = true, ret_default = false },
    -- entry = a function executed before calling the action function
    --    if it returns false the action is not executed
    --        if it returns a second value a menu with this value and the option "ok" is shown
    -- textbox = a textbox with the value of "textbox" as message is shown
    --    the action function is called with the value returned by the text box as the parameter "name"
    --    the textbox is not shown if the entry function returns false
    { "New album", newAlbum, entry = entryNewAlbum, textbox = "Name of the new album" },
    { "Edit album", menu = {
        -- values between [ and ] are keys in the table context
        -- they are replaced in the option name before showing the menu
        { "Editing the album [selectedAlbumName]" },
        { "Name", editAlbumName, textbox = "Name of the new album" },
        { "Text color", menu = {
            { "Editing the text color of the album [selectedAlbumName]", ret = true },
            { getColors, editAlbumTextColor },
        }},
        { "Back color", menu = {
            { "Editing the back color of the album [selectedAlbumName]", ret = true },
            { getColors, editAlbumBackColor },
        }},
        { "Position", menu = {
            { "Editing the position of the album [selectedAlbumName]", ret = true },
            { ALBUM_POSITIONS, editAlbumPosition },
        }},
    }},
    { "Delete album", menu = {
        { "Deleting the album [selectedAlbumName]", entry = entryDeleteAlbum, ret = true },
        { "Yes", deleteAlbum },
        { "No", deleteAlbum },
    }},
    { "Select album", menu = {
        { "Selecting an album", ret = true },
        { getAlbums, selectAlbum },
    }},
    { "Move picture", movePicture },
    { "Display seconds", menu = {
        { "Choosing display seconds", ret = true },
        { DISPLAY_SECONDS, setDisplaySeconds },
    }},
    { "Set publi [setPublicTo]", setPublicTouch },
    { "Set say [setSayNameTo]", setSayPictureName },
}
</code></pre>

### Documentation

Default configurable values:

<pre class="language-sluab"><code class="language-sluab">local menu = {
	CLOSE = true,
	BACK = true,
	RETURN = false,
	TIMEOUT = 60,
	CLOSE_TEXT = "CLOSE",
	BACK_TEXT = "^ BACK ^",
	LEFT_TEXT = "<<<",
	RIGHT_TEXT = ">>>",
}</code></pre>

- CLOSE : the main menu adds a "close" option.
- BACK : the submenus add a "back" option.
- RETURN : the main menu closes and the submenus go to the parent menu after chosing and option.
- TIMEOUT : second for the menu to time out.
- CLOSE_TEXT : text shown in the "close" option.
- BACK_TEXT : text shown in the "back" option.
- LEFT_TEXT : text shown in the previous page option in a multipage menu.
- RIGHT_TEXT : text shown in the next page option in a multipage menu.


The table context:

- It's a table used to share information among the different functions used in the menu.
- Initially it has the key   userId   with the id of the user of the menu.
- All functions called by the menu receive this table as parameter.
  - The action function receives it as its second parameter.
- All functions can use this table and edit it.


Parameters for the main menu, as key values in the first table in the menu:

- message : the text to display in the menu.
  - can be a string or a function returning a string.
  - the string can contain context keys between [ and ].
  - " message = " can be omitted is the message is in the first position in the table.

- close : if true a "close" option is added to the menu.

- ret : if true the menu closes after chosing an option.

- say : if true the full names of the options are said to the user in their chat.

- timeout : seconds to timeout the menu, replaces menu.TIMEOUT as default.

- back_default : replaces menu.BACK as default.

- ret_default : replaces menu.RETURN as default.

- init : function to execute once at the start of the menu.

- entry : function to execute when the menu is displayed.
  - if it returns false the menu is not displayed.
    - if a second value is returned, it displays a menu with the option "Ok" and this second value as text.

- exit : function to execute when the menu is closing.
  - if it returns false the menu is not closed and it is displayed again.
    - if a second value is returned, it displays a menu with the option "Ok" and this second value as text.


Parameters for the submenus, as key values in the first table in the submenu:

- message : the text to display in the menu.
  - can be a string or a function returning a string.
  - the string can contain context keys between [ and ].
  - " message = " can be omitted is the message is in the first position in the table.

- back : if true a "back" option is added to the menu.

- ret : if true the menu goes back to the previous menu after chosing an option.

- say : if true the full names of the options are said to the user in their chat.

- timeout : seconds to timeout the menu.

- entry : function to execute when the menu is displayed.
  - if it returns false the menu is not displayed.
    - if a second value is returned, it displays a menu with the option "Ok" and this second value as text.

- exit : function to execute when the menu is going back to the previous menu.
  - if it returns false the menu is not closed and it is displayed again.
    - if a second value is returned, it displays a menu with the option "Ok" and this second value as text.


Parameters for each option in a menu, as key values in the first table in the submenu:

- option : the text to display in the menu button.
  - can be a string or a function returning a string.
  - can group several options that use the same action function:
    - can be an array table of strings or a function returning an array table of strings.
  - each string can contain context keys between [ and ].
  - " option = " can be omitted is the option is in the first position in the table.

- action: a function to call when the option is chosen.
  - it is called with the name of the option and the context table: actionFunction(optionName, context)
  - it can return:
    - false : to stay in the same menu and to display it again.
    - menu.MENU_CLOSE : to close all the menus.
    - nil (or no return value) : to use the "ret" parameter (to stay in the menu or not)
    - true (or a truthy value) : to go back to the previous menu or closes the main menu
  - " action = " can be omitted is the action is in the second position in the table.
    - only if "option = " has also been omitted and is in the first position in the table.

- textbox : the message for a textbox
  - a textbox is displayed before the action function is called.
  - the action function receives the text from the textbox in the parameter name.
  - the message can be a string or a function returning a string.
  - the string can contain context keys between [ and ].
  - with textbox = true the name of the option is used as message.

- menu : a table with the definition of a submenu
  - if "action" is defined "menu" is not used.

- entry : function to execute before the action function is called.
  - if it returns false the action is not executed and the same menu is displayed again.
    - if a second value is returned, it displays a menu with the option "Ok" and this second value as text.

- exit : function to execute after the action function is called.
  - if it returns false the same menu is displayed again
    - if a second value is returned, it displays a menu with the option "Ok" and this second value as text.



