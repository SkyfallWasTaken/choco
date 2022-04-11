const trim = (stringToDrop: string, max: number) =>
	stringToDrop.length > max
		? `${stringToDrop.slice(0, max - 3)}...`
		: stringToDrop;
export default trim;
