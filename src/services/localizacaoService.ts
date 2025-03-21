import Geolocation from '@react-native-community/geolocation';
import { AppDispatch } from '../redux/store';
import { setLocation } from '../redux/localizacao';
import { PermissionsAndroid, Platform } from 'react-native';

Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'whenInUse',
  locationProvider: 'playServices',
});

export const solicitarPermissaoLocalizacao = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
    ]);

    return (
      granted['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED &&
      granted['android.permission.ACCESS_BACKGROUND_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED
    );
  }
  return true;
};

export const obterLocalizacaoUsuario = (dispatch: AppDispatch) => {
  Geolocation.getCurrentPosition(
    (posicao) => {
      const { latitude, longitude } = posicao.coords;
      dispatch(setLocation({ latitude, longitude }));
    },
    (erro) => {
      console.error('Erro ao obter localização:', erro.message);
    },
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  );
};
