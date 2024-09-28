import { Pressable, View } from "react-native";
import { FABProps } from "../../../infrastructure/interfaces/components/ui/FAB.interfaces";
import { FABStyles } from "../../styles/components/ui/FAB.styles";
import Icon from 'react-native-vector-icons/Ionicons';

export const FAB = ({iconName, onPress, style}:FABProps) => {
  return (
    <View style={[
      FABStyles.btn,
      style
    ]}>
      <Pressable
        onPress={onPress}
      >
        <Icon
          name={iconName} size={30} color='white'
        />
      </Pressable>
    </View>
  )
};

