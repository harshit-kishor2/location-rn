
import React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

type PropsWithChildren = {
  children: React.ReactNode;
};

//! Layout Providers Composition
const LayoutProviders: React.FC<PropsWithChildren> = ({children}) => (
  <GestureHandlerRootView style={styles.flexContainer}>
    <SafeAreaProvider style={styles.flexContainer}>
      {children}
    </SafeAreaProvider>
  </GestureHandlerRootView>
);

//! Root Wrapper Component with all Providers
const RootWrapper: React.FC<PropsWithChildren> = ({children}) => (
  <LayoutProviders>
    {children}
  </LayoutProviders>
);

export default RootWrapper;

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
});
