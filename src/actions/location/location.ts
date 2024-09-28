import Geolocation from '@react-native-community/geolocation';
import { Location } from '../../infrastructure/interfaces/location';

export const getCurrentLocation = async (): Promise<Location> => {
  return new Promise((resolve,reject)=>{
    Geolocation.getCurrentPosition(({coords}) => {
      resolve({
        latitude: coords.latitude,
        longitude: coords.longitude
      });
    },(e) => {
      console.log(e);
      reject(e);
    },
    {
      enableHighAccuracy: true
    }
    );
  });
};

export const watchCurrentLocation = (locationCallback: (location: Location) => void): number => {
  return Geolocation.watchPosition(info => {
    locationCallback({
      latitude: info.coords.latitude,
      longitude: info.coords.longitude
    });
  },(e)=>{
    throw new Error(`Cannot get watchPosition`);
  },{
    enableHighAccuracy: true
  });
};

export const clearWatchLocation = (watchId: number) => {
  Geolocation.clearWatch(watchId);
}