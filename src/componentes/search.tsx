import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface SearchBarProps {
  value: string;
  onChange: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}/>
      <TextInput
        style={styles.input}
        placeholder="Pesquise sua rua aqui"
        value={value}
        onChangeText={onChange}
        clearButtonMode="always" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 15,
    left: 20,
    right: 20,
    zIndex: 1000,
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  icon: {
    marginLeft: 5,
    marginRight: 6,
  },
  input: {
    height: 55,
    fontSize: 16,
    flex: 1,  
  },
});

export default SearchBar;
