import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {mapScreenStyles} from '../../styles/screens/maps/mapScreen.styles';

export const Map = () => {
  return (
    <>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={mapScreenStyles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
          <Marker
            coordinate={{
              latitude: 37.78825,
              longitude: -122.4324,
            }}
            title='Título del marcador'
            description='Cuerpo del marcador'
            image={require('../../../assets/marker.png')}
          />
        </MapView>
    </>
  );
};
