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