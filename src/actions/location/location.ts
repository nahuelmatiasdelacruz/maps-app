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
}