import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import AppText from '../../components/AppText';

const LocationBox = ({
  lable,
  handlePress
}: {
  lable: string;
  handlePress: () => void;
}) => {
  return (
    <Pressable
      onPress={handlePress}
      style={styles.container}
    >
      <AppText >
        {lable ?? 'Select Location'}
      </AppText>
    </Pressable>
  );
};

export default LocationBox;

const styles = StyleSheet.create({
  container: {
    height: 48,
    width: '100%',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
  },

});
