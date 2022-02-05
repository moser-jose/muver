import React from 'react';
import Header from '../components/Header';
import OpenSource from '../components/OpenSource';
import { useApiContext } from '../contexts/ApiContext';

export const Genrs = () => {
  const{filmesdiscover,loading}=useApiContext();

        const fil = filmesdiscover.filter((item) => item.genre_ids.find(e => e === 28))

        console.log(fil);

  return <div className="autores-detalhes">
    <OpenSource/>
    <Header/>

  </div>;
};
