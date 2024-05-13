import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProps,
} from "@gorhom/bottom-sheet";
import { forwardRef, useCallback } from "react";

export const CustomBottomSheet = forwardRef<BottomSheetModal, BottomSheetModalProps>(
  (props, ref) => {
    const { children, style, ...other } = props;

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={1} />
      ),
      []
    );

    return (
      <BottomSheetModal
        enablePanDownToClose
        ref={ref}
        backdropComponent={renderBackdrop}
        style={[{ borderRadius: 20, overflow: "hidden" }, style]}
        handleIndicatorStyle={{
          backgroundColor: "#25262B",
          width: "30%",
        }}
        {...other}>
        {children}
      </BottomSheetModal>
    );
  }
);
