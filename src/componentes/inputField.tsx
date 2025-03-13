import React, { forwardRef } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (text: string) => void;
  placeholder: string;
  keyboardType?: 'numeric' | 'default';
  maxLength?: number;
  returnKeyType?: 'next' | 'done';
  secureTextEntry?: boolean;
  onSubmitEditing?: () => void;
}

const InputField = forwardRef<TextInput, InputFieldProps>(
  ({ label, value, onChange, placeholder, keyboardType = 'default', maxLength, returnKeyType, secureTextEntry, onSubmitEditing }, ref) => {
    return (
      <View style={styles.container}>
        <Text style={styles.textTitulo}>{label}</Text>

        <TextInput
          ref={ref}
          style={styles.input}
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor="#999"
          keyboardType={keyboardType}
          maxLength={maxLength}
          returnKeyType={returnKeyType}
          secureTextEntry={secureTextEntry}
          onSubmitEditing={onSubmitEditing}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  textTitulo: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  input: {
    marginTop: 8,
    height: 52,
    borderColor: '#efeeef',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#efeeef',
    paddingHorizontal: 10,
  },
});

export default InputField;
