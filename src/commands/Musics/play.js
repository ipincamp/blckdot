/**
 * @name blckdot
 * @license GPL-3.0
 * @version v1.0.0
 * @author ipincamp <support@nur-arifin.my.id>
 */

const { QueryType } = require("discord-player");
const { prefix } = require("../../utils/config");

const player = require("../../utils/handlers");

module.exports = {
	name: "play",
	cooldown: 3,
	aliases: ["p"],
	description: "Plays audio from YouTube",
	voiceChannel: true,
	async execute(message, args) {
		if (!args[0]) return message.channel.send(`${message.author} Usage: ${prefix}play <YouTube URL | Video Name> try again ?`);

		const res = await player.search(args.join(" "), {
			requestedBy: message.member,
			searchEngine: QueryType.AUTO,
		});

		if (!res || !res.tracks.length) return message.channel.send(`${message.author} No results found... try again ?`);

		const queue = await player.createQueue(message.guild, {
			metadata: message.channel,
		});

		try {
			if (!queue.connection) await queue.connect(message.member.voice.channel);
		} catch {
			await player.deleteQueue(message.guild.id);
			return message.channel.send(`${message.author} I can't join the voice channel... try again ?`);
		}
		let playlists = res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

		await message.channel.send(`Loading your ${playlists ? "playlist" : "track"}... 🎧`);

		if (!queue.playing) await queue.play();
	},
};
