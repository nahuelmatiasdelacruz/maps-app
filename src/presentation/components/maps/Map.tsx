import {useEffect, useRef, useState} from 'react';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import {mapScreenStyles} from '../../styles/screens/maps/mapScreen.styles';
import {Location} from '../../../infrastructure/interfaces/location';
import {FAB} from '../ui/FAB';
import {useLocationStore} from '../../store/location/useLocationStore';
import {
  watchCurrentLocation,
  clearWatchLocation,
} from '../../../actions/location/location';

interface MapProps {
  showUserLocation?: boolean;
  initialLocation: Location;
}

export const Map = ({showUserLocation = true, initialLocation}: MapProps) => {
  const mapRef = useRef<MapView>();
  const cameraLocation = useRef<Location>(initialLocation);
  const [isFollowingUser, setIsFollowingUser] = useState<boolean>(true);
  const [isShowingPolyline,setIsShowingPolyline] = useState<boolean>(true);
  const {getLocation, lastKnownLocation, cleanWatchLocation, watchLocation, userLocationList} =
    useLocationStore();
  const moveCameraToLocation = (location: Location) => {
    if (!mapRef.current) return;
    mapRef.current.animateCamera({center: location});
  };
  const moveToCurrentLocation = async () => {
    if (!lastKnownLocation) {
      moveCameraToLocation(initialLocation);
    }
    const location = await getLocation();
    if (!location) return;
    moveCameraToLocation(location);
  };
  useEffect(() => {
    watchLocation();
    return () => {
      cleanWatchLocation();
    };
  }, []);
  useEffect(() => {
    if (lastKnownLocation && isFollowingUser) {
      moveCameraToLocation(lastKnownLocation);
    }
  }, [lastKnownLocation, isFollowingUser]);
  return (
    <>
      <MapView
        ref={map => (mapRef.current = map!)}
        showsUserLocation={showUserLocation}
        provider={PROVIDER_GOOGLE}
        style={mapScreenStyles.map}
        onTouchStart={()=>setIsFollowingUser(false)}
        region={{
          latitude: cameraLocation.current.latitude,
          longitude: cameraLocation.current.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
          {
            isShowingPolyline && (
              <Polyline coordinates={userLocationList} strokeColor='black' strokeWidth={5}/>
            )
          }
      </MapView>
      <FAB
        iconName={isShowingPolyline ? 'eye-outline' : 'eye-off-outline'}
        onPress={()=>setIsShowingPolyline(!isShowingPolyline)}
        style={{bottom: 140, right: 20}}
      />
      <FAB
        iconName={isFollowingUser ? 'walk-outline' : 'accessibility-outline'}
        onPress={()=>setIsFollowingUser(!isFollowingUser)}
        style={{bottom: 80, right: 20}}
      />
      <FAB
        iconName="compass-outline"
        onPress={moveToCurrentLocation}
        style={{bottom: 20, right: 20}}
      />
    </>
  );
};
