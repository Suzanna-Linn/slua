---
layout: default
title: lljson
slua_beta: true
---

## The library lljson

### What is JSON?

JSON, short for JavaScript Object Notation, is a data format used to store and exchange information.  
It's simple and readable. It uses a clean and minimal structure, easy to understand.  
It's widely supported. It's supported by nearly all programming languages and tools, making it ideal for exchanging data between systems.  

JSON is useful, in general, to exchange complex multilevel structured data between:
- external resources, using http.
- scripts, using linked messages.
- objects, using say and listen.
- Linkset Data storage.

JSON organizes data into two basic structures:
- **Arrays**: list of values, like the array tables in SLua:
	- [ "apple", "banana", "cherry" ]
  - The values are separated by "," and all the array is enclosed in "[" and "]".
- **Objects**: collections of (key, value) pairs, like the dictionary tables in SLua:
	- { "type" : "dog" ,   "name" : "Dufa",   "color" : "white" }
  - The key and the value are separated by ":", the (key, value) pairs are separated by "," and all the object is enclosed in "{" and "}".
  - Keys must be strings. 

There are 4 data types:
- **String**: text enclosed in double quotes ("hello").
- **Number**: Numbers, either integers (42) or decimals (3.14).
- **Boolean**: true or false.
- **Null**: null, a special value indicating no data.

Objects and arrays can contain a mix of these types.  
They also can contain other objects and arrays, in any depth and complexity.  
We can have arrays of objects with keys that are arrays with more arrays and with more objects, etc.

### Library lljson

The functions to work with JSON have their own library: lljson.

There are two pairs of functions:
- **lljson.encode()** / l**ljson.decode()** :
  - They generate or read standard JSON
  - They are useful to exchange data with external resources and other scripting languages.
  - SLua types without a JSON equivalent are encoded as strings.
- **lljson.slencode()** / **lljson.sldecode()** :
  - They generate non standard JSON-like code.
  - They are useful to exchange code with other scripts or objects or to store in linkset data.
  - They are decoded into the original SLua types. 

### encode()



Datatypes mapping with lljson.encode();
<table style="width: 50%; border-collapse: collapse;">
  <thead>
    <tr>
      <th style="border: 2px solid #999999; text-align: center; padding: 8px;">SLua type</th>
      <th style="border: 2px solid #999999; text-align: center; padding: 8px;">JSON type</th>
      <th style="border: 2px solid #999999; text-align: center; padding: 8px;">format</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">nil</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">null</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;"></td>
    </tr>
    <tr>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">boolean</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">boolean</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;"></td>
    </tr>
    <tr>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">number</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">number</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;"></td>
    </tr>
    <tr>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">string</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">string</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;"></td>
    </tr>
    <tr>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">array table</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">array []</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;"></td>
    </tr>
    <tr>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">dictionary table</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">object {}</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">keys encoded as strings</td>
    </tr>
    <tr>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">vector</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">string</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">"<25,50,10>"</td>
    </tr>
    <tr>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">rotation</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">string</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">"<0.5,0.25,0,1>"</td>
    </tr>
    <tr>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">uuid</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">string</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;"></td>
    </tr>
    <tr>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">buffer</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">string</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">encoded as base64 string</td>
    </tr>
    <tr>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">function</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">error</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;"></td>
    </tr>
    <tr>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">thread</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;">error</td>
      <td style="border: 2px solid #999999; text-align: center; padding: 8px;"></td>
    </tr>
  </tbody>
</table>



### decode()



### slencode() / sldecode()



### metamethod __tojson



### lljson contants



#### null



#### empty_array



#### array_mt



#### empty_array_mt



#### _NAME and _VERSION


