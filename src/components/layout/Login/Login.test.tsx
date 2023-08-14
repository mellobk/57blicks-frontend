import { render } from '@testing-library/react';
import { LoginLayout } from './Login';


describe('LoginLayout', () => {
  it('renders children', () => {
    const { getByText } = render(
      <LoginLayout>
        <div>Test Content</div>
      </LoginLayout>
    );

    const contentElement = getByText('Test Content');
    expect(contentElement).toBeInTheDocument();
  });

  it('renders footer text', () => {
    const { getByText } = render(<LoginLayout />);
    const footerElement = getByText('All right reserved / © DKC Lending');
    expect(footerElement).toBeInTheDocument();
  });
});