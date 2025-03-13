import React, { useState } from 'react';
import { View } from 'react-native';

import SearchBar from '../componentes/search';
import Mapa from '../componentes/mapa';

function Home(): React.JSX.Element {

  const [search, setSearch] = useState<string>('');

  const searchTeste = (text: string): void => {
    setSearch(text);
    console.log("busca:", text);
  };

  return (
    <View style={{ flex: 1 }}>
      <SearchBar value={search} onChange={searchTeste} />

      <Mapa />
    </View>
  );
}

export default Home;
