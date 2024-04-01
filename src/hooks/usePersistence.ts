import { useCallback, useEffect, useState } from "react";
import { actions } from "../actions";
import { dispatcher } from "../dispatcher";
import { isObject } from "../typeGuards/isObject";

type PersistenceScope = "application" | "project";

interface SetFromPersistencePayload<T> {
  key: string;
  value: T | null;
  scope: PersistenceScope;
  error: { message: string } | null;
}

export const usePersistence = <T>(
  key: string,
  scope: PersistenceScope
): [T | null | undefined, (value: T | null) => void] => {
  const [value, setValue] = useState<T | null>();

  const saveToPersistence = useCallback(
    (value: T | null) => {
      window.sendMessageToDigma({
        action: actions.SAVE_TO_PERSISTENCE,
        payload: {
          key,
          value,
          scope
        }
      });
      setValue(value); // TODO: handle error
    },
    [key, scope]
  );

  useEffect(() => {
    window.sendMessageToDigma({
      action: actions.GET_FROM_PERSISTENCE,
      payload: {
        key,
        scope
      }
    });

    const handlePersistedData = (data: unknown) => {
      if (isObject(data) && data.key === key) {
        const persistenceData = data as unknown as SetFromPersistencePayload<T>;
        setValue(persistenceData.value);
      }
    };

    dispatcher.addActionListener(
      actions.SET_FROM_PERSISTENCE,
      handlePersistedData
    );

    return () => {
      dispatcher.removeActionListener(
        actions.SET_FROM_PERSISTENCE,
        handlePersistedData
      );
    };
  }, [key, scope]);

  return [value, saveToPersistence];
};
