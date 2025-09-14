import React from 'react';
import Chevron from './Chevron';
import type { Line } from '../types/tfl';

interface LineItemProps {
  line: Line;
  lineStyles: Record<string, string>;
  isOpen: Boolean;
  onClick: () => void;
}

const LineSummary: React.FC<LineItemProps> = ({
  line,
  lineStyles,
  isOpen,
  onClick,
}) => {
  const hasNoDisruptions = line.lineStatuses.every(
    (status) => !status.disruption
  );
  return (
    <div
      className='line'
      style={{ cursor: hasNoDisruptions ? 'default' : 'pointer' }}
      onClick={() => {
        if (hasNoDisruptions) return;
        onClick();
      }}
    >
      <div
        className='line-colour'
        style={{ backgroundColor: lineStyles[line.id.toLowerCase()] }}
      ></div>
      <div
        className='line-name'
        style={{ justifyContent: isOpen ? 'flex-start' : 'center' }}
      >
        {line.name}
      </div>
      <div className='line-statuses'>
        {hasNoDisruptions ? (
          <div>Good service</div>
        ) : (
          line.lineStatuses.map((status, index) => (
            <div key={index}>
              {status.disruption && (
                <div>
                  <b>{status.statusSeverityDescription}</b>
                  <br />
                  {isOpen && <span>{status.reason}</span>}
                </div>
              )}
            </div>
          ))
        )}
      </div>
      {!hasNoDisruptions && (
        <div className='button-container'>
          <Chevron direction={isOpen ? 'down' : 'right'} />
        </div>
      )}
    </div>
  );
};

export default LineSummary;
