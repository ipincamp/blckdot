/**
 * @name blckdot
 * @license GPL-3.0
 * @version v1.0.0
 * @author ipincamp <support@nur-arifin.my.id>
 */

const player = require("../../utils/handlers");

module.exports = {
	name: "skip",
	aliases: ["sk"],
	cooldown: 3,
	description: "Skip the currently playing song",
	voiceChannel: true,
	execute(message) {
		const queue = player.getQueue(message.guild.id);

		if (!queue || !queue.playing) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

		const success = queue.skip();

		return message.channel.send(success ? `Current music ${queue.current.title} skipped ✅` : `Something went wrong ${message.author}... try again ? ❌`);
	},
};
