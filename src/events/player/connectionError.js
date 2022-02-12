/**
 * @name blckdot
 * @license GPL-3.0
 * @version v1.0.0
 * @author ipincamp <support@nur-arifin.my.id>
 */

module.exports = {
	name: "connectionError",
	execute(queue, error) {
		console.log(`Error emitted from the connection ${error.message}`);
	},
};
