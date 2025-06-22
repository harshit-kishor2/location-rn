import {StackNavigationOptions} from '@react-navigation/stack';

// Define the screen configuration type
type ScreenConfig = {
  name: keyof typeof ROUTES;
  component: React.ComponentType<any>;
  options?: StackNavigationOptions;
};

// Grouped screens type
export type GroupedScreens = {
  groupName: string;
  options?: StackNavigationOptions;
  screens: ScreenConfig[];
};

// Define routes as an enum
export enum ROUTES {
  SPLASH_SCREEN = 'SPLASH_SCREEN',
  HOME_SCREEN = 'HOME_SCREEN',
  SEARCH_SCREEN = 'SEARCH_SCREEN',
  MAP_SCREEN = 'MAP_SCREEN',
  TRACKING_SCREEN = 'TRACKING_SCREEN',
  BOTTOM_SHEET_SCREEN = 'BOTTOM_SHEET_SCREEN',
}

// Define RootStackParamList with types for each route
export type RootStackParamList = {
  [ROUTES.SPLASH_SCREEN]: undefined;
  [ROUTES.HOME_SCREEN]: undefined;
  [ROUTES.SEARCH_SCREEN]: {type: 'start' | 'end';};
  [ROUTES.MAP_SCREEN]: {route: any; start: any; end: any;};
  [ROUTES.TRACKING_SCREEN]: undefined;
  [ROUTES.BOTTOM_SHEET_SCREEN]: undefined;
};
