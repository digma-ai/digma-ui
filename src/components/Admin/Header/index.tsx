import { Route, Routes } from "react-router-dom";
import { FunnelIcon } from "../../common/icons/16px/FunnelIcon";
import { NewIconButton } from "../../common/v3/NewIconButton";
import { EnvironmentSelect } from "./EnvironmentSelect";
import { Greeting } from "./Greeting";
import * as s from "./styles";

export const Header = () => (
  <s.Header>
    <Routes>
      <Route
        path={"home"}
        element={
          <s.HomeHeader>
            <Greeting currentDateTime={Date.now()} />
            <s.FilterContainer>
              <EnvironmentSelect />
              <NewIconButton
                buttonType={"secondary"}
                icon={FunnelIcon}
                size={"large"}
              />
            </s.FilterContainer>
          </s.HomeHeader>
        }
      />
      <Route path={"reports/*"} element={<span>Reports</span>} />
    </Routes>
  </s.Header>
);
