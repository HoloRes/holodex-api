import axios, { AxiosInstance } from 'axios';
import VideoHandler from './client/videos';
import ChannelHandler from './client/channels';
import { Settings } from './types';
import SearchHandler from './client/search';

class HolodexApiClient {
	/**
	 * @private
	 * @internal
	 */
	private readonly url: string;

	/**
	 * @private
	 * @internal
	 */
	private readonly axiosInstance: AxiosInstance;

	public readonly videos: VideoHandler;

	public readonly channels: ChannelHandler;

	public readonly search: SearchHandler;

	constructor(settings: Settings) {
		this.url = settings.url ?? 'https://holodex.net/api/v2';

		this.axiosInstance = axios.create({
			baseURL: this.url,
			headers: {
				'X-APIKEY': settings.apiKey,
			},
		});

		this.videos = new VideoHandler(this.axiosInstance);
		this.channels = new ChannelHandler(this.axiosInstance);
		this.search = new SearchHandler(this.axiosInstance);
	}
}

export {
	HolodexApiClient, VideoHandler, ChannelHandler, SearchHandler,
};

export default HolodexApiClient;
// @ts-expect-error Redefine error
export = HolodexApiClient;
