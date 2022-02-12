/**
 * @name blckdot
 * @license GPL-3.0
 * @version v1.0.0
 * @author ipincamp <support@nur-arifin.my.id>
 */

const fs = require("fs");
const { join } = require("path");

module.exports = (client) => {
	const eventFiles = fs.readdirSync(join(__dirname, "../events")).filter((file) => file.endsWith(".js"));

	for (const file of eventFiles) {
		const event = require(join(__dirname, "../events", `${file}`));

		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args));
		} else {
			client.on(event.name, (...args) => event.execute(...args));
		}
	}
	console.info(`Registering ${eventFiles.length} events!`);

	fs.readdir("./src/commands/", (e, f) => {
		if (e) {
			console.error(e);
		} else {
			console.info(`Registering ${f.length} categories!`);
			f.forEach((g) => {
				fs.readdir(`./src/commands/${g}`, (h, i) => {
					console.info(`> ${i.length} commands from ${g}`);
					if (h) {
						console.error(h);
					} else {
						i.forEach((j) => {
							if (!j.endsWith(".js")) return;
							let command = require(`../commands/${g}/${j}`);

							if (command.name === undefined) return;
							client.commands.set(command.name, command);
						});
					}
				});
			});
		}
	});
};
