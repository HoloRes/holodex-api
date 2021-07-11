import VideoHandler from './client/videos';
import ChannelHandler from './client/channels';
import { Settings } from './types';

class Client {
	/**
	 * @private
	 * @internal
	 */
	private url: string;

	public videos: VideoHandler;

	public channels: ChannelHandler;

	constructor(settings: Settings = {}) {
		this.url = settings.url ?? 'https://holodex.net/api/v2';
		this.videos = new VideoHandler(settings);
		this.channels = new ChannelHandler(settings);
	}
}

export {
	Client, VideoHandler, ChannelHandler,
};

// @ts-expect-error Redefine error
export = Client;
