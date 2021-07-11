/**
 * Settings for channels
 */
export interface Settings {
	url?: string;
}

/**
 * Model corresponding to https://holodex.stoplight.io/docs/holodex/holodex_v2.yaml/components/schemas/Comment
 */
export interface APIComment {
	comment_key: string;
	video_id: string;
	message: string;
}

/**
 * Model corresponding to https://holodex.stoplight.io/docs/holodex/holodex_v2.yaml/components/schemas/ChannelMin
 */
export interface APIChannelMin {
	id: string;
	name: string;
	english_name?: string;
	type: 'vtuber'|'subber';
	photo?: string;
}

/**
 * Model corresponding to https://holodex.stoplight.io/docs/holodex/holodex_v2.yaml/components/schemas/Channel
 */
export interface APIChannel extends APIChannelMin {
	org?: string;
	suborg?: string;
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
	type: 'stream'|'clip';
	topic_id?: string;
	published_at?: string;
	available_at: string;
	duration: number;
	status: 'new'|'upcoming'|'live'|'past'|'missing';
	start_scheduled?: string;
	start_actual?: string;
	end_actual?: string;
	live_viewers?: number;
	description: string;
	songcount: number;
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
	clips?:	APIVideoWithChannel[];
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

/**
 * Query Parameters for https://holodex.stoplight.io/docs/holodex/holodex_v2.yaml/paths/~1channels/get
 */
export interface ListChannelParameters {
	lang?: 'en'|'ja'|'zh';
	limit?: number;
	offset?: number;
	order?: 'asc'|'desc';
	org?: string;
	sort?: string;
	type?: 'subber'|'vtuber';
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
	array?: string;

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
	 * If paginated is set to any non-empty value, return an object with total, otherwise returns an array.
	 * Default <empty>
	 */
	paginated?: string;
}