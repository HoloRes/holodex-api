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
			const clips: VideoWithChannel[]|undefined = video.clips?.map((clip: APIVideoWithChannel) => ({
				id: clip.id,
				title: clip.title,
				type: clip.type,
				topicId: clip.topic_id ?? undefined,
				publishedAt: clip.published_at ? new Date(clip.published_at) : undefined,
				availableAt: clip.available_at ? new Date(clip.available_at) : undefined,
				duration: clip.duration,
				status: clip.status,
				startScheduled: clip.start_scheduled ? new Date(clip.start_scheduled) : undefined,
				startActual: clip.start_actual ? new Date(clip.start_actual) : undefined,
				endActual: clip.end_actual ? new Date(clip.end_actual) : undefined,
				liveViewers: clip.live_viewers ?? undefined,
				description: clip.description,
				songcount: clip.songcount,
				channelId: clip.channel_id,
				channel: {
					id: clip.channel.id,
					name: clip.channel.name,
					englishName: clip.channel.english_name ?? undefined,
					type: clip.channel.type,
					photo: clip.channel.photo ?? undefined,
				},
			}));

			const sources: VideoWithChannel[]|undefined = video.sources?.map((source: APIVideoWithChannel) => ({
				id: source.id,
				title: source.title,
				type: source.type,
				topicId: source.topic_id ?? undefined,
				publishedAt: source.published_at ? new Date(source.published_at) : undefined,
				availableAt: source.available_at ? new Date(source.available_at) : undefined,
				duration: source.duration,
				status: source.status,
				startScheduled: source.start_scheduled ? new Date(source.start_scheduled) : undefined,
				startActual: source.start_actual ? new Date(source.start_actual) : undefined,
				endActual: source.end_actual ? new Date(source.end_actual) : undefined,
				liveViewers: source.live_viewers ?? undefined,
				description: source.description,
				songcount: source.songcount,
				channelId: source.channel_id,
				channel: {
					id: source.channel.id,
					name: source.channel.name,
					englishName: source.channel.english_name ?? undefined,
					type: source.channel.type,
					photo: source.channel.photo ?? undefined,
				},
			}));

			const refers: VideoWithChannel[]|undefined = video.refers?.map((refer: APIVideoWithChannel) => ({
				id: refer.id,
				title: refer.title,
				type: refer.type,
				topicId: refer.topic_id ?? undefined,
				publishedAt: refer.published_at ? new Date(refer.published_at) : undefined,
				availableAt: refer.available_at ? new Date(refer.available_at) : undefined,
				duration: refer.duration,
				status: refer.status,
				startScheduled: refer.start_scheduled ? new Date(refer.start_scheduled) : undefined,
				startActual: refer.start_actual ? new Date(refer.start_actual) : undefined,
				endActual: refer.end_actual ? new Date(refer.end_actual) : undefined,
				liveViewers: refer.live_viewers ?? undefined,
				description: refer.description,
				songcount: refer.songcount,
				channelId: refer.channel_id,
				channel: {
					id: refer.channel.id,
					name: refer.channel.name,
					englishName: refer.channel.english_name ?? undefined,
					type: refer.channel.type,
					photo: refer.channel.photo ?? undefined,
				},
			}));

			const simulcasts: VideoWithChannel[]|undefined = video.simulcasts?.map((simulcast: APIVideoWithChannel) => ({
				id: simulcast.id,
				title: simulcast.title,
				type: simulcast.type,
				topicId: simulcast.topic_id ?? undefined,
				publishedAt: simulcast.published_at ? new Date(simulcast.published_at) : undefined,
				availableAt: simulcast.available_at ? new Date(simulcast.available_at) : undefined,
				duration: simulcast.duration,
				status: simulcast.status,
				startScheduled: simulcast.start_scheduled ? new Date(simulcast.start_scheduled) : undefined,
				startActual: simulcast.start_actual ? new Date(simulcast.start_actual) : undefined,
				endActual: simulcast.end_actual ? new Date(simulcast.end_actual) : undefined,
				liveViewers: simulcast.live_viewers ?? undefined,
				description: simulcast.description,
				songcount: simulcast.songcount,
				channelId: simulcast.channel_id,
				channel: {
					id: simulcast.channel.id,
					name: simulcast.channel.name,
					englishName: simulcast.channel.english_name ?? undefined,
					type: simulcast.channel.type,
					photo: simulcast.channel.photo ?? undefined,
				},
			}));

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
	 * This fucnction will call either `getFromChannelWithTypePaginated()` or `getFromChannelWithTypeUnpaginated()`.  These return different objects, so this must be kept in mind.
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
