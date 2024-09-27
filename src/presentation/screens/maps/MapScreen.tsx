import {View} from 'react-native';
import { mapScreenStyles } from '../../styles/screens/maps/mapScreen.styles';
import { Map } from '../../components/maps/Map';

export const MapScreen = () => {
  return (
    <View style={mapScreenStyles.container}>
      <Map/>
    </View>
  );
};
