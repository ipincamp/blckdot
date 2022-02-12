/**
 * @name blckdot
 * @license GPL-3.0
 * @version v1.0.0
 * @author ipincamp <support@nur-arifin.my.id>
 */

const { loop } = require("../../utils/config");

module.exports = {
	name: "trackStart",
	execute(queue, track) {
		if (!loop && queue.repeatMode !== 0) return;
		queue.metadata.send(`Started playing\n\`${track.title}\` in **${queue.connection.channel.name}** 🎧`);
	},
};
