import { useEffect, useState } from 'react';
import type { Line, LineStatus, TflStatusResponse } from './types/tfl';

import './App.css';
import Chevron from './components/Chevron';

function App() {
  const [tubeStatus, setTubeStatus] = useState<TflStatusResponse>([]);

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
      <div className='lines-container'>
        {tubeStatus?.map((line: Line) => {
          const hasNoDisruptions = line.lineStatuses.every(
            (status) => !status.disruption
          );
          return (
            <div
              key={line.id}
              className='line'
              style={{ cursor: hasNoDisruptions ? 'default' : 'pointer' }}
            >
              <div
                className='line-colour'
                style={{ backgroundColor: lineStyles[line.id.toLowerCase()] }}
              ></div>
              <div className='line-name'>{line.name}</div>
              <div className='line-statuses'>
                {hasNoDisruptions ? (
                  <div>Good service</div>
                ) : (
                  line.lineStatuses.map((status: LineStatus) => (
                    <div>
                      {status.disruption && (
                        <div>
                          <span>
                            <b>{status.statusSeverityDescription}</b>
                          </span>
                          <br />
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
              {!hasNoDisruptions && (
                <div className='button-container'>
                  <Chevron />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
