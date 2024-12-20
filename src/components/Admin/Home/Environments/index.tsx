import { useEffect, useState } from "react";
import {
  getEnvironments,
  type GetEnvironmentsResponse
} from "../../../../api/web/services/environments";
import { logger } from "../../../../logging";
import { HomeSection } from "../HomeSection";
import { EnvironmentWidget } from "./EnvironmentWidget";
import * as s from "./styles";

export const Environments = () => {
  const [environments, setEnvironments] = useState<GetEnvironmentsResponse>([]);

  useEffect(() => {
    getEnvironments()
      .then((data) => {
        setEnvironments(data);
      })
      .catch((error) => {
        logger.error(error);
      });
  }, []);

  return (
    <HomeSection title={"Environments"}>
      <s.WidgetsContainer>
        {environments.map((environment) => (
          <EnvironmentWidget key={environment.id} environment={environment} />
        ))}
      </s.WidgetsContainer>
    </HomeSection>
  );
};
