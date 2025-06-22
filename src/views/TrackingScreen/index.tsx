import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackButton from '../../components/BackButton';
import {useAppNavigation} from '../../navigation/hooks';
import {ROUTES} from '../../navigation/types';
import {Camera, LineLayer, MapView, MarkerView, ShapeSource} from '@maplibre/maplibre-react-native';
import {getLocationUpdates, stopLocationUpdates} from '../../utils/locationTracker';
import {useLiveTrackerActions, useLiveTrackerSelector} from '../../store/useLiveTracker';
import AppButton from '../../components/AppButton';

const TrackingScreen = () => {
  const navigation = useAppNavigation<ROUTES.TRACKING_SCREEN>();
  const path = useLiveTrackerSelector((s) => s.path);
  const {resetAction} = useLiveTrackerActions();
  const last = path[path.length - 1];

  useEffect(() => {
    getLocationUpdates();
    return () => {
      stopLocationUpdates();
    };
  }, []);

  const onClearTracking = () => {
    stopLocationUpdates();
    resetAction();
    navigation.goBack();
  };

  if (!last) {
    return null;
  }
  console.log('path', path);

  const lineStyle = {
    lineColor: 'red',
    lineWidth: 5
  };
  return (
    <SafeAreaView style={styles.flex_container}>
      <BackButton onBackPress={() => navigation.goBack()} />
      <View style={styles.padding_space}>
        <AppButton
          title='Clear Tracking'
          onPress={onClearTracking}
        />
      </View>
      <MapView
        style={styles.flex_container}
      >
        <Camera
          centerCoordinate={[last.longitude, last.latitude]}
          zoomLevel={16}
          animationMode="flyTo"
          animationDuration={1000}
        />
        {last && <MarkerView
          coordinate={[Number(last?.longitude), Number(last.latitude)]}

        >
          <Image
            source={require('../../assets/pin-map.png')}
            style={styles.marker}
          />
        </MarkerView>}
        <ShapeSource
          id='shape-source'
          shape={{
            type: 'LineString',
            coordinates: path.map((p) => [p.longitude, p.latitude])
          }}
          lineMetrics={true}
        >
          <LineLayer
            id='line-layer'
            sourceID='shape-source'
            style={lineStyle}
          />
        </ShapeSource>
      </MapView>
    </SafeAreaView>
  );
};

export default TrackingScreen;

const styles = StyleSheet.create({
  flex_container: {
    flex: 1,
  },
  padding_space: {
    paddingHorizontal: 16,
    paddingVertical: 4
  },
  marker: {
    height: 24,
    width: 24
  },
});
