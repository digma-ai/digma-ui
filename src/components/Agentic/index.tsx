import { usePostHog } from "posthog-js/react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  useAgenticDispatch,
  useAgenticSelector
} from "../../containers/Agentic/hooks";
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
import { IncidentDetails } from "./IncidentDetails";
import { Sidebar } from "./Sidebar";
import * as s from "./styles";

export const Agentic = () => {
  const { data: userProfile } = useGetUserProfileQuery();
  const { data: about } = useGetAboutQuery();
  const posthog = usePostHog();
  const dispatch = useAgenticDispatch();
  const currentUser = useAgenticSelector((state) => state.auth.user);
  const isInitialized = useAgenticSelector((state) => state.app.isInitialized);
  const isUserIdEnabled = getFeatureFlagValue(
    about,
    FeatureFlag.IsUserIdEnabled
  );

  // Clear state when user changes
  useEffect(() => {
    if (isUserIdEnabled && userProfile) {
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
  }, [isUserIdEnabled, dispatch, currentUser, userProfile, posthog]);

  return (
    <s.Container>
      <Helmet>
        <title>Digma Agentic</title>
        <meta name={"viewport"} content={"width=device-width"} />
      </Helmet>
      {isInitialized ? (
        <>
          <Sidebar />
          <s.ContentContainer>
            <IncidentDetails />
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
