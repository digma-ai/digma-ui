import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useTheme } from "styled-components";
import { isString } from "../../typeGuards/isString";
import { getThemeKind } from "../common/App/styles";
import { Select } from "../common/v3/Select";
import { SelectItem } from "../common/v3/Select/types";
import { scanIDEs } from "./scanIDEs";
import * as s from "./styles";

const SELECT_VALUE_DELIMITER = ":";

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
  const [isInitialLoading, setInitialLoading] = useState(true);
  // const [isOpening, setIsOpening] = useState(false);
  const [items, setItems] = useState<SelectItem[]>([]);
  const params = getURLQueryParams(window.location.search);
  const isMobile = ["Android", "iPhone", "iPad"].some((x) =>
    window.navigator.userAgent.includes(x)
  );

  const handleSelectChange = (value: string | string[]) => {
    const selectedValue = isString(value) ? value : value[0];
    const [port, project] = selectedValue.split(SELECT_VALUE_DELIMITER);

    const pluginParams = Object.entries(params).reduce((acc, [key, value]) => {
      const KEY_PREFIX = "plugin.";
      if (key.startsWith(KEY_PREFIX)) {
        const newKey = key.replace(KEY_PREFIX, "");
        acc[newKey] = value;
      }

      return acc;
    }, {} as Record<string, string>);

    axios
      .get(`http://localhost:${port}/api/digma/show`, {
        params: { ...pluginParams, projectName: project }
      })
      .then(() => {
        // TODO: handle response
      })
      .catch(() => {
        // TODO: handle error
      });

    // setIsOpening(true);

    const itemToSelect = items.find((item) => item.value === selectedValue);
    setItems(
      items.map((item) => ({ ...item, selected: item === itemToSelect }))
    );
  };

  useEffect(() => {
    async function getIDEsInfo() {
      const ideInfo = await scanIDEs();
      const projects = ideInfo
        .filter((x) => x.response.isCentralized)
        .flatMap((info) =>
          info.response.openProjects.map((project) => ({
            ...info,
            project: project,
            port: info.port
          }))
        );

      setItems(
        projects.map((x) => ({
          label: `${x.response.name} (${x.project})`,
          description: `${x.response.name} (${x.project})`,
          value: [x.port, x.project].join(SELECT_VALUE_DELIMITER),
          enabled: true,
          selected: false
        }))
      );
      setInitialLoading(false);
    }

    if (!isMobile) {
      void getIDEsInfo();
    }
  }, [isMobile]);

  const selectedItem = items.find((item) => item.selected);

  const renderContent = () => {
    if (isMobile) {
      return (
        <s.TextContainer>
          <s.Title>Failed to open</s.Title>
          <s.Description>
            This cannot be opened on your mobile device. Please switch to a
            desktop with an IDE installed.
          </s.Description>
        </s.TextContainer>
      );
    }

    return isInitialLoading ? (
      <>Scanning running IDEs...</>
    ) : (
      <>
        <s.TextContainer>
          <s.Title>Select an IDE to view the Digma issue</s.Title>
          <s.Description>
            {items.length > 0 ? (
              <>
                Please select the IDE project you&apos;d like to open all
                endpoints in the {params.environment ?? "selected"} environment.
              </>
            ) : (
              <>No IDEs with enabled Digma plugin found</>
            )}
          </s.Description>
        </s.TextContainer>
        {items.length > 0 && (
          <s.SelectContainer>
            <Select
              placeholder={selectedItem?.label ?? "Select IDE Project"}
              items={items}
              onChange={handleSelectChange}
            />
          </s.SelectContainer>
        )}
      </>
    );
  };

  return (
    <s.Container>
      <Helmet>
        <title>IDE Launcher</title>
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
