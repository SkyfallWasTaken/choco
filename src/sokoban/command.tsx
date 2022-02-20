import {
	CommandHandler,
	useButton,
	createElement,
	Message,
	Button,
	Embed,
	useDescription,
} from "slshx";
import { blue } from "../design-system/colors";
import Sokoban from "./sokoban";

const level = new Sokoban(1);

export function sokoban(): CommandHandler<Env> {
	useDescription("Play Sokoban!");
	const start = useButton(() => (
		<Message update>
			<Embed title={`Level ${level.level}`} color={blue()}>
				{level.gridAsString()}
			</Embed>
		</Message>
	));

	return () => (
		<Message>
			<Embed title="Play Sokoban" color={blue()}>
				**Welcome to Sokoban!**{"\n"}
				Sokoban is a game in which you will try to push boxes around in
				a warehouse, trying to get them to storage locations. Press the
				**Start** button to play!
			</Embed>
			<Button id={start} success disabled>
				Coming soon!
			</Button>
		</Message>
	);
}
