import Times from './times';
import { apiHost } from '../conf/app.conf.dev';

const HEADER_STRING = 'X-Authorization';
const AUTH_TOKEN_KEY = 'buber.auth.token';
const CONTENT_TYPE_HEADER = 'Content-Type';
const CONTENT_LENGTH_HEADER = 'Content-Length';
const MEDIA_TYPE_JSON_UTF8 = 'application/json;charset=utf-8';

let userInfo = null;
let router = null;

const localStorage = {
  store: {},
  getItem(key) {
    return this.store[key];
  },
  removeItem(key) {
    this.store[key] = undefined;
  },
  setItem(key, value) {
    this.store[key] = value;
  }
};

function getHeader(jsonContentType = true) {
  const headers = new Headers();
  const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
  if (authToken) {
    headers.append(HEADER_STRING, authToken);
  }
  if (jsonContentType) {
    headers.append(CONTENT_TYPE_HEADER, MEDIA_TYPE_JSON_UTF8);
  }
  return headers;
}

function toSignForm(response) {
  switch (response.status) {
    case 401:
    case 403:
      // router.push({ name: 'sign-in' });
      break;
    default:
      // console.error('eeeeorr');
      // router.push('/');
  }
  return Promise.reject(response);
}

function toJson(response) {
  if (!response.ok) {
    return toSignForm(response);
  }
  const headers = response.headers;
  const contentType = headers.get(CONTENT_TYPE_HEADER) || '';
  const contentLength = headers.get(CONTENT_LENGTH_HEADER) || 0;
  const isJson = contentType.toLowerCase() === MEDIA_TYPE_JSON_UTF8;
  const notEmpty = contentLength > 0;
  if (isJson || notEmpty) {
    return response.json();
  }
  return response;
}

function withHost(query) {
  return apiHost + query;
}

export default class {
  static setRouter(therouter) {
    router = therouter;
  }

  static userInfo() {
    return userInfo;
  }

  static isSignedIn() {
    return !!userInfo;
  }

  static signOut() {
    userInfo = null;
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }

  static signIn(credentials) {
    return this.doPost(
      '/api/auth/sign-in',
      JSON.stringify(credentials)
    ).then((response) => {
      const headers = response.headers;
      if (headers.has(HEADER_STRING)) {
        localStorage.setItem(AUTH_TOKEN_KEY, headers.get(HEADER_STRING));
        userInfo = {
          username: credentials.username,
        };
      }
    });
  }

  static signUp(credentials) {
    return this.doPost(
      withHost('/api/auth/sign-up'),
      JSON.stringify(credentials)
    );
  }

  static doGet(path) {
    return fetch(withHost(path), {
      method: 'GET',
      headers: getHeader(),
    }).then(toJson)
      .catch(toSignForm);
  }

  static doPost(path, data, jsonContentType = true) {
    return fetch(withHost(path), {
      method: 'POST',
      body: data,
      headers: getHeader(jsonContentType),
    }).then(toJson)
      .catch(toSignForm);
  }

  static fetchCards(params) {
    const url = this.buildUrl('/api/ads', params);
    return this.doGet(url)
      .then((data) => {
        console.log(`received ${data.content.length} items`);
        const now = new Date();
        return data.content.filter((it) => {
          const endDate = Times.endAdDate(it.createdOn);
          return endDate >= now;
        });
      })
      .then((cards) => {
        return cards.map((card) => {
          console.log(`filtered out ${cards.length} items`);
          return {
            id: card.id,
            first_name: card.name,
            age: 15,
            friends: 16,
            interests: 49,
            image: withHost(`/api/ads/${card.id}/banner`),
            // image: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
          };
        });
      });
  }

  static buildUrl(baseUrl, params = {}) {
    let first = true;
    let url = baseUrl;
    Object.entries(params).forEach((pair) => {
      const param = pair[0];
      const value = pair[1];
      if (value !== null && value !== undefined) {
        url += `${first ? '?' : '&'}${param}=${value}`;
        first = false;
      }
    });
    return url;
  }
}
