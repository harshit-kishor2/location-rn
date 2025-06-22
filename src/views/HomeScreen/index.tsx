import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppButton from '../../components/AppButton';
import SizedBox from '../../components/SizedBox';
import {useAppNavigation} from '../../navigation/hooks';
import {ROUTES} from '../../navigation/types';
import {useLocationActions, useLocationSelector} from '../../store/useLocationStore';
import LocationBox from './LocationBox';
import axios from 'axios';
import DATA from './data.json';
const HomeScreen = () => {

  const navigation = useAppNavigation<ROUTES.HOME_SCREEN>();
  const {startPoint: start, endPoint: end} = useLocationSelector(state => state);
  const {resetAction} = useLocationActions();

  useEffect(() => {
    return () => {
      resetAction();
    };
  }, []);

  const handleSelect = (type: 'start' | 'end') => {
    navigation.navigate(ROUTES.SEARCH_SCREEN, {type});
  };

  const handleConfirm = async () => {
    if (start && end) {
      try {
        const url = `https://router.project-osrm.org/route/v1/driving/${start.LONGITUDE},${start.LATITUDE};${end.LONGITUDE},${end.LATITUDE}?overview=full&geometries=geojson`;
        console.log('url', url);
        const res = await axios.get(url) as any;
        console.log('res', res);
        // const data = await res.json()
        navigation.navigate(ROUTES.MAP_SCREEN, {
          route: res?.data?.routes[0].geometry,
          start,
          end
        });
      } catch (error) {
        console.log('error', error);
        const res = DATA;
        navigation.navigate(ROUTES.MAP_SCREEN, {
          route: res?.routes[0].geometry,
          start,
          end
        });
      }
    }
  };


  return (
    <SafeAreaView style={styles.flex_container}>
      <LocationBox lable={start?.ADDRESS ?? 'Select Start'} handlePress={() => handleSelect('start')} />
      <SizedBox height={12} />
      <LocationBox lable={end?.ADDRESS ?? 'Select End'} handlePress={() => handleSelect('end')} />
      <SizedBox height={12} />
      <AppButton
        title="Get Route"
        disabled={!start || !end}
        onPress={handleConfirm}
      />
      <SizedBox height={12} />
      <AppButton
        title="Clear"
        disabled={!start || !end}
        onPress={resetAction}
      />
      <SizedBox height={12} />
      <AppButton
        title="Live Tracking"
        onPress={() => navigation.navigate(ROUTES.TRACKING_SCREEN)}
      />
      <SizedBox height={12} />
      <AppButton
        title="Bottom Sheet Example"
        onPress={() => navigation.navigate(ROUTES.BOTTOM_SHEET_SCREEN)}
      />
    </SafeAreaView>
  );
};


export default HomeScreen;

const styles = StyleSheet.create({
  flex_container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
  }
});
