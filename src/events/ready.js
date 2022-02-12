/**
 * @name blckdot
 * @license GPL-3.0
 * @version v1.0.0
 * @author ipincamp <support@nur-arifin.my.id>
 */

module.exports = {
	name: "ready",
	once: true,
	execute(client) {
		const arrayPresence = [
			`${client.prefix}help`,
			"Spotify",
			"YouTube",
		];

		setInterval(() => {
			const index = Math.floor(Math.random() * (arrayPresence.length - 1) + 1);

			client.user.setActivity(arrayPresence[index], { type: "LISTENING" });
			client.user.setStatus("idle");
		}, 10000);

		console.info(`${client.user.tag} ready!`);
	},
};
