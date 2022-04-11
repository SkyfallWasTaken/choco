import {
	CommandHandler,
	useDescription,
	useInteger,
	createElement,
	Message,
} from "slshx";
import primes from "../resources/primes.json";

export function prime(): CommandHandler<Env> {
	useDescription("Calculates an expression");
	const n = useInteger(
		"n",
		"The number that you want of the prime sequence",
		{
			required: true,
			min: 1,
			max: 500,
		},
	);

	return async () => <Message>```{primes[n - 1]}```</Message>;
}
