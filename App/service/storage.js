import { AsyncStorage } from 'react-native';

export default {
  setItem(key, value) {
    return AsyncStorage.setItem(key, value);
  },
  getItem(key) {
    return AsyncStorage.getItem(key);
  },
  removeItem(key) {
    return AsyncStorage.removeItem(key);
  }
};
