/**
 * @name blckdot
 * @license GPL-3.0
 * @version v1.0.0
 * @author ipincamp <support@nur-arifin.my.id>
 */

const player = require("../../utils/handlers");

module.exports = {
	name: "stop",
	aliases: ["dc"],
	description: "Stops the music",
	voiceChannel: true,
	execute(message) {
		const queue = player.getQueue(message.guild.id);

		if (!queue || !queue.playing) return message.channel.send(`${message.author} No music currently playing... try again ?`);

		queue.destroy();

		message.channel.send("Music stopped into this server, see you next time ✅");
	},
};
