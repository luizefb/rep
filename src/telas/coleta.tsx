import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, StatusBar, KeyboardAvoidingView, ScrollView, Keyboard, TextInput, Alert } from 'react-native';
import CenterButton from '../componentes/botaoReport';
import InputField from '../componentes/inputField';
import { SelectList } from 'react-native-dropdown-select-list'

const Coleta: React.FC = () => {
  const [endereco, setEndereco] = useState<string>('');
  const [numero, setNumero] = useState<string>('');
  const [bairro, setBairro] = useState<string>('');
  const [lixo, setLixo] = useState<string>('');
  

  const inputNumero = useRef<TextInput>(null);
  const inputBairro = useRef<TextInput>(null);
  const inputTipo = useRef<TextInput>(null);

  const data = [
    {key:'1', value:'-- Selecione uma das opções --', disabled:true},
    {key:'2', value:'Lixo doméstico'},
    {key:'3', value:'Lixo reciclável'},
    {key:'4', value:'Lixo eletrônico'},
    {key:'5', value:'Lixo hospitalar'},
    {key:'6', value:'Lixo radioativo'},
    {key:'7', value:'Lixo industrial'},
  ] 

  const gerarJSON = (): void => {
    const dadosFormulario = {
      endereco,
      numero,
      bairro,
      tipoLixo: lixo,
    };

    console.log(JSON.stringify(dadosFormulario, null, 2));

    /*temporario só pra testar */
    Alert.alert('Dados do Formulário', `Endereço: ${endereco}\nNúmero: ${numero}\nBairro: ${bairro}\nTipo de Lixo: ${lixo}`);

    setEndereco('');
    setNumero('');
    setBairro('');
    setLixo('');
  };

  return (
    <KeyboardAvoidingView style={styles.container1} behavior="padding">
      <StatusBar barStyle="dark-content"/>
 
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>Formulário</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.form}>
          <InputField label="Endereço" value={endereco} onChange={setEndereco} placeholder="Digite a rua" returnKeyType="next" onSubmitEditing={() => inputNumero.current?.focus()} />
          <InputField label="Número" value={numero} onChange={setNumero} placeholder="Digite o número da sua residência" keyboardType="numeric" maxLength={8} ref={inputNumero} returnKeyType="next" onSubmitEditing={() => inputBairro.current?.focus()}  />
          <InputField label="Bairro" value={bairro} onChange={setBairro} placeholder="Digite o bairro" ref={inputBairro } returnKeyType="next" onSubmitEditing={() => inputTipo.current?.focus()} />
          <View style={styles.line} />

          <Text style={styles.textTitulo}>
            Tipo de Lixo
          </Text>

          <SelectList 
            boxStyles={styles.dropdown}
            setSelected={(val: string) => setLixo(val)}
            data={data}
            save="value"
            search={false}
            placeholder='Selecione uma opção'
          />
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <CenterButton label="Enviar" onPress={gerarJSON} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: '#fefeff',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  topBar: {
    height: 60,
    backgroundColor: '#597445',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  topBarText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  form: {
    flex: 1,
    padding: 18,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  dropdown: {
    marginTop: 8,
    height: 52,
    borderColor: '#efeeef',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#efeeef',
    paddingHorizontal: 10,
  },
  textTitulo: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default Coleta;
