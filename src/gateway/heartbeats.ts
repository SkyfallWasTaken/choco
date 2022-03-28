import OPCodes from "./opCodes";

export default function heartbeat(ws: WebSocket, data: any, sequence: Function) {
	const heartbeatInterval = data.d.heartbeat_interval;

	const timeout = setTimeout(() => {
		ws.send(JSON.stringify({ op: OPCodes.HEARTBEAT, d: sequence() }));
		const interval = setInterval(() => {
			ws.send(JSON.stringify({ op: OPCodes.HEARTBEAT, d: sequence() }));
		}, heartbeatInterval);

		ws.addEventListener("close", () => {
			// we don't have a conn, so don't send heartbeats
			clearInterval(interval);
		});
	}, heartbeatInterval * Math.random());

	if (data.op === OPCodes.HEARTBEAT) {
		ws.send(JSON.stringify({ op: OPCodes.HEARTBEAT, d: null }));
	} else if (data.op === OPCodes.HEARTBEAT_ACK) {
		// TODO:
	}

	ws.addEventListener("close", () => {
		clearTimeout(timeout);
	});
}
