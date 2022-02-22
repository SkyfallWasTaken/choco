import {
	CommandHandler,
	useDescription,
	useString,
	createElement,
	Message,
	Embed,
} from "slshx";
import evaluate from "evaluator.js";
import { red } from "../design-system/colors";

export function calculate(): CommandHandler<Env> {
	useDescription("Calculates an expression");
	const expression = useString("expression", "The maths expression.", {
		required: true,
	});
	return async () => {
		try {
			const expressionResult = evaluate(expression.replace(" ", ""));
			return (
				<Message>
					```
					{expression} = {expressionResult}
					```
				</Message>
			);
		} catch (err) {
			return (
				<Message ephemeral>
					<Embed
						title="Failed to calculate expression."
						color={red()}
					>
						{err}
					</Embed>
				</Message>
			);
		}
	};
}
