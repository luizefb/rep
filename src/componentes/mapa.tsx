import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { obterLocalizacao } from "../hooks/localizacao";

const regiaoInicial: Region = {
  latitude: -1.46366760474,
  longitude: -48.490884461,
  latitudeDelta: 0.003,
  longitudeDelta: 0.003,
};

const Mapa: React.FC = () => {
  const [coordenadas, setCoordenadas] = useState<{ latitude: number; longitude: number } | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    obterLocalizacao()
      .then((location) => setCoordenadas(location))
      .catch((error) => {
        console.error("Erro ao obter localização:", error);
        setErro("Não foi possível obter a localização.");
      })
      .finally(() => setCarregando(false));
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
        {coordenadas && (
          <Marker coordinate={coordenadas} title="Sua Localização" />
        )}
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
