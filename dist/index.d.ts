import VideoHandler from './client/videos';
import ChannelHandler from './client/channels';
import { Settings } from './types';
declare class HolodexApiClient {
    /**
     * @private
     * @internal
     */
    private readonly url;
    /**
     * @private
     * @internal
     */
    private readonly axiosInstance;
    readonly videos: VideoHandler;
    readonly channels: ChannelHandler;
    constructor(settings: Settings);
}
export { HolodexApiClient, VideoHandler, ChannelHandler, };
export = HolodexApiClient;
