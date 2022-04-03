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
import { sample } from "lodash-es";
import { blue } from "../design-system/colors";

/* eslint-disable */
enum Choice {
	Rock = "✊ Rock",
	Paper = "✋ Paper",
	Scissors = "✂️ Scissors",
}
/* eslint-enable */

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
	const botChoice = sample([
		Choice.Rock,
		Choice.Paper,
		Choice.Scissors,
	]) as Choice;

	return (
		<Message update>
			<Embed
				title={`Rock Paper Scissors: you chose ${choice.toString()}`}
				color={blue()}
			>
				My choice is **{botChoice.toString()}**,{" "}
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
				Choose **{Choice.Rock}, {Choice.Paper} or {Choice.Scissors}!**
			</Embed>
			<Row>
				<Button id={rock} primary>
					{Choice.Rock}
				</Button>
				<Button id={paper} primary>
					{Choice.Paper}
				</Button>
				<Button id={scissors} primary>
					{Choice.Scissors}
				</Button>
			</Row>
		</Message>
	);
}
