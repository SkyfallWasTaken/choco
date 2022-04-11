import { Embed, createElement } from "slshx";
import { green } from "../design-system/colors";
import { success as successEmoji } from "../design-system/emojis";

type ComponentProps = { message: string };
export default function Error({ message }: ComponentProps): typeof Embed {
	return (
		<Embed color={green()}>
			{successEmoji()} {message}
		</Embed>
	);
}
