import { rememberEnhancer } from "redux-remember";

interface RememberEnhancerProps {
  rememberedKeys: string[];
  prefix: string;
  version: number;
}

const rehydrateState = <T extends Record<string, unknown>>(
  rehydratedState: Record<string, unknown>,
  version: number
) => {
  if (rehydratedState.version !== version) {
    return undefined;
  }

  return rehydratedState as T;
};

export const getRememberEnhancer = <T extends Record<string, unknown>>({
  rememberedKeys,
  prefix,
  version
}: RememberEnhancerProps) =>
  rememberEnhancer(window.localStorage, rememberedKeys, {
    prefix,
    unserialize: (stateString: string) => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const rehydratedState = JSON.parse(stateString);
        return rehydrateState<T>(
          rehydratedState as Record<string, unknown>,
          version
        );
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
