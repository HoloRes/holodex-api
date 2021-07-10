import axios, { AxiosError } from 'axios';
import {
	Settings, ListChannelParameters, APIChannel, APIChannelMin,
} from '../types';

/**
 * Handles all endpoints related to channels
 */
class ChannelHandler {
	/**
     * @private
     * @internal
     */
	private url: string;

	/**
     * @internal
     */
	constructor(settings: Settings = {}) {
		this.url = settings.url ?? 'https://api.holotools.app/v2';
	}

	/**
	 * Lists channels according to the given search term.
	 * Endpoint: https://holodex.stoplight.io/docs/holodex/holodex_v2.yaml/paths/~1channels/get
	 *
	 * @param LCParams - Parameters for narrowing the search
	 */
	async list(LCParams: ListChannelParameters) {
		axios.get(`${this.url}/channels`, {
			params: {
				lang: LCParams.lang,
				limit: LCParams.limit,
				offset: LCParams.offset,
				order: LCParams.order,
				org: LCParams.org,
				sort: LCParams.sort,
				type: LCParams.type,
			},
		})
			.then((response) => {
				const channelData: Array<APIChannel> = response.data.channels.map((ch: APIChannel) => ({
					id: ch.id,
					name: ch.name,
					english_name: ch.english_name ?? undefined,
					type: ch.type,
					photo: ch.photo ?? undefined,
					org: ch.org ?? undefined,
					suborg: ch.suborg ?? undefined,
					banner: ch.banner ?? undefined,
					twitter: ch.twitter ?? undefined,
					video_count: ch.video_count ?? undefined,
					subscriber_count: ch.subscriber_count ?? undefined,
					view_count: ch.view_count ?? undefined,
					clip_count: ch.clip_count ?? undefined,
					lang: ch.lang ?? undefined,
					published_at: ch.published_at,
					inactive: ch.inactive,
					description: ch.description,
				}));
				return ({
					channels: channelData,
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
	 * Gets a specific channel's basic information
	 * @param channelID - ID of the Youtube Channel that is being queried
	 */
	async getInfo(channelID: string) {
		axios.get(`${this.url}/channels/${channelID}`)
			.then((response) => {
				const channelData: APIChannel = {
					id: response.data.id,
					name: response.data.name,
					english_name: response.data.english_name ?? undefined,
					type: response.data.type,
					photo: response.data.photo ?? undefined,
					org: response.data.org ?? undefined,
					suborg: response.data.suborg ?? undefined,
					banner: response.data.banner ?? undefined,
					twitter: response.data.twitter ?? undefined,
					video_count: response.data.video_count ?? undefined,
					subscriber_count: response.data.subscriber_count ?? undefined,
					view_count: response.data.view_count ?? undefined,
					clip_count: response.data.clip_count ?? undefined,
					lang: response.data.lang ?? undefined,
					published_at: response.data.published_at,
					inactive: response.data.inactive,
					description: response.data.description,
				};
				return channelData;
			})
			.catch((error: AxiosError) => {
				if (error.response?.status === 400) throw new Error(error.response.data.message);
				else throw error;
			});
	}
}
