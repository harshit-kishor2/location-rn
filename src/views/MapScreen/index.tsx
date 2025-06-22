import {Camera, LineLayer, MapView, MarkerView, ShapeSource} from '@maplibre/maplibre-react-native';
import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackButton from '../../components/BackButton';
import {useAppNavigation, useAppRoute} from '../../navigation/hooks';
import {ROUTES} from '../../navigation/types';

const MapScreen = () => {
  const {route, start, end} = useAppRoute<ROUTES.MAP_SCREEN>().params;
  const navigation = useAppNavigation<ROUTES.HOME_SCREEN>();
  console.log('coordinates', route, start);

  return (
    <SafeAreaView style={styles.flex_container}>
      <BackButton
        onBackPress={() => navigation.goBack()}
      />
      <MapView
        style={{flex: 1}}
      >
        <Camera
          centerCoordinate={[Number(start.LONGITUDE), Number(start.LATITUDE)]}
          zoomLevel={12}
        />
        <MarkerView
          coordinate={[Number(start.LONGITUDE), Number(start.LATITUDE)]}

        >
          <Image
            source={require('../../assets/pin-map.png')}
            style={{
              height: 24,
              width: 24
            }}
          />
        </MarkerView>
        <MarkerView
          coordinate={[Number(end.LONGITUDE), Number(end.LATITUDE)]}
        >
          <Image
            source={require('../../assets/pin-map.png')}
            style={{
              height: 24,
              width: 24
            }}
          />
        </MarkerView>
        <ShapeSource
          id='shape-source'
          shape={route}
          lineMetrics={true}
        >
          <LineLayer
            id='line-layer'
            sourceID='shape-source'
            style={{
              lineColor: 'red',
              lineWidth: 5
            }}
          />
        </ShapeSource>
      </MapView>
    </SafeAreaView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  flex_container: {
    flex: 1,
    paddingVertical: 12,
  },
});
