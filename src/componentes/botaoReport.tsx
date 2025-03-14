import React from 'react';
import { StyleSheet, TouchableOpacity, Text, GestureResponderEvent, View } from 'react-native';
import { PointerType } from 'react-native-gesture-handler';

interface CenterButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  label: string;
}

const CenterButton: React.FC<CenterButtonProps> = ({ onPress, label }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#008a3b',
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 10,
    elevation: 3, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CenterButton;
