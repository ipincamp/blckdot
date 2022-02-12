/**
 * @name blckdot
 * @license GPL-3.0
 * @version v1.0.0
 * @author ipincamp <support@nur-arifin.my.id>
 */

module.exports = {
	name: "botDisconnect",
	execute(queue) {
		queue.metadata.send("I was manually disconnected from the voice channel, clearing queue... ❌");
	},
};
