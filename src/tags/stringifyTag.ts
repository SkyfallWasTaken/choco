/* Import fastJson, { Schema } from "fast-json-stringify";

const schema = {
    content: "string",
    author: "string"
}
const stringify = fastJson(schema as unknown as Schema) */
export default function (tagObject: Tag) {
	return JSON.stringify(tagObject);
}
