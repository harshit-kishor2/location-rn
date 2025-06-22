import React from 'react';
import {TextInput, TextInputProps, View, Text, StyleSheet} from 'react-native';

interface AppInputProps extends TextInputProps {
  label?: string;
  error?: string;
}

const AppInput: React.FC<AppInputProps> = ({label, error, style, ...props}) => {
  const borderColor = error ? 'red' : '#ccc';
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          style,
          {borderColor},
        ]}
        placeholderTextColor="#aaa"
        {...props}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {marginVertical: 8},
  label: {
    fontSize: 14,
    marginBottom: 4,
    color: '#333',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#000',
  },
  error: {
    marginTop: 4,
    color: 'red',
    fontSize: 12,
  },
});

export default AppInput;
