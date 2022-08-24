"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const chai_as_promised_1 = __importDefault(require("chai-as-promised"));
// eslint-disable-next-line import/no-named-as-default
const src_1 = __importDefault(require("../src"));
chai_1.default.use(chai_as_promised_1.default);
chai_1.default.should();
if (!process.env.API_KEY) {
    console.error('No API key specified in API_KEY environment variable');
    process.exit(1);
}
const client = new src_1.default({
    apiKey: process.env.API_KEY,
});
// Test constants, known working values
const CHANNEL_ID = 'UC5CwaMl1eIgY8h02uZw7u8A';
const VIDEO_ID = '4_G7UuchCD8';
describe('Videos', () => {
    describe('#getVideo()', () => {
        it('should work', () => client.videos.getVideo(VIDEO_ID).should.eventually.be.fulfilled);
    });
    describe('Get from channel', () => {
        describe('#getFromChannelWithTypePaginated()', () => {
            it('should work', () => client.videos.getFromChannelWithTypePaginated(CHANNEL_ID, 'collabs').should.eventually.be.fulfilled);
        });
        describe('#getFromChannelWithTypeUnpaginated()', () => {
            it('should work', () => client.videos.getFromChannelWithTypeUnpaginated(CHANNEL_ID, 'collabs').should.eventually.be.fulfilled);
        });
        describe('#getFromChannelWithType()', () => {
            it('should work', () => client.videos.getFromChannelWithType(CHANNEL_ID, 'collabs').should.eventually.be.fulfilled);
        });
    });
    describe('Get live', () => {
        describe('#getLivePaginated()', () => {
            it('should work', () => client.videos.getLivePaginated().should.eventually.be.fulfilled);
        });
        describe('#getLiveUnpaginated()', () => {
            it('should work', () => client.videos.getLiveUnpaginated().should.eventually.be.fulfilled);
        });
        describe('#getLive()', () => {
            it('should work', () => client.videos.getLive().should.eventually.be.fulfilled);
        });
        describe('#getLiveSimple()', () => {
            it('should work', () => client.videos.getLiveSimple([CHANNEL_ID]).should.eventually.be.fulfilled);
        });
    });
    describe('Get videos', () => {
        describe('#getVideosPaginated()', () => {
            it('should work', () => client.videos.getVideosPaginated().should.eventually.be.fulfilled);
        });
        describe('#getVideosUnpaginated()', () => {
            it('should work', () => client.videos.getVideosUnpaginated().should.eventually.be.fulfilled);
        });
    });
});
describe('Channels', () => {
    describe('#list()', () => {
        it('should work', () => client.channels.list().should.eventually.be.fulfilled);
    });
    describe('#getInfo()', () => {
        it('should work', () => client.channels.getInfo('UC5CwaMl1eIgY8h02uZw7u8A').should.eventually.be.fulfilled);
    });
});
describe('Search', () => {
    describe('Search videos', () => {
        const SEARCH_PARAMS = {
            sort: 'newest',
            target: [
                'stream',
                'clip',
            ],
            topic: [
                'singing',
            ],
            org: [
                'Nijisanji',
                'Hololive',
            ],
            limit: 5,
        };
        describe('#searchVideosPaginated()', () => {
            it('should work', () => client.search.searchVideosPaginated(SEARCH_PARAMS).should.eventually.be.fulfilled);
        });
        describe('#searchVideosUnpaginated()', () => {
            it('should work', () => client.search.searchVideosUnpaginated(SEARCH_PARAMS).should.eventually.be.fulfilled);
        });
        describe('#searchVideos()', () => {
            it('should work', () => client.search.searchVideos(SEARCH_PARAMS).should.eventually.be.fulfilled);
        });
    });
    describe('Search comments', () => {
        const SEARCH_PARAMS = {
            sort: 'newest',
            target: [
                'stream',
                'clip',
            ],
            org: [
                'Nijisanji',
                'Hololive',
            ],
            comment: 'comet',
            limit: 5,
        };
        describe('#searchCommentsPaginated()', () => {
            it('should work', () => client.search.searchCommentsPaginated(SEARCH_PARAMS).should.eventually.be.fulfilled);
        });
        describe('#searchCommentsUnpaginated()', () => {
            it('should work', () => client.search.searchCommentsUnpaginated(SEARCH_PARAMS).should.eventually.be.fulfilled);
        });
        describe('#searchComments()', () => {
            it('should work', () => client.search.searchComments(SEARCH_PARAMS).should.eventually.be.fulfilled);
        });
    });
});
