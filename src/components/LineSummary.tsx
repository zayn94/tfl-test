import React from 'react';
import Chevron from './Chevron';
import type { Line } from '../types/tfl';

interface LineItemProps {
  line: Line;
  lineStyles: Record<string, string>;
}

const LineSummary: React.FC<LineItemProps> = ({ line, lineStyles }) => {
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
          line.lineStatuses.map((status, index) => (
            <div key={index}>
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
};

export default LineSummary;
