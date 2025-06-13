import { rememberEnhancer } from "redux-remember";
import { isObject } from "../../typeGuards/isObject";

interface RememberEnhancerProps {
  rememberedKeys: string[];
  prefix: string;
  version: number;
}

const rehydrateState = (rehydratedState: unknown, version: number) => {
  if (!isObject(rehydratedState)) {
    return undefined;
  }

  if (rehydratedState.version !== version) {
    return undefined;
  }

  return rehydratedState;
};

export const getRememberEnhancer = ({
  rememberedKeys,
  prefix,
  version
}: RememberEnhancerProps) =>
  rememberEnhancer(window.localStorage, rememberedKeys, {
    prefix,
    unserialize: (stateString: string) => {
      try {
        const rehydratedState = JSON.parse(stateString) as unknown;
        return rehydrateState(rehydratedState, version);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Failed to parse persisted state:", error);
        return undefined;
      }
    },
    serialize: (state) =>
      JSON.stringify({
        ...state,
        version
      })
  });
