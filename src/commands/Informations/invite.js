/**
 * @name blckdot
 * @license GPL-3.0
 * @version v1.0.0
 * @author ipincamp <support@nur-arifin.my.id>
 */

const client = require("../../..");

module.exports = {
	name: "invite",
	cooldown: 10,
	description: "Send bot invite link",
	execute(message) {
		const link = client.generateInvite({
			scopes: ["bot", "applications.commands"],
			permissions: [
				"ADD_REACTIONS",
				"CONNECT",
				"EMBED_LINKS",
				"MANAGE_MESSAGES",
				"SPEAK",
				"STREAM",
				"SEND_MESSAGES",
				"VIEW_CHANNEL",
			],
		});
		return message.member.send(link).catch((err) => console.error(err));
	},
};
