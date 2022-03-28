type GatewayBotResponse = {
	url: string;
	shards: number;
	session_start_limit: {
		total: number;
		remaining: number;
		reset_after: number;
		max_concurrency: number;
	};
};

type Presence = {
	name: string;
	type: PresenceType;
	status?: "online" | "dnd" | "idle" | "invisible" | "offline"
	afk?: boolean
}