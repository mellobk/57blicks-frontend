
import { render } from '@testing-library/react';
import Avatar from './Avatar';

describe('Avatar component', () => {
  it('renders without crashing', () => {
    render(<Avatar />);
  });

  it('shows initials when name is provided', () => {
    const { getByText } = render(<Avatar name="John Doe" />);
    expect(getByText('JD')).toBeInTheDocument();
  });

  it('truncates initials to two characters when name with more than two words is provided', () => {
    const { getByText } = render(<Avatar name="John Paul Smith" />);
    expect(getByText('JP')).toBeInTheDocument();
  });

  it('adds opacity class when neither image nor name is provided', () => {
    const { container } = render(<Avatar />);
    expect(container.firstChild).toHaveClass('bg-opacity-20 p-2');
  });

  it('does not add opacity class when either image or name is provided', () => {
    const { container: container1 } = render(<Avatar name="John Doe" />);
    expect(container1.firstChild).not.toHaveClass('bg-opacity-20 p-2');

    const { container: container2 } = render(<Avatar image="sample_image.png" />);
    expect(container2.firstChild).not.toHaveClass('bg-opacity-20 p-2');
  });
});
