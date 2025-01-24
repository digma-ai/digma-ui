import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";
import {
  useAdminDispatch,
  useAdminSelector
} from "../../containers/Admin/hooks";
import { globalClear } from "../../redux/actions";
import { useGetUserProfileQuery } from "../../redux/services/digma";
import { setIsInitialized } from "../../redux/slices/appSlice";
import { setEmail } from "../../redux/slices/authSlice";
import { Spinner } from "../common/v3/Spinner";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import * as s from "./styles";

export const Admin = () => {
  const { data: userProfile } = useGetUserProfileQuery();
  const dispatch = useAdminDispatch();
  const currentEmail = useAdminSelector((state) => state.auth.email);
  const isInitialized = useAdminSelector((state) => state.app.isInitialized);

  // Clear issues report state when user changes
  useEffect(() => {
    if (userProfile?.email) {
      if (currentEmail !== userProfile.email) {
        dispatch(globalClear());
      }
      dispatch(setEmail(userProfile.email));
      dispatch(setIsInitialized(true));
    }
  }, [dispatch, currentEmail, userProfile?.email]);

  return (
    <s.Container>
      <Helmet>
        <title>Digma admin panel</title>
        <meta name={"viewport"} content={"width=device-width"} />
      </Helmet>
      {isInitialized ? (
        <>
          <Sidebar />
          <s.ContentContainer>
            <Header />
            <s.MainContainer>
              <Outlet />
            </s.MainContainer>
          </s.ContentContainer>
        </>
      ) : (
        <s.LoadingContainer>
          <Spinner size={50} />
        </s.LoadingContainer>
      )}
    </s.Container>
  );
};
