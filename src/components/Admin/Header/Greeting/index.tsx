import { useEffect, useState } from "react";
import { useGetUserProfileQuery } from "../../../../redux/services/digma";
import * as s from "./styles";

const REFRESH_INTERVAL = 60 * 1000; // in milliseconds

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

export const Greeting = () => {
  const { data: userProfile } = useGetUserProfileQuery();
  const [currentDateTime, setCurrentDateTime] = useState(Date.now());
  const greetingText = getGreetingText(currentDateTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(Date.now());
    }, REFRESH_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  if (!userProfile) {
    return null;
  }

  return (
    <span>
      <s.GreetingText>{greetingText}</s.GreetingText> {userProfile.email}
    </span>
  );
};
