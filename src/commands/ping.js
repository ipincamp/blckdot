/**
 * @name blckdot
 * @license GPL-3.0
 * @version v1.0.0
 * @author ipincamp <support@nur-arifin.my.id>
 */

module.exports = {
	name: "ping",
	cooldown: 10,
	category: ["util"],
	description: "Show the bot's average ping",
	execute(message) {
		return message
			.reply(`Average ping to API: ${Math.round(message.client.ws.ping)} ms`)
			.catch(console.error);
	},
};
