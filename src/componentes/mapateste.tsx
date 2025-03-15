import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import MapLibreGL, { MapView, Camera, PointAnnotation } from '@maplibre/maplibre-react-native';

MapLibreGL.setAccessToken(null);
const apiKey = 'e7036cbf-5614-48b5-8072-6d9fbe11c725';
const styleUrl = `https://tiles.stadiamaps.com/styles/alidade_smooth.json?api_key=${apiKey}`;

const regiaoInicial = {
  latitude: -1.46366760474,
  longitude: -48.490884461,
};
interface Local {
  latitude: number;
  longitude: number;
}

interface PontoColeta {
  tipo_lixo: string;
  locais: Local[];
}

interface PontoFormatado {
  latitude: number;
  longitude: number;
  tipo_lixo: string;
}

const MapaTeste = () => {
  const [carregando, setCarregando] = useState(true);
  const [pontos, setPontos] = useState<PontoFormatado[]>([]);
  const [info, setInfo] = useState<{ visible: boolean; tipo_lixo?: string }>({ visible: false });

  useEffect(() => {
    const carregarCoordenadas = async () => {
      try {
        const dados: PontoColeta[] = require('../dados/dados.json');

        const pontosFormatados: PontoFormatado[] = dados.flatMap((tipo) => 
          tipo.locais.map((local) => ({
            latitude: local.latitude,
            longitude: local.longitude,
            tipo_lixo: tipo.tipo_lixo,
          }))
        );

        setPontos(pontosFormatados);
        setCarregando(false);
      } catch (error) {
        console.error('Erro ao carregar o JSON:', error);
        setCarregando(false);
      }
    };

    carregarCoordenadas();
  }, []);

  if (carregando) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando mapa...</Text>
      </View>
    );
  }

  const informacao = (tipo: string) => {
    setInfo({ visible: true, tipo_lixo: tipo });
  };

  const fecharInformacao = () => {
    setInfo({ visible: false });
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} mapStyle={styleUrl}>
        <Camera
          centerCoordinate={[regiaoInicial.longitude, regiaoInicial.latitude]}
          zoomLevel={16}
        />
        
        {pontos.map((ponto, index) => (
          <PointAnnotation
            onSelected={() => informacao(ponto.tipo_lixo)}
            onDeselected={fecharInformacao}
            key={`ponto-${index}`}
            id={`ponto-${index}`}
            coordinate={[ponto.longitude, ponto.latitude]}
          >
            <Text style={styles.marker}>📍</Text>
          </PointAnnotation>
        ))}
      </MapView>

      {info.visible && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Ponto de coleta de Lixo {'\n'}
            Tipo: {info.tipo_lixo}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  marker: {
    fontSize: 30, // Tamanho do emoji
    textShadowColor: 'rgba(0, 0, 0, 0.5)', 
    textShadowOffset: { width: 1, height: 1 }, 
    textShadowRadius: 2,
  },
  infoContainer: {
    position: 'absolute',
    bottom: 20,
    left: 50,
    right: 50,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  infoText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default MapaTeste;