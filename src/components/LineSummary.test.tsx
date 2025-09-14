import { render, screen, fireEvent } from '@testing-library/react';
import type { Line } from '../types/tfl';
import LineSummary from './LineSummary';
import { describe, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

const mockLine: Line = {
  $type: 'Tfl.Api.Presentation.Entities.Line, Tfl.Api.Presentation.Entities',
  id: 'zayny',
  name: 'Zayn Line',
  modeName: 'tube',
  disruptions: [],
  created: '2025-09-11T15:21:16.64Z',
  modified: '2025-09-11T15:21:16.64Z',
  lineStatuses: [
    {
      $type:
        'Tfl.Api.Presentation.Entities.LineStatus, Tfl.Api.Presentation.Entities',
      lineId: 'zayny',
      statusSeverity: 2,
      statusSeverityDescription: 'Suspended',
      reason: 'Train reversing',
      created: '0001-01-01T00:00:00',
      validityPeriods: [
        {
          $type:
            'Tfl.Api.Presentation.Entities.ValidityPeriod, Tfl.Api.Presentation.Entities',
          fromDate: '2025-09-14T08:31:48Z',
          toDate: '2025-09-14T15:14:34Z',
          isNow: true,
        },
      ],
      disruption: {
        $type:
          'Tfl.Api.Presentation.Entities.Disruption, Tfl.Api.Presentation.Entities',
        category: 'RealTime',
        categoryDescription: 'RealTime',
        description: 'Train reversing',
        affectedRoutes: [],
        affectedStops: [],
        closureText: 'suspended',
      },
    },
  ],
  routeSections: [],
  serviceTypes: [
    {
      $type:
        'Tfl.Api.Presentation.Entities.LineServiceTypeInfo, Tfl.Api.Presentation.Entities',
      name: 'Regular',
      uri: '/Line/Route?ids=Hammersmith & City&serviceTypes=Regular',
    },
  ],
  crowding: {
    $type:
      'Tfl.Api.Presentation.Entities.Crowding, Tfl.Api.Presentation.Entities',
  },
};

const mockStyles = {
  zayny: '#dc241f',
};

describe('LineSummary Component', () => {
  test('renders line name and status', () => {
    render(
      <LineSummary
        line={mockLine}
        lineStyles={mockStyles}
        isOpen={false}
        onClick={vi.fn()}
      />
    );
    expect(screen.getByText('Zayn Line')).toBeInTheDocument();
    expect(screen.getByText('Suspended')).toBeInTheDocument();
  });

  test('calls onClick when line has disruptions and is clicked', () => {
    const handleClick = vi.fn();
    render(
      <LineSummary
        line={mockLine}
        lineStyles={mockStyles}
        isOpen={false}
        onClick={handleClick}
      />
    );
    fireEvent.click(screen.getByText('Zayn Line'));
    expect(handleClick).toHaveBeenCalled();
  });

  test('does not call onClick when line has no disruptions', () => {
    const handleClick = vi.fn();
    const noDisruptionLine: Line = {
      ...mockLine,
      lineStatuses: [
        {
          $type:
            'Tfl.Api.Presentation.Entities.LineStatus, Tfl.Api.Presentation.Entities',
          lineId: 'zayny',
          statusSeverity: 10,
          statusSeverityDescription: 'Good Service',
          created: '0001-01-01T00:00:00',
          validityPeriods: [],
        },
      ],
    };
    render(
      <LineSummary
        line={noDisruptionLine}
        lineStyles={mockStyles}
        isOpen={false}
        onClick={handleClick}
      />
    );
    fireEvent.click(screen.getByText('Zayn Line'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('shows reason text when isOpen is true', () => {
    render(
      <LineSummary
        line={mockLine}
        lineStyles={mockStyles}
        isOpen={true}
        onClick={vi.fn()}
      />
    );
    expect(screen.getByText('Train reversing')).toBeInTheDocument();
  });
});
