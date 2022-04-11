import { MessageCommandHandler, createElement, Message } from "slshx";
import getUrls from "get-urls";
import Error from "../components/Error";

export function expandLinks(): MessageCommandHandler<Env> {
	return async (_interaction, _env, _ctx, message) => {
		const urls = getUrls(message.content);
		if (urls.size === 0) {
			return (
				<Message ephemeral>
					<Error error="No links found."></Error>
				</Message>
			);
		}

		let expandedLinks = "";
		let index = 0;
		for (const value of urls) {
			index++;
			expandedLinks += `[Link #${index} - ${value}](${value})\n`;
			continue;
		}

		return (
			<Message ephemeral>
				**Here are all of the links, expanded.**{"\n"}
				{expandedLinks}
			</Message>
		);
	};
}
