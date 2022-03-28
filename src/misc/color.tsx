import {
	CommandHandler,
	useDescription,
	useString,
	createElement,
	Message,
	Embed,
} from "slshx";
import { red } from "../design-system/colors";
import { error } from "../design-system/emojis";
import expandHexCode from "expand-hex-code";
import { hexToRGB, findClosestColor } from "color-to-name";

const HEX_REGEX = /^#([0-9A-F]{3}){1,2}$/i;
export function color(): CommandHandler<Env> {
	useDescription("Previews a color");
	const color = useString(
		"color",
		"The hex code for the color.",
		{
			required: true,
		}
	);

	return async () => {
		const normalizedColor =
			color.length % 2 === 0 ? `#${color}` : color.replace(" ", "");

		const parsedHex = HEX_REGEX.test(normalizedColor);
		if (!parsedHex)
			return (
				<Message>
					<Embed color={red()}>{error()} Hex code invalid.</Embed>
				</Message>
			);
		const expandedColor = expandHexCode(normalizedColor);

		const rgb = hexToRGB(expandedColor);
		return (
			<Message>
				<Embed
					color={parseInt("0x" + expandedColor.substring(1))}
					title={findClosestColor(expandedColor)
						.name.split(" ")
						.map(
							(w: string) =>
								w[0].toUpperCase() +
								w.substring(1).toLowerCase()
						)
						.join(" ")}
					thumbnail={`https://singlecolorimage.com/get/${expandedColor.substring(
						1
					)}/240x240`}
				>
					**Hex**{"\n"}
					{expandedColor.toUpperCase()}
					{"\n\n"}
					**RGB**{"\n"}
					{rgb!.r}, {rgb!.g}, {rgb!.b}
				</Embed>
			</Message>
		);
	};
}
