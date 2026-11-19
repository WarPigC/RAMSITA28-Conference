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
    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-slate-200/80 max-w-xl mx-auto">
      <div className="flex items-center justify-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-brand-navy">
        <Clock className="w-4 h-4 text-brand-green animate-spin-slow" />
        <span>Conference Countdown (Feb 11, 2028)</span>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
        {units.map((unit, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="w-full bg-slate-900 text-white rounded-xl py-3 px-1 shadow-inner relative overflow-hidden group">
              <span className="text-2xl sm:text-3xl font-black tracking-tight font-heading text-emerald-400">
                {String(unit.value).padStart(2, '0')}
              </span>
              <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent pointer-events-none"></div>
            </div>
            <span className="text-[11px] sm:text-xs font-semibold text-slate-500 mt-1 uppercase">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
