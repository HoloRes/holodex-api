import { AxiosError, AxiosInstance } from 'axios';
import { APIChannelListChannel, Channel, ListChannelParameters } from '../types';

/**
 * Handles all endpoints related to channels
 */
class ChannelHandler {
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
     * Lists channels according to the given search term.
     * Endpoint: https://holodex.stoplight.io/docs/holodex/holodex_v2.yaml/paths/~1channels/get
     *
     * @param LCParams - Parameters for narrowing the search
     */
	async list(LCParams?: ListChannelParameters): Promise<Channel[]> {
		const response = await this.axiosInstance.get('/channels', {
			params: {
				lang: LCParams?.lang,
				limit: LCParams?.limit,
				offset: LCParams?.offset,
				order: LCParams?.order,
				org: LCParams?.org,
				sort: LCParams?.sort,
				type: LCParams?.type,
			},
		})
			.catch((error: AxiosError) => {
				if (error.response?.status === 400) {
					throw new Error((error.response.data as any).message);
				} else {
					throw error;
				}
			});

		return response.data.map((ch: APIChannelListChannel): Channel => ({
			id: ch.id,
			name: ch.name,
			englishName: ch.english_name ?? undefined,
			type: ch.type,
			photo: ch.photo ?? undefined,
			org: ch.org ?? undefined,
			subOrg: ch.group ?? undefined,
			banner: ch.banner ?? undefined,
			twitter: ch.twitter ?? undefined,
			videoCount: ch.video_count ? Number.parseInt(ch.video_count, 10) : undefined,
			subscriberCount: ch.subscriber_count ? Number.parseInt(ch.subscriber_count, 10) : undefined,
			viewCount: ch.view_count ? Number.parseInt(ch.view_count, 10) : undefined,
			clipCount: ch.clip_count ? Number.parseInt(ch.clip_count, 10) : undefined,
			lang: ch.lang ?? undefined,
			publishedAt: new Date(ch.published_at),
			inactive: ch.inactive,
			description: ch.description,
		}));
	}

	/**
     * Gets a specific channel's basic information
     * @param channelID - ID of the Youtube Channel that is being queried
     */
	async getInfo(channelID: string): Promise<Channel> {
		const response = await this.axiosInstance.get(`/channels/${channelID}`)
			.catch((error: AxiosError) => {
				if (error.response?.status === 400) {
					throw new Error((error.response.data as any).message);
				} else {
					throw error;
				}
			});

		return {
			id: response.data.id,
			name: response.data.name,
			englishName: response.data.english_name ?? undefined,
			type: response.data.type,
			photo: response.data.photo ?? undefined,
			org: response.data.org ?? undefined,
			subOrg: response.data.suborg ?? undefined,
			banner: response.data.banner ?? undefined,
			twitter: response.data.twitter ?? undefined,
			videoCount: response.data.video_count ? Number.parseInt(response.data.video_count, 10) : undefined,
			subscriberCount: response.data.subscriber_count ? Number.parseInt(response.data.subscriber_count, 10) : undefined,
			viewCount: response.data.view_count ? Number.parseInt(response.data.view_count, 10) : undefined,
			clipCount: response.data.clip_count ? Number.parseInt(response.data.clip_count, 10) : undefined,
			lang: response.data.lang ?? undefined,
			publishedAt: new Date(response.data.published_at),
			inactive: response.data.inactive,
			description: response.data.description,
		};
	}
}

export default ChannelHandler;
// @ts-expect-error Redefine error
export = ChannelHandler;
