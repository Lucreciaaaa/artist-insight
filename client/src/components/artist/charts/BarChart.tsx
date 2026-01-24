import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

type BarChartProps = {
  labels: string[];
  values: number[];
};

// truncate long track titles
const truncate = (value: string, max = 14) => {
  if (value.length <= max) return value;
  const truncated = value.slice(0, max);
  const lastSpace = truncated.lastIndexOf(' ');
  return lastSpace > 0 ? `${truncated.slice(0, lastSpace)}…` : `${truncated}…`;
};

// chart scale (y-axis)
function getScale(maxValue: number) {
  if (maxValue >= 1_000_000_000) {
    return { divisor: 1_000_000_000, unit: 'B' };
  }
  if (maxValue >= 1_000_000) {
    return { divisor: 1_000_000, unit: 'M' };
  }
  if (maxValue >= 1_000) {
    return { divisor: 1_000, unit: 'K' };
  }
  return { divisor: 1, unit: '' };
}

function getChartOptions(
  labels: string[],
  unit: string,
  divisor: number
): ApexOptions {
  return {
    chart: {
      type: 'bar',
      height: 260,
      toolbar: { show: false },
      fontFamily: 'inherit',
      foreColor: '#9ca3af',
    },

    plotOptions: {
      bar: {
        // BAR_WIDTH
        columnWidth: '45%',
        borderRadius: 3,
      },
    },

    dataLabels: {
      enabled: false,
    },

    xaxis: {
      categories: labels,
      labels: {
        rotate: -45,
        rotateAlways: true,
        formatter: (value: string | number) => truncate(String(value)),
        style: {
          fontSize: '12px',
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },

    yaxis: {
      labels: {
        formatter: (value) =>
          unit ? `${Math.round(value)}${unit}` : Math.round(value).toString(),
      },
    },

    grid: {
      borderColor: '#27272a',
      strokeDashArray: 4,
    },

    tooltip: {
      theme: 'dark',
      x: {
        show: true,
        formatter: (value: string | number) => {
          return String(value);
        },
      },
      y: {
        formatter: (value) =>
          `${Math.round(value * divisor).toLocaleString()} plays`,
      },
    },

    colors: ['#9ca3af'],

    // columnWidth mobile vs desktop
    responsive: [
      {
        breakpoint: 640, // mobile
        options: {
          plotOptions: {
            bar: {
              columnWidth: '70%',
            },
          },
        },
      },
      {
        breakpoint: 1024, // desktop
        options: {
          plotOptions: {
            bar: {
              columnWidth: '50%',
            },
          },
        },
      },
    ],
  };
}

const BarChart = ({ labels, values }: BarChartProps) => {
  if (!labels.length || !values.length) {
    return null;
  }

  const maxValue = Math.max(...values);
  const { divisor, unit } = getScale(maxValue);

  const normalizedValues = values.map((value) => value / divisor);

  const series = [
    {
      name: 'Plays',
      data: normalizedValues,
    },
  ];

  const options = getChartOptions(labels, unit, divisor);

  return (
    <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-4">
      <h3 className="text-xs tracking-widest text-gray-400 mb-4">
        PLAYS PER TRACK
      </h3>

      <Chart options={options} series={series} type="bar" height={260} />
    </div>
  );
};

export default BarChart;
