import {
	CommandHandler,
	useDescription,
	useString,
	createElement,
	Message,
	Embed,
} from "slshx";
import convertSnowflakeToEpoch from "../util/snowflake";
import { blue } from "../design-system/colors";

export function snowflake(): CommandHandler<Env> {
	useDescription("Gets the date from a Discord snowflake.");
	const snowflake = useString("snowflake", "The snowflake.", {
		required: true,
	});

	return async () => {
		if (!Number.isInteger(+snowflake)) {
			return (
				<Message>
					That doesn't look like a snowflake. Snowflakes contain only
					numbers.
				</Message>
			);
		}
		const snowflakeAsNumber = BigInt(snowflake);
		if (snowflakeAsNumber < 4194304) {
			return (
				<Message>
					That doesn't look like a snowflake. Snowflakes are much
					larger numbers.
				</Message>
			);
		}
		const epoch = convertSnowflakeToEpoch(snowflakeAsNumber.toString());
		return (
			<Message>
				<Embed color={blue()} title="Snowflake">
					{`<t:${epoch}:F>`}
				</Embed>
			</Message>
		);
	};
}
