/**
 * @name blckdot
 * @license GPL-3.0
 * @version v1.0.0
 * @author ipincamp <support@nur-arifin.my.id>
 */

module.exports = {
	name: "channelEmpty",
	execute(queue) {
		queue.metadata.send("Nobody is in the voice channel, leaving the voice channel... ❌");
	},
};
