import VideoHandler from './client/videos';
import ChannelHandler from './client/channels';
import { Settings } from './types';
import SearchHandler from './client/search';
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
    readonly search: SearchHandler;
    constructor(settings: Settings);
}
export { HolodexApiClient, VideoHandler, ChannelHandler, SearchHandler, };
export default HolodexApiClient;
export = HolodexApiClient;
