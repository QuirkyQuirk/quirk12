import React from 'react';
import Countdown from 'react-countdown';
import { Clock } from 'lucide-react';

const SaleCountdown: React.FC = () => {
  // Set end date to 3 days from now
  const endDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

  const renderer = ({ days, hours, minutes, seconds }: any) => (
    <div className="bg-black/80 backdrop-blur-sm text-white px-6 py-3 rounded-xl flex items-center gap-3">
      <Clock className="text-[#FF2E93]" />
      <div className="flex items-center gap-2 text-sm">
        <div className="text-center">
          <span className="font-bold">{days}</span>
          <span className="text-gray-400 ml-1">d</span>
        </div>
        <span className="text-gray-400">:</span>
        <div className="text-center">
          <span className="font-bold">{hours}</span>
          <span className="text-gray-400 ml-1">h</span>
        </div>
        <span className="text-gray-400">:</span>
        <div className="text-center">
          <span className="font-bold">{minutes}</span>
          <span className="text-gray-400 ml-1">m</span>
        </div>
        <span className="text-gray-400">:</span>
        <div className="text-center">
          <span className="font-bold">{seconds}</span>
          <span className="text-gray-400 ml-1">s</span>
        </div>
      </div>
    </div>
  );

  return <Countdown date={endDate} renderer={renderer} />;
};

export default SaleCountdown;