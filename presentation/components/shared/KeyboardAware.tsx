import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

const KeyboardAware = ({ children, className }: Props) => {
  return (
    <KeyboardAwareScrollView
      className={className ?? "flex-1"}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      extraScrollHeight={80}
      extraHeight={120}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </KeyboardAwareScrollView>
  );
};

export default KeyboardAware;
