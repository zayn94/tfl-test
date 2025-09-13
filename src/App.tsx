import { useEffect, useState } from 'react';
import type { Line, LineStatus, TflStatusResponse } from './types/tfl';

import './App.css';

function App() {
  const [tubeStatus, setTubeStatus] = useState<TflStatusResponse>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://api.tfl.gov.uk/Line/Mode/Tube/Status'
        );
        const result = await response.json();
        console.log(result);
        setTubeStatus(result);
      } catch (error) {
        console.error('error fetching status..', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div>
        {tubeStatus?.map((line: Line) => (
          <div key={line.id}>
            <p>{line.name}</p>
            {line.lineStatuses.map((status: LineStatus) => (
              <div>
                {status.disruption && (
                  <div>
                    <p>{status.statusSeverityDescription}</p>
                    <p>{status.reason}</p>
                  </div>
                )}
                <hr />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
