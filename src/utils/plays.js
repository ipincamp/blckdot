/**
 * @name blckdot
 * @license GPL-3.0
 * @version v1.0.0
 * @author ipincamp <support@nur-arifin.my.id>
 */

const ytdl = require("ytdl-core-discord");
const { canModify, stayTime } = require("./utils");

module.exports = {
	async plays(song, message) {
		let config;

		try {
			config = require("../config.json");
		} catch (error) {
			config = null;
		}

		const PRUNING = config ? config.pruning : process.env.PRUNING;

		const queue = message.client.queue.get(message.guild.id);

		if (!song) {
			setTimeout(() => {
				if (queue.connection.dispatcher && message.guild.me.voice.channel) return;
				queue.channel.leave();
				!PRUNING && queue.textChannel.send("Leaving voice channel...");
			}, stayTime * 1000);
			!PRUNING && queue.textChannel.send("❌ Music queue ended.").catch(console.error);
			return message.client.queue.delete(message.guild.id);
		}

		let stream = null;
		let streamType = song.url.includes("youtube.com") ? "opus" : "ogg/opus";

		try {
			if (song.url.includes("youtube.com")) {
				stream = await ytdl(song.url, { highWaterMark: 1 << 25 });
			}
		} catch (error) {
			if (queue) {
				queue.songs.shift();
				module.exports.plays(queue.songs[0], message);
			}

			console.error(error);
			return message.channel.send(`Error: ${error.message ? error.message : error}`);
		}

		queue.connection.on("disconnect", () => message.client.queue.delete(message.guild.id));

		const dispatcher = queue.connection
			.play(stream, { type: streamType })
			.on("finish", () => {
				if (collector && !collector.ended) collector.stop();

				queue.connection.removeAllListeners("disconnect");

				if (queue.loop) {
					let lastSong = queue.songs.shift();
					queue.songs.push(lastSong);
					module.exports.plays(queue.songs[0], message);
				} else {
					queue.songs.shift();
					module.exports.plays(queue.songs[0], message);
				}
			})
			.on("error", (err) => {
				console.error(err);
				queue.songs.shift();
				module.exports.plays(queue.songs[0], message);
			});
		dispatcher.setVolumeLogarithmic(queue.volume / 100);

		try {
			var playingMessage = await queue.textChannel.send(
				`🎶 Started playing: **${song.title}** ${song.url}`,
			);
			await playingMessage.react("⏭");
			await playingMessage.react("⏯");
			await playingMessage.react("🔇");
			await playingMessage.react("🔉");
			await playingMessage.react("🔊");
			await playingMessage.react("🔁");
			await playingMessage.react("⏹");
		} catch (error) {
			console.error(error);
		}

		const filter = (reaction, user) => user.id !== message.client.user.id;
		var collector = playingMessage.createReactionCollector(filter, {
			time: song.duration > 0 ? song.duration * 1000 : 600000,
		});

		collector.on("collect", (reaction, user) => {
			if (!queue) return;
			const member = message.guild.member(user);

			switch (reaction.emoji.name) {
			case "⏭":
				queue.playing = true;
				reaction.users.remove(user).catch(console.error);
				if (!canModify(member)) return message.reply("You need to join a voice channel first!");
				queue.connection.dispatcher.end();
				queue.textChannel.send(`<@${user}> ⏩ skipped the song`).catch(console.error);
				collector.stop();
				break;

			case "⏯":
				reaction.users.remove(user).catch(console.error);
				if (!canModify(member)) return message.reply("You need to join a voice channel first!");
				if (queue.playing) {
					queue.playing = !queue.playing;
					queue.connection.dispatcher.pause(true);
					queue.textChannel.send(`<@${user}> ⏸ paused the music.`).catch(console.error);
				} else {
					queue.playing = !queue.playing;
					queue.connection.dispatcher.resume();
					queue.textChannel.send(`<@${user}> ▶ resumed the music.`).catch(console.error);
				}
				break;

			case "🔇":
				reaction.users.remove(user).catch(console.error);
				if (!canModify(member)) return message.reply("You need to join a voice channel first!");
				queue.muted = !queue.muted;
				if (queue.muted) {
					queue.connection.dispatcher.setVolumeLogarithmic(0);
					queue.textChannel.send(`<@${user}> 🔇 muted the music.`).catch(console.error);
				} else {
					queue.connection.dispatcher.setVolumeLogarithmic(queue.volume / 100);
					queue.textChannel.send(`<@${user}> 🔊 unmuted the music.`).catch(console.error);
				}
				break;

			case "🔉":
				reaction.users.remove(user).catch(console.error);
				if (queue.volume == 0) return;
				if (!canModify(member)) return message.reply("You need to join a voice channel first!");
				queue.volume = Math.max(queue.volume - 10, 0);
				queue.connection.dispatcher.setVolumeLogarithmic(queue.volume / 100);
				queue.textChannel
					.send(`<@${user}> 🔉 decreased the volume, the volume is now ${queue.volume}%`)
					.catch(console.error);
				break;

			case "🔊":
				reaction.users.remove(user).catch(console.error);
				if (queue.volume == 100) return;
				if (!canModify(member)) return message.reply("You need to join a voice channel first!");
				queue.volume = Math.min(queue.volume + 10, 100);
				queue.connection.dispatcher.setVolumeLogarithmic(queue.volume / 100);
				queue.textChannel
					.send(`<@${user}> 🔊 increased the volume, the volume is now ${queue.volume}%`)
					.catch(console.error);
				break;

			case "🔁":
				reaction.users.remove(user).catch(console.error);
				if (!canModify(member)) return message.reply("You need to join a voice channel first!");
				queue.loop = !queue.loop;
				queue.textChannel
					.send(
						`<@${user}> Loop is now ${queue.loop ? "**On**" : "**Off**"}`,
					)
					.catch(console.error);
				break;

			case "⏹":
				reaction.users.remove(user).catch(console.error);
				if (!canModify(member)) return message.reply("You need to join a voice channel first!");
				queue.songs = [];
				queue.textChannel.send(`<@${user}> ⏹ stopped the music.`).catch(console.error);
				try {
					queue.connection.dispatcher.end();
				} catch (error) {
					console.error(error);
					queue.connection.disconnect();
				}
				collector.stop();
				break;

			default:
				reaction.users.remove(user).catch(console.error);
				break;
			}
		});

		collector.on("end", () => {
			playingMessage.reactions.removeAll().catch(console.error);
			if (PRUNING && playingMessage && !playingMessage.deleted) {
				playingMessage.delete({ timeout: 3000 }).catch(console.error);
			}
		});
	},
};
