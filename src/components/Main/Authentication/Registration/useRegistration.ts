import { useEffect, useState } from "react";
import { actions } from "../../../../actions";
import { dispatcher } from "../../../../dispatcher";
import { useLoading } from "../../../Insights/insightTickets/common";
import { ErrorData, RegisterPayload, RegisterResult } from "../../types";

export const useRegistration = () => {
  const [isLoading, setIsLoading] = useLoading(false);
  const [errors, setErrors] = useState<ErrorData[]>([]);
  const [isSucceed, setIsSucceed] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const handleRegister = (data: unknown) => {
      const result = data as RegisterResult;
      if (result.errors) {
        setErrors(result.errors);
        setIsSucceed(false);
      } else {
        setErrors([]);
        setIsSucceed(true);
      }

      setIsLoading(false);
    };

    dispatcher.addActionListener(
      actions.SET_REGISTRATION_RESULT,
      handleRegister
    );

    return () => {
      dispatcher.removeActionListener(
        actions.SET_REGISTRATION_RESULT,
        handleRegister
      );
    };
  }, [setIsLoading]);

  return {
    isLoading,
    errors,
    isSucceed,
    register: (payload: RegisterPayload) => {
      setIsLoading(true);
      window.sendMessageToDigma<RegisterPayload>({
        action: actions.REGISTER,
        payload: {
          ...payload
        }
      });
    }
  };
};
