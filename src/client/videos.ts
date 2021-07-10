import axios, { AxiosError } from 'axios';
import {
	Settings,
} from '../types';

class VideoHandler {
	private url: string;

	constructor(settings: Settings = {}) {
		this.url = settings.url ?? 'https://holodex.net/api/v2';
	}
}
