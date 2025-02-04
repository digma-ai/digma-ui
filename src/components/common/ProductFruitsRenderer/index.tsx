import { ProductFruits } from "react-product-fruits";
import { useGetUserProfileQuery } from "../../../redux/services/digma";
import type { ProductFruitsRendererProps } from "./types";

export const ProductFruitsRenderer = ({
  workspaceCode
}: ProductFruitsRendererProps) => {
  const { data: userProfile } = useGetUserProfileQuery();

  if (!workspaceCode?.length || !userProfile?.uid) {
    return null;
  }

  // eslint-disable-next-line no-console
  console.log("user.id", userProfile.uid);

  const userInfo = {
    username: userProfile.uid,
    email: userProfile.email
  };

  return (
    <ProductFruits
      workspaceCode={workspaceCode}
      language={"en"}
      user={userInfo}
      debug={true}
    />
  );
};
