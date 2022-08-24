import { AxiosError, AxiosInstance } from 'axios';
import {
	AutocompleteResponse,
	CommentSearchQuery, PaginatedVideosWithChannelAndCommentData,
	PaginatedVideosWithChannelData, VideoSearchQuery, VideoWithChannel, VideoWithChannelAndComment,
} from '../types';
import mapVideos from '../lib/mapVideos';

class SearchHandler {
	/**
	 * @private
	 * @internal
	 */
	private axiosInstance: AxiosInstance;

	/**
	 * @internal
	 * @param axiosInstance - The new Axios instance
	 */
	constructor(axiosInstance: AxiosInstance) {
		this.axiosInstance = axiosInstance;
	}

	/**
	 * Flexible endpoint to search for videos fufilling multiple conditions. Descriptions with "any" implies an OR condition, and "all" implies a AND condition.
	 * Searching for topics and clips is not supported, because clips do not contain topic_ids
	 *
	 * @param searchParams - object containing the query to search for
	 */
	async searchVideosUnpaginated(searchParams: VideoSearchQuery): Promise<VideoWithChannel[]> {
		const response = await this.axiosInstance.post('/search/videoSearch', {
			sort: searchParams.sort,
			lang: searchParams.lang,
			target: searchParams.target,
			conditions: searchParams.conditions,
			topic: searchParams.topic,
			vch: searchParams.channels,
			org: searchParams.org,
			offset: searchParams.offset ?? 0,
			limit: searchParams.limit ?? 25,
			paginated: false,
		}).catch((error: AxiosError) => {
			if (error.response?.status === 400) throw new Error((error.response.data as any).message);
			else throw error;
		});

		return mapVideos(response.data);
	}

	/**
	 * @param searchParams - object containing the query to search for
	 */
	async searchVideosPaginated(searchParams: VideoSearchQuery): Promise<PaginatedVideosWithChannelData> {
		const response = await this.axiosInstance.post('/search/videoSearch', {
			sort: searchParams.sort,
			lang: searchParams.lang,
			target: searchParams.target,
			conditions: searchParams.conditions,
			topic: searchParams.topic,
			vch: searchParams.channels,
			org: searchParams.org,
			offset: searchParams.offset ?? 0,
			limit: searchParams.limit ?? 25,
			paginated: true,
		}).catch((error: AxiosError) => {
			if (error.response?.status === 400) throw new Error((error.response.data as any).message);
			else throw error;
		});

		return {
			items: mapVideos(response.data.items),
			total: Number.parseInt(response.data.total, 10),
		};
	}

	/**
	 * @param searchParams - object containing the query to search for
	 */
	async searchVideos(searchParams: VideoSearchQuery): Promise<VideoWithChannel[] | PaginatedVideosWithChannelData> {
		if (searchParams.paginated === false) return this.searchVideosUnpaginated(searchParams);
		return this.searchVideosPaginated(searchParams);
	}

	/**
	 * Flexible endpoint to search for comments in videos fufilling multiple conditions. Descriptions with "any" implies an OR condition, and "all" implies a AND condition.
	 *
	 * @param searchParams - object containing the query to search for
	 */
	async searchCommentsUnpaginated(searchParams: CommentSearchQuery): Promise<VideoWithChannelAndComment[]> {
		const response = await this.axiosInstance.post('/search/commentSearch', {
			sort: searchParams.sort,
			lang: searchParams.lang,
			target: searchParams.target,
			comment: searchParams.comment,
			topic: searchParams.topic,
			vch: searchParams.channels,
			org: searchParams.org,
			offset: searchParams.offset ?? 0,
			limit: searchParams.limit ?? 25,
			paginated: false,
		}).catch((error: AxiosError) => {
			if (error.response?.status === 400) throw new Error((error.response.data as any).message);
			else throw error;
		});

		return mapVideos(response.data);
	}

	/**
	 * @param searchParams - object containing the query to search for
	 */
	async searchCommentsPaginated(searchParams: CommentSearchQuery): Promise<PaginatedVideosWithChannelAndCommentData> {
		const response = await this.axiosInstance.post('/search/videoSearch', {
			sort: searchParams.sort,
			lang: searchParams.lang,
			target: searchParams.target,
			comment: searchParams.comment,
			topic: searchParams.topic,
			vch: searchParams.channels,
			org: searchParams.org,
			offset: searchParams.offset ?? 0,
			limit: searchParams.limit ?? 25,
			paginated: true,
		}).catch((error: AxiosError) => {
			if (error.response?.status === 400) throw new Error((error.response.data as any).message);
			else throw error;
		});

		return {
			items: mapVideos(response.data.items),
			total: Number.parseInt(response.data.total, 10),
		};
	}

	/**
	 * @param searchParams - object containing the query to search for
	 */
	async searchComments(searchParams: CommentSearchQuery): Promise<VideoWithChannelAndComment[] | PaginatedVideosWithChannelAndCommentData> {
		if (searchParams.paginated === false) return this.searchCommentsUnpaginated(searchParams);
		return this.searchCommentsPaginated(searchParams);
	}

	/**
	 * @experimental As of 1.1.0
	 * Query the autocomplete API of Holodex, do not use unless absolutely necessary.
	 * This is an undocumented endpoint and may change or stop working at any time.
	 *
	 * @param query - What to search for
	 * @param filter - Filter out to a specific type
	 */
	async autocomplete(query: string, filter?: 'channel' | 'topic'): Promise<AutocompleteResponse[]> {
		const response = await this.axiosInstance.get<AutocompleteResponse[]>('/search/autocomplete', {
			params: {
				q: query,
			},
		}).catch((error: AxiosError) => {
			if (error.response?.status === 400) throw new Error((error.response.data as any).message);
			else throw error;
		});

		if (filter) return response.data.filter((item) => item.type === filter);
		return response.data;
	}
}

export default SearchHandler;
// @ts-expect-error Redefine error
export = SearchHandler;
