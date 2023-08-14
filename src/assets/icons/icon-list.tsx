import React from 'react';
import icons, { storyBooksIconsNames } from './icon-dictionary';
import IconTemplate from './icons';

type Props = {
  name: string;
  className?: string;
};

const IconList: any = () => {
  return (
    <div style={{ display: 'flex', gap: '5px', textAlign: 'center' }}>
      {storyBooksIconsNames?.map((value, key) => {
        return (
          <div key={key}>
            <IconTemplate name={value} />
            <div>{value}</div>
          </div>
        );
      })}
    </div>
  );
};

export default IconList;
