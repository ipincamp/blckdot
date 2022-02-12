/**
 * @name blckdot
 * @license GPL-3.0
 * @version v1.0.0
 * @author ipincamp <support@nur-arifin.my.id>
 */

module.exports = {
	name: "queueEnd",
	execute(queue) {
		queue.metadata.send("I finished reading the whole queue ✅");
	},
};
