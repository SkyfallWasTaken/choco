// @ts-ignore
import levelOne from "./levels/1.txt";

const levels = [levelOne];

export default function (level: number) {
	return levels[level - 1];
}
