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

### **`number`** type

<table>
    <thead>
        <tr>
            <th style="width: 10%;">Operator</th>
            <th style="width: 20%;">Left Operand (LHS)</th>
            <th style="width: 20%;">Right Operand (RHS)</th>
            <th style="width: 15%;">Result Type</th>
            <th>Behavior / Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code class="op">+</code>, <code class="op">-</code>, <code class="op">*</code></td>
            <td><code class="type">number</code></td>
            <td><code class="type">number</code></td>
            <td><code class="type">number</code></td>
            <td>Standard addition, subtraction, and multiplication.</td>
        </tr>
        <tr>
            <td><code class="op">/</code></td>
            <td><code class="type">number</code></td>
            <td><code class="type">number</code></td>
            <td><code class="type">number</code></td>
            <td>Standard float division. Always outputs a float.</td>
        </tr>
        <tr>
            <td><code class="op">//</code></td>
            <td><code class="type">number</code></td>
            <td><code class="type">number</code></td>
            <td><code class="type">number</code></td>
            <td>Floor division (division rounded down to the nearest integer).</td>
        </tr>
        <tr>
            <td><code class="op">%</code></td>
            <td><code class="type">number</code></td>
            <td><code class="type">number</code></td>
            <td><code class="type">number</code></td>
            <td>Modulo (returns the remainder of division).</td>
        </tr>
        <tr>
            <td><code class="op">^</code></td>
            <td><code class="type">number</code></td>
            <td><code class="type">number</code></td>
            <td><code class="type">number</code></td>
            <td>Exponentiation (raises LHS to the power of RHS).</td>
        </tr>
        <tr>
            <td><code class="op">-</code> (Unary)</td>
            <td><code class="type">number</code></td>
            <td>N/A</td>
            <td><code class="type">number</code></td>
            <td>Negates the number.</td>
        </tr>
        <tr>
            <td><code class="op">==</code>, <code class="op">~=</code></td>
            <td><code class="type">number</code></td>
            <td><code class="type">any</code></td>
            <td><code class="type">boolean</code></td>
            <td>Checks for numeric equality or inequality. Comparison with non-numbers yields false.</td>
        </tr>
        <tr>
            <td><code class="op">&lt;</code>, <code class="op">&gt;</code>, <code class="op">&lt;=</code>,
                <code class="op">&gt;=</code></td>
            <td><code class="type">number</code></td>
            <td><code class="type">number</code></td>
            <td><code class="type">boolean</code></td>
            <td>Performs standard numeric order comparisons.</td>
        </tr>
        <tr>
            <td><code class="op">..</code></td>
            <td><code class="type">number</code></td>
            <td><code class="type">string</code> or <code class="type">number</code></td>
            <td><code class="type">string</code></td>
            <td>Converts the number to a string and concatenates it.</td>
        </tr>
        <tr>
            <td><code class="op">and</code>, <code class="op">or</code></td>
            <td><code class="type">number</code></td>
            <td><code class="type">any</code></td>
            <td><code class="type">any</code></td>
            <td>Evaluates logical connections. Numbers are always treated as "truthy". Unlike LSL, the number 0 evaluates to true in SLua.</td>
        </tr>
        <tr>
            <td><code class="op">not</code></td>
            <td><code class="type">number</code></td>
            <td>N/A</td>
            <td><code class="type">boolean</code></td>
            <td>Always returns <code>false</code> because numbers are always truthy (including 0).</td>
        </tr>
    </tbody>
</table>

### **`string`** type

<table>
    <thead>
        <tr>
            <th style="width: 10%;">Operator</th>
            <th style="width: 20%;">Left Operand (LHS)</th>
            <th style="width: 20%;">Right Operand (RHS)</th>
            <th style="width: 15%;">Result Type</th>
            <th>Behavior / Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code class="op">..</code></td>
            <td><code class="type">string</code></td>
            <td><code class="type">string</code> or <code class="type">number</code></td>
            <td><code class="type">string</code></td>
            <td>Concatenates the two operands together.</td>
        </tr>
        <tr>
            <td><code class="op">#</code> (Unary)</td>
            <td><code class="type">string</code></td>
            <td>N/A</td>
            <td><code class="type">number</code></td>
            <td>Returns the size of the string in bytes.</td>
        </tr>
        <tr>
            <td><code class="op">==</code>, <code class="op">~=</code></td>
            <td><code class="type">string</code></td>
            <td><code class="type">any</code></td>
            <td><code class="type">boolean</code></td>
            <td>Compares string values. Evaluation checks value, not memory reference.</td>
        </tr>
        <tr>
            <td><code class="op">&lt;</code>, <code class="op">&gt;</code>, <code class="op">&lt;=</code>,
                <code class="op">&gt;=</code></td>
            <td><code class="type">string</code></td>
            <td><code class="type">string</code></td>
            <td><code class="type">boolean</code></td>
            <td>Alphabetical (lexicographical) comparison based on internal character byte codes.</td>
        </tr>
        <tr>
            <td><code class="op">and</code>, <code class="op">or</code></td>
            <td><code class="type">string</code></td>
            <td><code class="type">any</code></td>
            <td><code class="type">any</code></td>
            <td>Logical connections. Strings are always treated as truthy.</td>
        </tr>
        <tr>
            <td><code class="op">not</code></td>
            <td><code class="type">string</code></td>
            <td>N/A</td>
            <td><code class="type">boolean</code></td>
            <td>Always returns <code>false</code> because strings are always truthy.</td>
        </tr>
    </tbody>
</table>

### **`boolean`** type

<table>
    <thead>
        <tr>
            <th style="width: 10%;">Operator</th>
            <th style="width: 20%;">Left Operand (LHS)</th>
            <th style="width: 20%;">Right Operand (RHS)</th>
            <th style="width: 15%;">Result Type</th>
            <th>Behavior / Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code class="op">and</code></td>
            <td><code class="type">boolean</code></td>
            <td><code class="type">any</code></td>
            <td><code class="type">any</code></td>
            <td>Returns LHS if false; otherwise returns RHS.</td>
        </tr>
        <tr>
            <td><code class="op">or</code></td>
            <td><code class="type">boolean</code></td>
            <td><code class="type">any</code></td>
            <td><code class="type">any</code></td>
            <td>Returns LHS if true; otherwise returns RHS.</td>
        </tr>
        <tr>
            <td><code class="op">not</code></td>
            <td><code class="type">boolean</code></td>
            <td>N/A</td>
            <td><code class="type">boolean</code></td>
            <td>Inverts the boolean's truth value.</td>
        </tr>
        <tr>
            <td><code class="op">==</code>, <code class="op">~=</code></td>
            <td><code class="type">boolean</code></td>
            <td><code class="type">any</code></td>
            <td><code class="type">boolean</code></td>
            <td>Evaluates identity. Yields true only if compared value is a boolean of identical state.</td>
        </tr>
    </tbody>
</table>

### **`vector`** type

<table>
    <thead>
        <tr>
            <th style="width: 10%;">Operator</th>
            <th style="width: 20%;">Left Operand (LHS)</th>
            <th style="width: 20%;">Right Operand (RHS)</th>
            <th style="width: 15%;">Result Type</th>
            <th>Behavior / Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code class="op">+</code>, <code class="op">-</code></td>
            <td><code class="type">vector</code></td>
            <td><code class="type">vector</code></td>
            <td><code class="type">vector</code></td>
            <td>Performs component-wise addition or subtraction.</td>
        </tr>
        <tr>
            <td><code class="op">*</code>, <code class="op">/</code>, <code class="op">//</code></td>
            <td><code class="type">vector</code></td>
            <td><code class="type">vector</code></td>
            <td><code class="type">vector</code></td>
            <td>Performs component-wise math operation between the two vectors. In SLua, * do <strong>not</strong>strong> calculate <strong>Dot Product</strong>strong>. Use vector.dot(a, b) instead.</td>
        </tr>
        <tr>
            <td><code class="op">%</code></td>
            <td><code class="type">vector</code></td>
            <td><code class="type">vector</code></td>
            <td><code class="type">vector</code></td>
            <td>Calculates the <strong>Cross Product</strong> of the two vectors.</td>
        </tr>
        <tr>
            <td><code class="op">*</code>, <code class="op">/</code></td>
            <td><code class="type">vector</code></td>
            <td><code class="type">number</code></td>
            <td><code class="type">vector</code></td>
            <td>Scales (multiplies/divides) every vector component by the number.</td>
        </tr>
        <tr>
            <td><code class="op">*</code></td>
            <td><code class="type">number</code></td>
            <td><code class="type">vector</code></td>
            <td><code class="type">vector</code></td>
            <td>Commutative scaling: scales the vector components by the number.</td>
        </tr>
        <tr>
            <td><code class="op">-</code> (Unary)</td>
            <td><code class="type">vector</code></td>
            <td>N/A</td>
            <td><code class="type">vector</code></td>
            <td>Inverts the sign of all components of the vector.</td>
        </tr>
        <tr>
            <td><code class="op">==</code>, <code class="op">~=</code></td>
            <td><code class="type">vector</code></td>
            <td><code class="type">any</code></td>
            <td><code class="type">boolean</code></td>
            <td>Checks for exact component-wise equality. Comparing against other types yields false.</td>
        </tr>
        <tr>
            <td><code class="op">and</code>, <code class="op">or</code></td>
            <td><code class="type">vector</code></td>
            <td><code class="type">any</code></td>
            <td><code class="type">any</code></td>
            <td>Logical connections. Vectors are always treated as truthy.</td>
        </tr>
        <tr>
            <td><code class="op">not</code></td>
            <td><code class="type">vector</code></td>
            <td>N/A</td>
            <td><code class="type">boolean</code></td>
            <td>Always returns <code>false</code> because vectors are always truthy.</td>
        </tr>
    </tbody>
</table>

### **`rotation`** / **`quaternion`** type

<table>
    <thead>
        <tr>
            <th style="width: 10%;">Operator</th>
            <th style="width: 20%;">Left Operand (LHS)</th>
            <th style="width: 20%;">Right Operand (RHS)</th>
            <th style="width: 15%;">Result Type</th>
            <th>Behavior / Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code class="op">*</code></td>
            <td><code class="type">rotation</code></td>
            <td><code class="type">rotation</code></td>
            <td><code class="type">rotation</code></td>
            <td><strong>Composition:</strong> Combines two rotations. Notice that composition is non-commutative;
                the order of operations changes the final orientation.</td>
        </tr>
        <tr>
            <td><code class="op">*</code></td>
            <td><code class="type">vector</code></td>
            <td><code class="type">rotation</code></td>
            <td><code class="type">vector</code></td>
            <td><strong>Vector Rotation:</strong> Rotates the vector on the left by the rotation on the right.
                <em>(Note: Left-hand vector rotation is mandatory; `rotation * vector` is illegal).</em></td>
        </tr>
        <tr>
            <td><code class="op">/</code></td>
            <td><code class="type">rotation</code></td>
            <td><code class="type">rotation</code></td>
            <td><code class="type">rotation</code></td>
            <td><strong>Inverse Composition:</strong> Multiplies LHS by the conjugate (inverse) of RHS, effectively
                rotating in the opposite direction.</td>
        </tr>
        <tr>
            <td><code class="op">/</code></td>
            <td><code class="type">vector</code></td>
            <td><code class="type">rotation</code></td>
            <td><code class="type">vector</code></td>
            <td><strong>Inverse Vector Rotation:</strong> Rotates the vector in the opposite direction (by the
                conjugate of the rotation).</td>
        </tr>
        <tr>
            <td><code class="op">+</code>, <code class="op">-</code></td>
            <td><code class="type">rotation</code></td>
            <td><code class="type">rotation</code></td>
            <td><code class="type">rotation</code></td>
            <td>Component-wise addition or subtraction. Not physically meaningful for normal rotation updates, but
                valid mathematically.</td>
        </tr>
        <tr>
            <td><code class="op">-</code> (Unary)</td>
            <td><code class="type">rotation</code></td>
            <td>N/A</td>
            <td><code class="type">rotation</code></td>
            <td>Negates all components of the rotation.</td>
        </tr>
        <tr>
            <td><code class="op">==</code>, <code class="op">~=</code></td>
            <td><code class="type">rotation</code></td>
            <td><code class="type">any</code></td>
            <td><code class="type">boolean</code></td>
            <td>Checks for strict component-wise mathematical equality. Comparison with other types yields false.
            </td>
        </tr>
        <tr>
            <td><code class="op">and</code>, <code class="op">or</code></td>
            <td><code class="type">rotation</code></td>
            <td><code class="type">any</code></td>
            <td><code class="type">any</code></td>
            <td>Evaluates logical connections. Rotations are always treated as truthy.</td>
        </tr>
        <tr>
            <td><code class="op">not</code></td>
            <td><code class="type">rotation</code></td>
            <td>N/A</td>
            <td><code class="type">boolean</code></td>
            <td>Always returns <code>false</code>.</td>
        </tr>
    </tbody>
</table>

### **`uuid`** type

<table>
    <thead>
        <tr>
            <th style="width: 10%;">Operator</th>
            <th style="width: 20%;">Left Operand (LHS)</th>
            <th style="width: 20%;">Right Operand (RHS)</th>
            <th style="width: 15%;">Result Type</th>
            <th>Behavior / Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code class="op">==</code>, <code class="op">~=</code></td>
            <td><code class="type">uuid</code></td>
            <td><code class="type">uuid</code></td>
            <td><code class="type">boolean</code></td>
            <td>Checks if the 128-bit identifiers are identical. Comparison is much faster than string matching.
            </td>
        </tr>
        <tr>
            <td><code class="op">==</code>, <code class="op">~=</code></td>
            <td><code class="type">uuid</code></td>
            <td><code class="type">string</code></td>
            <td><code class="type">boolean</code></td>
            <td><strong>Always false:</strong> Unlike standard LSL, strings and uuids are strictly separated in
                SLua. You must convert via <code>tostring()</code> to compare them.</td>
        </tr>
        <tr>
            <td><code class="op">and</code>, <code class="op">or</code></td>
            <td><code class="type">uuid</code></td>
            <td><code class="type">any</code></td>
            <td><code class="type">any</code></td>
            <td>Evaluates logical connections. All valid UUID values are treated as truthy.
                <em>(Note: LSL's <code>NULL_KEY</code> is still a valid uuid object, meaning it is evaluated as "truthy" inside logical conditions in SLua).</em>
            </td>
        </tr>
        <tr>
            <td><code class="op">not</code></td>
            <td><code class="type">uuid</code></td>
            <td>N/A</td>
            <td><code class="type">boolean</code></td>
            <td>Always returns <code>false</code> because UUID instances are always truthy.</td>
        </tr>
        <tr>
            <td><em>None</em></td>
            <td><code class="type">uuid</code></td>
            <td><code class="type">any</code></td>
            <td>N/A</td>
            <td><strong>Not Supported:</strong> Arithmetic, concatenation (<code>..</code>), and length
                (<code>#</code>) are completely unsupported on raw UUIDs. Use <code>tostring(my_uuid)</code> to
                manipulate it as string data first.</td>
        </tr>
    </tbody>
</table>

### **`table`** type

<table>
    <thead>
        <tr>
            <th style="width: 10%;">Operator</th>
            <th style="width: 20%;">Left Operand (LHS)</th>
            <th style="width: 20%;">Right Operand (RHS)</th>
            <th style="width: 15%;">Result Type</th>
            <th>Behavior / Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code class="op">#</code> (Unary)</td>
            <td><code class="type">table</code></td>
            <td>N/A</td>
            <td><code class="type">number</code></td>
            <td>Returns table size. Triggers <code>__len</code> if defined; otherwise calculates boundary count.
            </td>
        </tr>
        <tr>
            <td><code class="op">==</code>, <code class="op">~=</code></td>
            <td><code class="type">table</code></td>
            <td><code class="type">any</code></td>
            <td><code class="type">boolean</code></td>
            <td>Compares memory reference. If LHS and RHS are both tables sharing a metatable, triggers
                <code>__eq</code>.</td>
        </tr>
        <tr>
            <td><code class="op">+</code>, <code class="op">-</code>, <code class="op">*</code>,
                <code class="op">/</code>, <code class="op">//</code>, <code class="op">%</code>,
                <code class="op">^</code>, <code class="op">..</code></td>
            <td><code class="type">table</code></td>
            <td><code class="type">any</code></td>
            <td><code class="type">any</code></td>
            <td>Raises an error unless the table defines its corresponding metamethod (e.g., <code>__add</code>,
                <code>__concat</code>).</td>
        </tr>
        <tr>
            <td><code class="op">-</code> (Unary)</td>
            <td><code class="type">table</code></td>
            <td>N/A</td>
            <td><code class="type">any</code></td>
            <td>Raises an error unless defined in the table's metatable using <code>__unm</code>.</td>
        </tr>
        <tr>
            <td><code class="op">&lt;</code>, <code class="op">&gt;</code>, <code class="op">&lt;=</code>,
                <code class="op">&gt;=</code></td>
            <td><code class="type">table</code></td>
            <td><code class="type">table</code></td>
            <td><code class="type">boolean</code></td>
            <td>Raises an error unless tables share the same relational metamethods (<code>__lt</code>,
                <code>__le</code>).</td>
        </tr>
        <tr>
            <td><code class="op">and</code>, <code class="op">or</code></td>
            <td><code class="type">table</code></td>
            <td><code class="type">any</code></td>
            <td><code class="type">any</code></td>
            <td>Logical connections. Tables are always treated as truthy.</td>
        </tr>
        <tr>
            <td><code class="op">not</code></td>
            <td><code class="type">table</code></td>
            <td>N/A</td>
            <td><code class="type">boolean</code></td>
            <td>Always returns <code>false</code>.</td>
        </tr>
    </tbody>
</table>

### other types

Other data types: `nil`, `function`, `thread`, `userdata`, `buffer`

<table>
    <thead>
        <tr>
            <th style="width: 10%;">Operator</th>
            <th style="width: 20%;">Left Operand (LHS)</th>
            <th style="width: 20%;">Right Operand (RHS)</th>
            <th style="width: 15%;">Result Type</th>
            <th>Behavior / Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code class="op">and</code></td>
            <td><code class="type">nil</code></td>
            <td><code class="type">any</code></td>
            <td><code class="type">nil</code></td>
            <td>Returns <code>nil</code> (since <code>nil</code> is evaluated as falsy).</td>
        </tr>
        <tr>
            <td><code class="op">and</code></td>
            <td>Others</td>
            <td><code class="type">any</code></td>
            <td><code class="type">any</code></td>
            <td>Returns RHS (functions, threads, and buffers are truthy).</td>
        </tr>
        <tr>
            <td><code class="op">or</code></td>
            <td><code class="type">nil</code></td>
            <td><code class="type">any</code></td>
            <td><code class="type">any</code></td>
            <td>Returns RHS.</td>
        </tr>
        <tr>
            <td><code class="op">or</code></td>
            <td>Others</td>
            <td><code class="type">any</code></td>
            <td><code class="type">any</code></td>
            <td>Returns LHS (since LHS evaluates as truthy).</td>
        </tr>
        <tr>
            <td><code class="op">not</code></td>
            <td><code class="type">nil</code></td>
            <td>N/A</td>
            <td><code class="type">boolean</code></td>
            <td>Evaluates to <code>true</code>.</td>
        </tr>
        <tr>
            <td><code class="op">not</code></td>
            <td>Others</td>
            <td>N/A</td>
            <td><code class="type">boolean</code></td>
            <td>Evaluates to <code>false</code>.</td>
        </tr>
        <tr>
            <td><code class="op">==</code>, <code class="op">~=</code></td>
            <td>Any of these</td>
            <td><code class="type">any</code></td>
            <td><code class="type">boolean</code></td>
            <td>Checks reference equality. Userdata can implement <code>__eq</code> for value comparison.</td>
        </tr>
    </tbody>
</table>

### Shorthand (Compound Assignment) Operators

<table>
    <thead>
        <tr>
            <th style="width: 15%;">Shorthand</th>
            <th style="width: 25%;">Equivalent Syntax</th>
            <th style="width: 25%;">Valid Left-Hand Types</th>
            <th>Behavior / Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code class="op">a += b </code></td>
            <td><code>a = a + b</code></td>
            <td><code class="type">number</code>, <code class="type">vector</code>, <code class="type">table</code>
                (with <code>__add</code>)</td>
            <td>Adds RHS to the current value of the variable.</td>
        </tr>
        <tr>
            <td><code class="op">a -= b</code></td>
            <td><code>a = a - b</code></td>
            <td><code class="type">number</code>, <code class="type">vector</code>, <code class="type">table</code>
                (with <code>__sub</code>)</td>
            <td>Subtracts RHS from the current value of the variable.</td>
        </tr>
        <tr>
            <td><code class="op">a *= b</code></td>
            <td><code>a = a * b</code></td>
            <td><code class="type">number</code>, <code class="type">vector</code>, <code class="type">table</code>
                (with <code>__mul</code>)</td>
            <td>Multiplies the variable's value by RHS. Handles vector scaling.</td>
        </tr>
        <tr>
            <td><code class="op">a /= b</code></td>
            <td><code>a = a / b</code></td>
            <td><code class="type">number</code>, <code class="type">vector</code>, <code class="type">table</code>
                (with <code>__div</code>)</td>
            <td>Divides the variable's value by RHS.</td>
        </tr>
        <tr>
            <td><code class="op">a //= b</code></td>
            <td><code>a = a // b</code></td>
            <td><code class="type">number</code>, <code class="type">vector</code>, <code class="type">table</code>
                (with <code>__idiv</code>)</td>
            <td>Performs floor division on the variable.</td>
        </tr>
        <tr>
            <td><code class="op">a %= b</code></td>
            <td><code>a = a % b</code></td>
            <td><code class="type">number</code>, <code class="type">vector</code>, <code class="type">table</code>
                (with <code>__mod</code>)</td>
            <td>Updates the variable to the remainder (modulo) of the division.</td>
        </tr>
        <tr>
            <td><code class="op">a ^= b</code></td>
            <td><code>a = a ^ b</code></td>
            <td><code class="type">number</code>, <code class="type">table</code>
                (with <code>__pow</code>)</td>
            <td>Raises the variable to the power of RHS.</td>
        </tr>
        <tr>
            <td><code class="op">a ..= b</code></td>
            <td><code>a = a .. b</code></td>
            <td><code class="type">string</code>, <code class="type">number</code>, <code class="type">table</code>
                (with <code>__concat</code>)</td>
            <td>Concatenates RHS to the end of the current string.</td>
        </tr>
    </tbody>
</table>
