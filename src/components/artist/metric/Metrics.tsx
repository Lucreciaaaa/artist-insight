import MetricItem from './MetricItem';

const Metrics = () => {
  const metrics = [
    {
      label: 'Listeners',
      value: '2.5M',
    },
    {
      label: 'Plays',
      value: '185.0M',
    },
    {
      label: 'Engagement',
      value: '76%',
    },
    {
      label: 'Top track',
      value: 'Sunset',
    },
    {
      label: 'Top track share',
      value: '24.3%',
    },
  ];

  return (
    <div>
      {/* Title */}
      <h3 className="text-xs uppercase tracking-wider text-gray-600 mb-1 sm:mb-2 lg:mb-4">
        KEY METRICS
      </h3>

      {/* Items */}
      <div className="divide-y divide-gray-800">
        {metrics.map((metric) => (
          <MetricItem
            key={metric.label}
            metricName={metric.label}
            metricValue={metric.value}
          />
        ))}
      </div>
    </div>
  );
};

export default Metrics;
