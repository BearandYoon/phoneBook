export const baseEndpoint = location.hostname === '127.0.0.1'
  ? 'http://localhost:8080' : 'https://oraiappv2.tryoratio.com';
export const devMode = ['127.0.0.1', 'localhost'].includes(location.hostname);
export const endpoint = `${baseEndpoint}/mobileapp/v2`;
export const apiKey = 'AIzaSyBHZWzBvaxCzq7odd7HamhqmLh9Nhxtkhs';
