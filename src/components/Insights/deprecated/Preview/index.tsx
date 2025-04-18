import { WarningCircleIcon } from "../../../common/icons/WarningCircleIcon";
import { Link } from "../../styles";
import type { Method } from "../../types";
import * as s from "./styles";
import type { PreviewProps } from "./types";

/**
 * @deprecated
 * safe to delete after the implementation of the version with new UI
 */
export const Preview = ({ onMethodSelect, methods }: PreviewProps) => {
  const handleMethodLinkClick = (method: Method) => () => {
    onMethodSelect(method);
  };

  return (
    <s.Container>
      <s.Description>
        <WarningCircleIcon size={24} />
        <span>No code object was selected</span>
      </s.Description>
      {methods.length > 0 && (
        <>
          <span>Try to click one of the following code objects</span>
          {methods.map((x) => (
            <Link key={x.id} onClick={handleMethodLinkClick(x)}>
              {x.name}
            </Link>
          ))}
        </>
      )}
    </s.Container>
  );
};
