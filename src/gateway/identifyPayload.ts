import OPCodes from "./opCodes";

export default function identifyPayload(token: string, presence: Presence) {
	const payload = {
		op: OPCodes.IDENTIFY,
		d: {
			token,
			intents: 513, // TODO: e intents
			properties: {
				$os: "linux",
				$browser: "quicksand",
				$device: "quicksand",
			},
			presence: {
				activities: [
					{
						name: presence.name,
						type: presence.type,
					},
				],
				status: presence.status || "online",
				since: 91879201, // we just need smth to put in
				afk: presence.afk || false,
			},
		},
	};

	return JSON.stringify(payload);
}
