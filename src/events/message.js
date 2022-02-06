/**
 * @name blckdot
 * @license GPL-3.0
 * @version v1.0.0
 * @author ipincamp <support@nur-arifin.my.id>
 */

const { MessageEmbed } = require("discord.js");
const client = require("../..");
const { version } = require("../../package.json");

module.exports = {
	name: "message",
	execute(message) {
		let mention = message.mentions.users.first();
		if (!mention) return;

		if (mention.id === message.author.id) {
			return message.reply("You can't tag yourself!");
		}
		if (mention.id === message.client.user.id) {
			let embed = new MessageEmbed()
				.setColor("AQUA")
				.setAuthor({
					name: `${client.user.username}`,
					iconURL: `${message.guild.iconURL()}`,
					url: "https://github.com/ipincamp",
				})
				.setTitle(`Server ${message.guild.name}`)
				.addFields(
					{ name: ":sparkles: Description", value: "Discord Bot Built With JavaScript Inside NodeJS" },
					{ name: ":pushpin: Tips", value: `For more information, type \`${client.prefix}help\``, inline: true },
					{ name: ":paperclip: Version", value: `Latest version: v**${version}**` },
				)
				.setFooter({ text: `${message.author.tag}`, iconURL: `${message.author.avatarURL()}` });

			embed.setTimestamp();
			return message.reply({ embeds: [embed] });
		}
	},
};
