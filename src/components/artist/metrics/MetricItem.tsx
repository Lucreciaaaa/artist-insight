type MetricItemProps = {
  metricName: string;
  metricValue: string;
};

const MetricItem = ({ metricName, metricValue }: MetricItemProps) => {
  return (
    <div className="flex flex-row justify-between items-center py-1 lg:py-3">
      {/* Metric */}
      <span className="text-xs lg:text-sm 2xl:text-base text-gray-500">
        {metricName}
      </span>
      {/* Value */}
      <span className="text-xs lg:text-sm 2xl:text-base text-gray-500 text-right">
        {metricValue}
      </span>
    </div>
  );
};

export default MetricItem;
