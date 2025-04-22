import type { ChangeEvent } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { isNull } from "../../../typeGuards/isNull";
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

const isValueValid = (value: string) => {
  const intValue = parseInt(value);
  return (
    Number.isInteger(intValue) && intValue >= MIN_VALUE && intValue <= MAX_VALUE
  );
};

export const DaysFilter = ({
  onChange,
  value,
  trackingPrefix = ""
}: DaysFilterProps) => {
  const prefixedTrackingEvents = addPrefix(trackingPrefix, trackingEvents, " ");
  const [isDateMenuOpen, setIsDateMenuOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>(value?.toString() ?? "");

  useEffect(() => {
    setInputValue(value?.toString() ?? "");
  }, [value]);

  const handleSelectionChange = useCallback(
    (days: number) => {
      onChange(days);
      setIsDateMenuOpen(false);
    },
    [onChange]
  );

  const daysFilterMenuItems = useMemo(
    () =>
      Object.values(DEFAULT_LIST_OPTIONS).map((x) => ({
        id: x.toString(),
        label: "Last " + getOptionLabel(x),
        isSelected: value === x,
        onClick: () => handleSelectionChange(x)
      })),
    [handleSelectionChange, value]
  );

  const handleMenuButtonClick = () => {
    sendUserActionTrackingEvent(
      prefixedTrackingEvents.DAYS_FILTER_BUTTON_CLICKED
    );
    setIsDateMenuOpen(!isDateMenuOpen);
  };

  const handleCounterInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    sendUserActionTrackingEvent(
      prefixedTrackingEvents.DAYS_FILTER_INPUT_VALUE_CHANGE
    );

    setInputValue(e.target.value);
  };

  const handleDecrement = () => {
    sendUserActionTrackingEvent(
      prefixedTrackingEvents.DAYS_FILTER_DECREMENT_CLICKED
    );
    const newValue = parseInt(inputValue) - 1;
    setInputValue(newValue.toString());
  };

  const handleIncrement = () => {
    sendUserActionTrackingEvent(
      prefixedTrackingEvents.DAYS_FILTER_INCREMENT_CLICKED
    );
    const newValue = parseInt(inputValue) + 1;
    setInputValue(newValue.toString());
  };

  const handleApplyClick = () => {
    sendUserActionTrackingEvent(trackingEvents.DAYS_FILTER_APPLY_BTN_CLICKED);
    onChange(parseInt(inputValue));
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
                  isDisabled={
                    !Number.isInteger(parseInt(inputValue)) ||
                    parseInt(inputValue) <= MIN_VALUE
                  }
                />
                <s.CounterInput
                  onChange={handleCounterInputChange}
                  $isActive={Boolean(
                    isValueValid(inputValue) &&
                      !DEFAULT_LIST_OPTIONS.includes(parseInt(inputValue))
                  )}
                  value={inputValue}
                />
                <NewIconButton
                  buttonType={"secondaryBorderless"}
                  icon={() => <PlusIcon size={16} color={"currentColor"} />}
                  onClick={handleIncrement}
                  isDisabled={
                    !Number.isInteger(parseInt(inputValue)) ||
                    parseInt(inputValue) >= MAX_VALUE
                  }
                />
                <s.Text>Last days</s.Text>
              </s.Counter>
              <s.ApplyButton
                buttonType={"primary"}
                label={"Apply filters"}
                onClick={handleApplyClick}
                isDisabled={!isValueValid(inputValue)}
              />
            </s.CustomCounterContainer>
          </s.ItemsContainer>
        </s.DatePopup>
      }
      placement={"bottom-end"}
    >
      <s.DateButton
        $isActive={!isNull(value)}
        icon={() => (
          <s.ButtonIconContainer>
            <CalendarIcon size={12} color={"currentColor"} />
          </s.ButtonIconContainer>
        )}
        label={!isNull(value) ? getOptionLabel(value) : "Dates"}
        buttonType={"secondary"}
        onClick={handleMenuButtonClick}
      />
    </NewPopover>
  );
};
