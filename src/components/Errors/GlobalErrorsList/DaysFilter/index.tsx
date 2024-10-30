import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { usePrevious } from "../../../../hooks/usePrevious";
import { DAYS_FILTER_DEFAULT_VALUE } from "../../../../store/errors/errorsSlice";
import { isUndefined } from "../../../../typeGuards/isUndefined";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { formatUnit } from "../../../../utils/formatUnit";
import { CalendarIcon } from "../../../common/icons/12px/CalendarIcon";
import { MinusIcon } from "../../../common/icons/MinusIcon";
import { PlusIcon } from "../../../common/icons/PlusIcon";
import { NewPopover } from "../../../common/NewPopover";
import { NewIconButton } from "../../../common/v3/NewIconButton";
import { MenuList } from "../../../Navigation/common/MenuList";
import { trackingEvents } from "../../tracking";
import * as s from "./styles";
import { DaysFilterProps } from "./types";

const MAX_VALUE = 14;
const MIN_VALUE = 1;

const DEFAULT_LIST_OPTIONS = [7, 14];

const getOptionLabel = (days: number) => `${days} ${formatUnit(days, "Day")}`;

export const DaysFilter = ({ onChanged }: DaysFilterProps) => {
  const [isDateMenuOpen, setIsDateMenuOpen] = useState(false);
  const [selectedDays, setSelectedDays] = useState<number>(
    DAYS_FILTER_DEFAULT_VALUE
  );
  const [currentValue, setCurrentValue] = useState<number | undefined>();
  const previousSelectedDays = usePrevious(selectedDays);
  const handleSelectionChange = useCallback((days: number) => {
    setSelectedDays(days);
    setCurrentValue(days);
    setIsDateMenuOpen(false);
  }, []);

  const daysFilterMenuItems = useMemo(
    () =>
      Object.values(DEFAULT_LIST_OPTIONS).map((x) => ({
        id: x.toString(),
        label: "Last " + getOptionLabel(x),
        isSelected: selectedDays === x,
        onClick: () => handleSelectionChange(x)
      })),
    [handleSelectionChange, selectedDays]
  );

  useEffect(() => {
    if (previousSelectedDays !== selectedDays) {
      onChanged(selectedDays ?? DAYS_FILTER_DEFAULT_VALUE);
    }
  }, [selectedDays, previousSelectedDays, onChanged]);

  const handleMenuButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.GLOBAL_ERRORS_VIEW_DATES_FILTERS_CHANGE
    );
    setIsDateMenuOpen(!isDateMenuOpen);
    setCurrentValue(selectedDays);
  };

  const handleCounterInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const intValue = parseInt(newValue);
    const days =
      !newValue || Number.isNaN(intValue)
        ? undefined
        : intValue > MAX_VALUE
        ? currentValue
        : intValue;

    sendUserActionTrackingEvent(
      trackingEvents.GLOBAL_ERRORS_DAYS_FILTER_DECREMENT_CLICKED
    );
    setCurrentValue(days);
  };

  const handleDecrement = () => {
    if (currentValue === MIN_VALUE) {
      return;
    }
    sendUserActionTrackingEvent(
      trackingEvents.GLOBAL_ERRORS_DAYS_FILTER_DECREMENT_CLICKED
    );
    setCurrentValue(currentValue ? currentValue - 1 : 0);
  };

  const handleIncrement = () => {
    if (currentValue === MAX_VALUE) {
      return;
    }

    sendUserActionTrackingEvent(
      trackingEvents.GLOBAL_ERRORS_DAYS_FILTER_INCREMENT_CLICKED
    );
    setCurrentValue(currentValue ? currentValue + 1 : 1);
  };

  const handleApplyClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.GLOBAL_ERRORS_DAYS_FILTER_APPLY_BTN_CLICKED
    );

    if (!currentValue) {
      setCurrentValue(DAYS_FILTER_DEFAULT_VALUE);
    } else {
      setSelectedDays(currentValue);
    }
    setIsDateMenuOpen(false);
  };

  return (
    <NewPopover
      isOpen={isDateMenuOpen}
      onOpenChange={setIsDateMenuOpen}
      content={
        <s.DatePopup>
          <s.ItemsContainer>
            <MenuList items={daysFilterMenuItems} highlightSelected={true} />
            <s.CustomCounterContainer>
              <s.Counter>
                <NewIconButton
                  buttonType="secondaryBorderless"
                  icon={() => <MinusIcon size={16} color="currentColor" />}
                  onClick={handleDecrement}
                />
                <s.CounterInput
                  onChange={handleCounterInputChange}
                  $isActive={Boolean(
                    selectedDays && !DEFAULT_LIST_OPTIONS.includes(selectedDays)
                  )}
                  value={currentValue?.toString()}
                />
                <NewIconButton
                  buttonType="secondaryBorderless"
                  icon={() => <PlusIcon size={16} color="currentColor" />}
                  onClick={handleIncrement}
                />
                <s.Text>Last days</s.Text>
              </s.Counter>
              <s.ApplyButton
                buttonType="primary"
                label="Apply filters"
                onClick={handleApplyClick}
              />
            </s.CustomCounterContainer>
          </s.ItemsContainer>
        </s.DatePopup>
      }
      placement={"bottom-end"}
    >
      <s.DateButton
        $isActive={!isUndefined(selectedDays) && selectedDays > 0}
        icon={() => (
          <s.ButtonIconContainer>
            <CalendarIcon size={12} color={"currentColor"} />
          </s.ButtonIconContainer>
        )}
        label={selectedDays ? getOptionLabel(selectedDays) : "Dates"}
        buttonType={"secondary"}
        onClick={handleMenuButtonClick}
      />
    </NewPopover>
  );
};
