import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, PermissionsAndroid, Platform } from "react-native";
import MapLibreGL, { MapView, Camera, PointAnnotation } from '@maplibre/maplibre-react-native';
import Geolocation from "@react-native-community/geolocation";

MapLibreGL.setAccessToken(null);
const apiKey = 'e7036cbf-5614-48b5-8072-6d9fbe11c725';
const styleUrl = `https://tiles.stadiamaps.com/styles/alidade_smooth.json?api_key=${apiKey}`;

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
};

const Mapa = () => {
  const [coordenadas, setCoordenadas] = useState<{ latitude: number; longitude: number } | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarLocalizacao = async () => {
      const permissaoConcedida = await solicitarPermissao();
      if (!permissaoConcedida) {
        setCarregando(false);
        return;
      }
      try {
        const location = await obterLocalizacao() as { latitude: number; longitude: number };
        setCoordenadas(location);
      } catch (error) {
        setCoordenadas(null); 
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

  return (
    <View style={styles.container}>
      <MapView style={styles.map} mapStyle={styleUrl}>
        <Camera
          centerCoordinate={coordenadas ? [coordenadas.longitude, coordenadas.latitude] : [regiaoInicial.longitude, regiaoInicial.latitude]}
          zoomLevel={17}
        />
        {coordenadas && (
          <PointAnnotation id="user-location" coordinate={[coordenadas.longitude, coordenadas.latitude]}>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontSize: 30 }}>📍</Text>
            </View>
        </PointAnnotation>
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1, width: "100%", height: "100%" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  marker: { alignItems: "center", justifyContent: "center" },
  markerText: { fontSize: 30 },
});

export default Mapa;
