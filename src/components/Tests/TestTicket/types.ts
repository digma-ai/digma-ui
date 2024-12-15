import type { Test, TestsData } from "../types";

export interface TestTicketProps {
  test: Test;
  spanContexts: TestsData["spanContexts"];
  onClose: () => void;
}
