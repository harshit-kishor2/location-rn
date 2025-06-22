import {useEffect, useMemo} from 'react';
import {Image, StyleSheet} from 'react-native';
import Animated, {runOnJS, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import Container from '../../components/Container';
import useSplashTimeout from '../../hooks/useSplashTimeout';
import {useAppNavigation} from '../../navigation/hooks';
import {ROUTES} from '../../navigation/types';
import ASSETS from '../../utils/assets';
import DeviceUtils from '../../utils/device-utils';
import {rpWidth} from '../../utils/responsive-utils';


const SplashScreen = () => {
  const styles = useMemo(() => splashScreenStyles(), []);
  const deviceHeight = DeviceUtils.WindowHeight;
  const status = useSplashTimeout();
  const navigation = useAppNavigation<ROUTES.SPLASH_SCREEN>();

  // Animated values
  const translateY = useSharedValue(-deviceHeight);

  // Entrance animation
  useEffect(() => {
    translateY.value = -deviceHeight;
    // Step 1: Animate entrance from top
    translateY.value = withTiming(0, {duration: 1000});
  }, [translateY, deviceHeight]);

  // Reverse animation and navigation
  useEffect(() => {
    if (status !== 'idle') {
      console.log('status', status);

      const onAnimationComplete = () => {
        let targetScreen = ROUTES.HOME_SCREEN;
        navigation.reset({
          index: 0,
          routes: [{name: targetScreen}],
        });
      };

      // Reverse animation: slide back up
      translateY.value = withTiming(
        -deviceHeight,
        {duration: 1000},
        finished => {
          if (!finished) return;
          runOnJS(onAnimationComplete)();
        },
      );
    }
  }, [status, navigation, translateY, deviceHeight]);

  // Animated style for rotation and translation
  const animatedStyle = useAnimatedStyle(() => {
    const borderRadius = translateY.value === 0 ? 0 : 200;
    return {
      transform: [{translateY: translateY.value}],
      borderBottomLeftRadius: borderRadius,
      borderBottomRightRadius: borderRadius,
      overflow: 'hidden',
    };
  });

  return (
    <Container useSafeArea={false}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <Image
          source={ASSETS.LOGO}
          style={styles.splsh_image}
        />
      </Animated.View>
    </Container>
  );
};

export default SplashScreen;

const splashScreenStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
    },
    splsh_image: {
      height: rpWidth(200),
      width: rpWidth(200),
      borderRadius: rpWidth(100),
    },
  });
