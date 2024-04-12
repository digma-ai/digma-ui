import { WarningCircleIcon } from "../../../common/icons/WarningCircleIcon";
import { Link } from "../../styles";
import { Method } from "../../types";
import * as s from "./styles";
import { PreviewProps } from "./types";

/**
 * @deprecated
 * safe to delete after the implementation of the version with new UI
 */
export const Preview = (props: PreviewProps) => {
  const handleMethodLinkClick = (method: Method) => {
    props.onMethodSelect(method);
  };

  return (
    <s.Container>
      <s.Description>
        <WarningCircleIcon size={24} />
        <span>No code object was selected</span>
      </s.Description>
      {props.methods.length > 0 && (
        <>
          <span>Try to click one of the following code objects</span>
          {props.methods.map((x) => (
            <Link key={x.id} onClick={() => handleMethodLinkClick(x)}>
              {x.name}
            </Link>
          ))}
        </>
      )}
    </s.Container>
  );
};
