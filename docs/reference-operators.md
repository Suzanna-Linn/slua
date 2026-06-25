---
layout: default
title: operators reference
slua_beta: true
---

## Operators

<table>
<thead>
    <tr>
        <th>Priority</th>
        <th>Operator(s)</th>
        <th>Description</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>1 (Highest)</td>
        <td><code>^</code></td>
        <td>Exponentiation (raises a base to a power). Right-to-left associativity</td>
    </tr>
    <tr>
        <td>2</td>
        <td><code>not</code>, <code>#</code>, <code>-</code></td>
        <td>Unary operators: Logical negation, length of strings/tables, and unary minus (negating a number).
        </td>
    </tr>
    <tr>
        <td>3</td>
        <td><code>*</code>, <code>/</code>, <code>//</code>, <code>%</code></td>
        <td>Multiplicative operators: Multiplication, division, floor division, and modulo (remainder).</td>
    </tr>
    <tr>
        <td>4</td>
        <td><code>+</code>, <code>-</code></td>
        <td>Additive operators: Addition and subtraction.</td>
    </tr>
    <tr>
        <td>5</td>
        <td><code>..</code></td>
        <td>String concatenation (joins two strings together).</td>
    </tr>
    <tr>
        <td>6</td>
        <td><code>==</code>, <code>~=</code>, <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>,
            <code>&gt;=</code></td>
        <td>Relational operators: Equal to, not equal to, less than, greater than, less than or equal to, and
            greater than or equal to.</td>
    </tr>
    <tr>
        <td>7</td>
        <td><code>and</code></td>
        <td>Logical conjunction (AND). Returns its first argument if it is false or nil; otherwise, returns its
            second argument.</td>
    </tr>
    <tr>
        <td>8 (Lowest)</td>
        <td><code>or</code></td>
        <td>Logical disjunction (OR). Returns its first argument if it is neither false nor nil; otherwise,
            returns its second argument.</td>
    </tr>
</tbody>
</table>
