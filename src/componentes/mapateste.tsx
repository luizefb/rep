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

const MapaTeste = () => {
  const [carregando, setCarregando] = useState(true);
  const [coordenadasExternas, setCoordenadasExternas] = useState<{ latitude: number; longitude: number }[]>([]);
  const [info, setInfo] = useState(false);

  useEffect(() => {
    const carregarCoordenadas = () => {
      try {
        // Importar o arquivo JSON diretamente da pasta src/dados
        const dados = require('../dados/dados.json'); // Caminho relativo ao arquivo atual

        // Converter coordenadas para números (caso sejam strings)
        const coordenadasNumericas = dados.map((ponto: { latitude: string; longitude: string }) => ({
          latitude: parseFloat(ponto.latitude),
          longitude: parseFloat(ponto.longitude),
        }));

        setCoordenadasExternas(coordenadasNumericas);
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

  const informacao = () => {
    setInfo(!info);
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} mapStyle={styleUrl}>
        <Camera
          centerCoordinate={[regiaoInicial.longitude, regiaoInicial.latitude]}
          zoomLevel={16}
        />
        
        {coordenadasExternas.map((ponto, index) => (
          <PointAnnotation
            onSelected={informacao}
            onDeselected={informacao}
            key={`ponto-${index}`}
            id={`ponto-${index}`}
            coordinate={[ponto.longitude, ponto.latitude]}
          >
            <Text style={styles.marker}>📍</Text>
          </PointAnnotation>
        ))}
      </MapView>

      {info && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Ponto de coleta de Lixo {'\n'}
            *informações adicionais*
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
    textShadowColor: 'rgba(0, 0, 0, 0.5)', // Sombra para melhorar a visibilidade
    textShadowOffset: { width: 1, height: 1 }, // Deslocamento da sombra
    textShadowRadius: 2, // Raio da sombra
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