import { AxiosError, AxiosInstance } from 'axios';
import {
	APIMentions,
	APIVideo,
	APIVideoFull,
	APIVideoWithChannel,
	Mention,
	PaginatedChannelVideosData,
	PaginatedVideosData,
	Video,
	VideoFull,
	VideosQuery,
	VideosQueryLiveAndUpcomingParameters,
	VideosRelatedToChannelParameters,
	VideoWithChannel,
} from '../types';

/**
 * @internal
 * Type for the type parameter
 */
type VideoTypes = 'clips' | 'videos' | 'collabs';

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
	 * @private
	 * @internal
	 * @param data - An axios response to map full video's
	 * @returns VideoFull[]
	 * This function maps APIVideoFull to VideoFull
	 */
	// eslint-disable-next-line class-methods-use-this,@typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-explicit-any
	mapVideos(data: any): VideoFull[] {
		return data.map((video: APIVideoFull) => {
			const mapApiVideoWithChannelToVideoWithChannel = (videos: APIVideoWithChannel[]): VideoWithChannel[] => videos.map((vid) => ({
				id: vid.id,
				title: vid.title,
				type: vid.type,
				topicId: vid.topic_id,
				publishedAt: vid.published_at ? new Date(vid.published_at) : undefined,
				availableAt: vid.available_at ? new Date(vid.available_at) : undefined,
				duration: vid.duration,
				status: vid.status,
				startScheduled: vid.start_scheduled ? new Date(vid.start_scheduled) : undefined,
				startActual: vid.start_actual ? new Date(vid.start_actual) : undefined,
				endActual: vid.end_actual ? new Date(vid.end_actual) : undefined,
				liveViewers: vid.live_viewers,
				description: vid.description,
				songCount: vid.songCount,
				channelId: vid.channel_id,
				channel: {
					id: vid.channel.id,
					name: vid.channel.name,
					englishName: vid.channel.english_name,
					type: vid.channel.type,
					photo: vid.channel.photo,
				},
			}));

			const clips = video.clips ? mapApiVideoWithChannelToVideoWithChannel(video.clips) : undefined;
			const sources = video.sources ? mapApiVideoWithChannelToVideoWithChannel(video.sources) : undefined;
			const refers = video.refers ? mapApiVideoWithChannelToVideoWithChannel(video.refers) : undefined;
			const simulcasts = video.simulcasts ? mapApiVideoWithChannelToVideoWithChannel(video.simulcasts) : undefined;

			const mentions: Mention[] | undefined = video.mentions?.map((channel: APIMentions) => ({
				id: channel.id,
				name: channel.name,
				englishName: channel.english_name,
				type: channel.type,
				photo: channel.photo,
				org: channel.org,
			}));

			const final: VideoFull = {
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
				songs: video.songs,
				songCount: video.songCount,
				channelId: video.channel_id,
				channel: video.channel,
				clips,
				sources,
				refers,
				simulcasts,
				mentions,
			};

			return final;
		});
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
			items: this.mapVideos(response.data.items),
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

		return this.mapVideos(response.data);
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
	 * Pretty much everything you need. This is the most 'vanilla' variant with almost no preset values, and /channels/{channelId}/{type} and /live endpoints both use the same query structure but provision default values differently for some of the query params.
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
				include: vidParams?.include,
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

		return this.mapVideos(response.data);
	}

	async getVideosPaginated(vidParams?: VideosQuery): Promise<PaginatedVideosData> {
		const response = await this.axiosInstance.get('/videos', {
			params: {
				channel_id: vidParams?.channelId,
				from: vidParams?.from && vidParams?.from.toISOString(),
				id: vidParams?.id,
				include: vidParams?.include,
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
			items: this.mapVideos(response.data.items) as Video[],
			total: Number.parseInt(response.data.total, 10),
		};
	}

	async getLiveUnpaginated(vidParams?: VideosQueryLiveAndUpcomingParameters): Promise<Video[]> {
		const response = await this.axiosInstance.get('/live', {
			params: {
				channel_id: vidParams?.channelId,
				id: vidParams?.id,
				include: vidParams?.include,
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

		const videoData: Video[] = response.data.videos.map((video: APIVideo) => ({
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
	}

	async getLivePaginated(vidParams?: VideosQueryLiveAndUpcomingParameters): Promise<PaginatedVideosData> {
		const response = await this.axiosInstance.get('/live', {
			params: {
				channel_id: vidParams?.channelId,
				id: vidParams?.id,
				include: vidParams?.include,
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
			items: this.mapVideos(response.data.items) as Video[],
			total: Number.parseInt(response.data.total, 10),
		};
	}

	async getLive(vidParams?: VideosQueryLiveAndUpcomingParameters): Promise<Video[] | PaginatedVideosData> {
		if (vidParams?.paginated === undefined) return this.getLiveUnpaginated(vidParams);
		return this.getLivePaginated(vidParams);
	}
}

export default VideoHandler;
// @ts-expect-error Redefine error
export = VideoHandler;
