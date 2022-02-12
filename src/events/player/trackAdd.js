/**
 * @name blckdot
 * @license GPL-3.0
 * @version v1.0.0
 * @author ipincamp <support@nur-arifin.my.id>
 */

module.exports = {
	name: "trackAdd",
	execute(queue, track) {
		queue.metadata.send(`**${track.title}** added in the queue ✅`);
	},
};
