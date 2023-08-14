import * as React from 'react';
import SearchIcon from './components/search-icon';
import UserIcon from './components/user-icon';
import DateIcon from './components/date-icon';
import ClockIcon from './components/clock-icon';
import StarIcon from './components/star-icon';

type Props = {
  name: string;
  width?: number;
  color?: string;
};

const IconItems: any = ({ name, width, color }: Props) => {
  const icons = {
    search: {
      name: 'search',
      Icon: <SearchIcon width={width} color={color} />
    },
    user: {
      name: 'user',
      Icon: <UserIcon width={width} color={color} />
    },
    date: {
      name: 'date',
      Icon: <DateIcon width={width} color={color} />
    },
    clock: {
      name: 'clock',
      Icon: <ClockIcon width={width} color={color} />
    },
    star: {
      name: 'star',
      Icon: <StarIcon width={width} color={color} />
    }
  };

  return icons[name]?.Icon || null;
};
// export icons to storybook mapping
export const storyBooksIconsNames: string[] = ['search', 'clock', 'user', 'date', 'star'];

export default IconItems;
