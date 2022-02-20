export default function (enumeration: any) {
	const values = Object.keys(enumeration);
	const enumKey = values[Math.floor(Math.random() * values.length)];
	return enumeration[enumKey];
}
