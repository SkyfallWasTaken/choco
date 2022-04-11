// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(object, prop) {
	return Object.prototype.hasOwnProperty.call(object, prop);
}

const isArray =
	Array.isArray ||
	function (xs) {
		return Object.prototype.toString.call(xs) === "[object Array]";
	};

function stringifyPrimitive(v) {
	switch (typeof v) {
		case "string":
			return v;

		case "boolean":
			return v ? "true" : "false";

		case "number":
			return isFinite(v) ? v : "";

		default:
			return "";
	}
}

export function stringify(object, sep, eq, name) {
	sep = sep || "&";
	eq = eq || "=";
	if (object === null) {
		object = undefined;
	}

	if (typeof object === "object") {
		return map(objectKeys(object), (k) => {
			const ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
			if (isArray(object[k])) {
				return map(
					object[k],
					(v) => ks + encodeURIComponent(stringifyPrimitive(v)),
				).join(sep);
			}

			return ks + encodeURIComponent(stringifyPrimitive(object[k]));
		}).join(sep);
	}

	if (!name) {
		return "";
	}

	return (
		encodeURIComponent(stringifyPrimitive(name)) +
		eq +
		encodeURIComponent(stringifyPrimitive(object))
	);
}

function map(xs, f) {
	if (xs.map) {
		return xs.map(f);
	}

	const res = [];
	for (const [i, x] of xs.entries()) {
		res.push(f(x, i));
	}

	return res;
}

var objectKeys =
	Object.keys ||
	function (object) {
		const res = [];
		for (const key in object) {
			if (Object.prototype.hasOwnProperty.call(object, key)) {
				res.push(key);
			}
		}

		return res;
	};

export function parse(qs, sep, eq, options) {
	sep = sep || "&";
	eq = eq || "=";
	const object = {};

	if (typeof qs !== "string" || qs.length === 0) {
		return object;
	}

	const regexp = /\+/g;
	qs = qs.split(sep);

	let maxKeys = 1000;
	if (options && typeof options.maxKeys === "number") {
		maxKeys = options.maxKeys;
	}

	let length = qs.length;
	// MaxKeys <= 0 means that we should not limit keys count
	if (maxKeys > 0 && length > maxKeys) {
		length = maxKeys;
	}

	for (let i = 0; i < length; ++i) {
		const x = qs[i].replace(regexp, "%20");
		const idx = x.indexOf(eq);
		var kstr;
		var vstr;
		var k;
		var v;

		if (idx >= 0) {
			kstr = x.slice(0, Math.max(0, idx));
			vstr = x.slice(idx + 1);
		} else {
			kstr = x;
			vstr = "";
		}

		k = decodeURIComponent(kstr);
		v = decodeURIComponent(vstr);

		if (!hasOwnProperty(object, k)) {
			object[k] = v;
		} else if (isArray(object[k])) {
			object[k].push(v);
		} else {
			object[k] = [object[k], v];
		}
	}

	return object;
}

export default {
	encode: stringify,
	stringify,
	decode: parse,
	parse,
};
export { stringify as encode, parse as decode };
