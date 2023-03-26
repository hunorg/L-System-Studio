(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS
//
// For some reason, tabs can appear in href protocols and it still works.
// So '\tjava\tSCRIPT:alert("!!!")' and 'javascript:alert("!!!")' are the same
// in practice. That is why _VirtualDom_RE_js and _VirtualDom_RE_js_html look
// so freaky.
//
// Pulling the regular expressions out to the top level gives a slight speed
// boost in small benchmarks (4-10%) but hoisting values to reduce allocation
// can be unpredictable in large programs where JIT may have a harder time with
// functions are not fully self-contained. The benefit is more that the js and
// js_html ones are so weird that I prefer to see them near each other.


var _VirtualDom_RE_script = /^script$/i;
var _VirtualDom_RE_on_formAction = /^(on|formAction$)/i;
var _VirtualDom_RE_js = /^\s*j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:/i;
var _VirtualDom_RE_js_html = /^\s*(j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:|d\s*a\s*t\s*a\s*:\s*t\s*e\s*x\s*t\s*\/\s*h\s*t\s*m\s*l\s*(,|;))/i;


function _VirtualDom_noScript(tag)
{
	return _VirtualDom_RE_script.test(tag) ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return _VirtualDom_RE_on_formAction.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return _VirtualDom_RE_js.test(value)
		? /**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return _VirtualDom_RE_js_html.test(value)
		? /**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlJson(value)
{
	return (typeof _Json_unwrap(value) === 'string' && _VirtualDom_RE_js_html.test(_Json_unwrap(value)))
		? _Json_wrap(
			/**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		) : value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $author$project$Turtle$ClosePolygon = {$: 'ClosePolygon'};
var $author$project$Turtle$DecrementTurningAngle = {$: 'DecrementTurningAngle'};
var $author$project$Turtle$DivideLength = {$: 'DivideLength'};
var $author$project$Turtle$DrawDot = {$: 'DrawDot'};
var $elm$core$Basics$False = {$: 'False'};
var $author$project$Turtle$IncrementLineWidth = {$: 'IncrementLineWidth'};
var $author$project$Turtle$IncrementTurningAngle = {$: 'IncrementTurningAngle'};
var $author$project$Turtle$Move = {$: 'Move'};
var $author$project$Turtle$MoveWithoutDrawing = {$: 'MoveWithoutDrawing'};
var $author$project$Turtle$MultiplyLength = {$: 'MultiplyLength'};
var $author$project$Turtle$OpenPolygon = {$: 'OpenPolygon'};
var $author$project$Turtle$Pop = {$: 'Pop'};
var $author$project$Turtle$Push = {$: 'Push'};
var $author$project$Turtle$ReverseDirection = {$: 'ReverseDirection'};
var $author$project$Turtle$SwapPlusMinus = {$: 'SwapPlusMinus'};
var $author$project$Turtle$TurnLeft = {$: 'TurnLeft'};
var $author$project$Turtle$TurnRight = {$: 'TurnRight'};
var $elm$core$Basics$append = _Utils_append;
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $simonh1000$elm_colorpicker$ColorPicker$State = function (a) {
	return {$: 'State', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $simonh1000$elm_colorpicker$ColorPicker$Unpressed = {$: 'Unpressed'};
var $simonh1000$elm_colorpicker$ColorPicker$blankModel = {hue: $elm$core$Maybe$Nothing, mouseTarget: $simonh1000$elm_colorpicker$ColorPicker$Unpressed};
var $simonh1000$elm_colorpicker$ColorPicker$empty = $simonh1000$elm_colorpicker$ColorPicker$State($simonh1000$elm_colorpicker$ColorPicker$blankModel);
var $author$project$Turtle$NoAction = {$: 'NoAction'};
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$String$cons = _String_cons;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $author$project$Model$emptySymbolAssignments = function () {
	var lowercaseChars = _List_fromArray(
		[
			_Utils_chr('a'),
			_Utils_chr('b'),
			_Utils_chr('c'),
			_Utils_chr('d'),
			_Utils_chr('e'),
			_Utils_chr('g'),
			_Utils_chr('h'),
			_Utils_chr('i'),
			_Utils_chr('j'),
			_Utils_chr('k'),
			_Utils_chr('l'),
			_Utils_chr('m'),
			_Utils_chr('n'),
			_Utils_chr('o'),
			_Utils_chr('p'),
			_Utils_chr('q'),
			_Utils_chr('r'),
			_Utils_chr('s'),
			_Utils_chr('t'),
			_Utils_chr('u'),
			_Utils_chr('v'),
			_Utils_chr('w'),
			_Utils_chr('x'),
			_Utils_chr('y'),
			_Utils_chr('z')
		]);
	var createSymbol = function (_char) {
		return {
			action: $author$project$Turtle$NoAction,
			character: $elm$core$String$fromChar(_char)
		};
	};
	return A2($elm$core$List$map, createSymbol, lowercaseChars);
}();
var $avh4$elm_color$Color$RgbaSpace = F4(
	function (a, b, c, d) {
		return {$: 'RgbaSpace', a: a, b: b, c: c, d: d};
	});
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $avh4$elm_color$Color$red = A4($avh4$elm_color$Color$RgbaSpace, 204 / 255, 0 / 255, 0 / 255, 1.0);
var $author$project$Model$init = {
	axiom: '',
	colorPicker: $simonh1000$elm_colorpicker$ColorPicker$empty,
	drawnTurtle: false,
	generatedSequence: _List_Nil,
	iterations: 0,
	lineLength: 1,
	lineLengthScale: 0,
	lineWidthIncrement: 0,
	newRuleInput: '',
	polygonFillColor: $avh4$elm_color$Color$red,
	rules: _List_Nil,
	selectedAction: $author$project$Turtle$Move,
	selectedSymbol: 'F',
	startingAngle: 0,
	startingPoint: _Utils_Tuple2(700, 500),
	symbolAssignments: _Utils_ap(
		_List_fromArray(
			[
				{action: $author$project$Turtle$Move, character: 'F'},
				{action: $author$project$Turtle$Move, character: 'G'},
				{action: $author$project$Turtle$MoveWithoutDrawing, character: 'f'},
				{action: $author$project$Turtle$TurnLeft, character: '+'},
				{action: $author$project$Turtle$TurnRight, character: '-'},
				{action: $author$project$Turtle$ReverseDirection, character: '|'},
				{action: $author$project$Turtle$Push, character: '['},
				{action: $author$project$Turtle$Pop, character: ']'},
				{action: $author$project$Turtle$IncrementLineWidth, character: '#'},
				{action: $author$project$Turtle$DrawDot, character: '@'},
				{action: $author$project$Turtle$OpenPolygon, character: '{'},
				{action: $author$project$Turtle$ClosePolygon, character: '}'},
				{action: $author$project$Turtle$MultiplyLength, character: '<'},
				{action: $author$project$Turtle$DivideLength, character: '>'},
				{action: $author$project$Turtle$SwapPlusMinus, character: '&'},
				{action: $author$project$Turtle$DecrementTurningAngle, character: '('},
				{action: $author$project$Turtle$IncrementTurningAngle, character: ')'}
			]),
		$author$project$Model$emptySymbolAssignments),
	syntaxDisplay: false,
	turningAngle: 0,
	turningAngleIncrement: 0
};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $elm$browser$Browser$sandbox = function (impl) {
	return _Browser_element(
		{
			init: function (_v0) {
				return _Utils_Tuple2(impl.init, $elm$core$Platform$Cmd$none);
			},
			subscriptions: function (_v1) {
				return $elm$core$Platform$Sub$none;
			},
			update: F2(
				function (msg, model) {
					return _Utils_Tuple2(
						A2(impl.update, msg, model),
						$elm$core$Platform$Cmd$none);
				}),
			view: impl.view
		});
};
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $elm_community$list_extra$List$Extra$find = F2(
	function (predicate, list) {
		find:
		while (true) {
			if (!list.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var first = list.a;
				var rest = list.b;
				if (predicate(first)) {
					return $elm$core$Maybe$Just(first);
				} else {
					var $temp$predicate = predicate,
						$temp$list = rest;
					predicate = $temp$predicate;
					list = $temp$list;
					continue find;
				}
			}
		}
	});
var $elm$core$String$foldr = _String_foldr;
var $elm$core$String$toList = function (string) {
	return A3($elm$core$String$foldr, $elm$core$List$cons, _List_Nil, string);
};
var $author$project$LSys$generateSequence = F3(
	function (iterations, axiom, rules) {
		var expandSymbol = function (symbol) {
			var _v1 = A2(
				$elm_community$list_extra$List$Extra$find,
				function (_v2) {
					var s = _v2.a;
					return _Utils_eq(s, symbol);
				},
				rules);
			if (_v1.$ === 'Just') {
				var _v3 = _v1.a;
				var replacement = _v3.b;
				return replacement;
			} else {
				return _List_fromArray(
					[symbol]);
			}
		};
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, seq) {
					return A2($elm$core$List$concatMap, expandSymbol, seq);
				}),
			$elm$core$String$toList(axiom),
			A2($elm$core$List$range, 1, iterations));
	});
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$Basics$not = _Basics_not;
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $elm$core$String$toFloat = _String_toFloat;
var $elm$core$Tuple$mapFirst = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			func(x),
			y);
	});
var $avh4$elm_color$Color$hsla = F4(
	function (hue, sat, light, alpha) {
		var _v0 = _Utils_Tuple3(hue, sat, light);
		var h = _v0.a;
		var s = _v0.b;
		var l = _v0.c;
		var m2 = (l <= 0.5) ? (l * (s + 1)) : ((l + s) - (l * s));
		var m1 = (l * 2) - m2;
		var hueToRgb = function (h__) {
			var h_ = (h__ < 0) ? (h__ + 1) : ((h__ > 1) ? (h__ - 1) : h__);
			return ((h_ * 6) < 1) ? (m1 + (((m2 - m1) * h_) * 6)) : (((h_ * 2) < 1) ? m2 : (((h_ * 3) < 2) ? (m1 + (((m2 - m1) * ((2 / 3) - h_)) * 6)) : m1));
		};
		var b = hueToRgb(h - (1 / 3));
		var g = hueToRgb(h);
		var r = hueToRgb(h + (1 / 3));
		return A4($avh4$elm_color$Color$RgbaSpace, r, g, b, alpha);
	});
var $avh4$elm_color$Color$fromHsla = function (_v0) {
	var hue = _v0.hue;
	var saturation = _v0.saturation;
	var lightness = _v0.lightness;
	var alpha = _v0.alpha;
	return A4($avh4$elm_color$Color$hsla, hue, saturation, lightness, alpha);
};
var $elm$core$Basics$isNaN = _Basics_isNaN;
var $elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var $avh4$elm_color$Color$toHsla = function (_v0) {
	var r = _v0.a;
	var g = _v0.b;
	var b = _v0.c;
	var a = _v0.d;
	var minColor = A2(
		$elm$core$Basics$min,
		r,
		A2($elm$core$Basics$min, g, b));
	var maxColor = A2(
		$elm$core$Basics$max,
		r,
		A2($elm$core$Basics$max, g, b));
	var l = (minColor + maxColor) / 2;
	var s = _Utils_eq(minColor, maxColor) ? 0 : ((l < 0.5) ? ((maxColor - minColor) / (maxColor + minColor)) : ((maxColor - minColor) / ((2 - maxColor) - minColor)));
	var h1 = _Utils_eq(maxColor, r) ? ((g - b) / (maxColor - minColor)) : (_Utils_eq(maxColor, g) ? (2 + ((b - r) / (maxColor - minColor))) : (4 + ((r - g) / (maxColor - minColor))));
	var h2 = h1 * (1 / 6);
	var h3 = $elm$core$Basics$isNaN(h2) ? 0 : ((h2 < 0) ? (h2 + 1) : h2);
	return {alpha: a, hue: h3, lightness: l, saturation: s};
};
var $simonh1000$elm_colorpicker$ColorPicker$widgetWidth = 200;
var $simonh1000$elm_colorpicker$ColorPicker$calcHue = F2(
	function (col, _v0) {
		var x = _v0.x;
		var mousePressed = _v0.mousePressed;
		var hue = x / $simonh1000$elm_colorpicker$ColorPicker$widgetWidth;
		var hsla = $avh4$elm_color$Color$toHsla(col);
		var saturation = hsla.saturation;
		var lightness = hsla.lightness;
		var alpha = hsla.alpha;
		var newCol = ((!saturation) && (lightness < 0.02)) ? _Utils_update(
			hsla,
			{hue: hue, lightness: 0.5, saturation: 0.5}) : _Utils_update(
			hsla,
			{hue: hue});
		return $avh4$elm_color$Color$fromHsla(newCol);
	});
var $elm$core$Basics$clamp = F3(
	function (low, high, number) {
		return (_Utils_cmp(number, low) < 0) ? low : ((_Utils_cmp(number, high) > 0) ? high : number);
	});
var $simonh1000$elm_colorpicker$ColorPicker$calcOpacity = F3(
	function (col, _v0, _v1) {
		var x = _v1.x;
		var mousePressed = _v1.mousePressed;
		var hsla = $avh4$elm_color$Color$toHsla(col);
		return $avh4$elm_color$Color$fromHsla(
			_Utils_update(
				hsla,
				{
					alpha: A3($elm$core$Basics$clamp, 0, $simonh1000$elm_colorpicker$ColorPicker$widgetWidth, x) / $simonh1000$elm_colorpicker$ColorPicker$widgetWidth
				}));
	});
var $simonh1000$elm_colorpicker$ColorPicker$widgetHeight = 150;
var $simonh1000$elm_colorpicker$ColorPicker$calcSatLight = F3(
	function (col, currHue, _v0) {
		var x = _v0.x;
		var y = _v0.y;
		var mousePressed = _v0.mousePressed;
		var hsla = $avh4$elm_color$Color$toHsla(col);
		return $avh4$elm_color$Color$fromHsla(
			_Utils_update(
				hsla,
				{hue: currHue, lightness: 1 - (y / $simonh1000$elm_colorpicker$ColorPicker$widgetHeight), saturation: x / $simonh1000$elm_colorpicker$ColorPicker$widgetWidth}));
	});
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $simonh1000$elm_colorpicker$ColorPicker$setHue = F3(
	function (mouseTarget, mouseInfo, model) {
		switch (mouseTarget.$) {
			case 'SatLight':
				var hue = mouseTarget.a;
				return _Utils_update(
					model,
					{
						hue: $elm$core$Maybe$Just(
							A2($elm$core$Maybe$withDefault, hue, model.hue))
					});
			case 'HueSlider':
				return _Utils_update(
					model,
					{
						hue: $elm$core$Maybe$Just(mouseInfo.x / $simonh1000$elm_colorpicker$ColorPicker$widgetWidth)
					});
			case 'OpacitySlider':
				var hue = mouseTarget.a;
				return _Utils_update(
					model,
					{
						hue: $elm$core$Maybe$Just(
							A2($elm$core$Maybe$withDefault, hue, model.hue))
					});
			default:
				return model;
		}
	});
var $simonh1000$elm_colorpicker$ColorPicker$setMouseTarget = F2(
	function (mouseTarget, model) {
		return _Utils_update(
			model,
			{mouseTarget: mouseTarget});
	});
var $simonh1000$elm_colorpicker$ColorPicker$update_ = F3(
	function (message, col, model) {
		var calcNewColour = function (mouseTarget) {
			switch (mouseTarget.$) {
				case 'SatLight':
					var hue = mouseTarget.a;
					return A2(
						$elm$core$Basics$composeL,
						$elm$core$Maybe$Just,
						A2(
							$simonh1000$elm_colorpicker$ColorPicker$calcSatLight,
							col,
							A2($elm$core$Maybe$withDefault, hue, model.hue)));
				case 'HueSlider':
					return A2(
						$elm$core$Basics$composeL,
						$elm$core$Maybe$Just,
						$simonh1000$elm_colorpicker$ColorPicker$calcHue(col));
				case 'OpacitySlider':
					var hue = mouseTarget.a;
					return A2(
						$elm$core$Basics$composeL,
						$elm$core$Maybe$Just,
						A2(
							$simonh1000$elm_colorpicker$ColorPicker$calcOpacity,
							col,
							A2($elm$core$Maybe$withDefault, hue, model.hue)));
				default:
					return function (_v2) {
						return $elm$core$Maybe$Nothing;
					};
			}
		};
		var handleMouseMove = F2(
			function (mouseTarget, mouseInfo) {
				return (mouseInfo.mousePressed && _Utils_eq(model.mouseTarget, mouseTarget)) ? _Utils_Tuple2(
					A3($simonh1000$elm_colorpicker$ColorPicker$setHue, mouseTarget, mouseInfo, model),
					A2(calcNewColour, mouseTarget, mouseInfo)) : (((!mouseInfo.mousePressed) && _Utils_eq(model.mouseTarget, mouseTarget)) ? _Utils_Tuple2(
					A2($simonh1000$elm_colorpicker$ColorPicker$setMouseTarget, $simonh1000$elm_colorpicker$ColorPicker$Unpressed, model),
					$elm$core$Maybe$Nothing) : _Utils_Tuple2(model, $elm$core$Maybe$Nothing));
			});
		switch (message.$) {
			case 'OnMouseDown':
				var mouseTarget = message.a;
				var mouseInfo = message.b;
				return _Utils_Tuple2(
					A3(
						$simonh1000$elm_colorpicker$ColorPicker$setHue,
						mouseTarget,
						mouseInfo,
						A2($simonh1000$elm_colorpicker$ColorPicker$setMouseTarget, mouseTarget, model)),
					A2(calcNewColour, mouseTarget, mouseInfo));
			case 'OnMouseMove':
				var mouseTarget = message.a;
				var mouseInfo = message.b;
				return A2(handleMouseMove, mouseTarget, mouseInfo);
			case 'OnClick':
				var mouseTarget = message.a;
				var mouseInfo = message.b;
				return _Utils_Tuple2(
					A3($simonh1000$elm_colorpicker$ColorPicker$setHue, mouseTarget, mouseInfo, model),
					A2(calcNewColour, mouseTarget, mouseInfo));
			case 'OnMouseUp':
				return _Utils_Tuple2(
					A2($simonh1000$elm_colorpicker$ColorPicker$setMouseTarget, $simonh1000$elm_colorpicker$ColorPicker$Unpressed, model),
					$elm$core$Maybe$Nothing);
			default:
				return _Utils_Tuple2(model, $elm$core$Maybe$Nothing);
		}
	});
var $simonh1000$elm_colorpicker$ColorPicker$update = F3(
	function (message, col, _v0) {
		var model = _v0.a;
		return A2(
			$elm$core$Tuple$mapFirst,
			$simonh1000$elm_colorpicker$ColorPicker$State,
			A3($simonh1000$elm_colorpicker$ColorPicker$update_, message, col, model));
	});
var $author$project$Update$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'ToggleSyntaxDisplay':
				return _Utils_update(
					model,
					{syntaxDisplay: !model.syntaxDisplay});
			case 'SelectSymbol':
				var character = msg.a;
				return _Utils_update(
					model,
					{selectedSymbol: character});
			case 'SelectAxiom':
				var newAxiom = msg.a;
				return _Utils_update(
					model,
					{axiom: newAxiom});
			case 'UpdateNewRuleInput':
				var input = msg.a;
				return _Utils_update(
					model,
					{newRuleInput: input});
			case 'UpdateAngle':
				var turningAngle = msg.a;
				return _Utils_update(
					model,
					{turningAngle: turningAngle});
			case 'UpdateTurningAngleIncrement':
				var newTurningAngleIncrement = msg.a;
				return _Utils_update(
					model,
					{turningAngleIncrement: newTurningAngleIncrement});
			case 'UpdateLineLength':
				var newLength = msg.a;
				return _Utils_update(
					model,
					{lineLength: newLength});
			case 'UpdateLineLengthScale':
				var newLengthScale = msg.a;
				return _Utils_update(
					model,
					{lineLengthScale: newLengthScale});
			case 'UpdateLineWidthIncrement':
				var newIncrementSize = msg.a;
				return _Utils_update(
					model,
					{lineWidthIncrement: newIncrementSize});
			case 'UpdateIterations':
				var newIterations = msg.a;
				return _Utils_update(
					model,
					{iterations: newIterations});
			case 'UpdateStartingPointX':
				var value = msg.a;
				return _Utils_update(
					model,
					{
						startingPoint: _Utils_Tuple2(
							A2(
								$elm$core$Maybe$withDefault,
								0,
								$elm$core$String$toFloat(value)),
							model.startingPoint.b)
					});
			case 'UpdateStartingPointY':
				var value = msg.a;
				return _Utils_update(
					model,
					{
						startingPoint: _Utils_Tuple2(
							model.startingPoint.a,
							A2(
								$elm$core$Maybe$withDefault,
								0,
								$elm$core$String$toFloat(value)))
					});
			case 'UpdateStartingAngle':
				var newStartingAngle = msg.a;
				return _Utils_update(
					model,
					{startingAngle: newStartingAngle});
			case 'ColorPickerMsg':
				var colorPickerMsg = msg.a;
				var _v1 = A3($simonh1000$elm_colorpicker$ColorPicker$update, colorPickerMsg, model.polygonFillColor, model.colorPicker);
				var newColorPicker = _v1.a;
				var newColorMaybe = _v1.b;
				return _Utils_update(
					model,
					{
						colorPicker: newColorPicker,
						polygonFillColor: A2($elm$core$Maybe$withDefault, model.polygonFillColor, newColorMaybe)
					});
			case 'AddRule':
				var newRule = _Utils_Tuple2(
					A2(
						$elm$core$Maybe$withDefault,
						_Utils_chr(' '),
						A2(
							$elm$core$Maybe$map,
							$elm$core$Tuple$first,
							$elm$core$String$uncons(model.selectedSymbol))),
					$elm$core$String$toList(model.newRuleInput));
				var newModel = _Utils_update(
					model,
					{
						newRuleInput: '',
						rules: _Utils_ap(
							model.rules,
							_List_fromArray(
								[newRule]))
					});
				return _Utils_update(
					newModel,
					{
						generatedSequence: A3($author$project$LSys$generateSequence, newModel.iterations, newModel.axiom, newModel.rules)
					});
			case 'ApplyAxiom':
				return _Utils_update(
					model,
					{
						generatedSequence: A3($author$project$LSys$generateSequence, model.iterations, model.axiom, model.rules)
					});
			default:
				return _Utils_update(
					model,
					{
						drawnTurtle: true,
						generatedSequence: A3($author$project$LSys$generateSequence, model.iterations, model.axiom, model.rules)
					});
		}
	});
var $author$project$Update$AddRule = {$: 'AddRule'};
var $author$project$Update$ApplyAxiom = {$: 'ApplyAxiom'};
var $author$project$Update$DrawTurtle = {$: 'DrawTurtle'};
var $elm_community$typed_svg$TypedSvg$Types$Px = function (a) {
	return {$: 'Px', a: a};
};
var $author$project$Update$SelectAxiom = function (a) {
	return {$: 'SelectAxiom', a: a};
};
var $author$project$Update$SelectSymbol = function (a) {
	return {$: 'SelectSymbol', a: a};
};
var $author$project$Update$ToggleSyntaxDisplay = {$: 'ToggleSyntaxDisplay'};
var $author$project$Update$UpdateAngle = function (a) {
	return {$: 'UpdateAngle', a: a};
};
var $author$project$Update$UpdateIterations = function (a) {
	return {$: 'UpdateIterations', a: a};
};
var $author$project$Update$UpdateLineLength = function (a) {
	return {$: 'UpdateLineLength', a: a};
};
var $author$project$Update$UpdateLineLengthScale = function (a) {
	return {$: 'UpdateLineLengthScale', a: a};
};
var $author$project$Update$UpdateLineWidthIncrement = function (a) {
	return {$: 'UpdateLineWidthIncrement', a: a};
};
var $author$project$Update$UpdateNewRuleInput = function (a) {
	return {$: 'UpdateNewRuleInput', a: a};
};
var $author$project$Update$UpdateStartingAngle = function (a) {
	return {$: 'UpdateStartingAngle', a: a};
};
var $author$project$Update$UpdateTurningAngleIncrement = function (a) {
	return {$: 'UpdateTurningAngleIncrement', a: a};
};
var $elm$html$Html$a = _VirtualDom_node('a');
var $elm_community$typed_svg$TypedSvg$Types$Paint = function (a) {
	return {$: 'Paint', a: a};
};
var $avh4$elm_color$Color$black = A4($avh4$elm_color$Color$RgbaSpace, 0 / 255, 0 / 255, 0 / 255, 1.0);
var $elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $elm_community$typed_svg$TypedSvg$Core$attribute = $elm$virtual_dom$VirtualDom$attribute;
var $elm$core$String$concat = function (strings) {
	return A2($elm$core$String$join, '', strings);
};
var $elm$core$String$fromFloat = _String_fromNumber;
var $elm$core$Basics$round = _Basics_round;
var $avh4$elm_color$Color$toCssString = function (_v0) {
	var r = _v0.a;
	var g = _v0.b;
	var b = _v0.c;
	var a = _v0.d;
	var roundTo = function (x) {
		return $elm$core$Basics$round(x * 1000) / 1000;
	};
	var pct = function (x) {
		return $elm$core$Basics$round(x * 10000) / 100;
	};
	return $elm$core$String$concat(
		_List_fromArray(
			[
				'rgba(',
				$elm$core$String$fromFloat(
				pct(r)),
				'%,',
				$elm$core$String$fromFloat(
				pct(g)),
				'%,',
				$elm$core$String$fromFloat(
				pct(b)),
				'%,',
				$elm$core$String$fromFloat(
				roundTo(a)),
				')'
			]));
};
var $elm_community$typed_svg$TypedSvg$TypesToStrings$paintToString = function (paint) {
	switch (paint.$) {
		case 'Paint':
			var color = paint.a;
			return $avh4$elm_color$Color$toCssString(color);
		case 'CSSVariable':
			var string = paint.a;
			return $elm$core$String$concat(
				_List_fromArray(
					['var(' + (string + ')')]));
		case 'Reference':
			var string = paint.a;
			return $elm$core$String$concat(
				_List_fromArray(
					['url(#', string, ')']));
		case 'ContextFill':
			return 'context-fill';
		case 'ContextStroke':
			return 'context-stroke';
		default:
			return 'none';
	}
};
var $elm_community$typed_svg$TypedSvg$Attributes$fill = A2(
	$elm$core$Basics$composeL,
	$elm_community$typed_svg$TypedSvg$Core$attribute('fill'),
	$elm_community$typed_svg$TypedSvg$TypesToStrings$paintToString);
var $elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString = function (length) {
	switch (length.$) {
		case 'Cm':
			var x = length.a;
			return $elm$core$String$fromFloat(x) + 'cm';
		case 'Em':
			var x = length.a;
			return $elm$core$String$fromFloat(x) + 'em';
		case 'Ex':
			var x = length.a;
			return $elm$core$String$fromFloat(x) + 'ex';
		case 'In':
			var x = length.a;
			return $elm$core$String$fromFloat(x) + 'in';
		case 'Mm':
			var x = length.a;
			return $elm$core$String$fromFloat(x) + 'mm';
		case 'Num':
			var x = length.a;
			return $elm$core$String$fromFloat(x);
		case 'Pc':
			var x = length.a;
			return $elm$core$String$fromFloat(x) + 'pc';
		case 'Percent':
			var x = length.a;
			return $elm$core$String$fromFloat(x) + '%';
		case 'Pt':
			var x = length.a;
			return $elm$core$String$fromFloat(x) + 'pt';
		case 'Px':
			var x = length.a;
			return $elm$core$String$fromFloat(x) + 'px';
		default:
			var x = length.a;
			return $elm$core$String$fromFloat(x) + 'rem';
	}
};
var $elm_community$typed_svg$TypedSvg$Attributes$height = function (length) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'height',
		$elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(length));
};
var $elm$virtual_dom$VirtualDom$nodeNS = F2(
	function (namespace, tag) {
		return A2(
			_VirtualDom_nodeNS,
			namespace,
			_VirtualDom_noScript(tag));
	});
var $elm_community$typed_svg$TypedSvg$Core$node = $elm$virtual_dom$VirtualDom$nodeNS('http://www.w3.org/2000/svg');
var $elm_community$typed_svg$TypedSvg$rect = $elm_community$typed_svg$TypedSvg$Core$node('rect');
var $avh4$elm_color$Color$scaleFrom255 = function (c) {
	return c / 255;
};
var $avh4$elm_color$Color$rgb255 = F3(
	function (r, g, b) {
		return A4(
			$avh4$elm_color$Color$RgbaSpace,
			$avh4$elm_color$Color$scaleFrom255(r),
			$avh4$elm_color$Color$scaleFrom255(g),
			$avh4$elm_color$Color$scaleFrom255(b),
			1.0);
	});
var $elm_community$typed_svg$TypedSvg$Attributes$stroke = A2(
	$elm$core$Basics$composeL,
	$elm_community$typed_svg$TypedSvg$Core$attribute('stroke'),
	$elm_community$typed_svg$TypedSvg$TypesToStrings$paintToString);
var $elm_community$typed_svg$TypedSvg$Attributes$strokeWidth = function (length) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'stroke-width',
		$elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(length));
};
var $elm_community$typed_svg$TypedSvg$Attributes$width = function (length) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'width',
		$elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(length));
};
var $elm_community$typed_svg$TypedSvg$Attributes$x = function (length) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'x',
		$elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(length));
};
var $elm_community$typed_svg$TypedSvg$Attributes$y = function (length) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'y',
		$elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(length));
};
var $author$project$View$baseRect = _List_fromArray(
	[
		A2(
		$elm_community$typed_svg$TypedSvg$rect,
		_List_fromArray(
			[
				$elm_community$typed_svg$TypedSvg$Attributes$x(
				$elm_community$typed_svg$TypedSvg$Types$Px(0)),
				$elm_community$typed_svg$TypedSvg$Attributes$y(
				$elm_community$typed_svg$TypedSvg$Types$Px(0)),
				$elm_community$typed_svg$TypedSvg$Attributes$width(
				$elm_community$typed_svg$TypedSvg$Types$Px(1900)),
				$elm_community$typed_svg$TypedSvg$Attributes$height(
				$elm_community$typed_svg$TypedSvg$Types$Px(1600)),
				$elm_community$typed_svg$TypedSvg$Attributes$fill(
				$elm_community$typed_svg$TypedSvg$Types$Paint($avh4$elm_color$Color$black)),
				$elm_community$typed_svg$TypedSvg$Attributes$stroke(
				$elm_community$typed_svg$TypedSvg$Types$Paint(
					A3($avh4$elm_color$Color$rgb255, 235, 81, 96))),
				$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
				$elm_community$typed_svg$TypedSvg$Types$Px(6))
			]),
		_List_Nil)
	]);
var $elm$html$Html$button = _VirtualDom_node('button');
var $author$project$Update$ColorPickerMsg = function (a) {
	return {$: 'ColorPickerMsg', a: a};
};
var $elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var $elm$html$Html$map = $elm$virtual_dom$VirtualDom$map;
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $simonh1000$elm_colorpicker$ColorPicker$markerAttrs = _List_fromArray(
	[
		A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
		A2($elm$html$Html$Attributes$style, 'top', '1px'),
		A2($elm$html$Html$Attributes$style, 'bottom', '1px'),
		A2($elm$html$Html$Attributes$style, 'border', '1px solid #ddd'),
		A2($elm$html$Html$Attributes$style, 'background-color', '#ffffff'),
		A2($elm$html$Html$Attributes$style, 'width', '6px'),
		A2($elm$html$Html$Attributes$style, 'pointer-events', 'none')
	]);
var $simonh1000$elm_colorpicker$ColorPicker$markerCorrection = 4;
var $simonh1000$elm_colorpicker$ColorPicker$alphaMarker = function (alpha) {
	var xVal = $elm$core$String$fromInt(
		$elm$core$Basics$round((alpha * $simonh1000$elm_colorpicker$ColorPicker$widgetWidth) - $simonh1000$elm_colorpicker$ColorPicker$markerCorrection));
	return A2(
		$elm$html$Html$div,
		A2(
			$elm$core$List$cons,
			A2($elm$html$Html$Attributes$style, 'left', xVal + 'px'),
			$simonh1000$elm_colorpicker$ColorPicker$markerAttrs),
		_List_Nil);
};
var $simonh1000$elm_colorpicker$ColorPicker$NoOp = {$: 'NoOp'};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $simonh1000$elm_colorpicker$ColorPicker$bubblePreventer = A2(
	$elm$html$Html$Events$stopPropagationOn,
	'click',
	$elm$json$Json$Decode$succeed(
		_Utils_Tuple2($simonh1000$elm_colorpicker$ColorPicker$NoOp, true)));
var $simonh1000$elm_colorpicker$ColorPicker$checkedBkgStyles = _List_fromArray(
	[
		A2($elm$html$Html$Attributes$style, 'background-size', '12px 12px'),
		A2($elm$html$Html$Attributes$style, 'background-position', '0 0, 0 6px, 6px -6px, -6px 0px'),
		A2($elm$html$Html$Attributes$style, 'background-image', 'linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%)')
	]);
var $elm$json$Json$Encode$string = _Json_wrap;
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $avh4$elm_color$Color$hsl = F3(
	function (h, s, l) {
		return A4($avh4$elm_color$Color$hsla, h, s, l, 1.0);
	});
var $simonh1000$elm_colorpicker$ColorPicker$hueMarker = function (lastHue) {
	var xVal = $elm$core$String$fromInt(
		$elm$core$Basics$round((lastHue * $simonh1000$elm_colorpicker$ColorPicker$widgetWidth) - $simonh1000$elm_colorpicker$ColorPicker$markerCorrection));
	return A2(
		$elm$html$Html$div,
		A2(
			$elm$core$List$cons,
			A2($elm$html$Html$Attributes$style, 'left', xVal + 'px'),
			$simonh1000$elm_colorpicker$ColorPicker$markerAttrs),
		_List_Nil);
};
var $simonh1000$elm_colorpicker$ColorPicker$HueSlider = {$: 'HueSlider'};
var $simonh1000$elm_colorpicker$ColorPicker$OnMouseMove = F2(
	function (a, b) {
		return {$: 'OnMouseMove', a: a, b: b};
	});
var $elm$svg$Svg$Attributes$class = _VirtualDom_attribute('class');
var $elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var $elm$svg$Svg$defs = $elm$svg$Svg$trustedNode('defs');
var $elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var $elm$svg$Svg$Attributes$height = _VirtualDom_attribute('height');
var $elm$svg$Svg$Attributes$id = _VirtualDom_attribute('id');
var $elm$svg$Svg$linearGradient = $elm$svg$Svg$trustedNode('linearGradient');
var $elm$svg$Svg$Attributes$offset = _VirtualDom_attribute('offset');
var $elm$svg$Svg$rect = $elm$svg$Svg$trustedNode('rect');
var $elm$svg$Svg$Attributes$display = _VirtualDom_attribute('display');
var $elm$svg$Svg$Attributes$width = _VirtualDom_attribute('width');
var $simonh1000$elm_colorpicker$ColorPicker$sliderStyles = _List_fromArray(
	[
		$elm$svg$Svg$Attributes$width(
		$elm$core$String$fromInt($simonh1000$elm_colorpicker$ColorPicker$widgetWidth)),
		$elm$svg$Svg$Attributes$height('100%'),
		$elm$svg$Svg$Attributes$display('block')
	]);
var $elm$svg$Svg$stop = $elm$svg$Svg$trustedNode('stop');
var $elm$svg$Svg$Attributes$stopColor = _VirtualDom_attribute('stop-color');
var $elm$svg$Svg$Attributes$stopOpacity = _VirtualDom_attribute('stop-opacity');
var $elm$svg$Svg$svg = $elm$svg$Svg$trustedNode('svg');
var $simonh1000$elm_colorpicker$ColorPicker$OnClick = F2(
	function (a, b) {
		return {$: 'OnClick', a: a, b: b};
	});
var $simonh1000$elm_colorpicker$ColorPicker$OnMouseDown = F2(
	function (a, b) {
		return {$: 'OnMouseDown', a: a, b: b};
	});
var $simonh1000$elm_colorpicker$ColorPicker$OnMouseUp = {$: 'OnMouseUp'};
var $simonh1000$elm_colorpicker$ColorPicker$MouseInfo = F3(
	function (x, y, mousePressed) {
		return {mousePressed: mousePressed, x: x, y: y};
	});
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $elm$json$Json$Decode$map3 = _Json_map3;
var $elm$core$Basics$neq = _Utils_notEqual;
var $simonh1000$elm_colorpicker$ColorPicker$decodeMouseInfo = A4(
	$elm$json$Json$Decode$map3,
	$simonh1000$elm_colorpicker$ColorPicker$MouseInfo,
	A2($elm$json$Json$Decode$field, 'offsetX', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'offsetY', $elm$json$Json$Decode$int),
	A2(
		$elm$json$Json$Decode$map,
		$elm$core$Basics$neq(0),
		A2($elm$json$Json$Decode$field, 'buttons', $elm$json$Json$Decode$int)));
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$svg$Svg$Events$on = $elm$html$Html$Events$on;
var $simonh1000$elm_colorpicker$ColorPicker$onClickSvg = function (msgCreator) {
	return A2(
		$elm$svg$Svg$Events$on,
		'click',
		A2($elm$json$Json$Decode$map, msgCreator, $simonh1000$elm_colorpicker$ColorPicker$decodeMouseInfo));
};
var $simonh1000$elm_colorpicker$ColorPicker$onMouseDownSvg = function (msgCreator) {
	return A2(
		$elm$svg$Svg$Events$on,
		'mousedown',
		A2($elm$json$Json$Decode$map, msgCreator, $simonh1000$elm_colorpicker$ColorPicker$decodeMouseInfo));
};
var $simonh1000$elm_colorpicker$ColorPicker$onMouseMoveSvg = function (msgCreator) {
	return A2(
		$elm$svg$Svg$Events$on,
		'mousemove',
		A2($elm$json$Json$Decode$map, msgCreator, $simonh1000$elm_colorpicker$ColorPicker$decodeMouseInfo));
};
var $elm$svg$Svg$Events$onMouseUp = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'mouseup',
		$elm$json$Json$Decode$succeed(msg));
};
var $simonh1000$elm_colorpicker$ColorPicker$svgDragAttrs = F3(
	function (currMouseTgt, thisTgt, onMoveMsg) {
		var common = _List_fromArray(
			[
				$simonh1000$elm_colorpicker$ColorPicker$onMouseDownSvg(
				$simonh1000$elm_colorpicker$ColorPicker$OnMouseDown(thisTgt)),
				$elm$svg$Svg$Events$onMouseUp($simonh1000$elm_colorpicker$ColorPicker$OnMouseUp),
				$simonh1000$elm_colorpicker$ColorPicker$onClickSvg(
				$simonh1000$elm_colorpicker$ColorPicker$OnClick(thisTgt))
			]);
		return _Utils_eq(currMouseTgt, thisTgt) ? A2(
			$elm$core$List$cons,
			$simonh1000$elm_colorpicker$ColorPicker$onMouseMoveSvg(onMoveMsg),
			common) : common;
	});
var $elm$svg$Svg$Attributes$x = _VirtualDom_attribute('x');
var $elm$svg$Svg$Attributes$x1 = _VirtualDom_attribute('x1');
var $elm$svg$Svg$Attributes$x2 = _VirtualDom_attribute('x2');
var $elm$svg$Svg$Attributes$y = _VirtualDom_attribute('y');
var $elm$svg$Svg$Attributes$y1 = _VirtualDom_attribute('y1');
var $elm$svg$Svg$Attributes$y2 = _VirtualDom_attribute('y2');
var $simonh1000$elm_colorpicker$ColorPicker$huePalette = function (mouseTarget) {
	var stops = _List_fromArray(
		[
			_Utils_Tuple2('0%', '#FF0000'),
			_Utils_Tuple2('17%', '#FF00FF'),
			_Utils_Tuple2('33%', '#0000FF'),
			_Utils_Tuple2('50%', '#00FFFF'),
			_Utils_Tuple2('66%', '#00FF00'),
			_Utils_Tuple2('83%', '#FFFF00'),
			_Utils_Tuple2('100%', '#FF0000')
		]);
	var mkStop = function (_v0) {
		var os = _v0.a;
		var sc = _v0.b;
		return A2(
			$elm$svg$Svg$stop,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$offset(os),
					$elm$svg$Svg$Attributes$stopColor(sc),
					$elm$svg$Svg$Attributes$stopOpacity('1')
				]),
			_List_Nil);
	};
	return A2(
		$elm$svg$Svg$svg,
		A2(
			$elm$core$List$cons,
			$elm$svg$Svg$Attributes$class('hue-picker'),
			$simonh1000$elm_colorpicker$ColorPicker$sliderStyles),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$defs,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$svg$Svg$linearGradient,
						_List_fromArray(
							[
								$elm$svg$Svg$Attributes$id('gradient-hsv'),
								$elm$svg$Svg$Attributes$x1('100%'),
								$elm$svg$Svg$Attributes$y1('0%'),
								$elm$svg$Svg$Attributes$x2('0%'),
								$elm$svg$Svg$Attributes$y2('0%')
							]),
						A2($elm$core$List$map, mkStop, stops))
					])),
				A2(
				$elm$svg$Svg$rect,
				_Utils_ap(
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$x('0'),
							$elm$svg$Svg$Attributes$y('0'),
							$elm$svg$Svg$Attributes$width(
							$elm$core$String$fromInt($simonh1000$elm_colorpicker$ColorPicker$widgetWidth)),
							$elm$svg$Svg$Attributes$height('100%'),
							$elm$svg$Svg$Attributes$fill('url(#gradient-hsv)')
						]),
					A3(
						$simonh1000$elm_colorpicker$ColorPicker$svgDragAttrs,
						mouseTarget,
						$simonh1000$elm_colorpicker$ColorPicker$HueSlider,
						$simonh1000$elm_colorpicker$ColorPicker$OnMouseMove($simonh1000$elm_colorpicker$ColorPicker$HueSlider))),
				_List_Nil)
			]));
};
var $simonh1000$elm_colorpicker$ColorPicker$OpacitySlider = function (a) {
	return {$: 'OpacitySlider', a: a};
};
var $simonh1000$elm_colorpicker$ColorPicker$onClickHtml = function (msgCreator) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		A2($elm$json$Json$Decode$map, msgCreator, $simonh1000$elm_colorpicker$ColorPicker$decodeMouseInfo));
};
var $elm$html$Html$Events$onMouseUp = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'mouseup',
		$elm$json$Json$Decode$succeed(msg));
};
var $simonh1000$elm_colorpicker$ColorPicker$htmlDragAttrs = F3(
	function (currMouseTgt, thisTgt, onMoveMsg) {
		var common = _List_fromArray(
			[
				A2(
				$elm$html$Html$Events$on,
				'mousedown',
				A2(
					$elm$json$Json$Decode$map,
					$simonh1000$elm_colorpicker$ColorPicker$OnMouseDown(thisTgt),
					$simonh1000$elm_colorpicker$ColorPicker$decodeMouseInfo)),
				$elm$html$Html$Events$onMouseUp($simonh1000$elm_colorpicker$ColorPicker$OnMouseUp),
				$simonh1000$elm_colorpicker$ColorPicker$onClickHtml(
				$simonh1000$elm_colorpicker$ColorPicker$OnClick(thisTgt))
			]);
		return _Utils_eq(currMouseTgt, thisTgt) ? A2(
			$elm$core$List$cons,
			A2(
				$elm$html$Html$Events$on,
				'mousemove',
				A2($elm$json$Json$Decode$map, onMoveMsg, $simonh1000$elm_colorpicker$ColorPicker$decodeMouseInfo)),
			common) : common;
	});
var $simonh1000$elm_colorpicker$ColorPicker$opacityPalette = F2(
	function (hsla, model) {
		var mouseTarget = $simonh1000$elm_colorpicker$ColorPicker$OpacitySlider(hsla.hue);
		var mkCol = function (op) {
			return $avh4$elm_color$Color$toCssString(
				A4($avh4$elm_color$Color$hsla, hsla.hue, hsla.saturation, hsla.lightness, op));
		};
		var grad = 'linear-gradient(0.25turn, ' + (mkCol(0) + (', ' + (mkCol(1) + ')')));
		var overlay = _List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'background', grad),
				A2($elm$html$Html$Attributes$style, 'height', '100%'),
				A2($elm$html$Html$Attributes$style, 'width', '100%')
			]);
		return A2(
			$elm$html$Html$div,
			_Utils_ap(
				overlay,
				A3(
					$simonh1000$elm_colorpicker$ColorPicker$htmlDragAttrs,
					model.mouseTarget,
					mouseTarget,
					$simonh1000$elm_colorpicker$ColorPicker$OnMouseMove(mouseTarget))),
			_List_Nil);
	});
var $simonh1000$elm_colorpicker$ColorPicker$pickerIndicator = function (col) {
	var adjustment = 4;
	var _v0 = $avh4$elm_color$Color$toHsla(col);
	var saturation = _v0.saturation;
	var lightness = _v0.lightness;
	var borderColor = (lightness > 0.95) ? '#cccccc' : '#ffffff';
	var cy_ = $elm$core$String$fromInt(
		$elm$core$Basics$round(($simonh1000$elm_colorpicker$ColorPicker$widgetHeight - (lightness * $simonh1000$elm_colorpicker$ColorPicker$widgetHeight)) - adjustment));
	var cx_ = $elm$core$String$fromInt(
		$elm$core$Basics$round((saturation * $simonh1000$elm_colorpicker$ColorPicker$widgetWidth) - adjustment));
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
				A2($elm$html$Html$Attributes$style, 'top', cy_ + 'px'),
				A2($elm$html$Html$Attributes$style, 'left', cx_ + 'px'),
				A2($elm$html$Html$Attributes$style, 'border-radius', '100%'),
				A2($elm$html$Html$Attributes$style, 'border', '2px solid ' + borderColor),
				A2($elm$html$Html$Attributes$style, 'width', '6px'),
				A2($elm$html$Html$Attributes$style, 'height', '6px'),
				A2($elm$html$Html$Attributes$style, 'pointer-events', 'none')
			]),
		_List_Nil);
};
var $simonh1000$elm_colorpicker$ColorPicker$pickerStyles = _List_fromArray(
	[
		A2($elm$html$Html$Attributes$style, 'cursor', 'crosshair'),
		A2($elm$html$Html$Attributes$style, 'position', 'relative')
	]);
var $simonh1000$elm_colorpicker$ColorPicker$SatLight = function (a) {
	return {$: 'SatLight', a: a};
};
var $simonh1000$elm_colorpicker$ColorPicker$satLightPalette = F3(
	function (hue, colCss, mouseTarget) {
		return A2(
			$elm$svg$Svg$svg,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$width(
					$elm$core$String$fromInt($simonh1000$elm_colorpicker$ColorPicker$widgetWidth)),
					$elm$svg$Svg$Attributes$height(
					$elm$core$String$fromInt($simonh1000$elm_colorpicker$ColorPicker$widgetHeight)),
					$elm$svg$Svg$Attributes$class('main-picker'),
					$elm$svg$Svg$Attributes$display('block')
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$defs,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$svg$Svg$linearGradient,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$id('pickerSaturation')
								]),
							_List_fromArray(
								[
									A2(
									$elm$svg$Svg$stop,
									_List_fromArray(
										[
											$elm$svg$Svg$Attributes$offset('0'),
											$elm$svg$Svg$Attributes$stopColor('#808080'),
											$elm$svg$Svg$Attributes$stopOpacity('1')
										]),
									_List_Nil),
									A2(
									$elm$svg$Svg$stop,
									_List_fromArray(
										[
											$elm$svg$Svg$Attributes$offset('1'),
											$elm$svg$Svg$Attributes$stopColor('#808080'),
											$elm$svg$Svg$Attributes$stopOpacity('0')
										]),
									_List_Nil)
								])),
							A2(
							$elm$svg$Svg$linearGradient,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$id('pickerBrightness'),
									$elm$svg$Svg$Attributes$x1('0'),
									$elm$svg$Svg$Attributes$y1('0'),
									$elm$svg$Svg$Attributes$x2('0'),
									$elm$svg$Svg$Attributes$y2('1')
								]),
							_List_fromArray(
								[
									A2(
									$elm$svg$Svg$stop,
									_List_fromArray(
										[
											$elm$svg$Svg$Attributes$offset('0'),
											$elm$svg$Svg$Attributes$stopColor('#fff'),
											$elm$svg$Svg$Attributes$stopOpacity('1')
										]),
									_List_Nil),
									A2(
									$elm$svg$Svg$stop,
									_List_fromArray(
										[
											$elm$svg$Svg$Attributes$offset('0.499'),
											$elm$svg$Svg$Attributes$stopColor('#fff'),
											$elm$svg$Svg$Attributes$stopOpacity('0')
										]),
									_List_Nil),
									A2(
									$elm$svg$Svg$stop,
									_List_fromArray(
										[
											$elm$svg$Svg$Attributes$offset('0.5'),
											$elm$svg$Svg$Attributes$stopColor('#000'),
											$elm$svg$Svg$Attributes$stopOpacity('0')
										]),
									_List_Nil),
									A2(
									$elm$svg$Svg$stop,
									_List_fromArray(
										[
											$elm$svg$Svg$Attributes$offset('1'),
											$elm$svg$Svg$Attributes$stopColor('#000'),
											$elm$svg$Svg$Attributes$stopOpacity('1')
										]),
									_List_Nil)
								]))
						])),
					A2(
					$elm$svg$Svg$rect,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$width(
							$elm$core$String$fromInt($simonh1000$elm_colorpicker$ColorPicker$widgetWidth)),
							$elm$svg$Svg$Attributes$height(
							$elm$core$String$fromInt($simonh1000$elm_colorpicker$ColorPicker$widgetHeight)),
							$elm$svg$Svg$Attributes$fill(colCss),
							$elm$svg$Svg$Attributes$id('picker')
						]),
					_List_Nil),
					A2(
					$elm$svg$Svg$rect,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$width(
							$elm$core$String$fromInt($simonh1000$elm_colorpicker$ColorPicker$widgetWidth)),
							$elm$svg$Svg$Attributes$height(
							$elm$core$String$fromInt($simonh1000$elm_colorpicker$ColorPicker$widgetHeight)),
							$elm$svg$Svg$Attributes$fill('url(#pickerSaturation)')
						]),
					_List_Nil),
					A2(
					$elm$svg$Svg$rect,
					_Utils_ap(
						_List_fromArray(
							[
								$elm$svg$Svg$Attributes$width(
								$elm$core$String$fromInt($simonh1000$elm_colorpicker$ColorPicker$widgetWidth)),
								$elm$svg$Svg$Attributes$height(
								$elm$core$String$fromInt($simonh1000$elm_colorpicker$ColorPicker$widgetHeight)),
								$elm$svg$Svg$Attributes$fill('url(#pickerBrightness)')
							]),
						A3(
							$simonh1000$elm_colorpicker$ColorPicker$svgDragAttrs,
							mouseTarget,
							$simonh1000$elm_colorpicker$ColorPicker$SatLight(hue),
							$simonh1000$elm_colorpicker$ColorPicker$OnMouseMove(
								$simonh1000$elm_colorpicker$ColorPicker$SatLight(hue)))),
					_List_Nil)
				]));
	});
var $simonh1000$elm_colorpicker$ColorPicker$sliderContainerStyles = function (name) {
	return _List_fromArray(
		[
			A2(
			$elm$html$Html$Attributes$style,
			'width',
			$elm$core$String$fromInt($simonh1000$elm_colorpicker$ColorPicker$widgetWidth) + 'px'),
			A2($elm$html$Html$Attributes$style, 'height', '12px'),
			A2($elm$html$Html$Attributes$style, 'marginTop', '8px'),
			$elm$html$Html$Attributes$class('color-picker-slider ' + name)
		]);
};
var $simonh1000$elm_colorpicker$ColorPicker$view = F2(
	function (col, _v0) {
		var model = _v0.a;
		var hsla = $avh4$elm_color$Color$toHsla(col);
		var hue = A2($elm$core$Maybe$withDefault, hsla.hue, model.hue);
		var colCss = $avh4$elm_color$Color$toCssString(
			A3($avh4$elm_color$Color$hsl, hue, 1, 0.5));
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'background-color', 'white'),
					A2($elm$html$Html$Attributes$style, 'padding', '6px'),
					A2($elm$html$Html$Attributes$style, 'display', 'inline-block'),
					A2($elm$html$Html$Attributes$style, 'border-radius', '5px'),
					A2($elm$html$Html$Attributes$style, 'box-shadow', 'rgba(0, 0, 0, 0.15) 0px 0px 0px 1px, rgba(0, 0, 0, 0.15) 0px 8px 16px'),
					$elm$html$Html$Attributes$class('color-picker-container'),
					$simonh1000$elm_colorpicker$ColorPicker$bubblePreventer
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					$simonh1000$elm_colorpicker$ColorPicker$pickerStyles,
					_List_fromArray(
						[
							A3($simonh1000$elm_colorpicker$ColorPicker$satLightPalette, hue, colCss, model.mouseTarget),
							$simonh1000$elm_colorpicker$ColorPicker$pickerIndicator(col)
						])),
					A2(
					$elm$html$Html$div,
					_Utils_ap(
						$simonh1000$elm_colorpicker$ColorPicker$pickerStyles,
						$simonh1000$elm_colorpicker$ColorPicker$sliderContainerStyles('hue')),
					_List_fromArray(
						[
							$simonh1000$elm_colorpicker$ColorPicker$huePalette(model.mouseTarget),
							$simonh1000$elm_colorpicker$ColorPicker$hueMarker(hue)
						])),
					A2(
					$elm$html$Html$div,
					_Utils_ap(
						$simonh1000$elm_colorpicker$ColorPicker$checkedBkgStyles,
						_Utils_ap(
							$simonh1000$elm_colorpicker$ColorPicker$pickerStyles,
							$simonh1000$elm_colorpicker$ColorPicker$sliderContainerStyles('opacity'))),
					_List_fromArray(
						[
							A2($simonh1000$elm_colorpicker$ColorPicker$opacityPalette, hsla, model),
							$simonh1000$elm_colorpicker$ColorPicker$alphaMarker(hsla.alpha)
						]))
				]));
	});
var $author$project$View$colorPickerView = F2(
	function (color, state) {
		return A2(
			$elm$html$Html$map,
			$author$project$Update$ColorPickerMsg,
			A2($simonh1000$elm_colorpicker$ColorPicker$view, color, state));
	});
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm_community$typed_svg$TypedSvg$g = $elm_community$typed_svg$TypedSvg$Core$node('g');
var $elm_community$typed_svg$TypedSvg$Attributes$points = function (pts) {
	var pointToString = function (_v0) {
		var xx = _v0.a;
		var yy = _v0.b;
		return $elm$core$String$fromFloat(xx) + (', ' + $elm$core$String$fromFloat(yy));
	};
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'points',
		A2(
			$elm$core$String$join,
			' ',
			A2($elm$core$List$map, pointToString, pts)));
};
var $elm_community$typed_svg$TypedSvg$polygon = $elm_community$typed_svg$TypedSvg$Core$node('polygon');
var $elm_community$typed_svg$TypedSvg$Attributes$style = function (value) {
	return A2($elm_community$typed_svg$TypedSvg$Core$attribute, 'style', value);
};
var $author$project$Turtle$drawFilledPolygons = function (filledPolygons) {
	return A2(
		$elm_community$typed_svg$TypedSvg$g,
		_List_Nil,
		A2(
			$elm$core$List$map,
			function (_v0) {
				var polygon = _v0.a;
				var fillColor = _v0.b;
				return A2(
					$elm_community$typed_svg$TypedSvg$polygon,
					_List_fromArray(
						[
							$elm_community$typed_svg$TypedSvg$Attributes$points(
							A2(
								$elm$core$List$map,
								function (_v1) {
									var x = _v1.a;
									var y = _v1.b;
									return _Utils_Tuple2(x, y);
								},
								polygon)),
							$elm_community$typed_svg$TypedSvg$Attributes$style(
							'fill:' + $avh4$elm_color$Color$toCssString(fillColor))
						]),
					_List_Nil);
			},
			filledPolygons));
};
var $elm$core$Basics$cos = _Basics_cos;
var $elm$core$Basics$pi = _Basics_pi;
var $author$project$Turtle$degreesToRadians = function (degrees) {
	return (degrees * $elm$core$Basics$pi) / 180;
};
var $elm$core$Basics$sin = _Basics_sin;
var $author$project$LSys$calculateNewPosition = F3(
	function (stepSize, angle, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		var deltaY = stepSize * $elm$core$Basics$sin(
			$author$project$Turtle$degreesToRadians(angle));
		var deltaX = stepSize * $elm$core$Basics$cos(
			$author$project$Turtle$degreesToRadians(angle));
		return _Utils_Tuple2(x + deltaX, y + deltaY);
	});
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$Turtle$initTurtle = function (pos) {
	return {angle: 0, dots: _List_Nil, fillColor: $avh4$elm_color$Color$black, filledPolygons: _List_Nil, lineWidth: 1, polygons: _List_Nil, segments: _List_Nil, stack: _List_Nil, swapPlusMinus: false, x: pos.a, y: pos.b};
};
var $author$project$Turtle$calculateNewPosition = F3(
	function (stepSize, angle, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		var deltaY = stepSize * $elm$core$Basics$sin(
			$author$project$Turtle$degreesToRadians(angle));
		var deltaX = stepSize * $elm$core$Basics$cos(
			$author$project$Turtle$degreesToRadians(angle));
		return _Utils_Tuple2(x + deltaX, y + deltaY);
	});
var $author$project$Turtle$moveForward = F2(
	function (stepSize, turtle) {
		var currentPolygon = A2(
			$elm$core$Maybe$withDefault,
			_List_Nil,
			$elm$core$List$head(turtle.polygons));
		var _v0 = A3(
			$author$project$Turtle$calculateNewPosition,
			stepSize,
			turtle.angle,
			_Utils_Tuple2(turtle.x, turtle.y));
		var newX = _v0.a;
		var newY = _v0.b;
		var updatedPolygons = A2(
			$elm$core$List$cons,
			A2(
				$elm$core$List$cons,
				_Utils_Tuple2(newX, newY),
				currentPolygon),
			A2($elm$core$List$drop, 1, turtle.polygons));
		return _Utils_update(
			turtle,
			{
				polygons: updatedPolygons,
				segments: A2(
					$elm$core$List$cons,
					_Utils_Tuple2(
						_Utils_Tuple2(turtle.x, turtle.y),
						_Utils_Tuple2(newX, newY)),
					turtle.segments),
				x: newX,
				y: newY
			});
	});
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $author$project$Turtle$pop = function (turtle) {
	var _v0 = turtle.stack;
	if (!_v0.b) {
		return turtle;
	} else {
		var _v1 = _v0.a;
		var _v2 = _v1.a;
		var x = _v2.a;
		var y = _v2.b;
		var angle = _v1.b;
		var rest = _v0.b;
		return _Utils_update(
			turtle,
			{angle: angle, stack: rest, x: x, y: y});
	}
};
var $author$project$Turtle$push = function (turtle) {
	return _Utils_update(
		turtle,
		{
			stack: A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					_Utils_Tuple2(turtle.x, turtle.y),
					turtle.angle),
				turtle.stack)
		});
};
var $elm$core$Basics$modBy = _Basics_modBy;
var $author$project$Turtle$turn = F2(
	function (degrees, turtle) {
		var newAngle = turtle.angle + degrees;
		var boundedAngle = A2(
			$elm$core$Basics$modBy,
			360,
			$elm$core$Basics$round(newAngle));
		return _Utils_update(
			turtle,
			{angle: boundedAngle});
	});
var $author$project$LSys$generateTurtle = F5(
	function (model, sequence, symbolAssignments, stepSize, angle) {
		var applyAction = F2(
			function (turtle, action) {
				switch (action.$) {
					case 'Move':
						return A2($author$project$Turtle$moveForward, stepSize, turtle);
					case 'MoveWithoutDrawing':
						var _v2 = A3(
							$author$project$LSys$calculateNewPosition,
							stepSize,
							turtle.angle,
							_Utils_Tuple2(turtle.x, turtle.y));
						var newX = _v2.a;
						var newY = _v2.b;
						return _Utils_update(
							turtle,
							{x: newX, y: newY});
					case 'TurnLeft':
						return turtle.swapPlusMinus ? A2($author$project$Turtle$turn, angle, turtle) : A2($author$project$Turtle$turn, -angle, turtle);
					case 'TurnRight':
						return turtle.swapPlusMinus ? A2($author$project$Turtle$turn, -angle, turtle) : A2($author$project$Turtle$turn, angle, turtle);
					case 'ReverseDirection':
						return A2($author$project$Turtle$turn, -180, turtle);
					case 'Push':
						return $author$project$Turtle$push(turtle);
					case 'Pop':
						return $author$project$Turtle$pop(turtle);
					case 'IncrementLineWidth':
						return _Utils_update(
							turtle,
							{lineWidth: turtle.lineWidth + model.lineWidthIncrement});
					case 'DecrementLineWidth':
						return _Utils_update(
							turtle,
							{lineWidth: turtle.lineWidth - model.lineWidthIncrement});
					case 'DrawDot':
						return _Utils_update(
							turtle,
							{
								dots: A2(
									$elm$core$List$cons,
									_Utils_Tuple2(
										_Utils_Tuple2(turtle.x, turtle.y),
										turtle.lineWidth),
									turtle.dots)
							});
					case 'OpenPolygon':
						return _Utils_update(
							turtle,
							{
								polygons: A2($elm$core$List$cons, _List_Nil, turtle.polygons)
							});
					case 'ClosePolygon':
						var updatedPolygons = A2($elm$core$List$drop, 1, turtle.polygons);
						var currentPolygon = A2(
							$elm$core$Maybe$withDefault,
							_List_Nil,
							$elm$core$List$head(turtle.polygons));
						return _Utils_update(
							turtle,
							{
								filledPolygons: A2(
									$elm$core$List$cons,
									_Utils_Tuple2(currentPolygon, turtle.fillColor),
									turtle.filledPolygons),
								polygons: A2($elm$core$List$cons, currentPolygon, updatedPolygons)
							});
					case 'MultiplyLength':
						var newStepSize = model.lineLength * model.lineLengthScale;
						return A2($author$project$Turtle$moveForward, newStepSize, turtle);
					case 'DivideLength':
						var newStepSize = model.lineLength / model.lineLengthScale;
						return A2($author$project$Turtle$moveForward, newStepSize, turtle);
					case 'SwapPlusMinus':
						return _Utils_update(
							turtle,
							{swapPlusMinus: !turtle.swapPlusMinus});
					case 'IncrementTurningAngle':
						return _Utils_update(
							turtle,
							{angle: turtle.angle + model.turningAngleIncrement});
					case 'DecrementTurningAngle':
						return _Utils_update(
							turtle,
							{angle: turtle.angle - model.turningAngleIncrement});
					default:
						return turtle;
				}
			});
		var applySymbol = F2(
			function (symbol, turtle) {
				var _v0 = A2(
					$elm$core$List$filter,
					function (s) {
						return _Utils_eq(
							s.character,
							$elm$core$String$fromChar(symbol));
					},
					symbolAssignments);
				if (!_v0.b) {
					return turtle;
				} else {
					var symbolAssignment = _v0.a;
					return A2(applyAction, turtle, symbolAssignment.action);
				}
			});
		return A3(
			$elm$core$List$foldl,
			applySymbol,
			A2(
				$author$project$Turtle$turn,
				model.startingAngle,
				$author$project$Turtle$initTurtle(model.startingPoint)),
			sequence);
	});
var $elm_community$typed_svg$TypedSvg$Attributes$href = $elm_community$typed_svg$TypedSvg$Core$attribute('href');
var $elm$html$Html$input = _VirtualDom_node('input');
var $elm$html$Html$label = _VirtualDom_node('label');
var $elm$html$Html$Attributes$max = $elm$html$Html$Attributes$stringProperty('max');
var $elm$html$Html$Attributes$min = $elm$html$Html$Attributes$stringProperty('min');
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$json$Json$Decode$string = _Json_decodeString;
var $elm$html$Html$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue)));
};
var $elm_community$typed_svg$TypedSvg$circle = $elm_community$typed_svg$TypedSvg$Core$node('circle');
var $elm_community$typed_svg$TypedSvg$Attributes$cx = function (length) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'cx',
		$elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(length));
};
var $elm_community$typed_svg$TypedSvg$Attributes$cy = function (length) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'cy',
		$elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(length));
};
var $elm_community$typed_svg$TypedSvg$Types$px = $elm_community$typed_svg$TypedSvg$Types$Px;
var $elm_community$typed_svg$TypedSvg$Attributes$r = function (length) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'r',
		$elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(length));
};
var $avh4$elm_color$Color$white = A4($avh4$elm_color$Color$RgbaSpace, 255 / 255, 255 / 255, 255 / 255, 1.0);
var $author$project$Turtle$renderTurtleDots = function (turtle) {
	return A2(
		$elm$core$List$map,
		function (_v0) {
			var _v1 = _v0.a;
			var x = _v1.a;
			var y = _v1.b;
			var radius = _v0.b;
			return A2(
				$elm_community$typed_svg$TypedSvg$circle,
				_List_fromArray(
					[
						$elm_community$typed_svg$TypedSvg$Attributes$cx(
						$elm_community$typed_svg$TypedSvg$Types$px(x)),
						$elm_community$typed_svg$TypedSvg$Attributes$cy(
						$elm_community$typed_svg$TypedSvg$Types$px(y)),
						$elm_community$typed_svg$TypedSvg$Attributes$r(
						$elm_community$typed_svg$TypedSvg$Types$px(radius)),
						$elm_community$typed_svg$TypedSvg$Attributes$fill(
						$elm_community$typed_svg$TypedSvg$Types$Paint($avh4$elm_color$Color$white))
					]),
				_List_Nil);
		},
		turtle.dots);
};
var $elm_community$typed_svg$TypedSvg$line = $elm_community$typed_svg$TypedSvg$Core$node('line');
var $elm_community$typed_svg$TypedSvg$Attributes$x1 = function (position) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'x1',
		$elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(position));
};
var $elm_community$typed_svg$TypedSvg$Attributes$x2 = function (position) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'x2',
		$elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(position));
};
var $elm_community$typed_svg$TypedSvg$Attributes$y1 = function (position) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'y1',
		$elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(position));
};
var $elm_community$typed_svg$TypedSvg$Attributes$y2 = function (position) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'y2',
		$elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(position));
};
var $author$project$Turtle$renderTurtleSegments = function (turtle) {
	return A2(
		$elm$core$List$map,
		function (_v0) {
			var _v1 = _v0.a;
			var x1 = _v1.a;
			var y1 = _v1.b;
			var _v2 = _v0.b;
			var x2 = _v2.a;
			var y2 = _v2.b;
			return A2(
				$elm_community$typed_svg$TypedSvg$line,
				_List_fromArray(
					[
						$elm_community$typed_svg$TypedSvg$Attributes$x1(
						$elm_community$typed_svg$TypedSvg$Types$px(x1)),
						$elm_community$typed_svg$TypedSvg$Attributes$y1(
						$elm_community$typed_svg$TypedSvg$Types$px(y1)),
						$elm_community$typed_svg$TypedSvg$Attributes$x2(
						$elm_community$typed_svg$TypedSvg$Types$px(x2)),
						$elm_community$typed_svg$TypedSvg$Attributes$y2(
						$elm_community$typed_svg$TypedSvg$Types$px(y2)),
						$elm_community$typed_svg$TypedSvg$Attributes$stroke(
						$elm_community$typed_svg$TypedSvg$Types$Paint($avh4$elm_color$Color$white)),
						$elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
						$elm_community$typed_svg$TypedSvg$Types$Px(turtle.lineWidth))
					]),
				_List_Nil);
		},
		turtle.segments);
};
var $elm$html$Html$select = _VirtualDom_node('select');
var $elm$core$String$fromList = _String_fromList;
var $author$project$View$showRule = function (_v0) {
	var from = _v0.a;
	var to = _v0.b;
	return $elm$core$String$fromChar(from) + (' → ' + $elm$core$String$fromList(to));
};
var $author$project$Update$UpdateStartingPointX = function (a) {
	return {$: 'UpdateStartingPointX', a: a};
};
var $author$project$Update$UpdateStartingPointY = function (a) {
	return {$: 'UpdateStartingPointY', a: a};
};
var $elm$html$Html$Attributes$placeholder = $elm$html$Html$Attributes$stringProperty('placeholder');
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty('value');
var $author$project$View$startingPointInput = function (_v0) {
	var x = _v0.a;
	var y = _v0.b;
	var startingPointInputStyle = _List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'border', '1px solid #ced4da'),
			A2($elm$html$Html$Attributes$style, 'padding', '0.375rem 0.75rem'),
			A2($elm$html$Html$Attributes$style, 'border-radius', '4px'),
			A2($elm$html$Html$Attributes$style, 'background-color', 'white'),
			A2($elm$html$Html$Attributes$style, 'font-size', '1rem'),
			A2($elm$html$Html$Attributes$style, 'line-height', '1.5'),
			A2($elm$html$Html$Attributes$style, 'color', '#495057'),
			A2($elm$html$Html$Attributes$style, 'width', '4rem'),
			A2($elm$html$Html$Attributes$style, 'margin', '0.5rem')
		]);
	var labelStyle = _List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'font-weight', 'bold'),
			A2($elm$html$Html$Attributes$style, 'color', '#333'),
			A2($elm$html$Html$Attributes$style, 'font-size', '1rem'),
			A2($elm$html$Html$Attributes$style, 'padding', '0.5rem'),
			A2($elm$html$Html$Attributes$style, 'margin', '0.5rem')
		]);
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$label,
				labelStyle,
				_List_fromArray(
					[
						$elm$html$Html$text('X: ')
					])),
				A2(
				$elm$html$Html$input,
				_Utils_ap(
					startingPointInputStyle,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$placeholder('X'),
							$elm$html$Html$Attributes$value(
							$elm$core$String$fromFloat(x)),
							$elm$html$Html$Events$onInput($author$project$Update$UpdateStartingPointX)
						])),
				_List_Nil),
				A2(
				$elm$html$Html$label,
				labelStyle,
				_List_fromArray(
					[
						$elm$html$Html$text('Y: ')
					])),
				A2(
				$elm$html$Html$input,
				_Utils_ap(
					startingPointInputStyle,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$placeholder('Y'),
							$elm$html$Html$Attributes$value(
							$elm$core$String$fromFloat(y)),
							$elm$html$Html$Events$onInput($author$project$Update$UpdateStartingPointY)
						])),
				_List_Nil)
			]));
};
var $elm$html$Html$Attributes$step = function (n) {
	return A2($elm$html$Html$Attributes$stringProperty, 'step', n);
};
var $elm_community$typed_svg$TypedSvg$svg = $elm_community$typed_svg$TypedSvg$Core$node('svg');
var $elm$html$Html$option = _VirtualDom_node('option');
var $author$project$View$symbolOptionView = function (symbol) {
	return A2(
		$elm$html$Html$option,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$value(symbol.character)
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(symbol.character)
			]));
};
var $elm$html$Html$h2 = _VirtualDom_node('h2');
var $elm$html$Html$li = _VirtualDom_node('li');
var $elm$html$Html$ul = _VirtualDom_node('ul');
var $author$project$View$syntaxDisplayView = function (model) {
	return model.syntaxDisplay ? A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$h2,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text('Syntax')
					])),
				A2(
				$elm$html$Html$ul,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$li,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text('F -> Move forward by line length drawing a line')
							])),
						A2(
						$elm$html$Html$li,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text('G -> Move forward by line length drawing a line')
							])),
						A2(
						$elm$html$Html$li,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text('f -> Move forward by line length without drawing a line')
							])),
						A2(
						$elm$html$Html$li,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text('+ -> Turn left by turning angle'),
								A2(
								$elm$html$Html$li,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('- -> Turn right by turning angle')
									])),
								A2(
								$elm$html$Html$li,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('| -> Reverse direction (ie: turn by 180 degrees)')
									])),
								A2(
								$elm$html$Html$li,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('[ -> Push current drawing state onto stack')
									])),
								A2(
								$elm$html$Html$li,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('] -> Pop current drawing state from the stack')
									])),
								A2(
								$elm$html$Html$li,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('# -> Increment the line width by line width increment')
									])),
								A2(
								$elm$html$Html$li,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('! -> Decrement the line width by line width increment')
									])),
								A2(
								$elm$html$Html$li,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('@ -> Draw a dot with line width radius')
									])),
								A2(
								$elm$html$Html$li,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('{ -> Open a polygon')
									])),
								A2(
								$elm$html$Html$li,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('} -> Close a polygon and fill it with fill colour')
									])),
								A2(
								$elm$html$Html$li,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('< -> Multiply the line length by the line length scale')
									])),
								A2(
								$elm$html$Html$li,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('> -> Divide the line length by the line length scale')
									])),
								A2(
								$elm$html$Html$li,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('& -> Swap the meaning of + and -')
									])),
								A2(
								$elm$html$Html$li,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('( -> Decrement turning angle by turning angle increment')
									])),
								A2(
								$elm$html$Html$li,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text(') -> Increment turning angle by turning angle increment')
									])),
								A2(
								$elm$html$Html$li,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('a to z (except f) -> No action')
									]))
							]))
					]))
			])) : $elm$html$Html$text('');
};
var $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty('type');
var $elm_community$typed_svg$TypedSvg$Attributes$viewBox = F4(
	function (minX, minY, vWidth, vHeight) {
		return A2(
			$elm_community$typed_svg$TypedSvg$Core$attribute,
			'viewBox',
			A2(
				$elm$core$String$join,
				' ',
				A2(
					$elm$core$List$map,
					$elm$core$String$fromFloat,
					_List_fromArray(
						[minX, minY, vWidth, vHeight]))));
	});
var $author$project$View$view = function (model) {
	var sectionStyle = _List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'padding', '1rem'),
			A2($elm$html$Html$Attributes$style, 'margin-bottom', '1rem'),
			A2($elm$html$Html$Attributes$style, 'border-bottom', '1px solid #ccc')
		]);
	var labelStyle = _List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'font-weight', 'bold'),
			A2($elm$html$Html$Attributes$style, 'color', '#333'),
			A2($elm$html$Html$Attributes$style, 'font-size', '1rem'),
			A2($elm$html$Html$Attributes$style, 'padding', '0.5rem'),
			A2($elm$html$Html$Attributes$style, 'margin', '0.5rem')
		]);
	var inputStyle = _List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'border', '1px solid #ced4da'),
			A2($elm$html$Html$Attributes$style, 'padding', '0.375rem 0.75rem'),
			A2($elm$html$Html$Attributes$style, 'border-radius', '4px'),
			A2($elm$html$Html$Attributes$style, 'background-color', 'white'),
			A2($elm$html$Html$Attributes$style, 'font-size', '1rem'),
			A2($elm$html$Html$Attributes$style, 'line-height', '1.5'),
			A2($elm$html$Html$Attributes$style, 'color', '#495057'),
			A2($elm$html$Html$Attributes$style, 'width', '10rem'),
			A2($elm$html$Html$Attributes$style, 'margin', '0.5rem')
		]);
	var dropdownStyle = _List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'border', '1px solid #dfe0e2'),
			A2($elm$html$Html$Attributes$style, 'padding', '0.375rem 0.75rem'),
			A2($elm$html$Html$Attributes$style, 'border-radius', '4px'),
			A2($elm$html$Html$Attributes$style, 'background-color', 'white'),
			A2($elm$html$Html$Attributes$style, 'font-size', '1rem'),
			A2($elm$html$Html$Attributes$style, 'line-height', '1.5'),
			A2($elm$html$Html$Attributes$style, 'color', '#495057'),
			A2($elm$html$Html$Attributes$style, 'width', 'auto'),
			A2($elm$html$Html$Attributes$style, 'margin', '0.5rem'),
			A2($elm$html$Html$Attributes$style, 'cursor', 'pointer')
		]);
	var buttonsStyleSyntax = _List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'background-color', '#eb5160'),
			A2($elm$html$Html$Attributes$style, 'border', 'none'),
			A2($elm$html$Html$Attributes$style, 'color', 'white'),
			A2($elm$html$Html$Attributes$style, 'padding', '0.5rem 1rem'),
			A2($elm$html$Html$Attributes$style, 'margin-top', '1rem'),
			A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
			A2($elm$html$Html$Attributes$style, 'border-radius', '4px')
		]);
	var buttonStyleDraw = _List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'background-color', '#eb5160'),
			A2($elm$html$Html$Attributes$style, 'border', 'none'),
			A2($elm$html$Html$Attributes$style, 'color', 'white'),
			A2($elm$html$Html$Attributes$style, 'padding', '0.5rem 1rem'),
			A2($elm$html$Html$Attributes$style, 'margin-top', '1rem'),
			A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
			A2($elm$html$Html$Attributes$style, 'border-radius', '4px'),
			A2($elm$html$Html$Attributes$style, 'font-size', '2rem')
		]);
	var buttonStyle = _List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'background-color', '#b7999c'),
			A2($elm$html$Html$Attributes$style, 'border', 'none'),
			A2($elm$html$Html$Attributes$style, 'color', 'white'),
			A2($elm$html$Html$Attributes$style, 'padding', '0.5rem 1rem'),
			A2($elm$html$Html$Attributes$style, 'margin-top', '1rem'),
			A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
			A2($elm$html$Html$Attributes$style, 'border-radius', '4px')
		]);
	var appStyle = _List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'font-family', '\'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif'),
			A2($elm$html$Html$Attributes$style, 'font-size', '16px'),
			A2($elm$html$Html$Attributes$style, 'background-color', '#dfe0e2'),
			A2($elm$html$Html$Attributes$style, 'padding', '2rem'),
			A2($elm$html$Html$Attributes$style, 'width', '500px'),
			A2($elm$html$Html$Attributes$style, 'box-sizing', 'border-box')
		]);
	var angleInputStyle = _List_fromArray(
		[
			A2($elm$html$Html$Attributes$style, 'border', '1px solid #ced4da'),
			A2($elm$html$Html$Attributes$style, 'padding', '0.375rem 0.75rem'),
			A2($elm$html$Html$Attributes$style, 'border-radius', '4px'),
			A2($elm$html$Html$Attributes$style, 'background-color', 'white'),
			A2($elm$html$Html$Attributes$style, 'font-size', '1rem'),
			A2($elm$html$Html$Attributes$style, 'line-height', '1.5'),
			A2($elm$html$Html$Attributes$style, 'color', '#495057'),
			A2($elm$html$Html$Attributes$style, 'width', '4rem'),
			A2($elm$html$Html$Attributes$style, 'margin', '0.5rem')
		]);
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'background-color', 'black'),
				A2($elm$html$Html$Attributes$style, 'width', '100%'),
				A2($elm$html$Html$Attributes$style, 'min-height', '100vh')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				appStyle,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						sectionStyle,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$a,
								_List_fromArray(
									[
										$elm_community$typed_svg$TypedSvg$Attributes$href('http://paulbourke.net/fractals/lsys/')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('For more information and examples, please visit Paul Bourke\'s L-System page')
									]))
							])),
						A2(
						$elm$html$Html$div,
						sectionStyle,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'margin-left', '-28px'),
										A2($elm$html$Html$Attributes$style, 'margin-top', '-25px')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$button,
										_Utils_ap(
											buttonsStyleSyntax,
											_List_fromArray(
												[
													$elm$html$Html$Events$onClick($author$project$Update$ToggleSyntaxDisplay)
												])),
										_List_fromArray(
											[
												$elm$html$Html$text('Syntax')
											]))
									])),
								A2(
								$elm$html$Html$div,
								sectionStyle,
								_List_fromArray(
									[
										$author$project$View$syntaxDisplayView(model)
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'margin-top', '20px'),
										A2($elm$html$Html$Attributes$style, 'margin-left', '-35px')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$select,
										_Utils_ap(
											dropdownStyle,
											_List_fromArray(
												[
													$elm$html$Html$Events$onInput($author$project$Update$SelectSymbol)
												])),
										A2($elm$core$List$map, $author$project$View$symbolOptionView, model.symbolAssignments)),
										A2(
										$elm$html$Html$input,
										_Utils_ap(
											inputStyle,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$type_('text'),
													$elm$html$Html$Attributes$value(model.newRuleInput),
													$elm$html$Html$Events$onInput($author$project$Update$UpdateNewRuleInput)
												])),
										_List_Nil),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												A2($elm$html$Html$Attributes$style, 'margin-left', '283px'),
												A2($elm$html$Html$Attributes$style, 'margin-top', '-60px')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$button,
												_Utils_ap(
													buttonStyle,
													_List_fromArray(
														[
															$elm$html$Html$Events$onClick($author$project$Update$AddRule)
														])),
												_List_fromArray(
													[
														$elm$html$Html$text('Add Rule')
													]))
											]))
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'margin-top', '10px')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Rules: '),
										$elm$html$Html$text(
										A2(
											$elm$core$String$join,
											', ',
											A2($elm$core$List$map, $author$project$View$showRule, model.rules)))
									]))
							])),
						A2(
						$elm$html$Html$div,
						sectionStyle,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'margin-left', '50px')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$input,
										_Utils_ap(
											inputStyle,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$type_('text'),
													$elm$html$Html$Events$onInput($author$project$Update$SelectAxiom)
												])),
										_List_Nil),
										A2(
										$elm$html$Html$button,
										_Utils_ap(
											buttonStyle,
											_List_fromArray(
												[
													$elm$html$Html$Events$onClick($author$project$Update$ApplyAxiom)
												])),
										_List_fromArray(
											[
												$elm$html$Html$text('Apply Axiom')
											])),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												A2($elm$html$Html$Attributes$style, 'margin-left', '-48px')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Axiom: ' + model.axiom)
											]))
									]))
							])),
						A2(
						$elm$html$Html$div,
						sectionStyle,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$label,
								labelStyle,
								_List_fromArray(
									[
										$elm$html$Html$text('Turning angle ')
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'margin-left', '220px'),
										A2($elm$html$Html$Attributes$style, 'margin-top', '-40px')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$input,
										_Utils_ap(
											angleInputStyle,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$type_('number'),
													$elm$html$Html$Attributes$min('-360'),
													$elm$html$Html$Attributes$max('360'),
													$elm$html$Html$Attributes$step('1'),
													$elm$html$Html$Events$onInput(
													A2(
														$elm$core$Basics$composeR,
														$elm$core$String$toFloat,
														A2(
															$elm$core$Basics$composeR,
															$elm$core$Maybe$withDefault(0),
															$author$project$Update$UpdateAngle))),
													$elm$html$Html$Attributes$value(
													$elm$core$String$fromFloat(model.turningAngle))
												])),
										_List_Nil),
										$elm$html$Html$text(
										$elm$core$String$fromFloat(model.turningAngle) + '°')
									]))
							])),
						A2(
						$elm$html$Html$div,
						sectionStyle,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$label,
								labelStyle,
								_List_fromArray(
									[
										$elm$html$Html$text('Turning angle increment ')
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'margin-left', '220px'),
										A2($elm$html$Html$Attributes$style, 'margin-top', '-40px')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$input,
										_Utils_ap(
											angleInputStyle,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$type_('number'),
													$elm$html$Html$Attributes$min('-360'),
													$elm$html$Html$Attributes$max('360'),
													$elm$html$Html$Attributes$step('1'),
													$elm$html$Html$Events$onInput(
													A2(
														$elm$core$Basics$composeR,
														$elm$core$String$toFloat,
														A2(
															$elm$core$Basics$composeR,
															$elm$core$Maybe$withDefault(0),
															$author$project$Update$UpdateTurningAngleIncrement))),
													$elm$html$Html$Attributes$value(
													$elm$core$String$fromFloat(model.turningAngleIncrement))
												])),
										_List_Nil),
										$elm$html$Html$text(
										$elm$core$String$fromFloat(model.turningAngleIncrement) + '°')
									]))
							])),
						A2(
						$elm$html$Html$div,
						sectionStyle,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$label,
								labelStyle,
								_List_fromArray(
									[
										$elm$html$Html$text('Line length ')
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'margin-left', '200px'),
										A2($elm$html$Html$Attributes$style, 'margin-top', '-25px')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$input,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$type_('range'),
												$elm$html$Html$Attributes$min('1'),
												$elm$html$Html$Attributes$max('10'),
												$elm$html$Html$Attributes$step('1'),
												$elm$html$Html$Events$onInput(
												A2(
													$elm$core$Basics$composeR,
													$elm$core$String$toFloat,
													A2(
														$elm$core$Basics$composeR,
														$elm$core$Maybe$withDefault(1),
														$author$project$Update$UpdateLineLength))),
												$elm$html$Html$Attributes$value(
												$elm$core$String$fromFloat(model.lineLength))
											]),
										_List_Nil),
										$elm$html$Html$text(
										$elm$core$String$fromFloat(model.lineLength))
									]))
							])),
						A2(
						$elm$html$Html$div,
						sectionStyle,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$label,
								labelStyle,
								_List_fromArray(
									[
										$elm$html$Html$text('Line length scale')
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'margin-left', '200px'),
										A2($elm$html$Html$Attributes$style, 'margin-top', '-25px')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$input,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$type_('range'),
												$elm$html$Html$Attributes$min('0.0'),
												$elm$html$Html$Attributes$max('3'),
												$elm$html$Html$Attributes$step('0.1'),
												$elm$html$Html$Events$onInput(
												A2(
													$elm$core$Basics$composeR,
													$elm$core$String$toFloat,
													A2(
														$elm$core$Basics$composeR,
														$elm$core$Maybe$withDefault(1),
														$author$project$Update$UpdateLineLengthScale))),
												$elm$html$Html$Attributes$value(
												$elm$core$String$fromFloat(model.lineLengthScale))
											]),
										_List_Nil),
										$elm$html$Html$text(
										$elm$core$String$fromFloat(model.lineLengthScale))
									]))
							])),
						A2(
						$elm$html$Html$div,
						sectionStyle,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$label,
								labelStyle,
								_List_fromArray(
									[
										$elm$html$Html$text('Line width increment')
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'margin-left', '200px'),
										A2($elm$html$Html$Attributes$style, 'margin-top', '-25px')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$input,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$type_('range'),
												$elm$html$Html$Attributes$min('0.0'),
												$elm$html$Html$Attributes$max('3.0'),
												$elm$html$Html$Attributes$step('0.1'),
												$elm$html$Html$Events$onInput(
												A2(
													$elm$core$Basics$composeR,
													$elm$core$String$toFloat,
													A2(
														$elm$core$Basics$composeR,
														$elm$core$Maybe$withDefault(1),
														$author$project$Update$UpdateLineWidthIncrement))),
												$elm$html$Html$Attributes$value(
												$elm$core$String$fromFloat(model.lineWidthIncrement))
											]),
										_List_Nil),
										$elm$html$Html$text(
										$elm$core$String$fromFloat(model.lineWidthIncrement))
									]))
							])),
						A2(
						$elm$html$Html$div,
						sectionStyle,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$label,
								labelStyle,
								_List_fromArray(
									[
										$elm$html$Html$text('Polygon fill colour')
									])),
								A2($author$project$View$colorPickerView, model.polygonFillColor, model.colorPicker)
							])),
						A2(
						$elm$html$Html$div,
						sectionStyle,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$label,
								labelStyle,
								_List_fromArray(
									[
										$elm$html$Html$text('Recursion depth ')
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'margin-left', '200px'),
										A2($elm$html$Html$Attributes$style, 'margin-top', '-25px')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$input,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$type_('range'),
												$elm$html$Html$Attributes$min('0'),
												$elm$html$Html$Attributes$max('20'),
												$elm$html$Html$Attributes$value(
												$elm$core$String$fromInt(model.iterations)),
												$elm$html$Html$Events$onInput(
												A2(
													$elm$core$Basics$composeR,
													$elm$core$String$toInt,
													A2(
														$elm$core$Basics$composeR,
														$elm$core$Maybe$withDefault(0),
														$author$project$Update$UpdateIterations)))
											]),
										_List_Nil),
										$elm$html$Html$text(
										$elm$core$String$fromInt(model.iterations))
									]))
							])),
						A2(
						$elm$html$Html$div,
						sectionStyle,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$label,
								labelStyle,
								_List_fromArray(
									[
										$elm$html$Html$text('Starting Angle ')
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'margin-left', '220px'),
										A2($elm$html$Html$Attributes$style, 'margin-top', '-40px')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$input,
										_Utils_ap(
											angleInputStyle,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$type_('number'),
													$elm$html$Html$Attributes$min('-360'),
													$elm$html$Html$Attributes$max('360'),
													$elm$html$Html$Attributes$step('1'),
													$elm$html$Html$Events$onInput(
													A2(
														$elm$core$Basics$composeR,
														$elm$core$String$toFloat,
														A2(
															$elm$core$Basics$composeR,
															$elm$core$Maybe$withDefault(0),
															$author$project$Update$UpdateStartingAngle))),
													$elm$html$Html$Attributes$value(
													$elm$core$String$fromFloat(model.startingAngle))
												])),
										_List_Nil),
										$elm$html$Html$text(
										$elm$core$String$fromFloat(model.startingAngle) + '°')
									]))
							])),
						A2(
						$elm$html$Html$div,
						sectionStyle,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$label,
								labelStyle,
								_List_fromArray(
									[
										$elm$html$Html$text('Starting point ')
									])),
								$author$project$View$startingPointInput(model.startingPoint)
							])),
						A2(
						$elm$html$Html$div,
						sectionStyle,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'margin-left', '135px'),
										A2($elm$html$Html$Attributes$style, 'margin-top', '-25px')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$button,
										_Utils_ap(
											buttonStyleDraw,
											_List_fromArray(
												[
													$elm$html$Html$Events$onClick($author$project$Update$DrawTurtle)
												])),
										_List_fromArray(
											[
												$elm$html$Html$text('Draw')
											]))
									]))
							])),
						A2(
						$elm$html$Html$div,
						sectionStyle,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$a,
								_List_fromArray(
									[
										$elm_community$typed_svg$TypedSvg$Attributes$href('https://github.com/hunorg')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('created by @hunorg')
									]))
							])),
						A2(
						$elm$html$Html$div,
						sectionStyle,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$a,
								_List_fromArray(
									[
										$elm_community$typed_svg$TypedSvg$Attributes$href('https://github.com/hunorg/L-System-Studio')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('source code')
									]))
							]))
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'margin-left', '550px'),
						A2($elm$html$Html$Attributes$style, 'margin-top', '-1650px')
					]),
				_List_fromArray(
					[
						A2(
						$elm_community$typed_svg$TypedSvg$svg,
						_List_fromArray(
							[
								A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, 1900, 1600),
								$elm_community$typed_svg$TypedSvg$Attributes$width(
								$elm_community$typed_svg$TypedSvg$Types$Px(1900)),
								$elm_community$typed_svg$TypedSvg$Attributes$height(
								$elm_community$typed_svg$TypedSvg$Types$Px(1600)),
								A2($elm$html$Html$Attributes$style, 'margin', '1rem')
							]),
						function () {
							var generatedTurtle = A5($author$project$LSys$generateTurtle, model, model.generatedSequence, model.symbolAssignments, model.lineLength, model.turningAngle);
							return _Utils_ap(
								$author$project$View$baseRect,
								model.drawnTurtle ? _Utils_ap(
									$author$project$Turtle$renderTurtleSegments(
										A5($author$project$LSys$generateTurtle, model, model.generatedSequence, model.symbolAssignments, model.lineLength, model.turningAngle)),
									_Utils_ap(
										$author$project$Turtle$renderTurtleDots(
											A5($author$project$LSys$generateTurtle, model, model.generatedSequence, model.symbolAssignments, model.lineLength, model.turningAngle)),
										_List_fromArray(
											[
												$author$project$Turtle$drawFilledPolygons(generatedTurtle.filledPolygons)
											]))) : _List_Nil);
						}())
					]))
			]));
};
var $author$project$Main$main = $elm$browser$Browser$sandbox(
	{init: $author$project$Model$init, update: $author$project$Update$update, view: $author$project$View$view});
_Platform_export({'Main':{'init':$author$project$Main$main(
	$elm$json$Json$Decode$succeed(_Utils_Tuple0))(0)}});}(this));