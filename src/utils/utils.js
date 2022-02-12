/**
 * @name blckdot
 * @license GPL-3.0
 * @version v1.0.0
 * @author ipincamp <support@nur-arifin.my.id>
 */

let config;

try {
	config = require("../config.json");
} catch (error) {
	config = null;
}

exports.canModify = (member) => member.voice.channelId === member.guild.voice.channelID;
exports.defaultVolume = config ? config.defaultVolume : process.env.DEFAULT_VOLUME || 100;
exports.dev = config ? config.dev : process.env.DEV;
exports.playlistSize = config ? config.playlistSize : process.env.PLAYLIST_SIZE || 10;
exports.prefix = config ? config.prefix : process.env.PREFIX || "p";
exports.pruning = config ? config.pruning : process.env.PRUNING;
exports.stayTime = config ? config.stayTime : process.env.STAY_TIME;
exports.token = config ? config.token : process.env.TOKEN;
exports.youtubeAPI = config ? config.youtubeAPI : process.env.YOUTUBE_API;
