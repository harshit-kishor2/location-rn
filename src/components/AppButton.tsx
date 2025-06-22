import React from 'react';
import {Text, TouchableOpacity, ActivityIndicator, ViewStyle, StyleSheet} from 'react-native';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: any;
  backgroundColor?: string;
}

const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  style,
  textStyle,
  backgroundColor = '#000',
}) => {

  const opacity = disabled ? 0.5 : 1;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.container,
        {
          backgroundColor,
          opacity
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={[styles.lable, textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default AppButton;
const styles = StyleSheet.create({
  container: {
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  lable: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  }
});
