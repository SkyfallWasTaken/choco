import { MessageCommandHandler, createElement, Message, Fragment } from "slshx";
import getUrls from "get-urls";

type ExpandedLinkProps = { link: string };
function ExpandedLink({ link }: ExpandedLinkProps) {
	return <>{link}</>;
}

export function expandLinks(): MessageCommandHandler<Env> {
	return async (_interaction, _env, _ctx, message) => {
		const urls = getUrls(message.content);
		if (urls.size === 0)
			return <Message ephemeral>No links found.</Message>;

		let expandedLinks = "";
		let index = 0;
		urls.forEach((value) => {
			index++;
			return (expandedLinks += `[Link #${index} - ${value}](${value})\n`);
		});

		return (
			<Message ephemeral>
				**Here are all of the links, expanded.**{"\n"}
				{expandedLinks}
			</Message>
		);
	};
}
