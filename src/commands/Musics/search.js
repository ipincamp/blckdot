/**
 * @name blckdot
 * @license GPL-3.0
 * @version v1.0.0
 * @author ipincamp <support@nur-arifin.my.id>
 */

const { MessageEmbed } = require("discord.js");
const { QueryType } = require("discord-player");

const client = require("../../..");
const player = require("../../utils/handlers");

module.exports = {
	name: "search",
	cooldown: 5,
	description: "Search videos to play",
	voiceChannel: true,
	async execute(message, args) {
		if (!args[0]) return message.channel.send(`${message.author} Please enter a valid search... try again ?`);

		const res = await player.search(args.join(" "), {
			requestedBy: message.member,
			searchEngine: QueryType.AUTO,
		});

		if (!res || !res.tracks.length) return message.channel.send(`${message.author} No results found... try again ?`);

		const queue = await player.createQueue(message.guild, {
			metadata: message.channel,
		});

		const maxTracks = res.tracks.slice(0, 10);

		const embed = new MessageEmbed()
			.setColor("RED")
			.setAuthor({
				name: `Results for ${args.join(" ")}`,
				iconURL: `${client.user.displayAvatarURL({ size: 1024, dynamic: true })}`,
			})
			.setDescription(`${maxTracks.map((track, i) => `**${i + 1}**. ${track.title} | ${track.author}`).join("\n")}\n\nSelect choice between **1** and **${maxTracks.length}** or **cancel** ⬇️`)
			.setTimestamp()
			.setFooter({ text: "Made with ❤️ by ipincamp", iconURL: `${message.author.avatarURL()}` });

		message.channel.send({ embeds: [embed] });

		const collector = message.channel.createMessageCollector({
			time: 15000,
			errors: ["time"],
			filter: (m) => m.author.id === message.author.id,
		});

		collector.on("collect", async (query) => {
			if (query.content.toLowerCase() === "cancel") return message.channel.send("Search cancelled ✅") && collector.stop();

			// eslint-disable-next-line radix
			const value = parseInt(query.content);

			if (!value || value <= 0 || value > maxTracks.length) return message.channel.send(`Invalid response, try a value between **1** and **${maxTracks.length}** or **cancel**... try again ? ❌`);

			collector.stop();

			try {
				if (!queue.connection) await queue.connect(message.member.voice.channel);
			} catch {
				await player.deleteQueue(message.guild.id);
				return message.channel.send(`I can't join the voice channel ${message.author}... try again ? ❌`);
			}

			await message.channel.send("Loading your search... 🎧");

			queue.addTrack(res.tracks[query.content - 1]);

			if (!queue.playing) await queue.play();
		});

		collector.on("end", (msg, reason) => {
			if (reason === "time") return message.channel.send(`Search timed out ${message.author}... try again ? ❌`);
		});
	},
};
