/**
 * Settings for channels
 */
export interface Settings {
    url?: string;
    apiKey: string;
}
/**
 * Model corresponding to https://holodex.stoplight.io/docs/holodex/holodex_v2.yaml/components/schemas/Comment
 */
export interface APIComment {
    comment_key: string;
    videoId: string;
    message: string;
}
/**
 * Model corresponding to https://holodex.stoplight.io/docs/holodex/holodex_v2.yaml/components/schemas/ChannelMin
 */
export interface APIChannelMin {
    id: string;
    name: string;
    englishName?: string;
    type: 'vtuber' | 'subber';
    photo?: string;
}
/**
 * Model corresponding to https://holodex.stoplight.io/docs/holodex/holodex_v2.yaml/components/schemas/Channel
 */
export interface APIChannel extends APIChannelMin {
    org?: string;
    subOrg?: string;
    banner?: string;
    twitter?: string;
    video_count?: string;
    subscriber_count?: string;
    view_count?: string;
    clip_count?: string;
    lang?: string;
    published_at: string;
    inactive: boolean;
    description: string;
}
/**
 * Model corresponding to https://holodex.stoplight.io/docs/holodex/holodex_v2.yaml/components/schemas/Video
 */
export interface APIVideo {
    id: string;
    title: string;
    type: 'stream' | 'clip';
    topic_id?: string;
    published_at?: string;
    available_at: string;
    duration: number;
    status: 'new' | 'upcoming' | 'live' | 'past' | 'missing';
    start_scheduled?: string;
    start_actual?: string;
    end_actual?: string;
    live_viewers?: number;
    description: string;
    songCount: number;
    channel_id: string;
}
/**
 * Model corresponding to https://holodex.stoplight.io/docs/holodex/holodex_v2.yaml/components/schemas/VideoWithChannel
 */
export interface APIVideoWithChannel extends APIVideo {
    channel: APIChannelMin;
}
/**
 * Model corresponding to mentions in https://holodex.stoplight.io/docs/holodex/holodex_v2.yaml/components/schemas/VideoFull
 */
export interface APIMentions extends APIChannelMin {
    org?: string;
}
/**
 * Model corresponding to https://holodex.stoplight.io/docs/holodex/holodex_v2.yaml/components/schemas/VideoFull
 */
export interface APIVideoFull extends APIVideo {
    clips?: APIVideoWithChannel[];
    sources?: APIVideoWithChannel[];
    refers?: APIVideoWithChannel[];
    simulcasts?: APIVideoWithChannel[];
    mentions?: APIMentions[];
    songs?: number;
}
/**
 * For use when https://holodex.stoplight.io/docs/holodex/holodex_v2.yaml/paths/~1channels~1%7BchannelId%7D~1%7Btype%7D/get is paginated.
 */
export interface PaginatedVideos {
    total: number;
    videos: APIVideoFull[];
}
export interface ExtraVideoInfo {
    item?: 'clips' | 'refers' | 'sources' | 'simulcasts' | 'mentions' | 'description' | 'live_info' | 'channel_stats' | 'songs';
}
/**
 * Query Parameters for https://holodex.stoplight.io/docs/holodex/holodex_v2.yaml/paths/~1channels/get
 */
export interface ListChannelParameters {
    lang?: 'en' | 'ja' | 'zh';
    limit?: number;
    offset?: number;
    order?: 'asc' | 'desc';
    org?: string;
    sort?: string;
    type?: 'subber' | 'vtuber';
}
/**
 * Query Parameters for https://holodex.stoplight.io/docs/holodex/holodex_v2.yaml/paths/~1channels~1%7BchannelId%7D~1%7Btype%7D/get
 */
export interface VideosRelatedToChannelParameters {
    /**
     * Comma-separated list of extra video info.  Possible items:
     * 'clips'
     * 'refers'
     * 'sources'
     * 'simulcasts'
     * 'mentions'
     * 'description'
     * 'live_info'
     * 'channel_stats'
     * 'songs'
     */
    include?: ExtraVideoInfo[];
    /**
     * Comma-separated list of language codes for filtering channels/clips,
     * official streams do not follow this parameter
     * Default 'all'
     */
    lang?: string;
    /**
     * Results limit.
     * Default 25
     */
    limit?: number;
    /**
     * Results offset.
     * Default 0
     */
    offset?: number;
    /**
     * If paginated is set to true, return an object with total, otherwise returns an array.
     * Default <empty>
     */
    paginated?: boolean;
}
/**
 * Query Parameters for https://holodex.stoplight.io/docs/holodex/holodex_v2.yaml/paths/~1live/get
 */
export interface VideosQueryLiveAndUpcomingParameters {
    /**
     * Examples: `UCl_gCybOJRIgOXw6Qb4qJzQ`
     * Filter by video uploader channel id
     */
    channelId?: string;
    /**
     * A single Youtube Video ID. If Specified, only this video can be returned (may be filtered out by other conditions though)
     */
    id?: string;
    /**
     * Comma-separated list of extra video info.  Possible items:
     * 'clips'
     * 'refers'
     * 'sources'
     * 'simulcasts'
     * 'mentions'
     * 'description'
     * 'live_info'
     * 'channel_stats'
     * 'songs'
     */
    include?: ExtraVideoInfo[];
    /**
     * Examples: `en,ja`
     * Default: `all`
     * A comma separated list of language codes to filter channels/clips, official streams do not follow this parameter
     */
    lang?: string;
    /**
     * Default: `25`
     * Results limit
     */
    limit?: number;
    /**
     * Examples: `24`
     * Number of maximum hours upcoming to get upcoming videos by (for rejecting waiting rooms that are two years out)
     */
    maxUpcomingHours?: number;
    /**
     * Filter by mentioned channel id, excludes itself. Generally used to find collabs/clips that include the requested channel
     */
    mentionedChannelId?: string;
    /**
     * Default: `0`
     * Offset results
     */
    offset?: number;
    /**
     * Default: `desc`
     * Order by ascending or descending
     */
    order?: 'asc' | 'desc';
    /**
     * Examples: `Hololive`
     * Filter by clips that feature the org's talent or videos posted by the org's talent
     */
    org?: string;
    /**
     * If paginated is set to true, return an object with total, otherwise returns an array.
     * Default <empty>
     */
    paginated?: boolean;
    /**
     * Examples: `start_scheduled`
     * Default: `available_at`
     * Sort by any returned video field
     */
    sort?: string;
    /**
     * Examples: `past`
     * Filter by video status
     */
    status?: 'new' | 'upcoming' | 'live' | 'past' | 'missing';
    /**
     * Examples: `singing`
     * Filter by video topic id
     */
    topic?: string;
    /**
     * Filter by type of video
     */
    type?: 'stream' | 'clip';
}
/**
 * Query Parameters for https://holodex.stoplight.io/docs/holodex/holodex_v2.yaml/paths/~1videos/get
 */
export interface VideosQuery extends VideosQueryLiveAndUpcomingParameters {
    /**
     * Date for minimum available_at. (available_at is the most accurate timestamp of when a video has gone live or became viewable - it is the first non-null value of the start_actual, start_scheduled or published_at fields)
     */
    from: Date;
    /**
     * Date String for maximum available_at
     */
    to: Date;
}
export interface ChannelMin {
    id: string;
    name: string;
    englishName?: string;
    type: 'vtuber' | 'subber';
    photo?: string;
}
export interface Channel extends ChannelMin {
    org?: string;
    subOrg?: string;
    banner?: string;
    twitter?: string;
    videoCount?: number;
    subscriberCount?: number;
    viewCount?: number;
    clipCount?: number;
    lang?: string;
    publishedAt: Date;
    inactive: boolean;
    description: string;
}
export interface Video {
    id: string;
    title: string;
    type: 'stream' | 'clip';
    topicId?: string;
    publishedAt?: Date;
    availableAt?: Date;
    duration: number;
    status: string;
    startScheduled?: Date;
    startActual?: Date;
    endActual?: Date;
    liveViewers?: number;
    description: string;
    songCount?: number;
    channelId: string;
}
export interface VideoWithChannel extends Video {
    channel: ChannelMin;
}
export interface VideoFull extends Video {
    clips?: VideoWithChannel[];
    sources?: VideoWithChannel[];
    refers?: VideoWithChannel[];
    simulcasts?: VideoWithChannel[];
    mentions?: ChannelMin[];
    songs?: number;
}
export interface Comment {
    commentKey: string;
    videoId: string;
    message: string;
}
export interface PaginatedChannelVideosData {
    total: number;
    items: VideoFull[];
}
export interface Mention extends ChannelMin {
    org?: string;
}
export interface PaginatedVideosData {
    total: number;
    items: Video[];
}
