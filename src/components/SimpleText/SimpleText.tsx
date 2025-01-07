import React, { type FC } from 'react';

import { Retool } from '@tryretool/custom-component-support';

export const SimpleText: FC = () => {
  const [name, _setName] = Retool.useStateString({
    name: 'name',
  });

  return (
    <div>
      <div>HelloY {name}!</div>
    </div>
  );
};
