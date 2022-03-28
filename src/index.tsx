import { createHandler } from "slshx";
import commands from "./commands";
import userCommands from "./userCommands";
import messageCommands from "./messageCommands";

const handler = createHandler({
	applicationId: SLSHX_APPLICATION_ID,
	applicationPublicKey: SLSHX_APPLICATION_PUBLIC_KEY,
	applicationSecret: SLSHX_APPLICATION_SECRET,
	testServerId: SLSHX_TEST_SERVER_ID,

	// Commands
	commands,
	userCommands,
	messageCommands,
});

export default {
	fetch: handler
};
