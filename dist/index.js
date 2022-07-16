"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.ChannelHandler = exports.VideoHandler = exports.HolodexApiClient = void 0;
const axios_1 = __importDefault(require("axios"));
const videos_1 = __importDefault(require("./client/videos"));
const channels_1 = __importDefault(require("./client/channels"));
class HolodexApiClient {
    constructor(settings) {
        var _a;
        this.url = (_a = settings.url) !== null && _a !== void 0 ? _a : 'https://holodex.net/api/v2';
        this.axiosInstance = axios_1.default.create({
            baseURL: this.url,
            headers: {
                'X-APIKEY': settings.apiKey,
            },
        });
        this.videos = new videos_1.default(this.axiosInstance);
        this.channels = new channels_1.default(this.axiosInstance);
    }
}
module.exports = HolodexApiClient;
