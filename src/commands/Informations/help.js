/**
 * @name blckdot
 * @license GPL-3.0
 * @version v1.0.0
 * @author ipincamp <support@nur-arifin.my.id>
 */

const { MessageEmbed } = require("discord.js");
const client = require("../../..");

const { prefix } = require("../../utils/config");

module.exports = {
	name: "help",
	aliases: ["h"],
	cooldown: 3,
	description: "Display all commands and descriptions",
	execute(message) {
		const embed = new MessageEmbed()
			.setAuthor(
				{
					name: `${client.user.username} Help Menu`,
					iconURL: `${client.user.displayAvatarURL()}`,
					url: "https://cdn.discordapp.com/avatars/745338740850950154/81b104834869bac98638991c5c766ca0.webp",
				},
			)
			.setColor("RANDOM")
			.setDescription(`List all commands available.\n\nIf you want to run a command,\nstart with \`${prefix}\``)
			.setFooter({ text: `${message.author.tag}`, iconURL: `${message.author.avatarURL()}` })
			.setTimestamp()
			.setThumbnail(`${message.guild.iconURL()}`);

		client.commands.forEach((cmd) => {
			embed.addFields(
				{
					name: `**${cmd.name}** ${cmd.aliases ? `(${cmd.aliases})` : ""}`,
					value: `${cmd.description}`,
					inline: false,
				},
			);
		});
		return message.channel.send({ embeds: [embed] }).catch(console.error);
	},
};
