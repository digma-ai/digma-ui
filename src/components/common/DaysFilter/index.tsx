import type { ChangeEvent } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { usePrevious } from "../../../hooks/usePrevious";
import { isUndefined } from "../../../typeGuards/isUndefined";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { addPrefix } from "../../../utils/addPrefix";
import { formatUnit } from "../../../utils/formatUnit";
import { MenuList } from "../../Navigation/common/MenuList";
import { CalendarIcon } from "../icons/12px/CalendarIcon";
import { MinusIcon } from "../icons/MinusIcon";
import { PlusIcon } from "../icons/PlusIcon";
import { NewPopover } from "../NewPopover";
import { NewIconButton } from "../v3/NewIconButton";
import * as s from "./styles";
import { trackingEvents } from "./tracking";
import type { DaysFilterProps } from "./types";

const MAX_VALUE = 14;
const MIN_VALUE = 1;

const DEFAULT_LIST_OPTIONS = [7, 14];

const getOptionLabel = (days: number) => `${days} ${formatUnit(days, "Day")}`;

export const DaysFilter = ({
  onChange,
  defaultValue,
  trackingPrefix = ""
}: DaysFilterProps) => {
  const prefixedTrackingEvents = addPrefix(trackingPrefix, trackingEvents, " ");
  const [isDateMenuOpen, setIsDateMenuOpen] = useState(false);
  const [selectedDays, setSelectedDays] = useState<number>();
  const [currentValue, setCurrentValue] = useState<number | undefined>(
    defaultValue
  );
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
      onChange(selectedDays ?? defaultValue);
    }
  }, [selectedDays, previousSelectedDays, onChange, defaultValue]);

  const handleMenuButtonClick = () => {
    sendUserActionTrackingEvent(
      prefixedTrackingEvents.DAYS_FILTER_BUTTON_CLICKED
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
      prefixedTrackingEvents.DAYS_FILTER_INPUT_VALUE_CHANGE
    );
    setCurrentValue(days);
  };

  const handleDecrement = () => {
    if (currentValue === MIN_VALUE) {
      return;
    }
    sendUserActionTrackingEvent(
      prefixedTrackingEvents.DAYS_FILTER_DECREMENT_CLICKED
    );
    setCurrentValue(currentValue ? currentValue - 1 : 0);
  };

  const handleIncrement = () => {
    if (currentValue === MAX_VALUE) {
      return;
    }

    sendUserActionTrackingEvent(
      prefixedTrackingEvents.DAYS_FILTER_INCREMENT_CLICKED
    );
    setCurrentValue(currentValue ? currentValue + 1 : 1);
  };

  const handleApplyClick = () => {
    sendUserActionTrackingEvent(trackingEvents.DAYS_FILTER_APPLY_BTN_CLICKED);

    if (!currentValue) {
      setCurrentValue(defaultValue);
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
                  buttonType={"secondaryBorderless"}
                  icon={() => <MinusIcon size={16} color={"currentColor"} />}
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
                  buttonType={"secondaryBorderless"}
                  icon={() => <PlusIcon size={16} color={"currentColor"} />}
                  onClick={handleIncrement}
                />
                <s.Text>Last days</s.Text>
              </s.Counter>
              <s.ApplyButton
                buttonType={"primary"}
                label={"Apply filters"}
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
