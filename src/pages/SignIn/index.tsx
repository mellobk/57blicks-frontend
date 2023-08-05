import { Page } from "shared/Layout";
import { ErrorPageStrategy } from "shared/Result";

import { withRequirePub } from "modules/auth/application";
import { SignInForm } from "modules/auth/presentation";

export const SignInPage = () => {
  return (
    <Page maxW="container.xl">
      <div className="flex items-center justify-center py-10 md:py-12">
        <SignInForm initialUsername="mor_2314" initialPassword="83r5^_" />
      </div>
    </Page>
  );
};

export const Component = withRequirePub(SignInPage, { to: "/products" });

export const ErrorBoundary = ErrorPageStrategy;
