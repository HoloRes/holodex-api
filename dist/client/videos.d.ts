import { AxiosInstance } from 'axios';
import { PaginatedChannelVideosData, PaginatedVideosData, Video, VideoFull, VideosQuery, VideosQueryLiveAndUpcomingParameters, VideosRelatedToChannelParameters, VideoTypes } from '../types';
declare class VideoHandler {
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
     * A simplified endpoint for access channel specific data. If you want more customization, the same result can be obtained by calling the `/videos` endpoint.
     * https://holodex.stoplight.io/docs/holodex/holodex_v2.yaml/paths/~1channels~1%7BchannelId%7D~1%7Btype%7D/get behaves differently based on whether or not the result is paginated
     * This is the paginated version
     * @param channelID - ID of the Youtube Channel that is being queried
     * @param type - The type of video resource to fetch. Clips finds clip videos of a `vtuber` channel, Video finds the `channelId` channel's uploads, and collabs finds videos uploaded by other channels that mention this `channelId`
     * @param vidParams - object containing the query parameters for this query
     */
    getFromChannelWithTypePaginated(channelID: string, type: VideoTypes, vidParams?: VideosRelatedToChannelParameters): Promise<PaginatedChannelVideosData>;
    /**
     * A simplified endpoint for access channel specific data. If you want more customization, the same result can be obtained by calling the `/videos` endpoint.
     * https://holodex.stoplight.io/docs/holodex/holodex_v2.yaml/paths/~1channels~1%7BchannelId%7D~1%7Btype%7D/get behaves differently based on whether or not the result is paginated
     * This is the unpaginated version
     * @param channelID - ID of the Youtube Channel that is being queried
     * @param type - The type of video resource to fetch. Clips finds clip videos of a `vtuber` channel, Video finds the `channelId` channel's uploads, and collabs finds videos uploaded by other channels that mention this `channelId`
     * @param vidParams - object containing the query parameters for this query
     */
    getFromChannelWithTypeUnpaginated(channelID: string, type: VideoTypes, vidParams?: VideosRelatedToChannelParameters): Promise<VideoFull[]>;
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
    getFromChannelWithType(channelID: string, type: VideoTypes, vidParams?: VideosRelatedToChannelParameters): Promise<VideoFull[] | PaginatedChannelVideosData>;
    /**
     * Pretty much everything you need. This is the most 'vanilla' variant with almost no preset values, and /channels/\{channelId\}/\{type\} and /live endpoints both use the same query structure but provision default values differently for some of the query params.
     * Not as powerful at searching arbitrary text as the Search API (currently not documented/available).
     *
     * @param vidParams - object containing the query parameters for this query
     */
    getVideosUnpaginated(vidParams?: VideosQuery): Promise<Video[]>;
    getVideosPaginated(vidParams?: VideosQuery): Promise<PaginatedVideosData>;
    getLiveUnpaginated(vidParams?: VideosQueryLiveAndUpcomingParameters): Promise<Video[]>;
    getLivePaginated(vidParams?: VideosQueryLiveAndUpcomingParameters): Promise<PaginatedVideosData>;
    getLive(vidParams?: VideosQueryLiveAndUpcomingParameters): Promise<Video[] | PaginatedVideosData>;
}
export default VideoHandler;
export = VideoHandler;
