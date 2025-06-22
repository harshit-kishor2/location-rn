import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from './types';

/**
 * Generic hook to get typed Stack Navigation
 * @template T - Screen name key from RootStackParamList
 */
const useAppNavigation = <T extends keyof RootStackParamList>() => {
  return useNavigation<StackNavigationProp<RootStackParamList, T>>();
};

/**
 * Generic hook to get typed Route
 * @template T - Screen name key from RootStackParamList
 */
const useAppRoute = <T extends keyof RootStackParamList>() => {
  return useRoute<RouteProp<RootStackParamList, T>>();
};

export {useAppNavigation, useAppRoute};
