import { useEffect, useState } from "react";
import { dispatcher } from "../../../../dispatcher";
import { useLoading } from "../../../Insights/insightTickets/common";
import { actions } from "../../actions";
import { ErrorData, LoginPayload, LoginResult } from "../../types";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useLoading(false);
  const [errors, setErrors] = useState<ErrorData[]>([]);

  useEffect(() => {
    const handleLogin = (data: unknown) => {
      const result = data as LoginResult;
      if (result.errors) {
        setErrors(result.errors);
      }
      setIsLoading(false);
    };

    dispatcher.addActionListener(actions.LOGIN_RESULT, handleLogin);

    return () => {
      dispatcher.removeActionListener(actions.LOGIN_RESULT, handleLogin);
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
    errors
  };
};
