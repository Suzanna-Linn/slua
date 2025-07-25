---
layout: default
title: "Future"
---
## Future

What the future holds for scripting in SL?

Let's look at some questions that we could have in mind about the future...


### When will SLua be available on the main grid?

'''The release date is still unknown.'''

SLua is currently in its alpha stage on the beta grid.

Residents can visit the beta grid to test it, report bugs, suggest improvements, and provide feedback on others' suggestions. Bugs are being fixed at a steady pace, and some suggestions are already being implemented. SLua is improving fast.

Once SLua reaches a stable state, it will move to a beta version, still on the beta grid, for further testing before its eventual release to the main grid. The entire process may take several months.


### Will LSL scripts benefit from being compiled to VM Luau instead of VM Mono?

'''Yes.'''

Luau optimizes the code better than LSL, improving execution time and reducing memory usage, and also uses less memory to store the strings.

The LSL scripts will run faster and we will have more free memory.


### Will SLua scripts have more memory?

'''Not for the moment.'''

Scripts will stay at 64k, but Luau’s efficiency means we can achieve more within the same memory constraints.


### Will LSL continue to exist?

'''Yes.'''

For many years, perhaps forever.


### Will LSL receive updates with new functions?

'''Yes... with a very big "but".'''

New functions will be added to both languages.

It's not doing the work twice. LL functions are written in C++ and they can be linked to both languages

The big "but" is that new functions will be designed with SLua in mind. And SLua has more types of data.

The functions with data types compatible with LSL will be added, the others will not.


### Will there be any way to use the functions not added in LSL?

'''In some cases... but not easily.'''

A script can be written in only one language. But in the same object we can have scripts in LSL and scripts in SLua.

A LSL script could send data using linked messages to a SLua script that calls the function. Only if the parameters of the function are tables, not functions or objects.


### Will there be a translator or transpiler to convert LSL source code into SLua source code?

'''Likely.'''

It seems that Lindens have some plans about it, or it could be added by other viewers. And if it is not there, several people, including me, will be working on it.


### Will we have to move to SLua?

'''No.'''

If you feel that you need more functionalities, you will move to SLua. If you are comfortable in LSL, you can choose to stay in LSL.


### Should we stop learning LSL and wait for SLua?

'''No.'''

If you are at an intermediate level, you are learning ll functions. They will be exactly the same in SLua. It's a knowledge useful 100%.

If you are a beginner, you are mostly learning programming skills. Also useful 100% for SLua and for any other programming language.


### Will SLua be updated to the new versions of Luau?

'''Yes.'''

Luau is designed to be embbeded easily and the changes required for the SL platform can be added to a new version of Luau with moderate difficulty.


### Will LSL scripts compiled in VM Mono be automatically recompiled to VM Luau?

'''No.'''

Existing scripts compiled in Mono will remain as they are. To recompile them to Luau, we will need to manually open and save the scripts again.

In the long run, Mono will be phased out, at which point all scripts, including those currently running, will be automatically recompiled.


### Will there be an option to choose between compiling to VM Luau or to VM Mono?

'''Yes.'''

But only for a limited time. In the long term, Mono will eventually be phased out.
