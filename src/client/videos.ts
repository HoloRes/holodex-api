import axios, { AxiosError } from 'axios';
import {
	APIVideoFull,
	Settings,
	VideosRelatedToChannelParameters,
	PaginatedVideos,
	VideosQueryLiveAndUpcomingParameters,
} from '../types';

class VideoHandler {
	/**
	 * @private
	 * @internal
	 */
	private url: string;

	/**
	 * @internal
	 * @param settings - Settings for the video handler
	 */
	constructor(settings: Settings = {}) {
		this.url = settings.url ?? 'https://holodex.net/api/v2';
	}

	/**
	 * A simplified endpoint for access channel specific data. If you want more customization, the same result can be obtained by calling the `/videos` endpoint.
	 * https://holodex.stoplight.io/docs/holodex/holodex_v2.yaml/paths/~1channels~1%7BchannelId%7D~1%7Btype%7D/get behaves differently based on whether or not the result is paginated
	 * This is the paginated version
	 * @param channelID - ID of the Youtube Channel that is being queried
	 * @param type - The type of video resource to fetch. Clips finds clip videos of a `vtuber` channel, Video finds the `channelId` channel's uploads, and collabs finds videos uploaded by other channels that mention this `channelId`
	 * @param vidParams - object containing the query parameters for this query
	 */
	async getFromChannelWithTypePaginated(channelID: string, type: string, vidParams: VideosRelatedToChannelParameters) {
		axios.get(`${this.url}/channels/${channelID}/${type}`, {
			params: {
				include: vidParams.include ?? undefined,
				lang: vidParams.lang ?? undefined,
				limit: vidParams.limit ?? undefined,
				offset: vidParams.offset ?? undefined,
				paginated: 'true',
			},
		})
			.then((response) => {
				const videoData: PaginatedVideos = response.data.videos.map((vid: PaginatedVideos) => ({
					total: vid.total,
					videos: vid.videos,
				}));

				return ({
					videos: videoData,
					total: response.data.total,
					count: response.data.count,
				});
			})
			.catch((error: AxiosError) => {
				if (error.response?.status === 400) throw new Error(error.response.data.message);
				else throw error;
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
	async getFromChannelWithTypeUnpaginated(channelID: string, type: string, vidParams: VideosRelatedToChannelParameters) {
		axios.get(`${this.url}/channels/${channelID}/${type}`, {
			params: {
				include: vidParams.include ?? undefined,
				lang: vidParams.lang ?? undefined,
				limit: vidParams.limit ?? undefined,
				offset: vidParams.offset ?? undefined,
				paginated: undefined,
			},
		})
			.then((response) => {
				const videoData: Array<APIVideoFull> = response.data.videos.map((vid: APIVideoFull) => ({
					id: vid.id,
					title: vid.title,
					type: vid.type,
					topic_id: vid.topic_id ?? undefined,
					published_at: vid.published_at ?? undefined,
					available_at: vid.available_at,
					duration: vid.duration,
					status: vid.status,
					start_scheduled: vid.start_scheduled ?? undefined,
					start_actual: vid.start_actual ?? undefined,
					end_actual: vid.end_actual ?? undefined,
					live_viewers: vid.live_viewers ?? undefined,
					description: vid.description,
					songcount: vid.songcount,
					channel_id: vid.channel_id,
					clips: vid.clips ?? undefined,
					sources: vid.sources ?? undefined,
					refers: vid.refers ?? undefined,
					simulcasts: vid.simulcasts ?? undefined,
					mentions: vid.mentions ?? undefined,
					songs: vid.songs ?? undefined,
				}));

				return ({
					videos: videoData,
					total: response.data.total,
					count: response.data.count,
				});
			})
			.catch((error: AxiosError) => {
				if (error.response?.status === 400) throw new Error(error.response.data.message);
				else throw error;
			});
	}

	/**
	 * A simplified endpoint for access channel specific data. If you want more customization, the same result can be obtained by calling the `/videos` endpoint.
	 * https://holodex.stoplight.io/docs/holodex/holodex_v2.yaml/paths/~1channels~1%7BchannelId%7D~1%7Btype%7D/get behaves differently based on whether or not the result is paginated
	 *
	 * This fucnction will call either `getFromChannelWithTypePaginated()` or `getFromChannelWithTypeUnpaginated()`.  These return different objects, so this must be kept in mind.
	 *
	 * @param channelID - ID of the Youtube Channel that is being queried
	 * @param type - The type of video resource to fetch. Clips finds clip videos of a `vtuber` channel, Video finds the `channelId` channel's uploads, and collabs finds videos uploaded by other channels that mention this `channelId`
	 * @param vidParams - object containing the query parameters for this query
	 */
	async getFromChannelWithType(channelID: string, type: string, vidParams: VideosRelatedToChannelParameters) {
		if (vidParams.paginated === undefined) return this.getFromChannelWithTypeUnpaginated(channelID, type, vidParams);
		return this.getFromChannelWithTypePaginated(channelID, type, vidParams);
	}

	async getLiveUnpaginated(vidParams: VideosQueryLiveAndUpcomingParameters) {
		axios.get(`${this.url}/live`, {
			params: {
				channel_id: vidParams.channel_id ?? undefined,
				id: vidParams.id ?? undefined,
				include: vidParams.include ?? undefined,
				lang: vidParams.lang ?? undefined,
				limit: vidParams.limit ?? undefined,
				max_upcoming_Hours: vidParams.max_upcoming_Hours ?? undefined,
				mentioned_channel_id: vidParams.mentioned_channel_id ?? undefined,
				offset: vidParams.offset ?? undefined,
				order: vidParams.order ?? undefined,
				org: vidParams.org ?? undefined,
				paginated: undefined,
				sort: vidParams.sort ?? undefined,
				status: vidParams.status ?? undefined,
				topic: vidParams.topic ?? undefined,
				type: vidParams.type ?? undefined,
			},
		})
			.then((response) => {
				const videoData: Array<APIVideoFull> = response.data.videos.map((vid: APIVideoFull) => ({
					id: vid.id,
					title: vid.title,
					type: vid.type,
					topic_id: vid.topic_id ?? undefined,
					published_at: vid.published_at ?? undefined,
					available_at: vid.available_at,
					duration: vid.duration,
					status: vid.status,
					start_scheduled: vid.start_scheduled ?? undefined,
					start_actual: vid.start_actual ?? undefined,
					end_actual: vid.end_actual ?? undefined,
					live_viewers: vid.live_viewers ?? undefined,
					description: vid.description,
					songcount: vid.songcount,
					channel_id: vid.channel_id,
					clips: vid.clips ?? undefined,
					sources: vid.sources ?? undefined,
					refers: vid.refers ?? undefined,
					simulcasts: vid.simulcasts ?? undefined,
					mentions: vid.mentions ?? undefined,
					songs: vid.songs ?? undefined,
				}));

				return ({
					videos: videoData,
					total: response.data.total,
					count: response.data.count,
				});
			})
			.catch((error: AxiosError) => {
				if (error.response?.status === 400) throw new Error(error.response.data.message);
				else throw error;
			});
	}

	async getLivePaginated(vidParams: VideosQueryLiveAndUpcomingParameters) {
		axios.get(`${this.url}/live`, {
			params: {
				channel_id: vidParams.channel_id ?? undefined,
				id: vidParams.id ?? undefined,
				include: vidParams.include ?? undefined,
				lang: vidParams.lang ?? undefined,
				limit: vidParams.limit ?? undefined,
				max_upcoming_Hours: vidParams.max_upcoming_Hours ?? undefined,
				mentioned_channel_id: vidParams.mentioned_channel_id ?? undefined,
				offset: vidParams.offset ?? undefined,
				order: vidParams.order ?? undefined,
				org: vidParams.org ?? undefined,
				paginated: 'true',
				sort: vidParams.sort ?? undefined,
				status: vidParams.status ?? undefined,
				topic: vidParams.topic ?? undefined,
				type: vidParams.type ?? undefined,
			},
		})
			.then((response) => {
				const videoData: PaginatedVideos = response.data.videos.map((vid: PaginatedVideos) => ({
					total: vid.total,
					videos: vid.videos,
				}));

				return ({
					videos: videoData,
					total: response.data.total,
					count: response.data.count,
				});
			})
			.catch((error: AxiosError) => {
				if (error.response?.status === 400) throw new Error(error.response.data.message);
				else throw error;
			});
	}

	async getLive(vidParams: VideosQueryLiveAndUpcomingParameters) {
		if (vidParams.paginated === undefined) return this.getLiveUnpaginated(vidParams);
		return this.getLivePaginated(vidParams);
	}
}
