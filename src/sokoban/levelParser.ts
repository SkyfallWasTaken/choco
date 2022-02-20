import getLevelContent from "./levels";

export const enum CellType {
	Wall,
	Background,
	Box,
	Destination,
	Player,
}

export default function (level: number): CellType[][] {
	let lineCount = -1; // don't ask why this is -1
	let lineLength: number;
	const grid: CellType[][] = [];

	const file = getLevelContent(level)!;
	const fileLines = file.trim().replace("\r", "").split("\n");

	fileLines.forEach((line: string) => {
		const charArray = [...line];
		line = line.trim();

		if (line.length === 0) return;
		if (line.startsWith("//")) return;

		grid.push([]);

		lineCount++;
		if (!lineLength) lineLength = charArray.length;

		charArray.forEach((char) => {
			switch (char) {
				case "🟦":
					grid[lineCount].push(CellType.Wall);
					break;

				case "⬛":
					grid[lineCount].push(CellType.Background);
					break;

				case "🟫":
					grid[lineCount].push(CellType.Box);
					break;

				case "🟩":
					grid[lineCount].push(CellType.Destination);
					break;

				case "🟧":
					grid[lineCount].push(CellType.Player);
			}
		});
	});

	return grid;
}
