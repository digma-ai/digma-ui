import axios from "axios";
import { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { sendTrackingEvent } from "../../utils/actions/sendTrackingEvent";
import { getUrlQueryParams } from "../../utils/getUrlQueryParams";
import { reportError } from "../../utils/reportError";
import { getThemeKind } from "../common/App/styles";
import { GenericPageLayout } from "../common/GenericPageLayout";
import { Subtitle, Title } from "../common/GenericPageLayout/styles";
import * as s from "./styles";
import { trackingEvents } from "./tracking";
import type { EmailConfirmationResult } from "./types";

export const EmailConfirmation = () => {
  const theme = useTheme();
  const themeKind = getThemeKind(theme);
  const [emailConfirmationResult, setEmailConfirmationResult] =
    useState<EmailConfirmationResult>();

  useEffect(() => {
    const params = getUrlQueryParams(window.location.search);

    axios
      .get("/api/Authentication/confirm-email", {
        params: {
          userId: params.userId,
          token: params.token
        }
      })
      .then(() => {
        setEmailConfirmationResult({
          result: "success"
        });
      })
      .catch((error: Error) => {
        reportError(error);

        setEmailConfirmationResult({
          result: "failure"
        });
      });
  }, []);

  useEffect(() => {
    if (emailConfirmationResult) {
      sendTrackingEvent(trackingEvents.EMAIL_CONFIRMATION_RESULT_RECEIVED, {
        result: emailConfirmationResult.result
      });
    }
  }, [emailConfirmationResult]);

  return (
    <GenericPageLayout title={"Digma email confirmation"}>
      {emailConfirmationResult?.result === "success" && (
        <s.Container>
          <s.Illustration
            src={`/assets/images/greenCheckmarkWithFlares_${themeKind}.svg`}
          />
          <s.TextContainer>
            <Title>Account activated</Title>
            <Subtitle>You may now log in with your user and password</Subtitle>
          </s.TextContainer>
        </s.Container>
      )}
      {emailConfirmationResult?.result === "failure" && (
        <Title>Failed to confirm email</Title>
      )}
    </GenericPageLayout>
  );
};
