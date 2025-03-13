import React, { useRef, useState } from "react";
import { View, Alert, StyleSheet, TextInput } from "react-native";
import InputField from "../componentes/inputField";
import CenterButton from "../componentes/botaoReport";
import { useAuth } from "../hooks/AuthContext";

const Login = ({ navigation }: any) => {
  const { login } = useAuth();
  const [user, setUser] = useState("");
  const [senha, setSenha] = useState("");

  const inputSenha = useRef<TextInput>(null);

  const handleLogin = () => {
    if (user === "user" && senha === "senha") {
      Alert.alert("Login bem-sucedido!");
      login();
    } else {
      Alert.alert("Credenciais inválidas.");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <InputField label="Usuário" value={user} onChange={setUser} placeholder="Digite seu usuário" returnKeyType="next" onSubmitEditing={() => inputSenha.current?.focus()} />
      <InputField label="Senha" value={senha} onChange={setSenha} placeholder="Digite a senha" ref={inputSenha} returnKeyType="done" />

      <View style={styles.container}>
        <CenterButton label="Entrar" onPress={handleLogin} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    top: 10
  }
})

export default Login;
