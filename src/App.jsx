import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {
  const [busqueda, guardarBusqueda] = useState('');
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaActual, guardarPaginaActual] = useState(1);
  const [totalPaginas, guardarTotalPaginas] = useState(1);

  useEffect(()=>{
    const consultarAPI = async () => {
      if(busqueda === '') return;
      const imagesPerPage = 10;
      const key = '20402657-7d995e3e17bbf0dc01cbd3cc2';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagesPerPage}&page=${paginaActual}`;
      const response = await fetch(url);
      const result = await response.json();
      guardarImagenes(result.hits);

      const calcularTotalPaginas = Math.ceil(result.totalHits / imagesPerPage);
      guardarTotalPaginas(calcularTotalPaginas);
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({'behavior': 'smooth'});
    }
    consultarAPI();
  }, [busqueda, paginaActual]);

  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaActual - 1;
    if(nuevaPaginaActual ===  0) return;
    guardarPaginaActual(nuevaPaginaActual);
  }

  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaActual + 1;
    if(nuevaPaginaActual > totalPaginas) return;
    guardarPaginaActual(nuevaPaginaActual);
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imagenes</p>
        <Formulario
        guardarBusqueda={guardarBusqueda}
        />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes
        imagenes={imagenes}
        />
        {
          (paginaActual === 1) ? null : 
          <button 
          type="button" 
          className="btn btn-info mr-1"
          onClick={paginaAnterior}
          >&laquo; Anterior</button>
        }
        {
          (paginaActual === totalPaginas) ? null :
          <button 
          type="button" 
          className="btn btn-info"
          onClick={paginaSiguiente}
          >Siguiente &raquo;</button>
        }
      </div>
    </div>
  );
}

export default App;
