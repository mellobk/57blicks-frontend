import { render, screen } from '@testing-library/react';
import { LoginLayout } from './Login';


describe('LoginLayout component', () => {
  it('renders children and copyright text', () => {
    render(
      <LoginLayout>
        <div data-testid="child-element">Child Content</div>
      </LoginLayout>
    );

    const childElement = screen.getByTestId('child-element');
    const copyrightText = screen.getByText(/All right reserved \/ © DKC Lending/);

    expect(childElement).toBeInTheDocument();
    expect(copyrightText).toBeInTheDocument();
  });

  it('applies proper styles to the layout container', () => {
    render(
      <LoginLayout>
        <div>Child Content</div>
      </LoginLayout>
    );

    const layoutContainer = screen.getByTestId('login-layout-container');

    expect(layoutContainer).toHaveClass('bg-cover');
    expect(layoutContainer).toHaveClass('bg-center');
    expect(layoutContainer).toHaveClass('w-screen');
    expect(layoutContainer).toHaveClass('h-screen');
    expect(layoutContainer).toHaveClass('box-border');
    expect(layoutContainer).toHaveClass('p-6');
    expect(layoutContainer).toHaveClass('overflow-auto');
  });
});
