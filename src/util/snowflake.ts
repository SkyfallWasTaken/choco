/* eslint-disable no-bitwise */
export const discordEpoch = 1_420_070_400_000;

// Converts a snowflake ID string into a JS Date object using the provided epoch (in ms), or Discord's epoch if not provided
export default function convertSnowflakeToDate(snowflake: string) {
	// Convert snowflake to BigInt to extract timestamp bits
	// https://discord.com/developers/docs/reference#snowflakes

	const milliseconds = BigInt(snowflake) >> 22n;
	return Math.round(
		new Date(Number(milliseconds) + discordEpoch).getTime() / 1000,
	);
}
