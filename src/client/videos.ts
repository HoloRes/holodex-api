import { AxiosError, AxiosInstance } from 'axios';
import {
	PaginatedChannelVideosData,
	PaginatedVideosData,
	Video,
	VideoFull,
	VideosQuery,
	VideosQueryLiveAndUpcomingParameters,
	VideosRelatedToChannelParameters,
	VideoTypes,
} from '../types';
import mapVideos from '../lib/mapVideos';

class VideoHandler {
	/**
	 * @private
	 * @internal
	 */
	private axiosInstance: AxiosInstance;

	/**
	 * @internal
	 * @param axiosInstance - The new Axios instance
	 */
	constructor(axiosInstance: AxiosInstance) {
		this.axiosInstance = axiosInstance;
	}

	/**
	 * Retrieves a video object.
	 * Also retrieves Comments if query parameter c is set.
	 * Also retrieves Recommendations if query parameter lang is set
	 *
	 * @param videoId - ID of a Youtube Video
	 * @param query - Lang is a comma separated list of language codes to filter channels/clips, official streams do not follow this parameter. If c is true, response will include with all timestamp comments for this video.
	 */
	async getVideo(videoId: string, query?: { lang: string, c: boolean }): Promise<VideoFull> {
		const response = await this.axiosInstance.get(`/videos/${videoId}`, {
			params: {
				lang: query?.lang,
				c: query?.c === true ? '1' : '0',
			},
		}).catch((error: AxiosError) => {
			if (error.response?.status === 400) throw new Error(((error.response.data as any) as any).message);
			else throw error;
		});

		return mapVideos([response.data])[0];
	}

	/**
	 * A simplified endpoint for access channel specific data. If you want more customization, the same result can be obtained by calling the `/videos` endpoint.
	 * https://holodex.stoplight.io/docs/holodex/holodex_v2.yaml/paths/~1channels~1%7BchannelId%7D~1%7Btype%7D/get behaves differently based on whether or not the result is paginated
	 * This is the paginated version
	 * @param channelID - ID of the Youtube Channel that is being queried
	 * @param type - The type of video resource to fetch. Clips finds clip videos of a `vtuber` channel, Video finds the `channelId` channel's uploads, and collabs finds videos uploaded by other channels that mention this `channelId`
	 * @param vidParams - object containing the query parameters for this query
	 */
	async getFromChannelWithTypePaginated(channelID: string, type: VideoTypes, vidParams?: VideosRelatedToChannelParameters): Promise<PaginatedChannelVideosData> {
		const response = await this.axiosInstance.get(`/channels/${channelID}/${type}`, {
			params: {
				include: vidParams?.include,
				lang: vidParams?.lang,
				limit: vidParams?.limit,
				offset: vidParams?.offset,
				paginated: 'true',
			},
		}).catch((error: AxiosError) => {
			if (error.response?.status === 400) throw new Error(((error.response.data as any) as any).message);
			else throw error;
		});

		return {
			total: Number.parseInt(response.data.total, 10),
			items: mapVideos(response.data.items),
		};
	}

	/**
	 * A simplified endpoint for access channel specific data. If you want more customization, the same result can be obtained by calling the `/videos` endpoint.
	 * https://holodex.stoplight.io/docs/holodex/holodex_v2.yaml/paths/~1channels~1%7BchannelId%7D~1%7Btype%7D/get behaves differently based on whether or not the result is paginated
	 * This is the unpaginated version
	 * @param channelID - ID of the Youtube Channel that is being queried
	 * @param type - The type of video resource to fetch. Clips finds clip videos of a `vtuber` channel, Video finds the `channelId` channel's uploads, and collabs finds videos uploaded by other channels that mention this `channelId`
	 * @param vidParams - object containing the query parameters for this query
	 */
	async getFromChannelWithTypeUnpaginated(channelID: string, type: VideoTypes, vidParams?: VideosRelatedToChannelParameters): Promise<VideoFull[]> {
		const response = await this.axiosInstance.get(`/channels/${channelID}/${type}`, {
			params: {
				include: vidParams?.include,
				lang: vidParams?.lang,
				limit: vidParams?.limit,
				offset: vidParams?.offset,
				paginated: undefined,
			},
		}).catch((error: AxiosError) => {
			if (error.response?.status === 400) throw new Error((error.response.data as any).message);
			else throw error;
		});

		return mapVideos(response.data);
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
	async getFromChannelWithType(channelID: string, type: VideoTypes, vidParams?: VideosRelatedToChannelParameters): Promise<VideoFull[] | PaginatedChannelVideosData> {
		if (vidParams?.paginated === true) return this.getFromChannelWithTypePaginated(channelID, type, vidParams);
		return this.getFromChannelWithTypeUnpaginated(channelID, type, vidParams);
	}

	/**
	 * Pretty much everything you need. This is the most 'vanilla' variant with almost no preset values, and /channels/\{channelId\}/\{type\} and /live endpoints both use the same query structure but provision default values differently for some of the query params.
	 * Not as powerful at searching arbitrary text as the Search API (currently not documented/available).
	 *
	 * @param vidParams - object containing the query parameters for this query
	 */
	async getVideosUnpaginated(vidParams?: VideosQuery): Promise<Video[]> {
		const response = await this.axiosInstance.get('/videos', {
			params: {
				channel_id: vidParams?.channelId,
				from: vidParams?.from && vidParams?.from.toISOString(),
				id: vidParams?.id,
				include: vidParams?.include?.join(','),
				lang: vidParams?.lang,
				limit: vidParams?.limit,
				max_upcoming_Hours: vidParams?.maxUpcomingHours,
				mentioned_channel_id: vidParams?.mentionedChannelId,
				offset: vidParams?.offset,
				order: vidParams?.order,
				org: vidParams?.org,
				paginated: undefined,
				sort: vidParams?.sort,
				status: vidParams?.status,
				to: vidParams?.to && vidParams?.to.toISOString(),
				topic: vidParams?.topic,
				type: vidParams?.type,
			},
		}).catch((error: AxiosError) => {
			if (error.response?.status === 400) throw new Error((error.response.data as any).message);
			else throw error;
		});

		return mapVideos(response.data);
	}

	async getVideosPaginated(vidParams?: VideosQuery): Promise<PaginatedVideosData> {
		const response = await this.axiosInstance.get('/videos', {
			params: {
				channel_id: vidParams?.channelId,
				from: vidParams?.from && vidParams?.from.toISOString(),
				id: vidParams?.id,
				include: vidParams?.include?.join(','),
				lang: vidParams?.lang,
				limit: vidParams?.limit,
				max_upcoming_Hours: vidParams?.maxUpcomingHours,
				mentioned_channel_id: vidParams?.mentionedChannelId,
				offset: vidParams?.offset,
				order: vidParams?.order,
				org: vidParams?.org,
				paginated: 'true',
				sort: vidParams?.sort,
				status: vidParams?.status,
				to: vidParams?.to && vidParams?.to.toISOString(),
				topic: vidParams?.topic,
				type: vidParams?.type,
			},
		}).catch((error: AxiosError) => {
			if (error.response?.status === 400) throw new Error((error.response.data as any).message);
			else throw error;
		});

		return {
			items: mapVideos(response.data.items) as Video[],
			total: Number.parseInt(response.data.total, 10),
		};
	}

	async getLiveUnpaginated(vidParams?: VideosQueryLiveAndUpcomingParameters): Promise<Video[]> {
		const response = await this.axiosInstance.get('/live', {
			params: {
				channel_id: vidParams?.channelId,
				id: vidParams?.id,
				include: vidParams?.include?.join(','),
				lang: vidParams?.lang,
				limit: vidParams?.limit,
				max_upcoming_Hours: vidParams?.maxUpcomingHours,
				mentioned_channel_id: vidParams?.mentionedChannelId,
				offset: vidParams?.offset,
				order: vidParams?.order,
				org: vidParams?.org,
				paginated: undefined,
				sort: vidParams?.sort,
				status: vidParams?.status,
				topic: vidParams?.topic,
				type: vidParams?.type,
			},
		}).catch((error: AxiosError) => {
			if (error.response?.status === 400) throw new Error((error.response.data as any).message);
			else throw error;
		});

		return mapVideos(response.data);
	}

	async getLivePaginated(vidParams?: VideosQueryLiveAndUpcomingParameters): Promise<PaginatedVideosData> {
		const response = await this.axiosInstance.get('/live', {
			params: {
				channel_id: vidParams?.channelId,
				id: vidParams?.id,
				include: vidParams?.include?.join(','),
				lang: vidParams?.lang,
				limit: vidParams?.limit,
				max_upcoming_Hours: vidParams?.maxUpcomingHours,
				mentioned_channel_id: vidParams?.mentionedChannelId,
				offset: vidParams?.offset,
				order: vidParams?.order,
				org: vidParams?.org,
				paginated: 'true',
				sort: vidParams?.sort,
				status: vidParams?.status,
				topic: vidParams?.topic,
				type: vidParams?.type,
			},
		}).catch((error: AxiosError) => {
			if (error.response?.status === 400) throw new Error((error.response.data as any).message);
			else throw error;
		});

		return {
			items: mapVideos(response.data.items) as Video[],
			total: Number.parseInt(response.data.total, 10),
		};
	}

	async getLive(vidParams?: VideosQueryLiveAndUpcomingParameters): Promise<Video[] | PaginatedVideosData> {
		if (vidParams?.paginated === false) return this.getLiveUnpaginated(vidParams);
		return this.getLivePaginated(vidParams);
	}

	async getLiveSimple(channels: string[]) {
		const response = await this.axiosInstance.get('/users/live', {
			params: {
				channels: channels.join(','),
			},
		}).catch((error: AxiosError) => {
			if (error.response?.status === 400) throw new Error((error.response.data as any).message);
			else throw error;
		});

		return mapVideos(response.data);
	}
}

export default VideoHandler;
// @ts-expect-error Redefine error
export = VideoHandler;
