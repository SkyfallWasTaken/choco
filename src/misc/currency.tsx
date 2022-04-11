// TODO: format this file.
import {
	CommandHandler,
	useDescription,
	useString,
	useNumber,
	createElement,
	Message,
	Embed,
	Field,
} from "slshx";
import { currency as convert } from "duck-duck-scrape";
import Error from "../components/Error";
import { blue } from "../design-system/colors";
import currencies from "../resources/currencies.json";

function autocompleteCurrency(currency: string) {
	if ([...currencies].length === 0) {
		return currencies.slice(0, 10);
	}

	return currencies
		.filter((v) => {
			const name = v.name.toLowerCase();
			return name.includes(currency.toLowerCase());
		})
		.slice(0, 10);
}

export function currency(): CommandHandler<Env> {
	useDescription("Convert currency.");

	const amount = useNumber("amount", "The amount of currency.", {
		required: true,
	});
	const currencyFrom: string = useString<Env>(
		"from",
		"Currency to convert from.",
		{
			required: true,
			async autocomplete() {
				return autocompleteCurrency(currencyFrom);
			},
		},
	);
	const currencyTo: string = useString<Env>("to", "Currency to convert to.", {
		required: true,
		async autocomplete() {
			return autocompleteCurrency(currencyTo);
		},
	});

	return async function* () {
		yield;

		try {
			const result = await convert(currencyFrom, currencyTo, amount);
			const conversion = result.conversion;
			return (
				<Message>
					<Embed
						color={blue()}
						title={`${conversion["from-currency-symbol"]} to ${conversion["to-currency-symbol"]}`}
						footer="Powered by XE.com and DuckDuckGo"
					>
						**{conversion["from-amount"]}{" "}
						{conversion["from-currency-symbol"]}** ={" "}
						{conversion["converted-amount"]}{" "}
						{conversion["to-currency-symbol"]}
						<Field inline name="Exchange rate">
							{conversion["conversion-rate"]}
						</Field>
					</Embed>
				</Message>
			);
		} catch (error) {
			return (
				<Message>
					<Error
						error={(error as string).toString().slice(13)}
					></Error>
				</Message>
			);
		}
	};
}
