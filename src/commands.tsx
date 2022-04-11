import { color } from "./misc/color";
import { screenshot } from "./misc/screenshot";
import { snowflake } from "./misc/snowflake";
import { asciiart } from "./misc/asciiart";
import { urbanLookup, urbanRandom } from "./misc/urban";
import { wikipediaRandom, wikipediaLookup } from "./misc/wikipedia";
import { fact } from "./misc/fact";
import { currency } from "./misc/currency";
import { unshorten } from "./misc/unshorten";
import { search } from "./misc/search";
import { translate } from "./misc/translate";
import { unsplash } from "./image/unsplash";
import { qrEncode, qrDecode } from "./image/qr";
import { createTag } from "./tags/createTag";
import { readTag } from "./tags/readTag";
import { deleteTag } from "./tags/deleteTag";
import { updateTag } from "./tags/updateTag";
import { listTags } from "./tags/listTags";
import { calculate } from "./math/calculate";
import { prime } from "./math/prime";
import { rockpaperscissors } from "./games/rockpaperscissors";
import { lyrics } from "./music/lyrics";

export default {
	calculate,
	rockpaperscissors,
	prime,
	tag: {
		create: createTag,
		view: readTag,
		delete: deleteTag,
		update: updateTag,
		list: listTags,
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
	unshorten,
	search,
	translate,
	lyrics,
};
