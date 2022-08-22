import { AxiosInstance } from 'axios';
import { AutocompleteResponse, CommentSearchQuery, PaginatedVideosWithChannelAndCommentData, PaginatedVideosWithChannelData, VideoSearchQuery, VideoWithChannel, VideoWithChannelAndComment } from '../types';
declare class SearchHandler {
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
     * Flexible endpoint to search for videos fufilling multiple conditions. Descriptions with "any" implies an OR condition, and "all" implies a AND condition.
     * Searching for topics and clips is not supported, because clips do not contain topic_ids
     *
     * @param searchParams - object containing the query to search for
     */
    searchVideosUnpaginated(searchParams: VideoSearchQuery): Promise<VideoWithChannel[]>;
    /**
     * @param searchParams - object containing the query to search for
     */
    searchVideosPaginated(searchParams: VideoSearchQuery): Promise<PaginatedVideosWithChannelData>;
    /**
     * @param searchParams - object containing the query to search for
     */
    searchVideos(searchParams: VideoSearchQuery): Promise<VideoWithChannel[] | PaginatedVideosWithChannelData>;
    /**
     * Flexible endpoint to search for comments in videos fufilling multiple conditions. Descriptions with "any" implies an OR condition, and "all" implies a AND condition.
     *
     * @param searchParams - object containing the query to search for
     */
    searchCommentsUnpaginated(searchParams: CommentSearchQuery): Promise<VideoWithChannelAndComment[]>;
    /**
     * @param searchParams - object containing the query to search for
     */
    searchCommentsPaginated(searchParams: CommentSearchQuery): Promise<PaginatedVideosWithChannelAndCommentData>;
    /**
     * @param searchParams - object containing the query to search for
     */
    searchComments(searchParams: CommentSearchQuery): Promise<VideoWithChannelAndComment[] | PaginatedVideosWithChannelAndCommentData>;
    /**
     * Query the autocomplete API of Holodex
     *
     * @param query - What to search for
     * @param filter - Filter out to a specific type
     */
    autocomplete(query: string, filter?: 'channel' | 'topic'): Promise<AutocompleteResponse[]>;
}
export default SearchHandler;
export = SearchHandler;
