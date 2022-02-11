/**
 * @name blckdot
 * @license GPL-3.0
 * @version v1.0.0
 * @author ipincamp <support@nur-arifin.my.id>
 */

const fs = require("fs");

const { prefix } = require("../utils/utils");

module.exports = {
	name: "ready",
	once: true,
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
		fs.readdir("./src/commands/", (e, f) => {
			if (e) {
				console.error(e);
			} else {
				console.info(`Register ${f.length} categories!`);
				f.forEach((g) => {
					fs.readdir(`./src/commands/${g}`, (h, i) => {
						console.info(`> ${i.length} commands from ${g}`);
						if (h) {
							console.error(h);
						} else {
							i.forEach((j) => {
								if (!j.endsWith(".js")) return;
								let command = require(`../commands/${g}/${j}`);

								client.commands.set(command.name, command);
							});
						}
					});
				});
			}
		});
	},
};
