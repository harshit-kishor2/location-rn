import {Alert, Linking, PermissionsAndroid, Platform, ToastAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import VIForegroundService from '@voximplant/react-native-foreground-service';
import {useLiveTrackerStore} from '../store/useLiveTracker';

let watchId: number | null = null;

const hasPermissionIOS = async () => {
  const openSetting = () => {
    Linking.openSettings().catch(() => {
      Alert.alert('Unable to open settings');
    });
  };
  const status = await Geolocation.requestAuthorization('whenInUse');

  if (status === 'granted') {
    return true;
  }

  if (status === 'denied') {
    Alert.alert('Location permission denied');
  }

  if (status === 'disabled') {
    Alert.alert(
      `Turn on Location Services to allow app to determine your location.`,
      '',
      [
        {text: 'Go to Settings', onPress: openSetting},
        {text: "Don't Use Location", onPress: () => {}},
      ],
    );
  }

  return false;
};

const hasLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    const hasPermission = await hasPermissionIOS();
    return hasPermission;
  }

  if (Platform.OS === 'android' && Platform.Version < 23) {
    return true;
  }

  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  }

  if (status === PermissionsAndroid.RESULTS.DENIED) {
    ToastAndroid.show(
      'Location permission denied by user.',
      ToastAndroid.LONG,
    );
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    ToastAndroid.show(
      'Location permission revoked by user.',
      ToastAndroid.LONG,
    );
  }

  return false;
};

export const getLocationUpdates = async () => {
  const hasPermission = await hasLocationPermission();

  if (!hasPermission) {
    return;
  }

  if (Platform.OS === 'android') {
    await startForegroundService();
  }

  watchId = Geolocation.watchPosition(
    position => {
      const pos = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      useLiveTrackerStore.getState().actions.addPathAction(pos);
    },
    error => {
      console.log(error);
    },
    {
      accuracy: {
        android: 'high',
        ios: 'best',
      },
      enableHighAccuracy: true,
      distanceFilter: 10,
      interval: 5000,
      fastestInterval: 2000,
      forceRequestLocation: true,
      forceLocationManager: false,
      showLocationDialog: true,
      useSignificantChanges: false,
    },
  );
};

const startForegroundService = async () => {
  if (Platform.Version >= '26') {
    await VIForegroundService.getInstance().createNotificationChannel({
      id: 'locationChannel',
      name: 'Location Tracking Channel',
      description: 'Tracks location of user',
      enableVibration: false,
    });
  }

  return VIForegroundService.getInstance().startService({
    channelId: 'locationChannel',
    id: 420,
    title: 'Hipster',
    text: 'Tracking location updates',
    icon: 'ic_launcher',
  });
};

export const stopLocationUpdates = () => {
  if (Platform.OS === 'android') {
    VIForegroundService.getInstance()
      .stopService()
      .catch((err: any) => err);
  }
  if (watchId !== null) {
    Geolocation.clearWatch(watchId);
    watchId = null;
  }
};
