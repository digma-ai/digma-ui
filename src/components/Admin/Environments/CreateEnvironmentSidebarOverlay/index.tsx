import { useCallback, useEffect, useState } from "react";
import { useGetAboutQuery } from "../../../../redux/services/digma";
import type { Environment } from "../../../../redux/services/types";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { addPrefix } from "../../../../utils/addPrefix";
import { CreateEnvironmentWizard } from "../../../RecentActivity/CreateEnvironmentWizard";
import { CancelConfirmationDialog } from "../../../RecentActivity/CreateEnvironmentWizard/CancelConfirmationDialog";
import { SidebarOverlay } from "../../common/SidebarOverlay";
import type { SidebarProps } from "../../common/SidebarOverlay/Sidebar/types";
import { trackingEvents } from "../../tracking";
import { FinishScreenContent } from "./FinishScreenContent";
import * as s from "./styles";
import type { CreateEnvironmentSidebarOverlayProps } from "./types";

const TRACKING_PREFIX = "create environment";
const prefixedTrackingEvents = addPrefix(TRACKING_PREFIX, trackingEvents, " ");

export const CreateEnvironmentSidebarOverlay = ({
  isSidebarOpen,
  onSidebarClose
}: CreateEnvironmentSidebarOverlayProps) => {
  const { data: about } = useGetAboutQuery();
  const [createdEnvironment, setCreatedEnvironment] = useState<Environment>();
  const [
    isCancelConfirmationDialogVisible,
    setIsCancelConfirmationDialogVisible
  ] = useState(false);

  const handleCreateEnvironment = (environment: Environment) => {
    setCreatedEnvironment(environment);
  };

  const handleCreateEnvironmentWizardClose = (id: string | null) => {
    if (id) {
      onSidebarClose();
    } else {
      setIsCancelConfirmationDialogVisible(true);
    }
  };

  const handleCancelConfirmationDialogClose = () => {
    setIsCancelConfirmationDialogVisible(false);
  };

  const handleCancelConfirmationDialogConfirm = useCallback(() => {
    setIsCancelConfirmationDialogVisible(false);
    onSidebarClose();
  }, [onSidebarClose]);

  const handleSidebarClose = () => {
    if (createdEnvironment) {
      onSidebarClose();
    } else {
      setIsCancelConfirmationDialogVisible(true);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          sendUserActionTrackingEvent(
            prefixedTrackingEvents.SIDEBAR_ESCAPE_KEY_PRESSED
          );
          if (isSidebarOpen) {
            if (createdEnvironment) {
              onSidebarClose();
            } else {
              setIsCancelConfirmationDialogVisible(
                !isCancelConfirmationDialogVisible
              );
            }
          }
          break;
        case "Enter":
          e.preventDefault();
          if (isCancelConfirmationDialogVisible) {
            handleCancelConfirmationDialogConfirm();
          }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    isCancelConfirmationDialogVisible,
    createdEnvironment,
    onSidebarClose,
    isSidebarOpen,
    handleCancelConfirmationDialogConfirm
  ]);

  const sidebarProps: SidebarProps = {
    title: "Create new environment",
    content: {
      header: <s.HeaderPlaceholder />,
      body: (
        <CreateEnvironmentWizard
          onClose={handleCreateEnvironmentWizardClose}
          isPanelTitleVisible={false}
          isCentralizedDeployment={Boolean(about?.isCentralize)}
          onCreate={handleCreateEnvironment}
          finishScreenContent={
            <FinishScreenContent
              onGoToDashboard={handleCreateEnvironmentWizardClose}
              environment={createdEnvironment}
            />
          }
          isCancelConfirmationEnabled={false}
        />
      )
    },
    onClose: handleSidebarClose
  };

  return (
    <SidebarOverlay
      isSidebarOpen={isSidebarOpen}
      onSidebarClose={handleSidebarClose}
      sidebar={sidebarProps}
    >
      {isCancelConfirmationDialogVisible && (
        <s.Overlay>
          <CancelConfirmationDialog
            onClose={handleCancelConfirmationDialogClose}
            onConfirm={handleCancelConfirmationDialogConfirm}
          />
        </s.Overlay>
      )}
    </SidebarOverlay>
  );
};
