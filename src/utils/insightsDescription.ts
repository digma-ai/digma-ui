export const NPlusOneDescription =
  "N+1 Select are numerous  SELECT queries often caused by ORM models. \
   They can be resolved by eager loading relationships or using JOIN expressions. \
   These selects are often more costly in production when the database roundtrip time is longer.";
export const ChattyApiDescription =
  "Chatty APIs are numerous API calls between microservices or external services that should be optimized and reduced. \
   A common solution is caching responses or using the API more efficiently.";
export const SessionInViewDescription =
  "Open Session in View is an anti-pattern in which the view rendering stage triggers DB calls because of lazy properties initialization. \
   It is recommended to pass DTOs to the view and avoid hitting the DB.";
export const HighNumberOfQueriesDescription =
  "The high number of queries insight indicates that the current endpoint/consumer is triggering an abnormal number of DB queries.\
   This can be typically resolved with caching or using more optimal queries.";
export const CodeNexusDescription =
  "Code nexus areas are places in the code that have a number level of runtime dependencies. \
   Developers To calculate this insight Digma looks at the following factors: \
    1. Number of flows - how many unique execution flows touch this piece of code. \
    2. Number of endpoints - How many endpoints/consumers or other entry points use this code.\
    3. Number of services - How many microservices use this code";
export const HotSpotDescription =
  "Error hotspots are places in the code where errors are significant. \
   There are several factors that make a place in the code an “error hotspot”: \
        1. Is the error handled. \
        2. Is the error escalating (we’re seeing more and more of it). \
        3. Is the error recent. \
        4. Is the error occurring on many requests.";
export const BottleneckDescription =
  "This area significantly slows down the entire request and takes up at least 30% of the request time. \
   You should consider making this code asynchronous or otherwise optimize it.";

export const ScalingIssueDescription =
  "Scaling issues are performance problems that emerge when the code is run concurrently. \
   Digma analyzes the correlation between concurrency and performance and can detect when the degradation becomes problematic. \
   To see a detailed analysis click on the “Histogram button";
