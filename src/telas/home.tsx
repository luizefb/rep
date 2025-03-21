import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { View } from 'react-native';
import store from '../redux/store';
import MapaReal from '../componentes/mapaReal';

import SearchBar from '../componentes/search';
import MapaTeste from '../componentes/mapateste';


function Home(): React.JSX.Element {

  const [search, setSearch] = useState<string>('');

  const searchTeste = (text: string): void => {
    setSearch(text);
    console.log("busca:", text);
  };

  return (
    <Provider store={store}>
      <MapaReal />
    </Provider>
  );
}

export default Home;
