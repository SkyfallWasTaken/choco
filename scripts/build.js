import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import process from "node:process";
import { build } from "esbuild";
import alias from "esbuild-plugin-alias";
import { env } from "./env.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const argv = process.argv.slice(2);

// There are 3 modes: "development", "deploy" and "production".
// - "development" uses application configuration from the "development" key
//   in env.jsonc, whereas "deploy" and "production" use the "production" key
//   instead.
// - "development" includes the test server configuration for live-reloading
//   commands to a specific guild
// - "development" and "deploy" include Miniflare-specific code for deployment
//   to test and global servers.
// - "production" removes application secrets so they're not published
/** @type {"development" | "deploy" | "production"} */
const mode = argv[0];
const modes = ["development", "deploy", "production"];
if (!modes.includes(mode)) {
	throw new Error(`mode must be one of ${modes.join(", ")}`);
}

const useProductionApp = mode !== "development";
const removeDeployCode = mode === "production";
const includeTestServer = mode === "development";

const testServerId = env.testServerId;
const app = useProductionApp ? env.production : env.development;
const appId = app?.applicationId;
const appPublicKey = app?.applicationPublicKey;
const appSecret = app?.applicationSecret;

// Validate environment
function assert(name, value, warn = "") {
	if (value) {
		return;
	}

	if (!warn) {
		throw new Error(`${name} must be set in env.jsonc`);
	}

	console.warn(`⚠️ ${name} is not set in env.jsonc. ${warn}`);
}

switch (mode) {
	case "development": {
		assert(
			"testServerId",
			testServerId,
			"You must include it to enable automatic reloading of commands.",
		);
		assert("development.applicationId", appId);
		assert("development.applicationPublicKey", appPublicKey);
		assert("development.applicationSecret", appSecret);

		break;
	}

	case "deploy": {
		assert("production.applicationId", appId);
		assert("production.applicationPublicKey", appPublicKey);
		assert("production.applicationSecret", appSecret);

		break;
	}

	case "production": {
		assert("production.applicationId", appId);
		assert("production.applicationPublicKey", appPublicKey);

		break;
	}
	// No default
}

// Run esbuild
const define = {
	SLSHX_APPLICATION_ID: JSON.stringify(appId),
	SLSHX_APPLICATION_PUBLIC_KEY: JSON.stringify(appPublicKey),
	SLSHX_APPLICATION_SECRET: removeDeployCode
		? "undefined" // Don't publish secret
		: JSON.stringify(appSecret),
	SLSHX_TEST_SERVER_ID: includeTestServer
		? JSON.stringify(testServerId)
		: "undefined",
};
if (removeDeployCode) {
	// Force globalThis.MINIFLARE to be false, so esbuild can remove dead-code
	define["globalThis.MINIFLARE"] = "false";
}

await build({
	entryPoints: ["src/index.tsx"],
	outExtension: { ".js": ".mjs" },
	outdir: "dist",
	target: "esnext",
	format: "esm",
	logLevel: "info",
	bundle: true,
	minify: useProductionApp,
	sourcemap: true,
	jsxFactory: "createElement",
	jsxFragment: "Fragment",
	define,
	plugins: [
		alias({
			needle: resolve(__dirname, "../shims/needle.js"),
			"node-fetch": resolve(__dirname, "../shims/nodeFetch.js"),
			fs: resolve(__dirname, "../shims/nothing.js"),
			got: resolve(__dirname, "../shims/got.js"),
			querystring: resolve(__dirname, "../shims/querystring.js"),
		}),
	],
});
