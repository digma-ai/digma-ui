import { usePostHog } from "posthog-js/react";
import { useEffect, useMemo } from "react";
import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";
import {
  useAdminDispatch,
  useAdminSelector
} from "../../containers/Admin/hooks";
import { getFeatureFlagValue } from "../../featureFlags";
import { globalClear } from "../../redux/actions";
import {
  useGetAboutQuery,
  useGetUserProfileQuery
} from "../../redux/services/digma";
import { setIsInitialized } from "../../redux/slices/appSlice";
import { setUser } from "../../redux/slices/authSlice";
import { FeatureFlag } from "../../types";
import { Spinner } from "../common/v3/Spinner";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import * as s from "./styles";

export const Admin = () => {
  const { data: userProfile } = useGetUserProfileQuery();
  const { data: about } = useGetAboutQuery();
  const posthog = usePostHog();
  const dispatch = useAdminDispatch();
  const currentUser = useAdminSelector((state) => state.auth.user);
  const isInitialized = useAdminSelector((state) => state.app.isInitialized);
  const ifUserIdEnabled = useMemo(
    () =>
      Boolean(
        about && getFeatureFlagValue(about, FeatureFlag.IS_USER_ID_ENABLED)
      ),
    [about]
  );

  // Clear issues report state when user changes
  useEffect(() => {
    if (ifUserIdEnabled && userProfile) {
      if (currentUser?.uid !== userProfile?.uid) {
        dispatch(globalClear());
      }
      dispatch(setUser(userProfile));

      posthog.identify(userProfile.uid, {
        email: userProfile.email
      });

      dispatch(setIsInitialized(true));
    } else {
      if (userProfile?.email) {
        if (currentUser?.email !== userProfile.email) {
          dispatch(globalClear());
        }
        dispatch(setUser(userProfile));
        dispatch(setIsInitialized(true));
      }
    }
  }, [ifUserIdEnabled, dispatch, currentUser, userProfile, posthog]);

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
