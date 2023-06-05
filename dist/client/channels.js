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
/**
 * Handles all endpoints related to channels
 */
class ChannelHandler {
    /**
     * @internal
     * @param axiosInstance - The new Axios instance
     */
    constructor(axiosInstance) {
        this.axiosInstance = axiosInstance;
    }
    /**
     * Lists channels according to the given search term.
     * Endpoint: https://holodex.stoplight.io/docs/holodex/holodex_v2.yaml/paths/~1channels/get
     *
     * @param LCParams - Parameters for narrowing the search
     */
    list(LCParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.axiosInstance.get('/channels', {
                params: {
                    lang: LCParams === null || LCParams === void 0 ? void 0 : LCParams.lang,
                    limit: LCParams === null || LCParams === void 0 ? void 0 : LCParams.limit,
                    offset: LCParams === null || LCParams === void 0 ? void 0 : LCParams.offset,
                    order: LCParams === null || LCParams === void 0 ? void 0 : LCParams.order,
                    org: LCParams === null || LCParams === void 0 ? void 0 : LCParams.org,
                    sort: LCParams === null || LCParams === void 0 ? void 0 : LCParams.sort,
                    type: LCParams === null || LCParams === void 0 ? void 0 : LCParams.type,
                },
            }).catch((error) => {
                var _a;
                if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 400)
                    throw new Error(error.response.data.message);
                else
                    throw error;
            });
            return response.data.map((ch) => {
                var _a, _b, _c, _d, _e, _f, _g;
                return ({
                    id: ch.id,
                    name: ch.name,
                    englishName: (_a = ch.english_name) !== null && _a !== void 0 ? _a : undefined,
                    type: ch.type,
                    photo: (_b = ch.photo) !== null && _b !== void 0 ? _b : undefined,
                    org: (_c = ch.org) !== null && _c !== void 0 ? _c : undefined,
                    subOrg: (_d = ch.suborg) !== null && _d !== void 0 ? _d : undefined,
                    banner: (_e = ch.banner) !== null && _e !== void 0 ? _e : undefined,
                    twitter: (_f = ch.twitter) !== null && _f !== void 0 ? _f : undefined,
                    videoCount: ch.video_count ? Number.parseInt(ch.video_count, 10) : undefined,
                    subscriberCount: ch.subscriber_count ? Number.parseInt(ch.subscriber_count, 10) : undefined,
                    viewCount: ch.view_count ? Number.parseInt(ch.view_count, 10) : undefined,
                    clipCount: ch.clip_count ? Number.parseInt(ch.clip_count, 10) : undefined,
                    lang: (_g = ch.lang) !== null && _g !== void 0 ? _g : undefined,
                    publishedAt: new Date(ch.published_at),
                    inactive: ch.inactive,
                    description: ch.description,
                });
            });
        });
    }
    /**
     * Gets a specific channel's basic information
     * @param channelID - ID of the Youtube Channel that is being queried
     */
    getInfo(channelID) {
        var _a, _b, _c, _d, _e, _f, _g;
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.axiosInstance.get(`/channels/${channelID}`)
                .catch((error) => {
                var _a;
                if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 400)
                    throw new Error(error.response.data.message);
                else
                    throw error;
            });
            return {
                id: response.data.id,
                name: response.data.name,
                englishName: (_a = response.data.english_name) !== null && _a !== void 0 ? _a : undefined,
                type: response.data.type,
                photo: (_b = response.data.photo) !== null && _b !== void 0 ? _b : undefined,
                org: (_c = response.data.org) !== null && _c !== void 0 ? _c : undefined,
                subOrg: (_d = response.data.suborg) !== null && _d !== void 0 ? _d : undefined,
                banner: (_e = response.data.banner) !== null && _e !== void 0 ? _e : undefined,
                twitter: (_f = response.data.twitter) !== null && _f !== void 0 ? _f : undefined,
                videoCount: response.data.video_count ? Number.parseInt(response.data.video_count, 10) : undefined,
                subscriberCount: response.data.subscriber_count ? Number.parseInt(response.data.subscriber_count, 10) : undefined,
                viewCount: response.data.view_count ? Number.parseInt(response.data.view_count, 10) : undefined,
                clipCount: response.data.clip_count ? Number.parseInt(response.data.clip_count, 10) : undefined,
                lang: (_g = response.data.lang) !== null && _g !== void 0 ? _g : undefined,
                publishedAt: new Date(response.data.published_at),
                inactive: response.data.inactive,
                description: response.data.description,
            };
        });
    }
}
exports.default = ChannelHandler;
module.exports = ChannelHandler;
