import {useEffect, useState} from 'react';
import './App.css';
import { Config } from './config';
import Layout1 from './layouts/Layout1';
import Layout2 from './layouts/Layout2';
import Layout3 from './layouts/Layout3';

function App() {
  const [layout, setLayout] = useState('1');
  

  useEffect(() => {
    const loadLayout = async () => {
      let userId = localStorage.getItem('userId');
      if(!userId) {
        userId = Math.random();
        localStorage.setItem('userId', userId);
      }

      try {
        const res = await fetch(Config.apiUrl, {
          headers: {
            userId: userId
          }
        });
        const data = await res.json();
        setLayout(data.layout);
      } catch (err) {
        console.log(err)
      }
    }

    loadLayout();
  },[]);


  return (
    <>
      {layout === 1 && <Layout1/>}
      {layout === 2 && <Layout2/>}
      {layout === 3 && <Layout3/>}
    </>
  );
}

export default App;
