import { useEffect, useState } from 'react';
import './css/bootstrap.min.css';
import { db } from './firebaseConfig.js';
import { collection, onSnapshot, addDoc } from 'firebase/firestore';

function App() {

  const [regalos, setRegalos] = useState([]);
  const [comida, setComida] = useState([]);
  const [adornos, setAdornos] = useState([]);

  useEffect(() => {
    fetchRegalos();
    fetchComida();
    fetchAdornos();
  }, []);

  const fetchRegalos = () => {
    const coleccionRef = collection(db, 'regalos')
    const unsubscribe = onSnapshot(coleccionRef, (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const regalos = ordenarRegalos(lista);
      setRegalos(regalos);
    })
    return () => unsubscribe();
  }

  const ordenarRegalos = (lista) => {
    const regalosOrdenados = [...lista].sort((a, b) => a.prioridad - b.prioridad);
    return regalosOrdenados;
  }

  const fetchComida = () => {
    const coleccionRef = collection(db, 'comida')
    const unsubscribe = onSnapshot(coleccionRef, (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComida(lista);
    })
    return () => unsubscribe();
  }

  const ordenarComida = () => {
    const comidaCongelada = comida.filter(item => item.congelado);
  }

  const fetchAdornos = () => {
    const coleccionRef = collection(db, 'adornos')
    const unsubscribe = onSnapshot(coleccionRef, (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAdornos(lista);
    })
    return () => unsubscribe();
  }

  const ordenarAdornos = () => {

  }


  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col">
            <h2>Regalos</h2>
            <ul>
              {regalos.map((regalo) => (
                <li key={regalo.id}>{regalo.nombre} - Prioridad: {regalo.prioridad}</li>
              ))}
            </ul>
          </div>
          <div className="col">
            <h2>Comida</h2>
            <ul>
              {comida.map((item) => (
                <li key={item.id}>{item.nombre} - {item.congelado ? 'Congleado' : 'No congelado'}</li>
              ))}
            </ul>
          </div>
          <div className="col">
            <h2>Adornos</h2>
            <ul>
              {adornos.map((adorno) => (
                <li key={adorno.id}>{adorno.nombre} - {adorno.cantidad}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
