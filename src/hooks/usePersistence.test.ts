import { act, renderHook } from "@testing-library/react";
import { actions } from "../actions";
import { ActionListener } from "../api/types";
import { dispatcher } from "../dispatcher";
import { usePersistence } from "./usePersistence";

jest.mock("../dispatcher", () => ({
  dispatcher: {
    addActionListener: jest.fn(),
    removeActionListener: jest.fn()
  }
}));

describe("usePersistence", () => {
  beforeEach(() => {
    window.sendMessageToDigma = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with undefined value", () => {
    const { result } = renderHook(() =>
      usePersistence("testKey", "application")
    );
    expect(result.current[0]).toBeUndefined();
  });

  it("should send SAVE_TO_PERSISTENCE message and update state", () => {
    const { result } = renderHook(() =>
      usePersistence("testKey", "application")
    );
    const [, saveToPersistence] = result.current;

    act(() => {
      saveToPersistence("testValue");
    });

    expect(window.sendMessageToDigma).toHaveBeenCalledWith({
      action: actions.SAVE_TO_PERSISTENCE,
      payload: {
        key: "testKey",
        value: "testValue",
        scope: "application"
      }
    });

    expect(result.current[0]).toBe("testValue");
  });

  it("should send GET_FROM_PERSISTENCE message on mount", () => {
    renderHook(() => usePersistence("testKey", "application"));

    expect(window.sendMessageToDigma).toHaveBeenCalledWith({
      action: actions.GET_FROM_PERSISTENCE,
      payload: {
        key: "testKey",
        scope: "application"
      }
    });
  });

  it("should handle SET_FROM_PERSISTENCE action and update state", () => {
    const { result } = renderHook(() =>
      usePersistence("testKey", "application")
    );

    const handlePersistedData = (dispatcher.addActionListener as jest.Mock).mock
      .calls[0][1] as ActionListener; // eslint-disable-line @typescript-eslint/no-unsafe-member-access

    act(() => {
      handlePersistedData(
        {
          key: "testKey",
          value: "persistedValue",
          scope: "application",
          error: null
        },
        Date.now()
      );
    });

    expect(result.current[0]).toBe("persistedValue");
  });

  it("should clean up listeners on unmount", () => {
    const { unmount } = renderHook(() =>
      usePersistence("testKey", "application")
    );

    unmount();

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(dispatcher.removeActionListener).toHaveBeenCalledWith(
      actions.SET_FROM_PERSISTENCE,
      expect.any(Function)
    );
  });
});
