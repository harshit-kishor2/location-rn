import {CardStyleInterpolators, StackNavigationOptions} from '@react-navigation/stack';
import {GroupedScreens, ROUTES} from './types';
import SplashScreen from '../views/SplashScreen';
import HomeScreen from '../views/HomeScreen';
import SearchScreen from '../views/SearchScreen';
import MapScreen from '../views/MapScreen';
import TrackingScreen from '../views/TrackingScreen';
import BottomSheetScreen from '../views/BottomSheetScreen';


const SCREEN_OPTIONS = {
  stack: {
    headerShown: false,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  } as StackNavigationOptions,
  modal: {
    presentation: 'modal',
    headerShown: false,
    gestureEnabled: true,
    gestureDirection: 'vertical',
    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
  } as StackNavigationOptions,
};

//! Define the grouped screens with options
export const groupedScreens: GroupedScreens[] = [
  {
    groupName: 'public',
    options: SCREEN_OPTIONS.stack, // Apply options from SCREEN_OPTIONS
    screens: [
      {
        name: ROUTES.SPLASH_SCREEN,
        component: SplashScreen,
      },
      {
        name: ROUTES.HOME_SCREEN,
        component: HomeScreen,
      },
      {
        name: ROUTES.SEARCH_SCREEN,
        component: SearchScreen,
      },
      {
        name: ROUTES.MAP_SCREEN,
        component: MapScreen,
      },
      {
        name: ROUTES.TRACKING_SCREEN,
        component: TrackingScreen,
      },
    ],
  },
  {
    groupName: 'modal',
    options: SCREEN_OPTIONS.modal, // Use modal-specific options from SCREEN_OPTIONS
    screens: [
      {
        name: ROUTES.BOTTOM_SHEET_SCREEN,
        component: BottomSheetScreen,
        options: SCREEN_OPTIONS.modal, // Override if needed
      },
    ],
  },
];
