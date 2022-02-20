import {
	CommandHandler,
	useDescription,
	createElement,
	Message,
	Embed,
	Row,
	Button,
	useButton,
	Field,
} from "slshx";
import { blue } from "../design-system/colors";

function shuffle(array: any[]) {
	const newArray: any[] = [];
	let currentIndex = array.length;
	let temporaryValue;
	let randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = newArray.hasOwnProperty(currentIndex)
			? newArray[currentIndex]
			: array[currentIndex];
		newArray[currentIndex] = array[randomIndex];
		newArray[randomIndex] = temporaryValue;
	}

	return newArray;
}

function toTitleCase(str: string) {
	return str.replace(/\w\S*/g, function (txt: string) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}

type TriviaButtonProps = {
	id: string;
	choice: string;
};

function TriviaButton(args: TriviaButtonProps) {
	return (
		<Button primary id={args.id}>
			{args.choice}
		</Button>
	);
}

export function trivia(): CommandHandler<Env> {
	useDescription("Gets a trivia question!");
	const handler = useButton((interaction) => {
		const extraData = JSON.parse(
			atob(interaction.data.custom_id.substring(handler.length))
		);

		return (
			<Message>
				{extraData[0] === extraData[1]
					? "That's correct, good job nerd"
					: `That's incorrect, the answer is **${atob(
							extraData[2]
					  )}!**`}
			</Message>
		);
	});

	return async function* () {
		yield;

		const response = await fetch(
			"https://opentdb.com/api.php?amount=1&type=multiple&encode=base64"
		);
		const json: any = await response.json();
		const trivia = json.results[0];

		const correctAnswer = trivia.correct_answer;
		const choices = shuffle([correctAnswer, ...trivia.incorrect_answers]);
		const correctAnswerIndex = choices.indexOf(correctAnswer);

		const choiceButtons = [];
		for (let i = 0; i < choices.length; i++) {
			choiceButtons.push(
				<TriviaButton
					id={
						handler +
						btoa(
							JSON.stringify([
								i,
								correctAnswerIndex,
								correctAnswer,
							])
						)
					}
					choice={atob(choices[i])}
				/>
			);
		}

		return (
			<Message>
				<Embed title={atob(trivia.question)} color={blue()}>
					<Field name="Category" inline>
						{atob(trivia.category)}
					</Field>
					<Field name="Difficulty" inline>
						{toTitleCase(atob(trivia.difficulty))}
					</Field>
				</Embed>
				<Row>{choiceButtons}</Row>
			</Message>
		);
	};
}
