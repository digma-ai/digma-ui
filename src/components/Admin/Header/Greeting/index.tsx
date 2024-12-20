import * as s from "./styles";
import type { GreetingProps } from "./types";

const getGreetingText = (dateTime: number) => {
  const currentHour = new Date(dateTime).getHours();

  let timeOfDay = "evening";

  if (currentHour >= 4 && currentHour < 12) {
    timeOfDay = "morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    timeOfDay = "afternoon";
  }

  return `Good ${timeOfDay}`;
};

export const Greeting = ({ currentDateTime, username }: GreetingProps) => {
  const greetingText = getGreetingText(currentDateTime);

  return (
    <s.GreetingText>
      {greetingText} <s.Username>{username}</s.Username>
    </s.GreetingText>
  );
};
