/**
 * @name blckdot
 * @license GPL-3.0
 * @version v1.0.0
 * @author ipincamp <support@nur-arifin.my.id>
 */

const { dev } = require("../../utils/utils");

module.exports = {
	name: "uptime",
	aliases: ["up"],
	cooldown: 5,
	description: "Check the bot uptime.",
	execute(message) {
		if (message.author.id == dev) {
			let seconds = Math.floor(message.client.uptime / 1000);
			let minutes = Math.floor(seconds / 60);
			let hours = Math.floor(minutes / 60);
			let days = Math.floor(hours / 24);

			seconds %= 60;
			minutes %= 60;
			hours %= 24;

			message.reply(
				`Uptime: \`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds\``,
			).catch((err) => console.error(err));
		} else {
			return message.reply("Sorry, you don't have permission!");
		}
	},
};
