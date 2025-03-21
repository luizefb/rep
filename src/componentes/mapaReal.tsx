import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import MapLibreGL, { MapView, Camera, PointAnnotation, CameraRef } from '@maplibre/maplibre-react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { obterLocalizacaoUsuario } from '../services/localizacaoService';
import { carregarCoordenadas } from '../services/jsonService';

const apiKey = 'e7036cbf-5614-48b5-8072-6d9fbe11c725';
const styleUrl = `https://tiles.stadiamaps.com/styles/alidade_smooth.json?api_key=${apiKey}`;

const MapaReal = () => {
  const dispatch = useDispatch();
  const cameraRef = useRef<CameraRef>(null);
  const localizacaoUsuario = useSelector((state: RootState) => state.location);
  const [carregando, setCarregando] = useState(true);
  const [pontos, setPontos] = useState<{ latitude: number; longitude: number; tipo_lixo: string }[]>([]);
  const [info, setInfo] = useState<{ visible: boolean; tipo_lixo?: string }>({ visible: false });

  useEffect(() => {
    const carregarDados = async () => {
      setPontos(await carregarCoordenadas());
      setCarregando(false);
    };

    obterLocalizacaoUsuario(dispatch);
    carregarDados();
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
          ref={cameraRef}
          centerCoordinate={localizacaoUsuario.latitude ? [localizacaoUsuario.longitude!, localizacaoUsuario.latitude!] : [-48.49088, -1.46367]}
          zoomLevel={16}
        />

        {pontos.map((ponto, index) => (
          <PointAnnotation
            onSelected={() => setInfo({ visible: true, tipo_lixo: ponto.tipo_lixo })}
            onDeselected={() => setInfo({ visible: false })}
            key={`ponto-${index}`}
            id={`ponto-${index}`}
            coordinate={[ponto.longitude, ponto.latitude]}
          >
            <Text style={styles.marker}>📍</Text>
          </PointAnnotation>
        ))}

        {localizacaoUsuario.latitude && (
          <PointAnnotation id="usuario" coordinate={[localizacaoUsuario.longitude!, localizacaoUsuario.latitude!]}>
            <View style={styles.markerUsuario} />
          </PointAnnotation>
        )}
      </MapView>

      {info.visible && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Ponto de coleta de Lixo{'\n'}Tipo: {info.tipo_lixo}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1, width: '100%', height: '100%' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  marker: { fontSize: 30 },
  markerUsuario: { width: 20, height: 20, borderRadius: 10, backgroundColor: 'blue', borderWidth: 2, borderColor: 'white' },
  infoContainer: { position: 'absolute', bottom: 20, left: 50, right: 50, padding: 10, borderRadius: 10, backgroundColor: 'white' },
  infoText: { textAlign: 'center', fontSize: 16, fontWeight: 'bold', color: '#333' },
});

export default MapaReal;
