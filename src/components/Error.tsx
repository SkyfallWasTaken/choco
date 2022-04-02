import { Embed, createElement, } from "slshx";
import { red } from "../design-system/colors";
import { error as errorEmoji } from "../design-system/emojis";

type ErrorProps = { error: string };
export default function Error({ error }: ErrorProps): typeof Embed {
	return (
		<Embed color={red()}>
			{errorEmoji()} {error}
		</Embed>
	);
}
