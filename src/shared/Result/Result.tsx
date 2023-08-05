import { ReactNode } from 'react';

interface IProps {
  heading: string;
  subheading: string;
  children: ReactNode;
}

const Result = ({ children, heading, subheading }: IProps) => {
  return (
    <div className="flex flex-col vh-75 text-center gap-y-6">
      <div className="flex flex-col max-w-420">
        <h2 className="text-lg">{heading}</h2>
        <span className="text-md text-gray-900">{subheading}</span>
      </div>
      {children}
    </div>
  );
};

export { Result };
