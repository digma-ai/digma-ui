import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useTheme } from "styled-components";
import { isString } from "../../typeGuards/isString";
import { getThemeKind } from "../common/App/styles";
import { NewButton } from "../common/v3/NewButton";
import { Select } from "../common/v3/Select";
import { SelectItem } from "../common/v3/Select/types";
import { scanRunningIdeProjects } from "./scanRunningIdeProjects";
import { showIdeProject } from "./showIdeProject";
import * as s from "./styles";
import { ShowIdeProjectResult } from "./types";

const SELECT_VALUE_DELIMITER = ":";

const getSelectItemValue = (port: number, project: string) =>
  `${port}${SELECT_VALUE_DELIMITER}${project}`;

const parseSelectedItemValue = (value: string) => {
  const [port, project] = value.split(SELECT_VALUE_DELIMITER);
  return { port: Number(port), project };
};

const getURLQueryParams = (url: string) => {
  const searchParams = new URLSearchParams(url);
  const params: Record<string, string> = {};
  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }
  return params;
};

export const IdeLauncher = () => {
  const theme = useTheme();
  const themeKind = getThemeKind(theme);
  const [selectItems, setSelectItems] = useState<SelectItem[]>();
  const isMobile = ["Android", "iPhone", "iPad"].some((x) =>
    window.navigator.userAgent.includes(x)
  );
  const [isIdeProjectScanningInProgress, setIsIdeProjectScanningInProgress] =
    useState(false);
  const [isShowIdeProjectInProgress, setIsShowIdeProjectInProgress] =
    useState(false);
  const [showIdeProjectResult, setShowIdeProjectResult] =
    useState<ShowIdeProjectResult>();

  const tryToShowIdeProject = useCallback(
    async (port: number, project: string) => {
      setShowIdeProjectResult(undefined);
      setIsShowIdeProjectInProgress(true);
      const params = getURLQueryParams(window.location.search);
      const result = await showIdeProject(port, project, params);
      setShowIdeProjectResult(result);
      setIsShowIdeProjectInProgress(false);
    },
    []
  );

  const tryToScanRunningIdeProjects = useCallback(async () => {
    setSelectItems(undefined);
    setIsIdeProjectScanningInProgress(true);
    const result = await scanRunningIdeProjects();
    setIsIdeProjectScanningInProgress(false);

    const projects = result
      .filter((x) => x.response.isCentralized)
      .flatMap((info) =>
        info.response.openProjects.map((project) => ({
          ...info,
          project: project,
          port: info.port
        }))
      );

    setSelectItems(
      projects.map((x, i) => ({
        label: `${x.response.name} (${x.project})`,
        description: `${x.response.name} (${x.project})`,
        value: getSelectItemValue(x.port, x.project),
        enabled: true,
        selected: projects.length === 1 && i === 0
      }))
    );

    if (projects.length === 1) {
      await tryToShowIdeProject(projects[0].port, projects[0].project);
    }
  }, [tryToShowIdeProject]);

  const handleSelectChange = (value: string | string[]) => {
    const selectedValue = isString(value) ? value : value[0];

    setSelectItems((prev) => {
      if (!prev) {
        return prev;
      }

      return prev.map((item) => ({
        ...item,
        selected: item.value === selectedValue
      }));
    });
  };

  const handleRefreshButtonClick = () => {
    window.location.reload();
  };

  const handleTryAgainButtonClick = async () => {
    const selectedItemValue = selectItems?.find((item) => item.selected)?.value;
    if (!selectedItemValue) {
      return;
    }

    const { port, project } = parseSelectedItemValue(selectedItemValue);
    await tryToShowIdeProject(port, project);
  };

  useEffect(() => {
    async function initialScan() {
      await tryToScanRunningIdeProjects();
    }

    if (!isMobile) {
      void initialScan();
    }
  }, [isMobile, tryToScanRunningIdeProjects]);

  const selectedItem = selectItems?.find((item) => item.selected);

  const renderContent = () => {
    if (isMobile) {
      return (
        <s.TextContainer>
          <s.Title>Unsupported platform</s.Title>
          <s.Description>
            The IDE cannot be opened on this device.
          </s.Description>
        </s.TextContainer>
      );
    }

    if (isIdeProjectScanningInProgress) {
      return (
        <s.TextContainer>
          <s.Title>Looking for running IDEs...</s.Title>
        </s.TextContainer>
      );
    }

    if (isShowIdeProjectInProgress) {
      return (
        <s.TextContainer>
          <s.Title>
            Opening the {selectedItem?.label ?? "IDE project"}...
          </s.Title>
        </s.TextContainer>
      );
    }

    if (showIdeProjectResult?.error) {
      return (
        <>
          <s.TextContainer>
            <s.Title>
              Failed to open the {selectedItem?.label ?? "IDE project"}
            </s.Title>
            <s.Description>
              Please check that IDE is running and click the{" "}
              <s.ButtonName>Try again</s.ButtonName> button below.
            </s.Description>
          </s.TextContainer>
          <NewButton
            label={"Try again"}
            onClick={() => {
              void handleTryAgainButtonClick();
            }}
          />
        </>
      );
    }

    if (!selectItems) {
      return null;
    }

    if (selectItems.length === 0) {
      return (
        <>
          <s.TextContainer>
            <s.Title>Failed to find IDEs with Digma plugin running</s.Title>
            <s.Description>
              Please open the IDE with Digma plugin installed, check its
              settings and click the <s.ButtonName>Refresh</s.ButtonName> button
              below.
            </s.Description>
          </s.TextContainer>
          <NewButton label={"Refresh"} onClick={handleRefreshButtonClick} />
        </>
      );
    }

    if (selectItems.length > 0) {
      return (
        <>
          <s.TextContainer>
            <s.Title>Select the IDE project to view issues in Digma</s.Title>
            <s.Description>
              Please select the IDE project you&apos;d like to open.
            </s.Description>
          </s.TextContainer>
          <s.SelectContainer>
            <Select
              placeholder={selectedItem?.label ?? "Select IDE Project"}
              items={selectItems}
              onChange={handleSelectChange}
            />
          </s.SelectContainer>
        </>
      );
    }
  };

  return (
    <s.Container>
      <Helmet>
        <title>Digma IDE Plugin Launcher</title>
      </Helmet>
      <s.Header>
        <a
          target={"_blank"}
          rel={"noopener noreferrer"}
          href={"https://digma.ai"}
        >
          <s.Logo src={`/images/digmaLogo_${themeKind}.svg`} />
        </a>
      </s.Header>
      <s.Content>{renderContent()}</s.Content>
      <s.Footer>
        <span>&copy; {new Date().getFullYear()}</span>
        <s.FooterLink
          target={"_blank"}
          rel={"noopener noreferrer"}
          href={"https://digma.ai"}
        >
          digma.ai
        </s.FooterLink>
        <span>&#183; All Rights Reserved</span>
      </s.Footer>
    </s.Container>
  );
};
