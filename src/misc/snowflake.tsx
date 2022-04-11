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
import Error from "../components/Error";

export function snowflake(): CommandHandler<Env> {
	useDescription("Gets the date from a Discord snowflake.");
	const snowflake = useString("snowflake", "The snowflake.", {
		required: true,
	});

	return async () => {
		if (!Number.isInteger(Number(snowflake))) {
			return (
				<Message>
					<Error
						error="That doesn't look like a snowflake. Snowflakes contain only
					numbers."
					></Error>
				</Message>
			);
		}

		const snowflakeAsNumber = BigInt(snowflake);
		if (snowflakeAsNumber < 4_194_304) {
			return (
				<Message>
					<Error
						error="That doesn't look like a snowflake. Snowflakes are much
					larger numbers."
					></Error>
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
