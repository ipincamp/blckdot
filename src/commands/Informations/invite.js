/**
 * @name blckdot
 * @license GPL-3.0
 * @version v1.0.0
 * @author ipincamp <support@nur-arifin.my.id>
 */

module.exports = {
	name: "invite",
	cooldown: 10,
	description: "Send bot invite link",
	execute(message) {
		return message.member.send(
			`https://discord.com/api/oauth2/authorize?client_id=${message.client.user.id}&permissions=305622086&scope=bot%20applications.commands`,
		).catch((err) => console.error(err));
	},
};
