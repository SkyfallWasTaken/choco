import {
	CommandHandler,
	useButton,
	createElement,
	Message,
	Button,
	Embed,
	useDescription,
	Row,
} from "slshx";
import { random } from "lodash-es";
import { blue } from "../design-system/colors";

enum Choice {
	Rock,
	Paper,
	Scissors,
}

function determineWinner(userChoice: Choice, botChoice: Choice): string {
	if (userChoice === botChoice) return "it's a draw!";

	switch (botChoice) {
	case Choice.Rock: {
		if (userChoice === Choice.Paper) return "you win!";
		return "I win!";
	}
	case Choice.Paper: {
		if (userChoice === Choice.Scissors) return "you win!";
		return "I win!";
	}
	case Choice.Scissors: {
		if (userChoice === Choice.Rock) return "you win!";
		return "I win!";
	}
	}
}

function tttChoice(choice: Choice) {
	const r = random(1, 3);
	const botChoice =
		r === 1 ? Choice.Rock : r === 2 ? Choice.Paper : Choice.Scissors;

	return (
		<Message update>
			<Embed
				title={`Rock Paper Scissors: you chose ${choice}`}
				color={blue()}
			>
				My choice is **{botChoice}**,{" "}
				{determineWinner(choice, botChoice)}
			</Embed>
		</Message>
	);
}

export function rockpaperscissors(): CommandHandler<Env> {
	useDescription("Play Rock Paper Scissors!");
	const rock = useButton(() => tttChoice(Choice.Rock));
	const paper = useButton(() => tttChoice(Choice.Paper));
	const scissors = useButton(() => tttChoice(Choice.Scissors));

	return () => (
		<Message>
			<Embed title="Rock Paper Scissors" color={blue()}>
				Choose rock, paper or scissors!
			</Embed>
			<Row>
				<Button id={rock} primary>
					Rock
				</Button>
				<Button id={paper} primary>
					Paper
				</Button>
				<Button id={scissors} primary>
					Scissors
				</Button>
			</Row>
		</Message>
	);
}
