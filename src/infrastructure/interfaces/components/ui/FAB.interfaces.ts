import { StyleProp, ViewStyle } from "react-native";

export interface FABProps {
  iconName: string;
  onPress: () => void;
  style: StyleProp<ViewStyle>;
}