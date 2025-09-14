import { useEffect, useState } from 'react';
import type { Line, TflStatusResponse } from './types/tfl';

import './App.css';
import LineSummary from './components/LineSummary';

function App() {
  const [tubeStatus, setTubeStatus] = useState<TflStatusResponse>([]);
  const [openLines, setOpenLines] = useState<String[]>([]);
  const apiKey = import.meta.env.VITE_TFL_API_KEY;

  const lineStyles: Record<string, string> = {
    bakerloo: '#894e24',
    central: '#dc241f',
    circle: '#ffce00',
    district: '#007229',
    'hammersmith-city': '#d799af',
    jubilee: '#6a7278',
    metropolitan: '#751056',
    northern: '#000000',
    piccadilly: '#0019a8',
    victoria: '#00a0e2',
    'waterloo-city': '#76d0bd',
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `http://api.tfl.gov.uk/Line/Mode/Tube/Status?app_key=${apiKey}`;
        const response = await fetch(url);
        const result = await response.json();
        setTubeStatus(result);
      } catch (error) {
        console.error('error fetching status..', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='lines-container'>
      {tubeStatus?.map((line: Line) => (
        <LineSummary
          key={line.id}
          line={line}
          lineStyles={lineStyles}
          isOpen={openLines.includes(line.id)}
          onClick={() => {
            setOpenLines((prevOpenLines) =>
              prevOpenLines.includes(line.id)
                ? prevOpenLines.filter((id) => id !== line.id)
                : [...prevOpenLines, line.id]
            );
          }}
        />
      ))}
    </div>
  );
}

export default App;
