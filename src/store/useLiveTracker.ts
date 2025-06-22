
import omit from 'lodash/omit';
import {create, StateCreator} from 'zustand';
import {createJSONStorage, persist, PersistOptions} from 'zustand/middleware';
import {zustandPersistStorage} from './zustand-storage';

// ! ================= Constants ================= ! //

const SLICE_FEATURE_KEY = `live-tracker-store`; // Key used for persistent storage

type Coord = {latitude: number; longitude: number;};
// ! ================= Types ================= ! //
interface ILiveTrackerState {
  path: Coord[];
}

interface ILiveTrackerActions {
  addPathAction: (loc: Coord) => void;
  resetAction: () => void;
}

interface ILiveTrackerStore extends ILiveTrackerState {
  actions: ILiveTrackerActions;
}

// ! ================= Store ================= ! //
/**
 * Default initial state for.
 */
const initialState: ILiveTrackerState = {
  path: [],
};

/**
 * Creates a slice, including state and actions.
 */
const createLiveTrackerSlice: StateCreator<ILiveTrackerStore> = set => ({
  ...initialState,
  actions: {
    addPathAction: (loc: Coord) =>
      set((state) => {
        const last = state.path[state.path.length - 1];
        if (last && last.latitude === loc.latitude && last.longitude === loc.longitude) {
          return {}; // don't add duplicate
        }
        return {path: [...state.path, loc]};
      }),
    resetAction: () => set({...initialState}),
  },
});

/**
 * Generic factory to create store.
 * @param persistEnabled - Whether to enable persistence
 */
const createLiveTrackerStore = (persistEnabled = false) => {
  const store = createLiveTrackerSlice;
  if (!persistEnabled) {
    return create<ILiveTrackerStore>()(store);
  }

  // Define the persist options with explicit typing
  const persistOptions: PersistOptions<ILiveTrackerStore, ILiveTrackerState> = {
    name: SLICE_FEATURE_KEY,
    storage: createJSONStorage(() => zustandPersistStorage),
    partialize: (state: ILiveTrackerStore): ILiveTrackerState =>
      omit(state, ['actions']),
    version: 1,
  };

  return create<ILiveTrackerStore>()(persist(store, persistOptions));
};

const useLiveTrackerStore = createLiveTrackerStore(true);

// ! ================= Custom hooks ================= ! //
/**
 * Custom hook to select a specific value from the store.
 * @example
 * const yourValue = useLiveTrackerSelector(state => state.yourValue);
 */
const useLiveTrackerSelector = <T>(selector: (state: ILiveTrackerState) => T): T =>
  useLiveTrackerStore(state => selector(state));

/**
 * Custom hook to access store actions.
 * @example
 * const { yourAction } = useLiveTrackerActions();
 */
const useLiveTrackerActions = (): ILiveTrackerActions =>
  useLiveTrackerStore(state => state.actions);

export {useLiveTrackerActions, useLiveTrackerSelector, useLiveTrackerStore};
