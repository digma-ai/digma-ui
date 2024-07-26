import { EnvironmentIcon } from "../../../common/icons/12px/EnvironmentIcon";
import { ServiceIcon } from "../../../common/icons/12px/ServiceIcon";
import { Ribbon } from "./Ribbon";
import * as s from "./styles";

export const ReportsHeader = () => {
  return (
    <s.Container>
      <Ribbon
        onDownload={() => {
          1;
        }}
        onRefresh={() => {
          1;
        }}
      />
      <s.FiltersContainer>
        <s.Background>
          <img src={"images/report-background.svg"} />
        </s.Background>

        <s.Group>
          <s.Header>Digma Report</s.Header>
          <s.FiltersGroup>
            <s.FilterSelector
              items={[]}
              icon={EnvironmentIcon}
              onChange={() => {
                1;
              }}
              placeholder="Environments"
            />
            <s.FilterSelector
              items={[]}
              icon={ServiceIcon}
              onChange={() => {
                1;
              }}
              placeholder="All Services"
            />
          </s.FiltersGroup>
        </s.Group>
      </s.FiltersContainer>
    </s.Container>
  );
};
