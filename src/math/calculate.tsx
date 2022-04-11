import {
	CommandHandler,
	useDescription,
	useString,
	createElement,
	Message,
} from "slshx";
import evaluate from "evaluator.js";
import Error from "../components/Error";

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
		} catch (error) {
			return (
				<Message ephemeral>
					<Error error={error as string}></Error>
				</Message>
			);
		}
	};
}
