import { createHandler } from "slshx";
import { calculate } from "./math/calculate";
import { sokoban } from "./sokoban/command";
import { rockpaperscissors } from "./games/rockpaperscissors";
import { trivia } from "./games/trivia";
import { prime } from "./math/prime";
import { avatarUserCommand } from "./userCommands/avatarUserCommand";
import { createTag } from "./tags/createTag";
import { readTag } from "./tags/readTag";
import { deleteTag } from "./tags/deleteTag";
import { updateTag } from "./tags/updateTag";
import { expandLinks } from "./messageCommands/expandLinks";

const handler = createHandler({
	// Replaced by esbuild when bundling, see scripts/build.js (do not edit)
	applicationId: SLSHX_APPLICATION_ID,
	applicationPublicKey: SLSHX_APPLICATION_PUBLIC_KEY,
	applicationSecret: SLSHX_APPLICATION_SECRET,
	testServerId: SLSHX_TEST_SERVER_ID,
	// Add your commands here
	commands: {
		calculate,
		sokoban,
		rockpaperscissors,
		trivia,
		prime,
		tag: {
			create: createTag,
			view: readTag,
			delete: deleteTag,
			update: updateTag,
		},
	},
	userCommands: { "Get User Avatar": avatarUserCommand },
	messageCommands: { "Expand Links": expandLinks },
});

export default {
	fetch: handler,
};