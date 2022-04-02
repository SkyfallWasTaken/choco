import {
	CommandHandler,
	useDescription,
	createElement,
	Message,
	Embed,
} from "slshx";
import { sample } from "lodash-es";
import { blue } from "../design-system/colors";
import facts from "../resources/facts.json";

export function fact(): CommandHandler<Env> {
	useDescription("Get a random fact!");
	return async () => (
		<Message>
			<Embed color={blue()}>{sample(facts)}</Embed>
		</Message>
	);
}
