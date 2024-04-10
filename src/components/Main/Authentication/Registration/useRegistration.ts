import { useEffect, useState } from "react";
import { dispatcher } from "../../../../dispatcher";
import { useLoading } from "../../../Insights/insightTickets/common";
import { actions } from "../../actions";
import { ErrorData, RegisterPayload, RegisterResult } from "../../types";

export const useRegistration = () => {
  const [isLoading, setIsLoading] = useLoading(false);
  const [errors, setErrors] = useState<ErrorData[]>([]);

  useEffect(() => {
    const handleRegister = (data: unknown) => {
      const result = data as RegisterResult;
      if (result.errors) {
        setErrors(result.errors);
      }
      setIsLoading(false);
    };

    dispatcher.addActionListener(actions.REGISTER_RESULT, handleRegister);

    return () => {
      dispatcher.removeActionListener(actions.REGISTER_RESULT, handleRegister);
    };
  }, []);

  return {
    isLoading,
    errors,
    register: (payload: RegisterPayload) => {
      setIsLoading(true);
      window.sendMessageToDigma<RegisterPayload>({
        action: actions.LOGIN,
        payload: {
          ...payload
        }
      });
    }
  };
};
