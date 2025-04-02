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
  const params = getUrlQueryParams(window.location.search);
  const userId = params.userId;
  const token = params.token;

  useEffect(() => {
    if (!userId || !token) {
      return;
    }

    axios
      .get("/api/Authentication/confirm-email", {
        params: {
          userId,
          token
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
  }, [token, userId]);

  useEffect(() => {
    if (emailConfirmationResult) {
      sendTrackingEvent(trackingEvents.EMAIL_CONFIRMATION_RESULT_RECEIVED, {
        result: emailConfirmationResult.result
      });
    }
  }, [emailConfirmationResult]);

  const renderContent = () => {
    if (!userId || !token) {
      return (
        <s.TextContainer>
          <Title>Invalid link</Title>
          <Subtitle>Link is partial or invalid</Subtitle>
        </s.TextContainer>
      );
    }

    if (emailConfirmationResult?.result === "success") {
      return (
        <s.Container>
          <s.Illustration
            src={`/assets/images/greenCheckmarkWithFlares_${themeKind}.svg`}
          />
          <s.TextContainer>
            <Title>Account activated</Title>
            <Subtitle>You may now log in with your user and password</Subtitle>
          </s.TextContainer>
        </s.Container>
      );
    }

    if (emailConfirmationResult?.result === "failure") {
      return <Title>Failed to confirm email</Title>;
    }
  };

  return (
    <GenericPageLayout title={"Digma email confirmation"}>
      {renderContent()}
    </GenericPageLayout>
  );
};
