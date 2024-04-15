import { useEffect, useState } from "react";
import { actions } from "../../../../actions";
import { dispatcher } from "../../../../dispatcher";
import { useLoading } from "../../../Insights/insightTickets/common";
import { LoginPayload, LoginResult } from "../../types";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useLoading(false);
  const [error, setError] = useState<{ description: string }>();

  useEffect(() => {
    const handleLogin = (data: unknown) => {
      const result = data as LoginResult;
      if (result.error) {
        setError({ description: result.error });
      }
      setIsLoading(false);
    };

    dispatcher.addActionListener(actions.SET_LOGIN_RESULT, handleLogin);

    return () => {
      dispatcher.removeActionListener(actions.SET_LOGIN_RESULT, handleLogin);
    };
  }, []);

  return {
    login: (payload: LoginPayload) => {
      setIsLoading(true);
      window.sendMessageToDigma<LoginPayload>({
        action: actions.LOGIN,
        payload: {
          ...payload
        }
      });
    },
    isLoading,
    error
  };
};
