import React from "react";
import { Button } from "@/components/ui";

interface FormActionsProps {
  isValid: boolean;
  isSubmitting: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

export const FormActions: React.FC<FormActionsProps> = ({
  isValid,
  isSubmitting,
  onSubmit,
  onCancel,
}) => {
  return (
    <div className="flex gap-4 justify-end">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={isSubmitting}
      >
        取消
      </Button>
      <Button
        type="submit"
        variant="primary"
        disabled={!isValid || isSubmitting}
        loading={isSubmitting}
        onClick={onSubmit}
      >
        {isSubmitting ? "发布中..." : "发布活动"}
      </Button>
    </div>
  );
};

export default FormActions;
