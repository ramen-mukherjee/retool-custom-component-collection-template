import { type FC, useState, useEffect } from 'react';

export const Clock: FC = () => {
  const [ClockTime, setClockTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setClockTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return <span>{ClockTime}</span>;
};
