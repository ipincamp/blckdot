/**
 * @name blckdot
 * @license GPL-3.0
 * @version v1.0.0
 * @author ipincamp <support@nur-arifin.my.id>
 */

module.exports = {
	name: "error",
	execute(queue, error) {
		console.info(`Error emitted from the queue ${error.message}`);
	},
};
