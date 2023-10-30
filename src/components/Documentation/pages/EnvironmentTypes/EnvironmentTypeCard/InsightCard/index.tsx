import { isNumber } from "../../../../../../typeGuards/isNumber";
import { BottleneckIcon } from "../../../../../common/icons/BottleneckIcon";
import { InfoCircleIcon } from "../../../../../common/icons/InfoCircleIcon";
import { SQLDatabaseIcon } from "../../../../../common/icons/SQLDatabaseIcon";
import { ScalesIcon } from "../../../../../common/icons/ScalesIcon";
import { SnailIcon } from "../../../../../common/icons/SnailIcon";
import { SpotIcon } from "../../../../../common/icons/SpotIcon";
import { WarningCircleIcon } from "../../../../../common/icons/WarningCircleIcon";
import * as s from "./styles";
import {
  InsightCardProps,
  InsightCardType,
  InsightCardTypeData
} from "./types";

const getInsightTypeCardData = (type: InsightCardType): InsightCardTypeData => {
  const data = {
    [InsightCardType.TRACING_DATA]: {
      name: "Tracing Data",
      description:
        "Tracing data allows you to see clear visualizations of handling requests, scheduled jobs, tasks, or other processes within your application. For each code Digma captures observability data for, you can see the flow of control, parameters, and even queries through trace visualization."
    },
    [InsightCardType.QUERY_ISSUES]: {
      icon: SQLDatabaseIcon,
      name: "Query issues",
      description:
        "Digma analyzes database query traces to find common issues such as N+1 Selects queries (queries that have repeated select statements due to inefficient ORM modeling), bulk inserts optimizations, Open Session in view, and other issues and anti-patterns."
    },
    [InsightCardType.BOTTLENECKS]: {
      icon: BottleneckIcon,
      name: "Bottlenecks",
      description:
        "Identifying bottlenecks allows seeing where most of the time is spent during specific processes or requests. This makes it easier to troubleshoot performance issues and also to identify bottlenecks that affect multiple flows within the application."
    },
    [InsightCardType.ERRORS]: {
      icon: WarningCircleIcon,
      name: "Errors",
      description:
        'Digma finds exceptions and stack traces even if you were not debugging the code or if the exception was "swallowed" by aggressive exception handling. You can fully navigate the stack traces to see where in the code it originated as well as track when the exception started appearing and when it had last occurred.'
    },
    [InsightCardType.SCALING_ISSUES]: {
      icon: ScalesIcon,
      name: "Scaling Issues",
      description:
        "Scaling issues can reveal themselves even in CI, especially for tests that create load and multi-threading scenarios. Digma identifies areas that don’t scale well under concurrency and points at critical areas or root cause locations in the code that create performance degradation when scaling up."
    },
    [InsightCardType.SLOWDOWN_PERF_IMPROVEMENTS]: {
      icon: SnailIcon,
      name: "Slowdowns/perf. improvements",
      description:
        "Digma can detect when code changes inadvertently cause a performance regression. Digma creates a baseline for different processes and spans and raises a flag or highlights any chance due to code changes or new features."
    },
    [InsightCardType.SLOWDOWN_ROOT_CAUSE_DETECTION]: {
      icon: SnailIcon,
      name: "Slowdown Root Cause Detection",
      description:
        "Digma can detect when code changes inadvertently cause a performance regression. Digma creates a baseline for different processes and spans and raises a flag or highlights any chance due to code changes or new features."
    },
    [InsightCardType.PERFORMANCE_IMPACT]: {
      name: "Performance impact",
      description:
        "Digma analyzes the performance impact of different areas and code locations to be able to a ‘punch for the bucks’ view of where to focus optimization efforts. To improve performance it's not enough to examine the durations and statistics, usage and overall effect can make a lot of difference."
    },
    [InsightCardType.USAGE_ANALYSIS]: {
      name: "Usage Analysis",
      description:
        "See the real runtime usage of any observed code or query. Detect areas in code that are never reached or have a clear view of the impacted flows, consumers or endpoints by code changes in any given class or module."
    },
    [InsightCardType.ERROR_HOTSPOTS]: {
      icon: SpotIcon,
      name: "Error Hotspots",
      description:
        "Be aware of any escalating, new, unhandled, and high-impact errors in the code and where they originate. See hotspot locations in the code to prioritize production environment issues and focus on code that affects users the most."
    },
    [InsightCardType.TOO_MANY_HTTP_CALLS]: {
      icon: SQLDatabaseIcon,
      name: "Too many HTTP Calls",
      description:
        'Find likely candidates for caching where too many calls are retrieving data using the same URL. Detect "Chatty" APIs that may be causing performance degradation and increased resource consumption.'
    }
  };

  return data[type];
};

export const InsightCard = (props: InsightCardProps) => {
  const insightTypeCardInfo = getInsightTypeCardData(props.type);

  if (!insightTypeCardInfo) {
    return <></>;
  }

  return (
    <s.Container $isDisabled={props.isDisabled}>
      <s.Header>
        {insightTypeCardInfo.icon && (
          <insightTypeCardInfo.icon size={22} color={"currentcolor"} />
        )}
        <span>{insightTypeCardInfo.name}</span>
      </s.Header>
      <s.Description>{insightTypeCardInfo.description}</s.Description>
      <s.StatusContainer>
        {!props.isDisabled && (
          <>
            {isNumber(props.count) ? (
              <s.CountChip $count={props.count}>{`${props.count} issue${
                props.count === 1 ? "" : "s"
              } found`}</s.CountChip>
            ) : (
              <s.NoDataContainer>
                <s.NoDataChip>No Data</s.NoDataChip>
                <InfoCircleIcon size={14} color={"currentColor"} />
                <s.Link>What is this?</s.Link>
              </s.NoDataContainer>
            )}
          </>
        )}
      </s.StatusContainer>
    </s.Container>
  );
};
