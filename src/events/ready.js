/**
 * @name blckdot
 * @license GPL-3.0
 * @version v1.0.0
 * @author ipincamp <support@nur-arifin.my.id>
 */

const { Client } = require("discord.js");

module.exports = {
	name: "ready",
	once: true,
	/**
     *
     * @param {Client} client
     */
	execute(client) {
		console.info(`${client.user.tag} ready!`);

		const { prefix } = require("../config.json");
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
		 * To Do:
		 * 1. Updater
		 * 2. Bug fixer
		 *
		 */
	},
};
