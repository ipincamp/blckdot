/**
 * @name blckdot
 * @license GPL-3.0
 * @version v1.0.0
 * @author ipincamp <support@nur-arifin.my.id>
 */

const { Client, Collection } = require("discord.js");
const express = require("express");
const { prefix, token } = require("./src/utils/utils");

const app = express();

app.get("/", (req, res) => res.sendStatus(200));
app.listen(process.env.PORT);

const client = new Client({
	allowedMentions: {
		parse: ["users", "roles"],
		repliedUser: true,
	},
	intents: 641,
	restTimeOffset: 0,
});
module.exports = client;

client.login(token);
client.commands = new Collection();
client.events = new Collection();
client.prefix = prefix;
client.queue = new Map();

require("./src/utils/handlers")(client);
