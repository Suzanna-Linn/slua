---
layout: default
title: keywords reference
slua_beta: true
---

## Keywords

<style>
    table {
        width: 100%;
        border-collapse: collapse;
        font-family: Arial, sans-serif;
        font-size: 14px;
        margin: 20px 0;
    }

    th,
    td {
        border: 1px solid #cccccc;
        padding: 10px;
        text-align: left;
    }

    th {
        font-weight: bold;
    }

    code {
        padding: 2px 5px;
        border-radius: 3px;
        font-family: "Courier New", Courier, monospace;
        font-weight: bold;
    }
</style>

### Reserved Keywords

These 21 keywords cannot be used as variable names or identifiers

<table>
    <thead>
        <tr>
            <th>Keyword</th>
            <th>Category</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>nil</code></td>
            <td>Value Literal</td>
            <td>Represents the absence of a value.</td>
        </tr>
        <tr>
            <td><code>true</code></td>
            <td>Boolean Literal</td>
            <td>Logical true value.</td>
        </tr>
        <tr>
            <td><code>false</code></td>
            <td>Boolean Literal</td>
            <td>Logical false value.</td>
        </tr>
        <tr>
            <td><code>and</code></td>
            <td>Logical Operator</td>
            <td>Performs logical conjunction.</td>
        </tr>
        <tr>
            <td><code>or</code></td>
            <td>Logical Operator</td>
            <td>Performs logical disjunction.</td>
        </tr>
        <tr>
            <td><code>not</code></td>
            <td>Logical Operator</td>
            <td>Performs logical negation.</td>
        </tr>
        <tr>
            <td><code>if</code></td>
            <td>Flow Control</td>
            <td>Starts a conditional block or inline conditional expression.</td>
        </tr>
        <tr>
            <td><code>then</code></td>
            <td>Flow Control</td>
            <td>Separates conditions from execution blocks.</td>
        </tr>
        <tr>
            <td><code>elseif</code></td>
            <td>Flow Control</td>
            <td>Alternative condition check branch.</td>
        </tr>
        <tr>
            <td><code>else</code></td>
            <td>Flow Control</td>
            <td>Fallback execution block if preceding conditions evaluate to false.</td>
        </tr>
        <tr>
            <td><code>end</code></td>
            <td>Flow Control</td>
            <td>Delimits the termination of loops, functions, and conditional blocks.</td>
        </tr>
        <tr>
            <td><code>do</code></td>
            <td>Loop / Block</td>
            <td>Introduces a scope block or the body of <code>while</code> and <code>for</code> loops.</td>
        </tr>
        <tr>
            <td><code>while</code></td>
            <td>Loop</td>
            <td>Starts a loop that runs while a condition is truthy.</td>
        </tr>
        <tr>
            <td><code>repeat</code></td>
            <td>Loop</td>
            <td>Starts a loop block that executes at least once.</td>
        </tr>
        <tr>
            <td><code>until</code></td>
            <td>Loop</td>
            <td>Specifies the exit condition for a <code>repeat</code> loop.</td>
        </tr>
        <tr>
            <td><code>for</code></td>
            <td>Loop</td>
            <td>Starts a numeric or generic iteration loop.</td>
        </tr>
        <tr>
            <td><code>in</code></td>
            <td>Loop</td>
            <td>Delimits loop variables from iterators in a generic <code>for</code> loop.</td>
        </tr>
        <tr>
            <td><code>local</code></td>
            <td>Declaration</td>
            <td>Declares a block-scoped variable or function.</td>
        </tr>
        <tr>
            <td><code>function</code></td>
            <td>Declaration</td>
            <td>Defines an executable block of code or a function type signature.</td>
        </tr>
        <tr>
            <td><code>return</code></td>
            <td>Exit Statement</td>
            <td>Ends execution of a function and optionally returns values.</td>
        </tr>
        <tr>
            <td><code>break</code></td>
            <td>Exit Statement</td>
            <td>Immediately exits the innermost enclosing loop.</td>
        </tr>
    </tbody>
</table>

### Contextual Keywords

These keywords were added later and are recognized only in specific syntactical contexts to avoid breaking older scripts.

<table>
    <thead>
        <tr>
            <th>Keyword</th>
            <th>Context Use-case</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>continue</code></td>
            <td>Inside loop blocks</td>
            <td>Skips the rest of the current loop iteration and moves to the next.</td>
        </tr>
        <tr>
            <td><code>const</code></td>
            <td>Local declarations</td>
            <td>Declares local variables whose bindings cannot be reassigned.</td>
        </tr>
        <tr>
            <td><code>class</code></td>
            <td>Top-level block declarations</td>
            <td>Declares a native object-oriented class with defined fields and methods.</td>
        </tr>
        <tr>
            <td><code>export</code></td>
            <td>Type/Class declarations</td>
            <td>Exposes defined types, classes, or values to other scripts requiring the module.</td>
        </tr>
        <tr>
            <td><code>type</code></td>
            <td>Type annotations</td>
            <td>Declares custom type aliases in the type system.</td>
        </tr>
        <tr>
            <td><code>typeof</code></td>
            <td>Type annotations</td>
            <td>Extracts the static type of a variable or expression without evaluating it at runtime.</td>
        </tr>
    </tbody>
</table>
