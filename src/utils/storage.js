import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

const localStorage = {
  getItem: async (key) => {
    try {
      const value = await storage.getString(key);
      if (value !== null) {
        return JSON.parse(value || '');
      }
    } catch (e) {
      // logDev(e);
    }
    return null;
  },
  setItem: async (key, value) => {
    try {
      const valueString = await JSON.stringify(value);
      await storage.set(key, valueString);
    } catch (e) {
      // logDev(e);
    }
  },
  removeItem: async (key) => {
    try {
      await storage.delete(key);
    } catch (e) {
      // logDev(e);
    }
  },
  getItemBoolean: async (key) => {
    try {
      const value = await storage.getBoolean(key);
      return value;
    } catch (e) {
      // logDev(e);
    }
    return false;
  },
  setItemBoolean: async (key, value) => {
    try {
      await storage.set(key, value);
    } catch (e) {
      // logDev(e);
    }
  },
  getItemString: async (key) => {
    try {
      const value = await storage.getString(key);
      if (value) {
        return value;
      }
    } catch (e) {
      // logDev(e);
    }
    return '';
  },
  setItemString: async (key, value) => {
    try {
      if (value) {
        await storage.set(key, value);
      } else {
        await storage.set(key, '');
      }
    } catch (e) {
      // logDev(e);
    }
  },
};

export default localStorage;
