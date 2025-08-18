import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { ProgressData } from '../../interfaces';

interface ProgressApexChartProps {
  data: ProgressData[];
  exerciseName: string;
}

const ProgressApexChart: React.FC<ProgressApexChartProps> = ({ data, exerciseName }) => {
  if (data.length === 0) {
    return (
      <div className='h-64 flex items-center justify-center text-gray-500'>
        <p>Aucune donnée de progression disponible</p>
      </div>
    );
  }

  // Préparer les données pour ApexCharts
  const chartData = data.map((progress) => ({
    x: new Date(progress.date).getTime(),
    y: progress.weight,
    reps: progress.reps,
    sets: progress.sets,
    volume: progress.weight * progress.reps * progress.sets,
  }));

  // Configuration du graphique
  const options: ApexOptions = {
    chart: {
      type: 'area',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: true,
        type: 'x',
      },
      animations: {
        enabled: true,
        // easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    series: [
      {
        name: 'Poids (kg)',
        data: chartData.map((item) => item.y),
        type: 'area',
      },
    ],
    xaxis: {
      type: 'datetime',
      categories: chartData.map((item) => item.x),
      labels: {
        format: 'dd/MM',
        style: {
          colors: '#6b7280',
          fontSize: '12px',
        },
      },
      title: {
        text: 'Date',
        style: {
          color: '#374151',
          fontSize: '14px',
          fontWeight: 600,
        },
      },
    },
    yaxis: {
      title: {
        text: 'Poids (kg)',
        style: {
          color: '#374151',
          fontSize: '14px',
          fontWeight: 600,
        },
      },
      labels: {
        style: {
          colors: '#6b7280',
          fontSize: '12px',
        },
      },
      min: Math.min(...chartData.map((item) => item.y)) - 5,
      max: Math.max(...chartData.map((item) => item.y)) + 5,
    },
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        const dataPoint = chartData[opts.dataPointIndex];
        return `${dataPoint.y}kg - ${dataPoint.reps} reps`;
      },
      style: {
        fontSize: '11px',
        fontWeight: 600,
        colors: ['#ffffff'],
      },
      background: {
        enabled: true,
        foreColor: '#0d9488',
        borderRadius: 4,
        padding: 4,
        opacity: 0.9,
        borderWidth: 0,
      },
    },
    stroke: {
      curve: 'smooth',
      width: 3,
      colors: ['#0d9488'],
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 90, 100],
        colorStops: [
          {
            offset: 0,
            color: '#0d9488',
            opacity: 0.8,
          },
          {
            offset: 100,
            color: '#0d9488',
            opacity: 0.1,
          },
        ],
      },
    },
    markers: {
      size: 6,
      colors: ['#ffffff'],
      strokeColors: '#0d9488',
      strokeWidth: 2,
      hover: {
        size: 8,
      },
    },
    grid: {
      borderColor: '#e5e7eb',
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    tooltip: {
      enabled: true,
      theme: 'light',
      x: {
        format: 'dd MMM yyyy',
      },
      y: {
        title: {
          formatter: () => 'Poids: ',
        },
        formatter: (value, { dataPointIndex }) => {
          const dataPoint = chartData[dataPointIndex];
          return `
            <div class="p-2">
              <div class="font-semibold text-gray-800">${exerciseName}</div>
              <div class="text-sm text-gray-600">
                <div>Poids: <span class="font-medium">${dataPoint.y} kg</span></div>
                <div>Répétitions: <span class="font-medium">${dataPoint.reps}</span></div>
                <div>Séries: <span class="font-medium">${dataPoint.sets}</span></div>
                <div>Volume: <span class="font-medium">${dataPoint.volume} kg</span></div>
              </div>
            </div>
          `;
        },
      },
    },
    colors: ['#0d9488'],
    theme: {
      mode: 'light',
    },
  };

  return (
    <div className='w-full'>
      <ReactApexChart options={options} series={options.series} type='area' height={350} />
    </div>
  );
};

export default ProgressApexChart;
