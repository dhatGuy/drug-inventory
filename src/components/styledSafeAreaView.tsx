import { cssInterop } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";

interface StyledSafeAreaViewProps extends React.ComponentProps<typeof SafeAreaView> {
  children: React.ReactNode;
}

cssInterop(SafeAreaView, {
  className: "style",
});
export function StyledSafeAreaView({ children, className }: StyledSafeAreaViewProps) {
  const defaultClassName = "bg-white p-6 flex-[1_1_0%]";
  return <SafeAreaView className={`${defaultClassName} ${className} `}>{children}</SafeAreaView>;
}
