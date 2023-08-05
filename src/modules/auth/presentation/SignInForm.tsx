import { useState } from "react";

import { Checkbox } from 'primereact/checkbox';
import { Button } from "primereact/button";

import { t } from "utils";

import { TextInput } from "shared/Form";

import { useAuthStore } from "../application";
import { useSignInNotifications } from "./useSignInNotifications";

interface IProps {
  initialUsername?: string;
  initialPassword?: string;
}

export const SignInForm = ({ initialUsername, initialPassword }: IProps) => {

  const [username, setUsername] = useState(initialUsername);
  const [password, setPassword] = useState(initialPassword);

  const [notifySuccess, notifyFailure] = useSignInNotifications();
  const login = useAuthStore((store) => store.login);

  return (
    <div className="flex flex-col items-stretch gap-y-8 w-full max-w-lg">
      <div className="flex flex-col text-center">
        <h1 className="text-lg">
          {t("Sign in to your account")}
        </h1>
        <span className="text-md text-gray-200">
          {t("to enjoy all of our cool {link} ✌️", {
            link: <a href="#" className="text-blue-400" color={"blue.400"}>{t("features")}</a>,
          })}
        </span>
      </div>
      <div className="rounded-lg bg-gray-700 shadow-lg p-6">
        <form
          className="flex flex-col gap-y-4"
          onSubmit={(e) => {
            e.preventDefault();

            if (!username || !password) {
              return;
            }

            login({ username, password })
              .then(() => notifySuccess())
              .catch(() => notifyFailure());
          }}
        >
          <TextInput
            id="username"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
          >
            {t("Username")}
          </TextInput>
          <TextInput
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          >
            {t("Password")}
          </TextInput>
          <div className="flex flex-col w-full gap-y-10">
            <div className="flex flex-col items-start w-full justify-between">
              <span>{t("Remember me")}</span>
              <Checkbox checked={false}/>
              <a className="text-blue-400">{t("Forgot password?")}</a>
            </div>
            <Button type="submit" severity="info" className="w-full">
              {t("Sign in")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
