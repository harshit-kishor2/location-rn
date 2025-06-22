import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';

const BackButton = ({
  onBackPress,
}: {
  onBackPress: () => void;
}) => {
  return (
    <View style={styles.row_header}>
      <Pressable
        onPress={onBackPress}>
        <Image
          source={require('../assets/back.png')}
          style={styles.back_image}
        />
      </Pressable>
    </View>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  row_header: {
    height: 48,
    width: '100%',
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center'
  },
  back_image: {
    height: 24,
    width: 24
  }
});
