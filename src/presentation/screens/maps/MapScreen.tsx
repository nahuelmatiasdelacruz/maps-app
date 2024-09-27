import {View} from 'react-native';
import { mapScreenStyles } from '../../styles/screens/maps/mapScreen.styles';
import { Map } from '../../components/maps/Map';
import { useLocationStore } from '../../store/location/useLocationStore';
import { LoadingScreen } from '../loading/LoadingScreen';
import { useEffect } from 'react';

export const MapScreen = () => {
  const { lastKnownLocation, getLocation } = useLocationStore();

  useEffect(()=>{
    if(!lastKnownLocation){
      getLocation();
    }
  },[]);

  if(!lastKnownLocation) return (<LoadingScreen/>);
  return (
    <View style={mapScreenStyles.container}>
      <Map initialLocation={lastKnownLocation}/>
    </View>
  );
};
