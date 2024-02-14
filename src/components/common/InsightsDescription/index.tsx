import * as s from "./styles";

export const NPlusOneDescription = () => (
  <s.Content>
    N+1 Select are numerous SELECT queries often caused by ORM models. They can
    be resolved by eager loading relationships or using JOIN expressions. These
    selects are often more costly in production when the database roundtrip time
    is longer.
  </s.Content>
);

export const ChattyApiDescription = () => (
  <s.Content>
    Chatty APIs are numerous API calls between microservices or external
    services that should be optimized and reduced. A common solution is caching
    responses or using the API more efficiently.
  </s.Content>
);
export const SessionInViewDescription = () => (
  <s.Content>
    Open Session in View is an anti-pattern in which the view rendering stage
    triggers DB calls because of lazy properties initialization. It is
    recommended to pass DTOs to the view and avoid hitting the DB.
  </s.Content>
);
export const HighNumberOfQueriesDescription = () => (
  <s.Content>
    The high number of queries insight indicates that the current
    endpoint/consumer is triggering an abnormal number of DB queries. This can
    be typically resolved with caching or using more optimal queries.
  </s.Content>
);

export const CodeNexusDescription = () => (
  <s.Content>
    Code nexus areas are places in the code that have a number level of runtime
    dependencies. Developers To calculate this insight Digma looks at the
    following factors:
    <s.List>
      <li>
        Number of flows - how many unique execution flows touch this piece of
        code.
      </li>
      <li>
        Number of endpoints - How many endpoints/consumers or other entry points
        use this code.
      </li>
      <li> Number of services - How many microservices use this code.</li>
    </s.List>
  </s.Content>
);

export const HotSpotDescription = () => (
  <s.Content>
    Error hotspots are places in the code where errors are significant. There
    are several factors that make a place in the code an “error hotspot”:
    <s.List>
      <li>Is the error handled.</li>
      <li>Is the error escalating (we’re seeing more and more of it).</li>
      <li>Is the error recent.</li>
      <li>Is the error occurring on many.</li>
    </s.List>
  </s.Content>
);

export const BottleneckDescription = () => (
  <s.Content>
    This area significantly slows down the entire request and takes up at least
    30% of the request time. You should consider making this code asynchronous
    or otherwise optimize it.
  </s.Content>
);

export const ScalingIssueDescription = () => (
  <s.Content>
    Scaling issues are performance problems that emerge when the code is run
    concurrently. Digma analyzes the correlation between concurrency and
    performance and can detect when the degradation becomes problematic. To see
    a detailed analysis click on the “Histogram button.
  </s.Content>
);

export const QueryOptimization = () => (
  <s.Content>
    This query has been found to be especially slow compared to other queries of
    the same type running against the same DB. Consider optimizing this query or
    caching it.
  </s.Content>
);
