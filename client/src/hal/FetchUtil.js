import HttpError from './HttpError';

export default class FetchUtil {
  static async asyncFetch(url, headers) {
    let response = await fetch(url, headers);
    if (response.ok) return await response.json();
    throw new HttpError(response);
  }
}
