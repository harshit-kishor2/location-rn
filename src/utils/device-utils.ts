import {Platform, Dimensions, ScaledSize} from 'react-native';

//=============================

// ! Screen Constants
const Screen: ScaledSize = Dimensions.get('screen');

/**
 * @description
 * The width of the screen.
 * @type {number}
 */
const ScreenWidth: number = Screen.width;

/**
 * @description
 * The height of the screen.
 * @type {number}
 */
const ScreenHeight: number = Screen.height;

/**
 * @description
 * The scale of the screen.
 * @type {number}
 */
const ScreenScale: number = Screen.scale;

/**
 * @description
 * The font scale of the screen.
 * @type {number}
 */
const ScreenFontScale: number = Screen.fontScale;

//=============================

// ! Window Constants

const Window: ScaledSize = Dimensions.get('window');

/**
 * @description
 * The width of the window.
 * @type {number}
 */
const WindowWidth: number = Window.width;

/**
 * @description
 * The height of the window.
 * @type {number}
 */
const WindowHeight: number = Window.height;

/**
 * @description
 * The scale of the window.
 * @type {number}
 */
const WindowScale: number = Window.scale;

/**
 * @description
 * The font scale of the window.
 * @type {number}
 */
const WindowFontScale: number = Window.fontScale;

// ! Platform related
/**
 * @description
 * Determines whether the app is running on iOS.
 * @type {boolean}
 */
const isIOS: boolean = Platform.OS === 'ios';

/**
 * @description
 * Determines whether the app is running on android.
 * @type {boolean}
 */
const isAndroid: boolean = Platform.OS === 'android';

/**
 * @description
 * Gets the version number of the platform.
 */
const PlatformVersion = Platform.Version;

// Default the constants as an object
const DeviceUtils = {
  ScreenWidth,
  ScreenHeight,
  ScreenScale,
  ScreenFontScale,
  WindowWidth,
  WindowHeight,
  WindowScale,
  WindowFontScale,
  isIOS,
  isAndroid,
  PlatformVersion,
};

export default DeviceUtils;
