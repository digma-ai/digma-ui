import { Card } from "../../Insights/Card";
import { Badge } from "../../common/Badge";
import { Link } from "../../common/Link";
import { NotificationCardProps } from "./types";

export const NotificationCard = (props: NotificationCardProps) => {
  const handleLinkClick = () => {
    props.onSpanLinkClick(props.data.data.codeObject.codeObjectId);
  };

  return (
    <Card
      header={props.data.type}
      content={
        <>
          {!props.data.isRead && (
            <Badge
              customStyles={{
                main: {
                  background: "#f93967",
                  boxShadow: "0px 0px 4px #761c32"
                },
                outline: {
                  background: "rgb(249 57 103 / 40%)",
                  boxShadow: "0 0 8px rgb(76 142 241 / 12%)"
                }
              }}
            />
          )}
          <Link onClick={handleLinkClick}>
            {props.data.data.codeObject.displayName}
          </Link>
        </>
      }
    ></Card>
  );
};
