import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, PermissionsAndroid, Platform } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";

const solicitarPermissao = async () => {
  if (Platform.OS === "android") {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
};

const obterLocalizacao = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => reject(error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  });
};

const regiaoInicial = {
  latitude: -1.46366760474,
  longitude: -48.490884461,
  latitudeDelta: 0.003,
  longitudeDelta: 0.003,
};

const Mapa = () => {
  const [coordenadas, setCoordenadas] = useState<{ latitude: number; longitude: number } | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const carregarLocalizacao = async () => {
      const permissaoConcedida = await solicitarPermissao();
      if (!permissaoConcedida) {
        setErro("Permissão de localização negada.");
        setCarregando(false);
        return;
      }
      try {
        const location = await obterLocalizacao() as { latitude: number; longitude: number };
        setCoordenadas(location);
      } catch (error) {
        setErro("Não foi possível obter a localização.");
      }
      setCarregando(false);
    };
    carregarLocalizacao();
  }, []);

  if (carregando) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando mapa...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{erro}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={coordenadas ? { ...coordenadas, latitudeDelta: 0.003, longitudeDelta: 0.003 } : regiaoInicial}
      >
        {coordenadas && <Marker coordinate={coordenadas} title="Sua Localização" />}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1, width: "100%", height: "100%" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { color: "red", fontSize: 16 },
});

export default Mapa;
