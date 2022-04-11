import {
	CommandHandler,
	useDescription,
	useString,
	createElement,
	Message,
	Embed,
} from "slshx";
import expandHexCode from "expand-hex-code";
import { hexToRGB, findClosestColor } from "color-to-name";
import Error from "../components/Error";

const HEX_REGEX = /^#([\da-f]{3}){1,2}$/i;
export function color(): CommandHandler<Env> {
	useDescription("Previews a color");
	const color = useString("color", "The hex code for the color.", {
		required: true,
	});

	return async () => {
		const normalizedColor =
			color.length % 2 === 0 ? `#${color}` : color.replace(" ", "");

		const parsedHex = HEX_REGEX.test(normalizedColor);
		if (!parsedHex) {
			return (
				<Message>
					<Error error="Hex code invalid!"></Error>
				</Message>
			);
		}

		const expandedColor = expandHexCode(normalizedColor);

		const rgb = hexToRGB(expandedColor);
		return (
			<Message>
				<Embed
					color={Number.parseInt("0x" + expandedColor.slice(1))}
					title={findClosestColor(expandedColor)
						.name.split(" ")
						.map(
							(w: string) =>
								w[0].toUpperCase() + w.slice(1).toLowerCase(),
						)
						.join(" ")}
					thumbnail={`https://singlecolorimage.com/get/${expandedColor.slice(
						1,
					)}/240x240`}
				>
					**Hex**{"\n"}
					{expandedColor.toUpperCase()}
					{"\n\n"}
					**RGB**{"\n"}
					{rgb?.r}, {rgb?.g}, {rgb?.b}
				</Embed>
			</Message>
		);
	};
}
