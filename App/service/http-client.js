import Times from './times';
import Storage from './storage';
import { apiHost } from '../conf/app.conf.dev';

const HEADER_STRING = 'X-Authorization';
const AUTH_TOKEN_KEY = 'buber.auth.token';
const CONTENT_TYPE_HEADER = 'Content-Type';
const CONTENT_LENGTH_HEADER = 'Content-Length';
const MEDIA_TYPE_JSON_UTF8 = 'application/json;charset=utf-8';

let userInfo = null;
let router = null;

function getHeader(jsonContentType = true) {
  const headers = new Headers();
  const authToken = Storage.getItem(AUTH_TOKEN_KEY);
  if (authToken) {
    headers.append(HEADER_STRING, authToken);
  }
  if (jsonContentType) {
    headers.append(CONTENT_TYPE_HEADER, MEDIA_TYPE_JSON_UTF8);
  }
  return headers;
}

function notSignedInAlert(response) {
  return Promise.reject(response);
}

function toSignForm(response) {
  return notSignedInAlert(response);
}

function toJson(response) {
  if (!response.ok) {
    return notSignedInAlert();
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

function buildUrl(baseUrl, params = {}) {
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

export default {
  userInfo() {
    return userInfo;
  },

  isSignedIn() {
    return !!userInfo;
  },

  signOut() {
    userInfo = null;
    Storage.removeItem(AUTH_TOKEN_KEY);
  },

  signIn(credentials) {
    return this.doPost(
      '/api/auth/sign-in',
      JSON.stringify(credentials)
    ).then((response) => {
      const headers = response.headers;
      if (headers.has(HEADER_STRING)) {
        Storage.setItem(AUTH_TOKEN_KEY, headers.get(HEADER_STRING));
        userInfo = {
          username: credentials.username,
        };
      }
    });
  },

  signUp(credentials) {
    return this.doPost(
      withHost('/api/auth/sign-up'),
      JSON.stringify(credentials)
    );
  },

  doGet(path) {
    return fetch(withHost(path), {
      method: 'GET',
      headers: getHeader(),
    }).then(toJson)
      .catch(toSignForm);
  },

  doPost(path, data, jsonContentType = true) {
    return fetch(withHost(path), {
      method: 'POST',
      body: data,
      headers: getHeader(jsonContentType),
    }).then(toJson)
      .catch(toSignForm);
  },

  fetchCards(params) {
    const url = buildUrl('/api/ads', params);
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
        const nowYear = new Date().getFullYear();
        return cards.map((card) => {
          console.log(`filtered out ${cards.length} items`);
          return {
            id: card.id,
            name: card.name,
            tel: card.tel,
            age: nowYear - new Date(card.birthday).getFullYear(),
            location: card.location,
            description: card.description,
            image: withHost(`/api/ads/${card.id}/banner`),
          };
        });
      });
  },
};
