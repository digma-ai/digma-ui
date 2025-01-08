import { useGetUserProfileQuery } from "../../../../redux/services/digma";
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

export const Greeting = ({ currentDateTime }: GreetingProps) => {
  const { data: userProfile } = useGetUserProfileQuery();
  const greetingText = getGreetingText(currentDateTime);

  if (!userProfile) {
    return null;
  }

  return (
    <span>
      <s.GreetingText>{greetingText}</s.GreetingText> {userProfile.email}
    </span>
  );
};
