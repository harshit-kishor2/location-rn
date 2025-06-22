import {MMKV} from 'react-native-mmkv';

/**
 * Initialize MMKV instance for Zustand storage.
 */
const zustandLocalStorage = new MMKV({
  id: 'zustand-local-storage',
  encryptionKey: 'zustandLocalStorageEncryptionKey',
});

/**
 * MMKV storage adapter for Zustand.
 * Provides methods for getting, setting, and removing state from the storage.
 */
export const zustandPersistStorage = {
  /**
   * Get the state from the storage based on the key.
   * @param key The key to retrieve the state from.
   * @returns The state from the storage, or null if it doesn't exist.
   */
  getItem: (key: string) => {
    const value = zustandLocalStorage.getString(key);
    return value ? JSON.parse(value) : null;
  },
  /**
   * Set the state in the storage based on the key.
   * @param key The key to store the state with.
   * @param value The state to store.
   */
  setItem: (key: string, value: any) => {
    zustandLocalStorage.set(key, JSON.stringify(value));
  },
  /**
   * Remove the state from the storage based on the key.
   * @param key The key to remove the state from.
   */
  removeItem: (key: string) => {
    zustandLocalStorage.delete(key);
  },
};
