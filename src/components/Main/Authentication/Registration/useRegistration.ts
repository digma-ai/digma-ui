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
        setIsSucceed(true);
      }

      setIsLoading(false);
    };

    dispatcher.addActionListener(actions.REGISTRATION_RESULT, handleRegister);

    return () => {
      dispatcher.removeActionListener(
        actions.REGISTRATION_RESULT,
        handleRegister
      );
    };
  }, []);

  return {
    isLoading,
    errors,
    isSucceed,
    register: (payload: RegisterPayload) => {
      setIsLoading(true);
      window.sendMessageToDigma<RegisterPayload>({
        action: actions.REGISTRATION,
        payload: {
          ...payload
        }
      });
    }
  };
};
