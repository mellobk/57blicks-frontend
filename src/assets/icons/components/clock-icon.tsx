import * as React from 'react';

type Props = {
  color?: string;
  fill?: string;
  width?: number;
  height?: number;
};

const ClockIcon: React.FC<Props> = ({ color = '#BBBBBB', fill = 'none', width = 48, height = 48, ...props }: Props) => {
  return (
    <svg width={width} height={width} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 7V12L14.5 10.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ClockIcon;
