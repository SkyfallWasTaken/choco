/*
A basic shim for the "needle" package used by duck-duck-scrape.
It's basically https://github.com/Snazzah/ducksearch/blob/master/src/needle.js
but it uses `globalThis` instead of `global`.
*/
/* eslint-disable */

globalThis.Buffer = class Buffer {};

const needle = async (method, url) => {
  method = method.toUpperCase();
  const response = await fetch(url, { method });
  let body = await response.text();
  try {
    body = JSON.parse(body);
  } catch (e) {}

  return {
    body,
    headers: response.headers,
    method,
    url,
    statusCode: response.status,
    statusMessage: response.statusText,
    completed: true
  };
};

module.exports = needle;
module.exports.default = needle;