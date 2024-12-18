import { act, renderHook } from "@testing-library/react";
import type { ActionListener } from "../api/types";
import { dispatcher } from "../dispatcher";
import type { DataFetcherConfiguration } from "./useFetchData";
import { useFetchData } from "./useFetchData";

jest.mock("../dispatcher", () => ({
  dispatcher: {
    addActionListener: jest.fn(),
    removeActionListener: jest.fn()
  }
}));

const mockSendMessageToDigma = jest.fn();
window.sendMessageToDigma = mockSendMessageToDigma;

describe("useFetchData", () => {
  const requestAction = "REQUEST_ACTION";
  const responseAction = "RESPONSE_ACTION";
  const payload = { key: "value" };

  const setup = (config: Partial<DataFetcherConfiguration> = {}) => {
    const defaultConfig = { requestAction, responseAction, ...config };

    return renderHook(
      ({ config, payload }) =>
        useFetchData<typeof payload, { data: string }>(config, payload),
      {
        initialProps: { config: defaultConfig, payload }
      }
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize correctly", () => {
    const { result } = setup();
    expect(result.current.data).toBeUndefined();
  });

  it("should fetch data on mount", () => {
    setup();
    expect(mockSendMessageToDigma).toHaveBeenCalledWith({
      action: requestAction,
      payload
    });
  });

  it("should handle response and set data", () => {
    const { result } = setup();
    const handleData = (dispatcher.addActionListener as jest.Mock).mock
      .calls[0][1] as ActionListener; // eslint-disable-line @typescript-eslint/no-unsafe-member-access

    act(() => {
      handleData({ data: "testData" }, Date.now());
    });

    expect(result.current.data).toEqual({ data: "testData" });
  });

  it("should refresh data at specified interval", () => {
    jest.useFakeTimers();
    setup({ refreshWithInterval: true, refreshInterval: 5000 });

    expect(mockSendMessageToDigma).toHaveBeenCalledTimes(1);

    const handleData = (dispatcher.addActionListener as jest.Mock).mock
      .calls[0][1] as ActionListener; // eslint-disable-line @typescript-eslint/no-unsafe-member-access
    act(() => {
      handleData({ data: "testData" }, Date.now());
    });

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(mockSendMessageToDigma).toHaveBeenCalledTimes(2);

    jest.useRealTimers();
  });

  it("should fetch data on requestAction change", () => {
    const { rerender } = setup();
    expect(mockSendMessageToDigma).toHaveBeenCalledTimes(1);

    const newRequestAction = "NEW_REQUEST_ACTION";

    rerender({
      config: {
        requestAction: newRequestAction,
        responseAction
      },
      payload
    });

    expect(mockSendMessageToDigma).toHaveBeenCalledTimes(2);
    expect(mockSendMessageToDigma).toHaveBeenCalledWith({
      action: newRequestAction,
      payload
    });
  });

  it("should fetch data on responseAction change", () => {
    const { rerender } = setup();

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(dispatcher.addActionListener).toHaveBeenCalledWith(
      responseAction,
      expect.any(Function)
    );

    rerender({
      config: {
        requestAction,
        responseAction: "NEW_RESPONSE_ACTION"
      },
      payload
    });

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(dispatcher.addActionListener).toHaveBeenCalledWith(
      "NEW_RESPONSE_ACTION",
      expect.any(Function)
    );
  });

  it("should fetch data on payload change", () => {
    const { rerender } = setup({ refreshOnPayloadChange: true });

    expect(mockSendMessageToDigma).toHaveBeenCalledTimes(1);

    rerender({
      config: {
        requestAction,
        responseAction,
        refreshOnPayloadChange: true
      },
      payload: { key: "newValue" }
    });

    expect(mockSendMessageToDigma).toHaveBeenCalledTimes(2);
  });

  it("should fetch data with the new payload on payload change with interval", () => {
    jest.useFakeTimers();

    const refreshInterval = 500;

    const config = {
      refreshOnPayloadChange: true,
      refreshWithInterval: true,
      refreshInterval
    };

    const { rerender } = setup(config);

    expect(mockSendMessageToDigma).toHaveBeenCalledTimes(1);

    const newPayload = { key: "newValue" };

    rerender({
      config: {
        requestAction,
        responseAction,
        ...config
      },
      payload: newPayload
    });

    expect(mockSendMessageToDigma).toHaveBeenCalledTimes(2);

    const handleData = (dispatcher.addActionListener as jest.Mock).mock
      .calls[0][1] as ActionListener; // eslint-disable-line @typescript-eslint/no-unsafe-member-access

    act(() => {
      handleData({ data: "testData" }, Date.now());
    });

    act(() => {
      jest.advanceTimersByTime(refreshInterval);
    });

    expect(mockSendMessageToDigma).toHaveBeenNthCalledWith(3, {
      action: requestAction,
      payload: newPayload
    });

    jest.useRealTimers();
  });

  it("should fetch data on refreshWithInterval change", () => {
    const { rerender } = setup({ refreshWithInterval: false });

    expect(mockSendMessageToDigma).toHaveBeenCalledTimes(1);

    rerender({
      config: {
        requestAction,
        responseAction,
        refreshWithInterval: true,
        refreshInterval: 5000
      },
      payload
    });

    expect(mockSendMessageToDigma).toHaveBeenCalledTimes(2);
  });

  it("should fetch data on refreshInterval change", () => {
    jest.useFakeTimers();
    const { rerender } = setup({
      refreshWithInterval: true,
      refreshInterval: 5000
    });

    expect(mockSendMessageToDigma).toHaveBeenCalledTimes(1);

    rerender({
      config: {
        requestAction,
        responseAction,
        refreshWithInterval: true,
        refreshInterval: 10000
      },
      payload
    });

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(mockSendMessageToDigma).toHaveBeenCalledTimes(2);

    jest.useRealTimers();
  });

  it("should enable and disable fetching correctly", () => {
    const { rerender } = setup({ isEnabled: true });

    expect(mockSendMessageToDigma).toHaveBeenCalledTimes(1);

    rerender({
      config: { requestAction, responseAction, isEnabled: false },
      payload
    });

    expect(mockSendMessageToDigma).toHaveBeenCalledTimes(1);
  });

  it("should debounce fetch data calls", () => {
    jest.useFakeTimers();
    const debounceDelay = 300;
    const config: DataFetcherConfiguration = {
      requestAction,
      responseAction,
      refreshOnPayloadChange: true,
      refreshWithDebounce: true,
      debounceDelay
    };
    const { rerender } = setup(config);

    expect(mockSendMessageToDigma).toHaveBeenCalledTimes(1);

    act(() => {
      rerender({ config, payload: { key: "value1" } });
      rerender({ config, payload: { key: "value2" } });
      rerender({ config, payload: { key: "value3" } });
    });

    act(() => {
      jest.advanceTimersByTime(debounceDelay);
    });

    expect(mockSendMessageToDigma).toHaveBeenCalledTimes(2);

    jest.useRealTimers();
  });

  it("should cleanup correctly", () => {
    const { unmount } = setup();

    unmount();

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(dispatcher.removeActionListener).toHaveBeenCalledWith(
      responseAction,
      expect.any(Function)
    );
  });
});
