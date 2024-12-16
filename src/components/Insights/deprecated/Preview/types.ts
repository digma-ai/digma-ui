import type { Method } from "../../types";

export interface PreviewProps {
  methods: Method[];
  onMethodSelect: (method: Method) => void;
}
