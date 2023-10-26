import { DigmaLogoIcon } from "../../../common/icons/DigmaLogoIcon";
import { EnvironmentTypeCard } from "./EnvironmentTypeCard";
import { environmentTypesData } from "./data";
import * as s from "./styles";

export const EnvironmentTypes = () => {
  return (
    <s.Container>
      <s.Header>
        <s.Title>
          <DigmaLogoIcon size={16} />
          <span>Feature rich Observability across the SDLC</span>
        </s.Title>
        <span>
          These are simple steps to help you collect observability data from
          your application running via Docker compose without changing the
          original docker-compose.yml file.
        </span>
      </s.Header>
      <s.EnvironmentsContainer>
        {environmentTypesData.map((x) => (
          <EnvironmentTypeCard
            key={x.id}
            name={x.name}
            icon={x.icon}
            description={x.description}
            insights={x.insights}
            status={x.status}
          />
        ))}
      </s.EnvironmentsContainer>
    </s.Container>
  );
};
