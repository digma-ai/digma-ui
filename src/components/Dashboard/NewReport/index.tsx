import { useLayoutEffect } from "react";
import { actions } from "../actions";

import { Chart } from "./Chart";
import { ReportHeader } from "./ReportHeader";
import * as s from "./styles";

// const DefaultQuery: ReportFilterQuery = {
//   environmentId: "",
//   services: []
// };

export const NewReport = ({
  type
}: {
  type: "squarified" | "stripes" | "strip" | "sliceAndDice";
}) => {
  // const [query, setQuery] = useState<ReportFilterQuery>(DefaultQuery);
  // const { data } = useReportsData(query);

  useLayoutEffect(() => {
    window.sendMessageToDigma({
      action: actions.INITIALIZE
    });
  }, []);

  const handleFilterChanged = () =>
    //  query: ReportFilterQuery
    {
      // setQuery(query);
    };

  return (
    <s.Container>
      <ReportHeader onFilterChanged={handleFilterChanged} />
      <Chart type={type} data={[]} labelFormat="" />
    </s.Container>
  );
};
