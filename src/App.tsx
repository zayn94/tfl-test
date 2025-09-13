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
        {tubeStatus?.map((line: Line) => {
          const hasNoDisruptions = line.lineStatuses.every(
            (status) => !status.disruption
          );
          return (
            <div key={line.id} className='line'>
              <div className={`line-name ${line.id.toLowerCase()}`}>
                {line.name}
              </div>
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
                          <span>{status.reason}</span>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
