import { useEffect } from "react";
import { useAdminLayout } from "./providers/useAdminLayout";

export default function useConfigurePageHeader({
  title,
  leftButton,
  rightButton,
}: {
  title: string;
  leftButton?: React.ReactNode;
  rightButton?: React.ReactNode;
}) {
  const { setTitle, setLeftButton, setRightButton } = useAdminLayout();

  useEffect(() => {
    if (title) {
      setTitle(title);
    }
    if (leftButton) {
      setLeftButton(leftButton);
    }
    if (rightButton) {
      setRightButton(rightButton);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
