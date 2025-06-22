import React, {useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  LayoutChangeEvent,
} from 'react-native';
import {
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

interface BottomSheetProps {
  children: React.ReactNode;
  visible: boolean;
  onClose: () => void;
}

const BottomSheet = ({children, visible, onClose}: BottomSheetProps) => {
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const contentHeight = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      if (e.translationY > 0) {
        translateY.value = e.translationY;
      }
    })
    .onEnd((e) => {
      if (e.translationY > 100) {
        translateY.value = withSpring(SCREEN_HEIGHT, {damping: 20}, () => {
          runOnJS(onClose)();
        });
      } else {
        translateY.value = withSpring(0, {damping: 20});
      }
    });

  const rStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
  }));

  useEffect(() => {
    translateY.value = withSpring(visible ? 0 : SCREEN_HEIGHT, {damping: 20});
  }, [translateY, visible]);

  const onContentLayout = (event: LayoutChangeEvent) => {
    const height = event.nativeEvent.layout.height;
    contentHeight.value = height;
  };

  if (!visible) return null;

  return (
    <View style={StyleSheet.absoluteFillObject}>
      {/* Backdrop */}
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      {/* Bottom Sheet */}
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[styles.sheetContainer, rStyle]}
          onLayout={onContentLayout}
        >
          <View style={styles.handle} />
          {children}
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  sheetContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: SCREEN_HEIGHT * 0.9,
  },
  handle: {
    width: 60,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    marginBottom: 10,
  },
});
