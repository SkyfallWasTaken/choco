import { color } from "./misc/color";
import { screenshot } from "./misc/screenshot";
import { snowflake } from "./misc/snowflake";
import { asciiart } from "./misc/asciiart";
import { urbanLookup, urbanRandom } from "./misc/urban";
import { wikipediaRandom, wikipediaLookup } from "./misc/wikipedia";
import { fact } from "./misc/fact";
import { currency } from "./misc/currency";
import { unshorten } from "./misc/unshorten";
import { unsplash } from "./image/unsplash";
import { qrEncode, qrDecode } from "./image/qr";
import { createTag } from "./tags/createTag";
import { readTag } from "./tags/readTag";
import { deleteTag } from "./tags/deleteTag";
import { updateTag } from "./tags/updateTag";
import { calculate } from "./math/calculate";
import { rockpaperscissors } from "./games/rockpaperscissors";
import { prime } from "./math/prime";

export default {
	calculate,
	rockpaperscissors,
	prime,
	tag: {
		create: createTag,
		view: readTag,
		delete: deleteTag,
		update: updateTag,
	},
	color,
	screenshot,
	qr: {
		encode: qrEncode,
		decode: qrDecode,
	},
	snowflake,
	unsplash,
	asciiart,
	urban: {
		lookup: urbanLookup,
		random: urbanRandom,
	},
	wikipedia: {
		lookup: wikipediaLookup,
		random: wikipediaRandom,
	},
	fact,
	currency,
	unshorten
};
