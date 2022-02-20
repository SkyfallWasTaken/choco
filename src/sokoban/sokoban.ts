import { CellType } from "./levelParser";
import parseLevel from "./levelParser";

export default class Sokoban {
	level: number;
	grid: CellType[][];

	constructor(level: number) {
		this.level = level;
		this.grid = parseLevel(level);
	}

	gridAsString(): string {
		let result: string = "";

		this.grid.forEach((row) => {
			row.forEach((char) => {
				switch (char) {
					case CellType.Wall:
						result += ":blue_square:";
						break;

					case CellType.Background:
						result += ":black_large_square:";
						break;

					case CellType.Box:
						result += ":brown_square:";
						break;

					case CellType.Destination:
						result += ":green_square:";
						break;

					case CellType.Player:
						result += ":orange_square:";
						break;
				}
			});
			result += "\n";
		});

		return result;
	}
}
