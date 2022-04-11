import { Embed, createElement } from "slshx";
import { red } from "../design-system/colors";

type ComponentProps = { name: string };
export default function RequiredInGuild({
	name,
}: ComponentProps): typeof Embed {
	return (
		<Embed color={red()} title="This command can only be used in a server!">
			The command `/{name}` can only be used in a server.
		</Embed>
	);
}
