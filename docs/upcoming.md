---
layout: default
title: Upcoming Features
slua_beta: true
---

## Upcoming Luau Features in SLua



### const

The **const** keyword is designed for declaring local variables that cannot be reassigned after their initial value is set, providing a way to enforce read-only variables within a script.

It can be used in any context where a local variable declaration is valid, with **const** instead of **local**.

A key aspect of the const keyword is the distinction between binding immutability and value immutability:
- Binding Immutability: Once a variable is declared with the **const** keyword, the variable name is permanently bound to the initialized reference. The compiler will prevent any subsequent attempt to reassign that variable to a different value.
- Value Immutability: **const** does not make the underlying data structure deeply immutable.
  - For primitive types (such as numbers, booleans, and strings), the variable is effectively constant because the types themselves cannot be mutated.
  - For reference types (such as tables), the variable cannot be reassigned to point to a new table, but the internal elements or properties of the table can still be modified.

Constant bindings support standard  scoping and shadowing rules, meaning a constant can still be shadowed by a new declaration in a nested or subsequent scope.

The **const** keyword offers several practical benefits for codebase maintenance, safety, and development workflow:
- Accidental Reassignment Protection: Restricting reassignment helps eliminate accidentally overwriting of variables or functions.
- Clear Developer Intent: Using constant declarations makes code more self-documenting. It explicitly communicates which variables are intended to remain unchanged throughout their lifecycle.
- Early Bug Detection: Because reassignment is checked at the compiler level, tools like linters and script analyzers can detect invalid reassignments immediately.
- Optimization Potential: When the compiler has a guarantee that a local variable will not be reassigned, it can optimize bytecode generation more effectively.


### integer



### class



### export



## math library constants

New constants added to the math library:

<pre class="language-slua"><code class="language-slua">-- new constants
print(math.nan)	   -- > nan                      -- 0/0
print(math.e)		   -- > 2.71828182845904523536	 -- math.exp(1)
print(math.phi)	   -- > 1.61803398874989484820	 -- the golden ratio
print(math.sqrt2)	 -- > 1.41421356237309504880	 -- math.sqrt(2)
print(math.tau)	   -- > 6.28318530717958647692	 -- 2 * math.pi</code></pre>
