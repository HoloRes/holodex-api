import axios, { AxiosError } from 'axios';
import {
	APIVideoFull,
	Settings,
	VideosRelatedToChannelParameters,
	VideosQueryLiveAndUpcomingParameters,
	PaginatedChannelVideosData,
	VideoFull,
	VideoWithChannel,
	APIVideoWithChannel,
	APIMentions,
	Mention,
	Video,
	APIVideo,
	PaginatedLiveVideosData,
} from '../types';

/**
 * @internal
 * Type for the type parameter
 */
type VideoTypes = 'clips'|'videos'|'collabs';

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
				topicId: vid.topic_id ?? undefined,
				publishedAt: vid.published_at ? new Date(vid.published_at) : undefined,
				availableAt: vid.available_at ? new Date(vid.available_at) : undefined,
				duration: vid.duration,
				status: vid.status,
				startScheduled: vid.start_scheduled ? new Date(vid.start_scheduled) : undefined,
				startActual: vid.start_actual ? new Date(vid.start_actual) : undefined,
				endActual: vid.end_actual ? new Date(vid.end_actual) : undefined,
				liveViewers: vid.live_viewers ?? undefined,
				description: vid.description,
				songcount: vid.songcount,
				channelId: vid.channel_id,
				channel: {
					id: vid.channel.id,
					name: vid.channel.name,
					englishName: vid.channel.english_name ?? undefined,
					type: vid.channel.type,
					photo: vid.channel.photo ?? undefined,
				},
			}));

			const clips = video.clips ? mapApiVideoWithChannelToVideoWithChannel(video.clips) : undefined;
			const sources = video.sources ? mapApiVideoWithChannelToVideoWithChannel(video.sources) : undefined;
			const refers = video.refers ? mapApiVideoWithChannelToVideoWithChannel(video.refers) : undefined;
			const simulcasts = video.simulcasts ? mapApiVideoWithChannelToVideoWithChannel(video.simulcasts) : undefined;

			const mentions: Mention[]|undefined = video.mentions?.map((channel: APIMentions) => ({
				id: channel.id,
				name: channel.name,
				englishName: channel.english_name ?? undefined,
				type: channel.type,
				photo: channel.photo ?? undefined,
				org: channel.org ?? undefined,
			}));

			const final: VideoFull = {
				id: video.id,
				title: video.title,
				type: video.type,
				topicId: video.topic_id ?? undefined,
				publishedAt: video.published_at ? new Date(video.published_at) : undefined,
				availableAt: video.available_at ? new Date(video.available_at) : undefined,
				duration: video.duration,
				status: video.status,
				startScheduled: video.start_scheduled ? new Date(video.start_scheduled) : undefined,
				startActual: video.start_actual ? new Date(video.start_actual) : undefined,
				endActual: video.end_actual ? new Date(video.end_actual) : undefined,
				liveViewers: video.live_viewers ?? undefined,
				description: video.description,
				songs: video.songs ?? undefined,
				songcount: video.songcount ?? undefined,
				channelId: video.channel_id,
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
	async getFromChannelWithTypePaginated(channelID: string, type: VideoTypes, vidParams: VideosRelatedToChannelParameters): Promise<PaginatedChannelVideosData> {
		const response = await axios.get(`${this.url}/channels/${channelID}/${type}`, {
			params: {
				include: vidParams.include ?? undefined,
				lang: vidParams.lang ?? undefined,
				limit: vidParams.limit ?? undefined,
				offset: vidParams.offset ?? undefined,
				paginated: 'true',
			},
		}).catch((error: AxiosError) => {
			if (error.response?.status === 400) throw new Error(error.response.data.message);
			else throw error;
		});

		return {
			total: response.data.total,
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
	async getFromChannelWithTypeUnpaginated(channelID: string, type: VideoTypes, vidParams: VideosRelatedToChannelParameters): Promise<VideoFull[]> {
		const response = await axios.get(`${this.url}/channels/${channelID}/${type}`, {
			params: {
				include: vidParams.include ?? undefined,
				lang: vidParams.lang ?? undefined,
				limit: vidParams.limit ?? undefined,
				offset: vidParams.offset ?? undefined,
				paginated: undefined,
			},
		}).catch((error: AxiosError) => {
			if (error.response?.status === 400) throw new Error(error.response.data.message);
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
	async getFromChannelWithType(channelID: string, type: VideoTypes, vidParams: VideosRelatedToChannelParameters): Promise<VideoFull[]|PaginatedChannelVideosData> {
		if (vidParams.paginated === true) return this.getFromChannelWithTypePaginated(channelID, type, vidParams);
		return this.getFromChannelWithTypeUnpaginated(channelID, type, vidParams);
	}

	async getLiveUnpaginated(vidParams: VideosQueryLiveAndUpcomingParameters): Promise<Video[]> {
		const response = await axios.get(`${this.url}/live`, {
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
		}).catch((error: AxiosError) => {
			if (error.response?.status === 400) throw new Error(error.response.data.message);
			else throw error;
		});

		const videoData: Video[] = response.data.videos.map((video: APIVideo) => ({
			id: video.id,
			title: video.title,
			type: video.type,
			topicId: video.topic_id ?? undefined,
			publishedAt: video.published_at ? new Date(video.published_at) : undefined,
			availableAt: video.available_at ? new Date(video.available_at) : undefined,
			duration: video.duration,
			status: video.status,
			startScheduled: video.start_scheduled ? new Date(video.start_scheduled) : undefined,
			startActual: video.start_actual ? new Date(video.start_actual) : undefined,
			endActual: video.end_actual ? new Date(video.end_actual) : undefined,
			liveViewers: video.live_viewers ?? undefined,
			description: video.description,
			songcount: video.songcount ?? undefined,
			channelId: video.channel_id,
		}));

		return videoData;
	}

	async getLivePaginated(vidParams: VideosQueryLiveAndUpcomingParameters): Promise<PaginatedLiveVideosData> {
		const response = await axios.get(`${this.url}/live`, {
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
		}).catch((error: AxiosError) => {
			if (error.response?.status === 400) throw new Error(error.response.data.message);
			else throw error;
		});

		return {
			items: this.mapVideos(response.data) as Video[],
			total: response.data.total,
		};
	}

	async getLive(vidParams: VideosQueryLiveAndUpcomingParameters): Promise<Video[]|PaginatedLiveVideosData> {
		if (vidParams.paginated === undefined) return this.getLiveUnpaginated(vidParams);
		return this.getLivePaginated(vidParams);
	}
}

export default VideoHandler;
// @ts-expect-error Redefine error
export = VideoHandler;
