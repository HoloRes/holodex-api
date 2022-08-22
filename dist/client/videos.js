"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mapVideos_1 = __importDefault(require("../lib/mapVideos"));
class VideoHandler {
    /**
     * @internal
     * @param axiosInstance - The new Axios instance
     */
    constructor(axiosInstance) {
        this.axiosInstance = axiosInstance;
    }
    /**
     * A simplified endpoint for access channel specific data. If you want more customization, the same result can be obtained by calling the `/videos` endpoint.
     * https://holodex.stoplight.io/docs/holodex/holodex_v2.yaml/paths/~1channels~1%7BchannelId%7D~1%7Btype%7D/get behaves differently based on whether or not the result is paginated
     * This is the paginated version
     * @param channelID - ID of the Youtube Channel that is being queried
     * @param type - The type of video resource to fetch. Clips finds clip videos of a `vtuber` channel, Video finds the `channelId` channel's uploads, and collabs finds videos uploaded by other channels that mention this `channelId`
     * @param vidParams - object containing the query parameters for this query
     */
    getFromChannelWithTypePaginated(channelID, type, vidParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.axiosInstance.get(`/channels/${channelID}/${type}`, {
                params: {
                    include: vidParams === null || vidParams === void 0 ? void 0 : vidParams.include,
                    lang: vidParams === null || vidParams === void 0 ? void 0 : vidParams.lang,
                    limit: vidParams === null || vidParams === void 0 ? void 0 : vidParams.limit,
                    offset: vidParams === null || vidParams === void 0 ? void 0 : vidParams.offset,
                    paginated: 'true',
                },
            }).catch((error) => {
                var _a;
                if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 400)
                    throw new Error(error.response.data.message);
                else
                    throw error;
            });
            return {
                total: Number.parseInt(response.data.total, 10),
                items: (0, mapVideos_1.default)(response.data.items),
            };
        });
    }
    /**
     * A simplified endpoint for access channel specific data. If you want more customization, the same result can be obtained by calling the `/videos` endpoint.
     * https://holodex.stoplight.io/docs/holodex/holodex_v2.yaml/paths/~1channels~1%7BchannelId%7D~1%7Btype%7D/get behaves differently based on whether or not the result is paginated
     * This is the unpaginated version
     * @param channelID - ID of the Youtube Channel that is being queried
     * @param type - The type of video resource to fetch. Clips finds clip videos of a `vtuber` channel, Video finds the `channelId` channel's uploads, and collabs finds videos uploaded by other channels that mention this `channelId`
     * @param vidParams - object containing the query parameters for this query
     */
    getFromChannelWithTypeUnpaginated(channelID, type, vidParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.axiosInstance.get(`/channels/${channelID}/${type}`, {
                params: {
                    include: vidParams === null || vidParams === void 0 ? void 0 : vidParams.include,
                    lang: vidParams === null || vidParams === void 0 ? void 0 : vidParams.lang,
                    limit: vidParams === null || vidParams === void 0 ? void 0 : vidParams.limit,
                    offset: vidParams === null || vidParams === void 0 ? void 0 : vidParams.offset,
                    paginated: undefined,
                },
            }).catch((error) => {
                var _a;
                if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 400)
                    throw new Error(error.response.data.message);
                else
                    throw error;
            });
            return (0, mapVideos_1.default)(response.data);
        });
    }
    /**
     * A simplified endpoint for access channel specific data. If you want more customization, the same result can be obtained by calling the `/videos` endpoint.
     * https://holodex.stoplight.io/docs/holodex/holodex_v2.yaml/paths/~1channels~1%7BchannelId%7D~1%7Btype%7D/get behaves differently based on whether or not the result is paginated
     *
     * This function will call either `getFromChannelWithTypePaginated()` or `getFromChannelWithTypeUnpaginated()`.  These return different objects, so this must be kept in mind.
     *
     * @param channelID - ID of the Youtube Channel that is being queried
     * @param type - The type of video resource to fetch. Clips finds clip videos of a `vtuber` channel, Video finds the `channelId` channel's uploads, and collabs finds videos uploaded by other channels that mention this `channelId`
     * @param vidParams - object containing the query parameters for this query
     */
    getFromChannelWithType(channelID, type, vidParams) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((vidParams === null || vidParams === void 0 ? void 0 : vidParams.paginated) === true)
                return this.getFromChannelWithTypePaginated(channelID, type, vidParams);
            return this.getFromChannelWithTypeUnpaginated(channelID, type, vidParams);
        });
    }
    /**
     * Pretty much everything you need. This is the most 'vanilla' variant with almost no preset values, and /channels/\{channelId\}/\{type\} and /live endpoints both use the same query structure but provision default values differently for some of the query params.
     * Not as powerful at searching arbitrary text as the Search API (currently not documented/available).
     *
     * @param vidParams - object containing the query parameters for this query
     */
    getVideosUnpaginated(vidParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.axiosInstance.get('/videos', {
                params: {
                    channel_id: vidParams === null || vidParams === void 0 ? void 0 : vidParams.channelId,
                    from: (vidParams === null || vidParams === void 0 ? void 0 : vidParams.from) && (vidParams === null || vidParams === void 0 ? void 0 : vidParams.from.toISOString()),
                    id: vidParams === null || vidParams === void 0 ? void 0 : vidParams.id,
                    include: vidParams === null || vidParams === void 0 ? void 0 : vidParams.include,
                    lang: vidParams === null || vidParams === void 0 ? void 0 : vidParams.lang,
                    limit: vidParams === null || vidParams === void 0 ? void 0 : vidParams.limit,
                    max_upcoming_Hours: vidParams === null || vidParams === void 0 ? void 0 : vidParams.maxUpcomingHours,
                    mentioned_channel_id: vidParams === null || vidParams === void 0 ? void 0 : vidParams.mentionedChannelId,
                    offset: vidParams === null || vidParams === void 0 ? void 0 : vidParams.offset,
                    order: vidParams === null || vidParams === void 0 ? void 0 : vidParams.order,
                    org: vidParams === null || vidParams === void 0 ? void 0 : vidParams.org,
                    paginated: undefined,
                    sort: vidParams === null || vidParams === void 0 ? void 0 : vidParams.sort,
                    status: vidParams === null || vidParams === void 0 ? void 0 : vidParams.status,
                    to: (vidParams === null || vidParams === void 0 ? void 0 : vidParams.to) && (vidParams === null || vidParams === void 0 ? void 0 : vidParams.to.toISOString()),
                    topic: vidParams === null || vidParams === void 0 ? void 0 : vidParams.topic,
                    type: vidParams === null || vidParams === void 0 ? void 0 : vidParams.type,
                },
            }).catch((error) => {
                var _a;
                if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 400)
                    throw new Error(error.response.data.message);
                else
                    throw error;
            });
            return (0, mapVideos_1.default)(response.data);
        });
    }
    getVideosPaginated(vidParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.axiosInstance.get('/videos', {
                params: {
                    channel_id: vidParams === null || vidParams === void 0 ? void 0 : vidParams.channelId,
                    from: (vidParams === null || vidParams === void 0 ? void 0 : vidParams.from) && (vidParams === null || vidParams === void 0 ? void 0 : vidParams.from.toISOString()),
                    id: vidParams === null || vidParams === void 0 ? void 0 : vidParams.id,
                    include: vidParams === null || vidParams === void 0 ? void 0 : vidParams.include,
                    lang: vidParams === null || vidParams === void 0 ? void 0 : vidParams.lang,
                    limit: vidParams === null || vidParams === void 0 ? void 0 : vidParams.limit,
                    max_upcoming_Hours: vidParams === null || vidParams === void 0 ? void 0 : vidParams.maxUpcomingHours,
                    mentioned_channel_id: vidParams === null || vidParams === void 0 ? void 0 : vidParams.mentionedChannelId,
                    offset: vidParams === null || vidParams === void 0 ? void 0 : vidParams.offset,
                    order: vidParams === null || vidParams === void 0 ? void 0 : vidParams.order,
                    org: vidParams === null || vidParams === void 0 ? void 0 : vidParams.org,
                    paginated: 'true',
                    sort: vidParams === null || vidParams === void 0 ? void 0 : vidParams.sort,
                    status: vidParams === null || vidParams === void 0 ? void 0 : vidParams.status,
                    to: (vidParams === null || vidParams === void 0 ? void 0 : vidParams.to) && (vidParams === null || vidParams === void 0 ? void 0 : vidParams.to.toISOString()),
                    topic: vidParams === null || vidParams === void 0 ? void 0 : vidParams.topic,
                    type: vidParams === null || vidParams === void 0 ? void 0 : vidParams.type,
                },
            }).catch((error) => {
                var _a;
                if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 400)
                    throw new Error(error.response.data.message);
                else
                    throw error;
            });
            return {
                items: (0, mapVideos_1.default)(response.data.items),
                total: Number.parseInt(response.data.total, 10),
            };
        });
    }
    getLiveUnpaginated(vidParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.axiosInstance.get('/live', {
                params: {
                    channel_id: vidParams === null || vidParams === void 0 ? void 0 : vidParams.channelId,
                    id: vidParams === null || vidParams === void 0 ? void 0 : vidParams.id,
                    include: vidParams === null || vidParams === void 0 ? void 0 : vidParams.include,
                    lang: vidParams === null || vidParams === void 0 ? void 0 : vidParams.lang,
                    limit: vidParams === null || vidParams === void 0 ? void 0 : vidParams.limit,
                    max_upcoming_Hours: vidParams === null || vidParams === void 0 ? void 0 : vidParams.maxUpcomingHours,
                    mentioned_channel_id: vidParams === null || vidParams === void 0 ? void 0 : vidParams.mentionedChannelId,
                    offset: vidParams === null || vidParams === void 0 ? void 0 : vidParams.offset,
                    order: vidParams === null || vidParams === void 0 ? void 0 : vidParams.order,
                    org: vidParams === null || vidParams === void 0 ? void 0 : vidParams.org,
                    paginated: undefined,
                    sort: vidParams === null || vidParams === void 0 ? void 0 : vidParams.sort,
                    status: vidParams === null || vidParams === void 0 ? void 0 : vidParams.status,
                    topic: vidParams === null || vidParams === void 0 ? void 0 : vidParams.topic,
                    type: vidParams === null || vidParams === void 0 ? void 0 : vidParams.type,
                },
            }).catch((error) => {
                var _a;
                if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 400)
                    throw new Error(error.response.data.message);
                else
                    throw error;
            });
            const videoData = response.data.videos.map((video) => ({
                id: video.id,
                title: video.title,
                type: video.type,
                topicId: video.topic_id,
                publishedAt: video.published_at ? new Date(video.published_at) : undefined,
                availableAt: video.available_at ? new Date(video.available_at) : undefined,
                duration: video.duration,
                status: video.status,
                startScheduled: video.start_scheduled ? new Date(video.start_scheduled) : undefined,
                startActual: video.start_actual ? new Date(video.start_actual) : undefined,
                endActual: video.end_actual ? new Date(video.end_actual) : undefined,
                liveViewers: video.live_viewers,
                description: video.description,
                songcount: video.songCount,
                channelId: video.channel_id,
            }));
            return videoData;
        });
    }
    getLivePaginated(vidParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.axiosInstance.get('/live', {
                params: {
                    channel_id: vidParams === null || vidParams === void 0 ? void 0 : vidParams.channelId,
                    id: vidParams === null || vidParams === void 0 ? void 0 : vidParams.id,
                    include: vidParams === null || vidParams === void 0 ? void 0 : vidParams.include,
                    lang: vidParams === null || vidParams === void 0 ? void 0 : vidParams.lang,
                    limit: vidParams === null || vidParams === void 0 ? void 0 : vidParams.limit,
                    max_upcoming_Hours: vidParams === null || vidParams === void 0 ? void 0 : vidParams.maxUpcomingHours,
                    mentioned_channel_id: vidParams === null || vidParams === void 0 ? void 0 : vidParams.mentionedChannelId,
                    offset: vidParams === null || vidParams === void 0 ? void 0 : vidParams.offset,
                    order: vidParams === null || vidParams === void 0 ? void 0 : vidParams.order,
                    org: vidParams === null || vidParams === void 0 ? void 0 : vidParams.org,
                    paginated: 'true',
                    sort: vidParams === null || vidParams === void 0 ? void 0 : vidParams.sort,
                    status: vidParams === null || vidParams === void 0 ? void 0 : vidParams.status,
                    topic: vidParams === null || vidParams === void 0 ? void 0 : vidParams.topic,
                    type: vidParams === null || vidParams === void 0 ? void 0 : vidParams.type,
                },
            }).catch((error) => {
                var _a;
                if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 400)
                    throw new Error(error.response.data.message);
                else
                    throw error;
            });
            return {
                items: (0, mapVideos_1.default)(response.data.items),
                total: Number.parseInt(response.data.total, 10),
            };
        });
    }
    getLive(vidParams) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((vidParams === null || vidParams === void 0 ? void 0 : vidParams.paginated) === false)
                return this.getLiveUnpaginated(vidParams);
            return this.getLivePaginated(vidParams);
        });
    }
}
exports.default = VideoHandler;
module.exports = VideoHandler;
