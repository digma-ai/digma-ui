import type { MouseEvent } from "react";
import { openURLInDefaultBrowser } from "../../../utils/actions/openURLInDefaultBrowser";
import { Link } from "../Link";

const DIGMA_URL = "https://digma.ai";

const handleDigmaLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  openURLInDefaultBrowser(DIGMA_URL);
};

export const DigmaSignature = () => {
  return (
    <div>
      info by{" "}
      <Link href={DIGMA_URL} onClick={handleDigmaLinkClick}>
        digma.ai
      </Link>
    </div>
  );
};
