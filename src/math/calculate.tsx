import {
	CommandHandler,
	useDescription,
	useString,
	createElement,
	Message,
} from "slshx";
import exactMath from "exact-math";

const error = () => (
	<Message ephemeral>Failed to calculate expression!</Message>
);

export function calculate(): CommandHandler<Env> {
	useDescription("Calculates an expression");
	const expression = useString("expression", "The maths expression.", {
		required: true,
	});
	try {
		setTimeout(function () {
			return error;
		}, 5000);
		const expressionResult = exactMath.formula(expression.replace(" ", ""));
		return () => (
			<Message>
				```
				{expression} = {expressionResult}
				```
			</Message>
		);
	} catch {
		return error;
	}
}
