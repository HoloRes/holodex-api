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
class SearchHandler {
    /**
     * @internal
     * @param axiosInstance - The new Axios instance
     */
    constructor(axiosInstance) {
        this.axiosInstance = axiosInstance;
    }
    /**
     * Flexible endpoint to search for videos fufilling multiple conditions. Descriptions with "any" implies an OR condition, and "all" implies a AND condition.
     * Searching for topics and clips is not supported, because clips do not contain topic_ids
     *
     * @param searchParams - object containing the query to search for
     */
    searchVideosUnpaginated(searchParams) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.axiosInstance.post('/search/videoSearch', {
                sort: searchParams.sort,
                lang: searchParams.lang,
                target: searchParams.target,
                conditions: searchParams.conditions,
                topic: searchParams.topic,
                vch: searchParams.channels,
                org: searchParams.org,
                offset: (_a = searchParams.offset) !== null && _a !== void 0 ? _a : 0,
                limit: (_b = searchParams.limit) !== null && _b !== void 0 ? _b : 25,
                paginated: false,
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
     * @param searchParams - object containing the query to search for
     */
    searchVideosPaginated(searchParams) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.axiosInstance.post('/search/videoSearch', {
                sort: searchParams.sort,
                lang: searchParams.lang,
                target: searchParams.target,
                conditions: searchParams.conditions,
                topic: searchParams.topic,
                vch: searchParams.channels,
                org: searchParams.org,
                offset: (_a = searchParams.offset) !== null && _a !== void 0 ? _a : 0,
                limit: (_b = searchParams.limit) !== null && _b !== void 0 ? _b : 25,
                paginated: true,
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
    /**
     * @param searchParams - object containing the query to search for
     */
    searchVideos(searchParams) {
        return __awaiter(this, void 0, void 0, function* () {
            if (searchParams.paginated === false)
                return this.searchVideosUnpaginated(searchParams);
            return this.searchVideosPaginated(searchParams);
        });
    }
    /**
     * Flexible endpoint to search for comments in videos fufilling multiple conditions. Descriptions with "any" implies an OR condition, and "all" implies a AND condition.
     *
     * @param searchParams - object containing the query to search for
     */
    searchCommentsUnpaginated(searchParams) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.axiosInstance.post('/search/commentSearch', {
                sort: searchParams.sort,
                lang: searchParams.lang,
                target: searchParams.target,
                comment: searchParams.comment,
                topic: searchParams.topic,
                vch: searchParams.channels,
                org: searchParams.org,
                offset: (_a = searchParams.offset) !== null && _a !== void 0 ? _a : 0,
                limit: (_b = searchParams.limit) !== null && _b !== void 0 ? _b : 25,
                paginated: false,
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
     * @param searchParams - object containing the query to search for
     */
    searchCommentsPaginated(searchParams) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.axiosInstance.post('/search/videoSearch', {
                sort: searchParams.sort,
                lang: searchParams.lang,
                target: searchParams.target,
                comment: searchParams.comment,
                topic: searchParams.topic,
                vch: searchParams.channels,
                org: searchParams.org,
                offset: (_a = searchParams.offset) !== null && _a !== void 0 ? _a : 0,
                limit: (_b = searchParams.limit) !== null && _b !== void 0 ? _b : 25,
                paginated: true,
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
    /**
     * @param searchParams - object containing the query to search for
     */
    searchComments(searchParams) {
        return __awaiter(this, void 0, void 0, function* () {
            if (searchParams.paginated === false)
                return this.searchCommentsUnpaginated(searchParams);
            return this.searchCommentsPaginated(searchParams);
        });
    }
    /**
     * @experimental As of 1.1.0
     * Query the autocomplete API of Holodex, do not use unless absolutely necessary.
     * This is an undocumented endpoint and may change or stop working at any time.
     *
     * @param query - What to search for
     * @param filter - Filter out to a specific type
     */
    autocomplete(query, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.axiosInstance.get('/search/autocomplete', {
                params: {
                    q: query,
                },
            }).catch((error) => {
                var _a;
                if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 400)
                    throw new Error(error.response.data.message);
                else
                    throw error;
            });
            if (filter)
                return response.data.filter((item) => item.type === filter);
            return response.data;
        });
    }
}
exports.default = SearchHandler;
module.exports = SearchHandler;
