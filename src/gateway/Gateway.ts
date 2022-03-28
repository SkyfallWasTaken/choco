import identifyPayload from "./identifyPayload";
import setupHeartbeats from "./heartbeats";
import API_PREFIX from "./apiPrefix";
import OPCodes from "./opCodes";
import { EventEmitter } from "@okikio/emitter";
import { PresenceType } from "./types/PresenceType";

type Options = {
	token: string;
	presence?: Presence;
};

class Gateway extends EventEmitter {
	#gatewayBot?: GatewayBotResponse;
	token?: string;
	ws?: WebSocket;
	sequence?: number;
	options?: Options;

	constructor() {
		super();
	}

	async init(options: Options) {
		this.token = options.token;
		this.options = options;

		const response = await fetch(`${API_PREFIX}/gateway`, {
			headers: {
				Authorization: this.token,
			},
		});

		const text = await response.text();
		if (!response.ok)
			throw new Error(
				`Failed to get gateway, received status code: ${response.status} and response: ${text}`
			);
		const json: GatewayBotResponse = JSON.parse(text);

		this.#gatewayBot = json;
	}

	#wsMessageHandler(message: any, ws: WebSocket) {
		const data: any = JSON.parse(message.data);

		if (data.s) this.sequence = data.s;

		if (data.op === OPCodes.HELLO) {
			setupHeartbeats(ws, data, () => this.sequence);
			ws.send(
				identifyPayload(
					this.token!,
					this.options?.presence || {
						status: "online",
						name: "for events!",
						type: PresenceType.WATCHING,
					}
				)
			);
		}

		if (data.t) {
			this.emit(data.t, data);
		}
	}

	async connect() {
		let resp = await fetch(
			`https://${this.#gatewayBot?.url!.substring(6)}?v=9&encoding=json`, // TODO: see if we can use erlpack for speeeeeeed
			{
				headers: {
					Upgrade: "websocket",
				},
			}
		);

		let ws = resp.webSocket;
		if (!ws) {
			throw new Error("Discord server didn't accept WebSocket");
		}
		ws.accept();
		this.ws = ws;

		this.ws.addEventListener("message", (msg) => {
			this.#wsMessageHandler(msg, ws!);
		});
		this.ws.addEventListener("close", () => {
			console.log("[discordgateway] 🛑 gateway connection terminated");
		});
	}
}

export default async function createGateway(options: Options) {
	const gateway = new Gateway();
	await gateway.init(options);
	return gateway;
}
