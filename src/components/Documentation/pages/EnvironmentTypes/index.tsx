import { EnvironmentTypeCard } from "./EnvironmentTypeCard";
import { InsightCard } from "./InsightCard";
import { environmentTypesData } from "./data";
import * as s from "./styles";

const renderEnvironmentTypesTable = () => (
  <s.Table>
    <s.TableRow>
      {environmentTypesData.map((x) => (
        <s.TableCell key={x.id}>
          <EnvironmentTypeCard
            name={x.name}
            icon={x.icon}
            description={x.description}
            insights={x.insights}
            status={x.status}
          />
        </s.TableCell>
      ))}
    </s.TableRow>
  </s.Table>
);

const renderInsightsTable = () => {
  const rowsCount = Math.max(
    ...environmentTypesData.map((x) => x.insights.length)
  );
  const rowsArray = new Array(rowsCount).fill(0);

  return (
    <s.Table>
      {rowsArray.map((_, i) => (
        <s.TableRow key={i}>
          {environmentTypesData.map((x) => {
            const insight = x.insights[i];
            return (
              <s.TableCell key={`${x.id}_${i}`}>
                {insight && (
                  <InsightCard
                    type={insight.type}
                    count={insight.count}
                    isDisabled={!x.status}
                  />
                )}
              </s.TableCell>
            );
          })}
        </s.TableRow>
      ))}
    </s.Table>
  );
};

export const EnvironmentTypes = () => {
  const columnCount = environmentTypesData.length;

  return (
    <s.Container $columnCount={columnCount}>
      <s.TopGradientBackground />
      <s.BottomGradientBackground />
      <s.ContentContainer>
        <s.Header $columnCount={columnCount}>
          {/* <s.HeaderTextContainer>
            <s.Title>
              <DigmaLogoIcon size={16} />
              <span>Digma Insight Overview</span>
            </s.Title>
            <span>
              The following lists describes some Digma&apos;s capabilities in
              analyzing observability for multiple environment types, from local
              dev and test through CI to real world production environment.
            </span>
          </s.HeaderTextContainer> */}
          {renderEnvironmentTypesTable()}
        </s.Header>
        <s.EnvironmentsContainer>
          {renderInsightsTable()}
        </s.EnvironmentsContainer>
      </s.ContentContainer>
    </s.Container>
  );
};
