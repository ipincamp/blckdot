/**
 * @name blckdot
 * @license GPL-3.0
 * @version v1.0.0
 * @author ipincamp <support@nur-arifin.my.id>
 */

const { dev } = require("../utils");

module.exports = {
	name: "clear",
	cooldown: 3,
	category: ["admin"],
	description: "Prune any message",
	async execute(message, args) {
		if (message.author.id == dev) {
			if (!args[0]) {
				return message.reply(
					"Please enter the specific amount of message that you want to clear!",
				);
			}
			if (isNaN(args[0])) {
				return message.reply("Please enter a real number!");
			}
			if (args[0] > 100) {
				return message.reply("Sorry, you can't delete more than 100 messages!");
			}
			if (args[0] < 1) {
				return message.reply("You must delete atleast one message!");
			}

			await message.channel.messages.fetch({ limit: args[0] }).then((messages) => {
				message.channel.bulkDelete(messages, true);
			}).catch((error) => console.error(error));
		} else {
			return message.reply("Sorry, you don't have permission!");
		}
	},
};
