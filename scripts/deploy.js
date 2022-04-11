import readline from "node:readline";
import { Miniflare, Log, LogLevel } from "miniflare";
import { env } from "./env.js";

const appId = env.production.applicationId;

// Confirm deployment with prompt
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

// Start Miniflare to run Worker
const mf = new Miniflare({
	log: new Log(LogLevel.DEBUG),
	// Autoload configuration from the wrangler.toml file
	wranglerConfigPath: true,
	packagePath: true,
	envPath: true,
	// Build the worker in "deploy" mode, which includes Miniflare-specific
	// deployment code, but uses the production configuration.
	buildCommand: "node scripts/build.js deploy",
});

// Deploy commands globally
await mf.dispatchFetch("http://localhost:8787/?slshx_action=deploy", {
	method: "POST",
});

// Build the authorize URL
const url = new URL("https://discord.com/api/oauth2/authorize");
url.searchParams.set("client_id", appId);
url.searchParams.set("scope", "applications.commands");

// Log success
const green = (s) => `\u001B[32m${s}\u001B[39m`;
console.log(
	green(
		"[slshx] Deployed! ✅  (changes may take up to an hour to propagate)",
	),
);
console.log(
	green(`[slshx] Add the application to your server here: ${url.toString()}`),
);
process.exit(0);
