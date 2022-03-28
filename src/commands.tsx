import { color } from "./misc/color";
import { screenshot } from "./misc/screenshot";
import { snowflake } from "./misc/snowflake";
import { asciiart } from "./misc/asciiart";
import { urbanLookup, urbanRandom } from "./misc/urban";
import { wikipediaRandom, wikipediaLookup } from "./misc/wikipedia";
import { qr } from "./image/qr";
import { createTag } from "./tags/createTag";
import { readTag } from "./tags/readTag";
import { deleteTag } from "./tags/deleteTag";
import { updateTag } from "./tags/updateTag";
import { calculate } from "./math/calculate";
import { rockpaperscissors } from "./games/rockpaperscissors";
import { prime } from "./math/prime";
import { unsplash } from "./image/unsplash";

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
	qr,
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
};
