export type PromotionType = "udemy" | "early-access";

export interface EarlyAccessPromotionDetails {
  dismissalDate?: number;
  isCompleted: boolean;
  completionDate?: number;
}
