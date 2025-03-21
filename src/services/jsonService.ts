export const carregarCoordenadas = async () => {
    try {
      const dados = require('../dados/dados.json');
      return dados.flatMap((tipo: { tipo_lixo: string; locais: { latitude: number; longitude: number }[] }) =>
        tipo.locais.map((local) => ({
          latitude: local.latitude,
          longitude: local.longitude,
          tipo_lixo: tipo.tipo_lixo,
        }))
      );
    } catch (error) {
      console.error('Erro ao carregar o JSON:', error);
      return [];
    }
  };
  