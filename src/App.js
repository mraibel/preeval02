import { useEffect, useState } from 'react';
import './css/bootstrap.min.css';
import { db } from './firebaseConfig.js';
import { collection, onSnapshot } from 'firebase/firestore';
import jsPDF from 'jspdf';
import { autoTable } from 'jspdf-autotable'

function App() {

  const [regalos, setRegalos] = useState([]);
  const [loadRegalos, setLoadRegalos] = useState(true);
  const [comida, setComida] = useState([]);
  const [loadComida, setLoadComida] = useState(true);
  const [adornos, setAdornos] = useState([]);
  const [loadAdornos, setLoadAdornos] = useState(true);

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
      setLoadRegalos(false);
    })
    return () => unsubscribe();
  }

  const ordenarRegalos = (lista) => {
    const regalosOrdenados = [...lista].sort((a, b) => a.prioridad - b.prioridad);
    return regalosOrdenados;
  }

  const pdfRegalos = () => {
    const doc = new jsPDF();
    
    doc.text('Regalos', 14, 15);
    
    const tableData = regalos.map(regalo => [regalo.nombre, regalo.familiar, regalo.prioridad]);
    
    autoTable(doc, {
      head: [['Nombre', 'Familiar', 'Prioridad']],
      body: tableData,
      startY: 20,
    });
    
    doc.save('regalos.pdf');
  }

  const fetchComida = () => {
    const coleccionRef = collection(db, 'comida')
    const unsubscribe = onSnapshot(coleccionRef, (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const comida = ordenarComida(lista);
      setComida(comida);
      setLoadComida(false);
    })
    return () => unsubscribe();
  }

  const ordenarComida = (lista) => {
    return [...lista].sort((a, b) => (b.congelado ? 1 : 0) - (a.congelado ? 1 : 0));
  }

  const pdfComida = () => {
    const doc = new jsPDF();
    
    doc.text('Comida', 14, 15);
    
    const tableData = comida.map(item => [item.nombre, item.congelado ? 'Congelado' : 'No congelado']);
    
    autoTable(doc, {
      head: [['Nombre', 'Estado']],
      body: tableData,
      startY: 20,
    });
    
    doc.save('comida.pdf');
  }

  const fetchAdornos = () => {
    const coleccionRef = collection(db, 'adornos')
    const unsubscribe = onSnapshot(coleccionRef, (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const adornos = ordenarAdornos(lista);
      setAdornos(adornos);
      setLoadAdornos(false);
    })
    return () => unsubscribe();
  }

  const ordenarAdornos = (lista) => {
    return [...lista].sort((a, b) => a.cantidad - b.cantidad);
  }

  const pdfAdornos = () => {
    const doc = new jsPDF();
    
    doc.text('Adornos', 14, 15);
    
    const tableData = adornos.map(adorno => [adorno.nombre, adorno.cantidad]);
    
    autoTable(doc, {
      head: [['Nombre', 'Cantidad']],
      body: tableData,
      startY: 20,
    });
    
    doc.save('adornos.pdf');
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col">
            <h2>Regalos</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Familiar</th>
                  <th>Prioridad</th>
                </tr>
              </thead>
              <tbody>
                {regalos.map((regalo) => (
                  <tr key={regalo.id}>
                    <td>{regalo.nombre}</td>
                    <td>{regalo.familiar}</td>
                    <td>{regalo.prioridad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={pdfRegalos}>PDF</button>
            <button>Excel</button>
            <button>PNG</button>
          </div>

          <div className="col">
            <h2>Comida</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {comida.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nombre}</td>
                    <td>{item.congelado ? 'Congelado' : 'No congelado'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={pdfComida}>PDF</button>
            <button>Excel</button>
            <button>PNG</button>
          </div>

          <div className="col">
            <h2>Adornos</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {adornos.map((adorno) => (
                  <tr key={adorno.id}>
                    <td>{adorno.nombre}</td>
                    <td>{adorno.cantidad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={pdfAdornos}>PDF</button>
            <button>Excel</button>
            <button>PNG</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
