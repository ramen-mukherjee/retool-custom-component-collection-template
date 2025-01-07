import { type FC, StrictMode } from 'react';
import { Retool } from '@tryretool/custom-component-support';
import { Clock } from '../../utilities/Clock';

export const SimpleText: FC = () => {
  const [name, _setName] = Retool.useStateString({
    name: 'name',
  });

  return (
    <StrictMode>
      <div className="container">
        <p>
          HelloX {name} current date is
          {new Date().toLocaleDateString('en-GB', {
            weekday: 'long',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })}{' '}
          <Clock />
        </p>
      </div>
    </StrictMode>
  );
};
