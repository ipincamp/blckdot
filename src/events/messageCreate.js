/**
 * @name blckdot
 * @license GPL-3.0
 * @version v1.0.0
 * @author ipincamp <support@nur-arifin.my.id>
 */

const { Collection } = require("discord.js");
const client = require("../..");

const categories = new Collection();
const cooldowns = new Collection();
const escReg = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

module.exports = {
	name: "messageCreate",
	async execute(message) {
		if (message.author.bot) return;
		if (!message.guild) return;

		const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escReg(client.prefix)})\\s*`);
		if (!prefixRegex.test(message.content)) return;

		const [, matchedPrefix] = message.content.match(prefixRegex);

		const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
		const commandName = args.shift().toLowerCase();

		const command = client.commands.get(commandName)
		|| client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) return;

		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Collection());
		}

		const category = categories.get(command.category);
		if (category) {
			category.set(command.name, command);
		} else {
			categories.set(command.category, new Collection().set(command.name, command));
		}

		const now = Date.now();
		const timestamps = cooldowns.get(command.name);
		const cooldownAmount = (command.cooldown || 1) * 1000;

		if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				return message.reply(`please wait ${timeLeft.toFixed(1)} more seconds before reusing the \`${command.name}\` command.`);
			}
		}

		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

		try {
			command.execute(message, args);
		} catch (error) {
			console.error(error);
			message.reply("There was an error executing that command.").catch(console.error);
		}
	},
};
