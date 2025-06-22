
import omit from 'lodash/omit';
import {create, StateCreator} from 'zustand';
import {createJSONStorage, persist, PersistOptions} from 'zustand/middleware';
import {zustandPersistStorage} from './zustand-storage';

// ! ================= Constants ================= ! //

const SLICE_FEATURE_KEY = `location-store`; // Key used for persistent storage

// ! ================= Types ================= ! //
interface ILocationState {
  startPoint: Address | null;
  endPoint: Address | null;
}

interface ILocationActions {
  setLocationPointAction: ({
    type,
    location,
  }: {
    type: 'start' | 'end';
    location: Address;
  }) => void;
  resetAction: () => void;
}

interface ILocationStore extends ILocationState {
  actions: ILocationActions;
}

// ! ================= Store ================= ! //
/**
 * Default initial state for.
 */
const initialState: ILocationState = {
  startPoint: null,
  endPoint: null,
};

/**
 * Creates a slice, including state and actions.
 */
const createLocationSlice: StateCreator<ILocationStore> = set => ({
  ...initialState,
  actions: {
    setLocationPointAction: ({type, location}: {type: 'start' | 'end'; location: Address;}) => {
      if (type === 'start') set({startPoint: location});
      else set({endPoint: location});
    },
    resetAction: () => set({...initialState}),
  },
});

/**
 * Generic factory to create store.
 * @param persistEnabled - Whether to enable persistence
 */
const createLocationStore = (persistEnabled = false) => {
  const store = createLocationSlice;
  if (!persistEnabled) {
    return create<ILocationStore>()(store);
  }

  // Define the persist options with explicit typing
  const persistOptions: PersistOptions<ILocationStore, ILocationState> = {
    name: SLICE_FEATURE_KEY,
    storage: createJSONStorage(() => zustandPersistStorage),
    partialize: (state: ILocationStore): ILocationState =>
      omit(state, ['actions']),
    version: 1,
  };

  return create<ILocationStore>()(persist(store, persistOptions));
};

const useLocationStore = createLocationStore(true);

// ! ================= Custom hooks ================= ! //
/**
 * Custom hook to select a specific value from the store.
 * @example
 * const yourValue = useLocationSelector(state => state.yourValue);
 */
const useLocationSelector = <T>(selector: (state: ILocationState) => T): T =>
  useLocationStore(state => selector(state));

/**
 * Custom hook to access store actions.
 * @example
 * const { yourAction } = useLocationActions();
 */
const useLocationActions = (): ILocationActions =>
  useLocationStore(state => state.actions);

export {useLocationActions, useLocationSelector, useLocationStore};
