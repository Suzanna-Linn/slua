---
layout: default
title: operators reference
slua_beta: true
---

## Operators

The following table lists the operators in descending order of evaluation, i.e. higher in the table means higher evaluation precedence. Multiple operators on the same line share evaluation precedence. Parenthesize an expression if you need to force an evaluation order.

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
        background-color: #f2f2f2;
        font-weight: bold;
    }

    tr:nth-child(even) {
        background-color: #fafafa;
    }

    code {
        background-color: #eaeaea;
        padding: 2px 5px;
        border-radius: 3px;
        font-family: "Courier New", Courier, monospace;
        font-weight: bold;
    }
</style>
    
<table>
<thead>
    <tr>
        <th>Operator(s)</th>
        <th>Description</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td><code>^</code></td>
        <td>Exponentiation (raises a base to a power). Right-to-left associativity</td>
    </tr>
    <tr>
        <td><code>not</code>, <code>#</code>, <code>-</code></td>
        <td>Unary operators: Logical negation, length of strings/tables, and unary minus (negating a number).
        </td>
    </tr>
    <tr>
        <td><code>*</code>, <code>/</code>, <code>//</code>, <code>%</code></td>
        <td>Multiplicative operators: Multiplication, division, floor division, and modulo (remainder).</td>
    </tr>
    <tr>
        <td><code>+</code>, <code>-</code></td>
        <td>Additive operators: Addition and subtraction.</td>
    </tr>
    <tr>
        <td><code>..</code></td>
        <td>String concatenation (joins two strings together).</td>
    </tr>
    <tr>
        <td><code>==</code>, <code>~=</code>, <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>,
            <code>&gt;=</code></td>
        <td>Relational operators: Equal to, not equal to, less than, greater than, less than or equal to, and
            greater than or equal to.</td>
    </tr>
    <tr>
        <td><code>and</code></td>
        <td>Logical conjunction (AND). Returns its first argument if it is false or nil; otherwise, returns its
            second argument.</td>
    </tr>
    <tr>
        <td><code>or</code></td>
        <td>Logical disjunction (OR). Returns its first argument if it is neither false nor nil; otherwise,
            returns its second argument.</td>
    </tr>
</tbody>
</table>
