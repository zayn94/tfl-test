import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [tubeStatus, setTubeStatus] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://api.tfl.gov.uk/Line/Mode/Tube/Status'
        );
        const result = await response.json();
        console.log('yoo', result);
      } catch (error) {
        console.error('error fetching status..', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div>
        {}
        <div>
          <p></p>
        </div>
      </div>
    </>
  );
}

export default App;
