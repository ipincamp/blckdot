/**
 * @name blckdot
 * @license GPL-3.0
 * @version v1.0.0
 * @author ipincamp <support@nur-arifin.my.id>
 */

const { Client } = require("discord.js");
const fs = require("fs");

const { prefix } = require("../utils");

module.exports = {
	name: "ready",
	once: true,
	/**
     *
	 * @param {Client} client
     */
	execute(client) {
		console.info(`${client.user.tag} ready!`);

		const arrayPresence = [
			`${prefix}help`,
			"Spotify",
			"YouTube",
		];

		setInterval(() => {
			const index = Math.floor(Math.random() * (arrayPresence.length - 1) + 1);
			client.user.setActivity(arrayPresence[index], { type: "LISTENING" });
			client.user.setStatus("idle");
		}, 10000);

		/**
 		* Commands Handler
 		*/
		const commandFiles = fs.readdirSync("./src/commands").filter((file) => file.endsWith(".js"));

		for (const file of commandFiles) {
			const command = require(`../commands/${file}`);

			client.commands.set(command.name, command);
		}
		/**
		 * To Do:
		 * 1. Updater
		 * 2. Bug fixer
		 *
		 */
	},
};
