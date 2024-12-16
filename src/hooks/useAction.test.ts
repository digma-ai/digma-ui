import { act, renderHook } from "@testing-library/react";
import type { ActionListener } from "../api/types";
import { dispatcher } from "../dispatcher";
import { useAction } from "./useAction";

jest.mock("../dispatcher", () => ({
  dispatcher: {
    addActionListener: jest.fn(),
    removeActionListener: jest.fn()
  }
}));

const mockSendMessageToDigma = jest.fn();
window.sendMessageToDigma = mockSendMessageToDigma;

describe("useAction Hook", () => {
  const requestAction = "testRequestAction";
  const responseAction = "testResponseAction";
  const mockPayload = { id: "123" };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with no data and operation not in progress", () => {
    const { result } = renderHook(() =>
      useAction(requestAction, responseAction, mockPayload)
    );
    expect(result.current.data).toBeNull();
    expect(result.current.isOperationInProgress).toBe(false);
  });

  it("should add and remove action listeners on mount and unmount", () => {
    const { unmount } = renderHook(() =>
      useAction(requestAction, responseAction, mockPayload)
    );

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(dispatcher.addActionListener).toHaveBeenCalledWith(
      responseAction,
      expect.any(Function)
    );

    unmount();

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(dispatcher.removeActionListener).toHaveBeenCalledWith(
      responseAction,
      expect.any(Function)
    );
  });

  it("should set data and stop operation on valid action response", () => {
    const { result } = renderHook(() =>
      useAction(requestAction, responseAction, mockPayload)
    );

    act(() => {
      const handleActionResponse = (dispatcher.addActionListener as jest.Mock)
        .mock.calls[0][1] as ActionListener; // eslint-disable-line @typescript-eslint/no-unsafe-member-access

      handleActionResponse({ id: "123" }, Date.now());
    });

    expect(result.current.data).toEqual({
      action: responseAction,
      payload: mockPayload
    });
    expect(result.current.isOperationInProgress).toBe(false);
  });

  it("should set data and stop operation on valid action response with customId", () => {
    const { result } = renderHook(() =>
      useAction(
        requestAction,
        responseAction,
        mockPayload,
        (result: { errorId: string; id: string }) => result.errorId
      )
    );

    act(() => {
      const handleActionResponse = (dispatcher.addActionListener as jest.Mock)
        .mock.calls[0][1] as ActionListener; // eslint-disable-line @typescript-eslint/no-unsafe-member-access

      handleActionResponse({ errorId: "123" }, Date.now());
    });

    expect(result.current.data).toEqual({
      action: responseAction,
      payload: { errorId: "123" }
    });
    expect(result.current.isOperationInProgress).toBe(false);
  });

  it("should start operation in progress and send message on execute", () => {
    const { result } = renderHook(() =>
      useAction(requestAction, responseAction, mockPayload)
    );

    act(() => {
      result.current.execute();
    });

    expect(result.current.isOperationInProgress).toBe(true);
    expect(window.sendMessageToDigma).toHaveBeenCalledWith({
      action: requestAction,
      payload: mockPayload
    });
  });
});
