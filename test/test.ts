import chai from 'chai';

chai.use(require('chai-as-promised'));
chai.should();

import HolodexApiClient from '../src';

if(!process.env.API_KEY) {
	console.error('No API key specified in API_KEY environment variable')
	process.exit(1);
}

const client = new HolodexApiClient({
	apiKey: process.env.API_KEY as string,
});

describe('Videos', () => {
	describe('')
});

describe('Channels', () => {
});
