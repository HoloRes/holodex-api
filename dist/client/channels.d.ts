import { AxiosInstance } from 'axios';
import { Channel, ListChannelParameters } from '../types';
/**
 * Handles all endpoints related to channels
 */
declare class ChannelHandler {
    /**
     * @private
     * @internal
     */
    private axiosInstance;
    /**
     * @internal
     * @param axiosInstance - The new Axios instance
     */
    constructor(axiosInstance: AxiosInstance);
    /**
     * Lists channels according to the given search term.
     * Endpoint: https://holodex.stoplight.io/docs/holodex/holodex_v2.yaml/paths/~1channels/get
     *
     * @param LCParams - Parameters for narrowing the search
     */
    list(LCParams?: ListChannelParameters): Promise<Channel[]>;
    /**
     * Gets a specific channel's basic information
     * @param channelID - ID of the Youtube Channel that is being queried
     */
    getInfo(channelID: string): Promise<Channel>;
}
export default ChannelHandler;
export = ChannelHandler;
