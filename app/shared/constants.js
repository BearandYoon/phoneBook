export const baseEndpoint = location.hostname === '127.0.0.1'
  ? 'http://localhost:8080' : 'https://sample.com';
export const devMode = ['127.0.0.1', 'localhost'].includes(location.hostname);
export const endpoint = `${baseEndpoint}/`;
export const apiKey = 'apikey';
