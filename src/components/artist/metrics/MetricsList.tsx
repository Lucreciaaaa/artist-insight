import type { KeyMetric } from '../../../types/ui/metrics';
import MetricItem from './MetricItem';

type MetricsListProps = {
  metrics: KeyMetric[];
};

const MetricsList = ({ metrics }: MetricsListProps) => {
  return (
    <div>
      {/* Title */}
      <h3 className="text-xs lg:text-sm 2xl:text-base uppercase tracking-wider text-gray-600 mb-1 sm:mb-2 lg:mb-4">
        KEY METRICS
      </h3>

      {/* Items */}
      {metrics.length === 0 ? (
        <p className="text-sm text-gray-500"> No metrics available</p>
      ) : (
        <div className="divide-y divide-gray-800">
          {metrics.map((metric) => (
            <MetricItem
              key={metric.id}
              metricName={metric.label}
              metricValue={metric.value}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MetricsList;
