import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export default function CountdownTimer({ targetDate = '2028-02-11T09:00:00' }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    function calculateTime() {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    }

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <div className="bg-[#0A2540]/90 text-white p-5 border border-white/20 max-w-xl mx-auto shadow-md">
      <div className="flex items-center justify-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-emerald-400">
        <Clock className="w-4 h-4 text-emerald-400" />
        <span>Conference Countdown — February 11, 2028</span>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
        {units.map((unit, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="w-full bg-slate-900/90 text-white py-3 px-1 border border-slate-700">
              <span className="text-2xl sm:text-3xl font-black tracking-tight font-heading text-emerald-400">
                {String(unit.value).padStart(2, '0')}
              </span>
            </div>
            <span className="text-[11px] font-semibold text-slate-300 mt-1 uppercase tracking-wider">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
