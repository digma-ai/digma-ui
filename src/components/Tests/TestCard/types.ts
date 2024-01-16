import { Test, TestsData } from "../types";

export interface TestCardProps {
  test: Test;
  spanContexts: TestsData["spanContexts"];
  onTicketInfoOpen: (test: Test) => void;
}
