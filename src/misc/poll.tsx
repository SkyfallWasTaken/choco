import {
	CommandHandler,
	useDescription,
	useString,
	useButton,
	createElement,
	Message,
	Embed,
	Row,
	Button,
	Fragment,
} from "slshx";
import { blue } from "../design-system/colors";

export function poll(): CommandHandler<Env> {
	useDescription("Creates a new poll");
	const question = useString("question", "The question for the poll.", {
		required: true,
	});
	const choice1 = useString("choice1", "Choice #1 for the poll.", {
		required: true,
	});
	const choice2 = useString("choice2", "Choice #2 for the poll.", {
		required: true,
	});
	const choice3 = useString("choice3", "Choice #3 for the poll.");
	const choice4 = useString("choice4", "Choice #4 for the poll.");

	const numbersAsEmojis = [""]

	return async (interaction) => {
		const choices = [choice1, choice2, choice3, choice4].filter(
			(item) => item
		);
		const choicesAsFragments = choices.map((item) => (
			<>
				{}**{item}**
				{"\n\n"}
			</>
		));
		const author = interaction.member?.user!;

		return (
			<Message>
				<Embed
					color={blue()}
					title={`Poll: ${question}`}
					footer={`Created by ${author.username}#${author.discriminator}`}
				>
					{choicesAsFragments}
				</Embed>
			</Message>
		);
	};
}
