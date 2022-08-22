"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @private
 * @internal
 * @param data - An axios response to map full video's
 * @returns VideoFull[]
 * This function maps APIVideoFull to VideoFull
 */
function mapVideos(data) {
    return data.map((video) => {
        var _a;
        const mapApiVideoWithChannelToVideoWithChannel = (videos) => videos.map((vid) => ({
            id: vid.id,
            title: vid.title,
            type: vid.type,
            topicId: vid.topic_id,
            publishedAt: vid.published_at ? new Date(vid.published_at) : undefined,
            availableAt: vid.available_at ? new Date(vid.available_at) : undefined,
            duration: vid.duration,
            status: vid.status,
            startScheduled: vid.start_scheduled ? new Date(vid.start_scheduled) : undefined,
            startActual: vid.start_actual ? new Date(vid.start_actual) : undefined,
            endActual: vid.end_actual ? new Date(vid.end_actual) : undefined,
            liveViewers: vid.live_viewers,
            description: vid.description,
            songCount: vid.songCount,
            channelId: vid.channel_id,
            channel: {
                id: vid.channel.id,
                name: vid.channel.name,
                englishName: vid.channel.english_name,
                type: vid.channel.type,
                photo: vid.channel.photo,
            },
        }));
        const clips = video.clips ? mapApiVideoWithChannelToVideoWithChannel(video.clips) : undefined;
        const sources = video.sources ? mapApiVideoWithChannelToVideoWithChannel(video.sources) : undefined;
        const refers = video.refers ? mapApiVideoWithChannelToVideoWithChannel(video.refers) : undefined;
        const simulcasts = video.simulcasts ? mapApiVideoWithChannelToVideoWithChannel(video.simulcasts) : undefined;
        const mentions = (_a = video.mentions) === null || _a === void 0 ? void 0 : _a.map((channel) => ({
            id: channel.id,
            name: channel.name,
            englishName: channel.english_name,
            type: channel.type,
            photo: channel.photo,
            org: channel.org,
        }));
        const final = {
            id: video.id,
            title: video.title,
            type: video.type,
            topicId: video.topic_id,
            publishedAt: video.published_at ? new Date(video.published_at) : undefined,
            availableAt: video.available_at ? new Date(video.available_at) : undefined,
            duration: video.duration,
            status: video.status,
            startScheduled: video.start_scheduled ? new Date(video.start_scheduled) : undefined,
            startActual: video.start_actual ? new Date(video.start_actual) : undefined,
            endActual: video.end_actual ? new Date(video.end_actual) : undefined,
            liveViewers: video.live_viewers,
            description: video.description,
            songs: video.songs,
            songCount: video.songCount,
            channelId: video.channel_id,
            channel: video.channel,
            comments: video.comments ? video.comments.map((comment) => ({
                commentKey: comment.comment_key,
                videoId: comment.video_id,
                message: comment.message,
            })) : undefined,
            clips,
            sources,
            refers,
            simulcasts,
            mentions,
        };
        return final;
    });
}
exports.default = mapVideos;
