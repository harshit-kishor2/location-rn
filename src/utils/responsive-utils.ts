import {Dimensions} from 'react-native';
import {s, vs, ms, mvs} from 'react-native-size-matters';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

// Get screen dimensions
const {width, height} = Dimensions.get('window');

// Base design dimensions (update these to match your design)
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

// Determine short and long dimensions based on orientation
const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

/**
 * Scale size based on screen width relative to the design guideline width.
 * @param {number} size - Size to scale.
 * @returns {number} Scaled size.
 */
export const rpWidth = (size: number): number =>
  Math.max(0, (shortDimension / guidelineBaseWidth) * size);

/**
 * Scale size based on screen height relative to the design guideline height.
 * @param {number} size - Size to scale.
 * @returns {number} Scaled size.
 */
export const rpHeight = (size: number): number =>
  Math.max(0, (longDimension / guidelineBaseHeight) * size);

/**
 * Scale size based on screen width relative to the design guideline width.
 * @param {number} size - Size to scale.
 * @returns {number} Scaled size.
 */
export const rpAround = (size: number): number => rpWidth(size);

/**
 * Moderately scale size based on screen width.
 * @param {number} size - Original size.
 * @param {number} [factor=0.5] - Scaling factor.
 * @returns {number} Moderately scaled size.
 */
export const rpWidthModerate = (size: number, factor: number = 0.5): number =>
  size + (rpWidth(size) - size) * factor;

/**
 * Moderately scale size based on screen height.
 * @param {number} size - Original size.
 * @param {number} [factor=0.5] - Scaling factor.
 * @returns {number} Moderately scaled size.
 */
export const rpHeightModerate = (size: number, factor: number = 0.5): number =>
  size + (rpHeight(size) - size) * factor;

/**
 * Scale size as a percentage of the screen height.
 * @param {number} percentage - Percentage of the height (e.g., 50 for 50%).
 * @returns {number} Scaled size.
 */
export const rpHeightPercentage = (percentage: number): number =>
  (longDimension * percentage) / 100;

/**
 * Scale size as a percentage of the screen width.
 * @param {number} percentage - Percentage of the width (e.g., 50 for 50%).
 * @returns {number} Scaled size.
 */
export const rpWidthPercentage = (percentage: number): number =>
  (shortDimension * percentage) / 100;

//! From react-native-responsive-fontsize
/**
 * Scale font size proportionally based on the screen's longer dimension.
 * @param {number} size - Font size to scale.
 * @returns {number} Scaled font size.
 */
export const rpFont = (size: number): number => RFValue(size, longDimension);

/**
 * Scale font size as a percentage of the screen dimensions.
 * @param {number} percentage - Font size as a percentage (e.g., 2.5 for 2.5%).
 * @returns {number} Scaled font size.
 */
export const rpFontPercentage = (percentage: number): number =>
  RFPercentage(percentage);

//! From react-native-size-matters
/**
 * Scale a value based on the standard scale factor.
 * @param {number} size - Original size.
 * @returns {number} Scaled size.
 */
export const scale = s;

/**
 * Scale a value based on the vertical scale factor.
 * @param {number} size - Original size.
 * @returns {number} Scaled vertical size.
 */
export const verticalScale = vs;

/**
 * Scale a value moderately based on the standard scale factor.
 * @param {number} size - Original size.
 * @param {number} [factor=0.5] - Scaling factor.
 * @returns {number} Moderately scaled size.
 */
export const moderateScale = ms;

/**
 * Scale a value moderately based on the vertical scale factor.
 * @param {number} size - Original size.
 * @param {number} [factor=0.5] - Scaling factor.
 * @returns {number} Moderately scaled vertical size.
 */
export const moderateVerticalScale = mvs;
