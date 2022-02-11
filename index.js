/**
 * @name blckdot
 * @license GPL-3.0
 * @version v1.0.0
 * @author ipincamp <support@nur-arifin.my.id>
 */

/**
 * Import Modules
 */
const { Client, Collection } = require("discord.js");
const fs = require("fs");
const { prefix, token } = require("./src/utils/utils");

// Create new client instance
const client = new Client({
	intents: 641,
	restTimeOffset: 0,
});

client.login(token);
client.commands = new Collection();
client.events = new Collection();
client.prefix = prefix;
client.queue = new Map();

module.exports = client;

/**
 * Events Handler
 */
const eventFiles = fs.readdirSync("./src/events").filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
	const event = require(`./src/events/${file}`);

	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}
