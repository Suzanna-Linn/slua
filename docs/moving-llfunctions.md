---
layout: default
title: LL Functions
slua_beta: true
---

## ll Functions

### Compatibility, library llcompat

Some LL functions change they behaviour. These changes are explained in the next four sections.

We have the library **llcompat** with the LL functions unchanged. To use them as in LSL we need to add, at the start of the script:
- <code class="language-sluab">ll = llcompat</code>

### Removed functions

These functions doesn't exist in SLua:
<br>
<table border="1" style="width:50%; border: 1px solid black; border-collapse: collapse; font-family: monospace;">
  <tr style="vertical-align: top;">
    <td style="padding: 5px; border: 1px solid black;">ll.SetTimerEvent</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="padding: 5px; border: 1px solid black;">ll.ResetTime</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="padding: 5px; border: 1px solid black;">ll.GetAndResetTime</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="padding: 5px; border: 1px solid black;">ll.SetMemoryLimit</td>
  </tr>
</table>

We can still use them in the llcompat library, but the 3 time-related functions are not compatible with the LLTimers object. We can't use the old timer functions and LLTimers together because LLTimers would fail.

The old timer event, to be used with llcompat.SetTimerEvent(), is:
<pre class="language-sluab line-numbers"><code class="language-sluab">-- using the old event timer
function LLEvents.timer()
    -- do something
end

llcompat.SetTimerEvent(1)</code></pre>

### 1-based LL functions

The LL functions that have some kind of 0-based index are now 1-based.
- Negative indexes don't change, the last element is still -1.

These are the functions and the parameters that change. The "*" added to the parameter name means that it can use negative values, we can't just add 1 to rewrite our scripts if we are using negative values:  
<br>
<table border="1" style="width:100%; border: 1px solid black; border-collapse: collapse; font-family: monospace;">
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.AdjustDamage(number, new_damage)</td>
    <td style="width:50%; padding-left: 10px;">number</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.DeleteSubList(src, start, end)</td>
    <td style="width:50%; padding-left: 10px;">start*, end*</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.DeleteSubString(src, start, end)</td>
    <td style="width:50%; padding-left: 10px;">start*, end*</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.DetectedDamage(number)</td>
    <td style="width:50%; padding-left: 10px;">number</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.DetectedGrab(number)</td>
    <td style="width:50%; padding-left: 10px;">number</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.DetectedGroup(number)</td>
    <td style="width:50%; padding-left: 10px;">number</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.DetectedKey(number)</td>
    <td style="width:50%; padding-left: 10px;">number</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.DetectedLinknumber(number)</td>
    <td style="width:50%; padding-left: 10px;">number</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.DetectedName(number)</td>
    <td style="width:50%; padding-left: 10px;">number</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.DetectedOwner(number)</td>
    <td style="width:50%; padding-left: 10px;">number</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.DetectedPos(number)</td>
    <td style="width:50%; padding-left: 10px;">number</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.DetectedRezzer(number)</td>
    <td style="width:50%; padding-left: 10px;">number</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.DetectedRot(number)</td>
    <td style="width:50%; padding-left: 10px;">number</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.DetectedTouchBinormal(index)</td>
    <td style="width:50%; padding-left: 10px;">index</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.DetectedTouchFace(index)</td>
    <td style="width:50%; padding-left: 10px;">index</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.DetectedTouchNormal(index)</td>
    <td style="width:50%; padding-left: 10px;">index</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.DetectedTouchPos(index)</td>
    <td style="width:50%; padding-left: 10px;">index</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.DetectedTouchST(index)</td>
    <td style="width:50%; padding-left: 10px;">index</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.DetectedTouchUV(index)</td>
    <td style="width:50%; padding-left: 10px;">index</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.DetectedType(number)</td>
    <td style="width:50%; padding-left: 10px;">number</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.DetectedVel(number)</td>
    <td style="width:50%; padding-left: 10px;">number</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.GetInventoryName(type, number)</td>
    <td style="width:50%; padding-left: 10px;">number</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.GetListEntryType(src, index)</td>
    <td style="width:50%; padding-left: 10px;">index*</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.GetNotecardLine(name, line)</td>
    <td style="width:50%; padding-left: 10px;">line</td>
  </tr>
    <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.GetNotecardLineSync(name, line)</td>
    <td style="width:50%; padding-left: 10px;">line</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.GetSubString(src, start, end)</td>
    <td style="width:50%; padding-left: 10px;">start*, end*</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.InsertString(dst, pos, src)</td>
    <td style="width:50%; padding-left: 10px;">pos</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.KeysKeyValue(first, count)</td>
    <td style="width:50%; padding-left: 10px;">first</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.LinksetDataFindKeys(pattern, start, count)</td>
    <td style="width:50%; padding-left: 10px;">start</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.LinksetDataListKeys(start, count)</td>
    <td style="width:50%; padding-left: 10px;">start</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.List2Float(src, index)</td>
    <td style="width:50%; padding-left: 10px;">index*</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.List2Integer(src, index)</td>
    <td style="width:50%; padding-left: 10px;">index*</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.List2Key(src, index)</td>
    <td style="width:50%; padding-left: 10px;">index*</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.List2List(src, start, end)</td>
    <td style="width:50%; padding-left: 10px;">start*, end*</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.List2ListSlice(src, start, end, stride, slice_index)</td>
    <td style="width:50%; padding-left: 10px;">start*, end*, slice_index*</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.List2ListStrided(src, start, end, stride)</td>
    <td style="width:50%; padding-left: 10px;">start*, end*</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.List2Rot(src, index)</td>
    <td style="width:50%; padding-left: 10px;">index*</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.List2String(src, index)</td>
    <td style="width:50%; padding-left: 10px;">index*</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.List2Vector(src, index)</td>
    <td style="width:50%; padding-left: 10px;">index*</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.ListFindList(src, test)</td>
    <td style="width:50%; padding-left: 10px;">&lt;return&gt;</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.ListFindListNext(src, test, instance)</td>
    <td style="width:50%; padding-left: 10px;">&lt;return&gt;, instance*</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.ListFindStrided((src, test, start, end, stride)</td>
    <td style="width:50%; padding-left: 10px;">&lt;return&gt;, start*, end*</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.ListInsertList(dest, src, start)</td>
    <td style="width:50%; padding-left: 10px;">start*</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.ListReplaceList(dest, src, start, end)</td>
    <td style="width:50%; padding-left: 10px;">start*, end*</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.ListSortStrided(src, stride, stride_index, ascending)</td>
    <td style="width:50%; padding-left: 10px;">stride_index*</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.Ord(val, index)</td>
    <td style="width:50%; padding-left: 10px;">index*</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="width:50%; padding-right: 10px;">ll.SubStringIndex(source, pattern)</td>
    <td style="width:50%; padding-left: 10px;">&lt;return&gt;</td>
  </tr>
</table>

### LL functions return nil when not found

The LL functions that returned -1 meaning "not found" now return nil.

These are the functions that change:  
<br>
<table border="1" style="width:50%; border: 1px solid black; border-collapse: collapse; font-family: monospace;">
  <tr style="vertical-align: top;">
    <td style="padding: 5px; border: 1px solid black;">ll.ListFindList</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="padding: 5px; border: 1px solid black;">ll.ListFindListNext</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="padding: 5px; border: 1px solid black;">ll.ListFindStrided</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="padding: 5px; border: 1px solid black;">ll.SubStringIndex</td>
  </tr>
</table>

### boolean LL functions

The LL functions that return a boolean value now return type boolean instead of type number.

Functions like ll.GetPrimitiveParams() and ll.GetObjectDetails() that return boolean values inside lists also return type boolean instead of type number.

LL functions with integer parameters that are a boolean value can receive boolean or number (this already worked in SLua Alpha).

These are the functions that change:  
<br>
<table border="1" style="width:50%; border: 1px solid black; border-collapse: collapse; font-family: monospace;">
  <tr style="vertical-align: top;">
    <td style="padding: 5px; border: 1px solid black;">ll.AgentInExperience</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="padding: 5px; border: 1px solid black;">ll.DerezObject</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="padding: 5px; border: 1px solid black;">ll.DetectedGroup</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="padding: 5px; border: 1px solid black;">ll.EdgeOfWorld</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="padding: 5px; border: 1px solid black;">ll.GetScriptState</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="padding: 5px; border: 1px solid black;">ll.GetStatus</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="padding: 5px; border: 1px solid black;">ll.IsFriend</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="padding: 5px; border: 1px solid black;">ll.IsLinkGLTFMaterial</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="padding: 5px; border: 1px solid black;">ll.ManageEstateAccess</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="padding: 5px; border: 1px solid black;">ll.OverMyLand</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="padding: 5px; border: 1px solid black;">ll.SameGroup</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="padding: 5px; border: 1px solid black;">ll.ScaleByFactor</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="padding: 5px; border: 1px solid black;">ll.ScriptDanger</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="padding: 5px; border: 1px solid black;">ll.SetMemoryLimit</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="padding: 5px; border: 1px solid black;">ll.SetRegionPos</td>
  </tr>
  <tr style="vertical-align: top;">
    <td style="padding: 5px; border: 1px solid black;">ll.VerifyRSA</td>
  </tr>
</table>
