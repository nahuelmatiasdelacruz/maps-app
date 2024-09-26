import { openSettings, PERMISSIONS, PermissionStatus as ReactNativePermissionStatus, request} from "react-native-permissions"
import { PermissionStatus } from "../../infrastructure/interfaces/permissions";
import { Platform } from "react-native";

export const requestLocationPermission = async (): Promise<PermissionStatus> => {
  let status: ReactNativePermissionStatus = 'unavailable';

  if(Platform.OS === 'ios'){
    status = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
  }else if(Platform.OS === 'android'){
    status = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
  }else{
    throw new Error('Platform not supported');
  };

  if(status === 'blocked'){
    await openSettings();
    return await checkLocationPermission();
  };

  const permissionMapper: Record<ReactNativePermissionStatus,PermissionStatus> = {
    granted: 'granted',
    denied: 'denied',
    blocked: 'blocked',
    unavailable: 'unavailable',
    limited: 'limited'
  };

  return permissionMapper[status] ?? 'unavailable';

}

export const checkLocationPermission = async (): Promise<PermissionStatus> => {
  let status: ReactNativePermissionStatus = 'unavailable';
  if(Platform.OS === 'ios'){
    status = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
  }else if(Platform.OS === 'android'){
    status = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
  }else{
    throw new Error('Platform not supported');
  };
  const permissionMapper: Record<ReactNativePermissionStatus,PermissionStatus> = {
    granted: 'granted',
    denied: 'denied',
    blocked: 'blocked',
    unavailable: 'unavailable',
    limited: 'limited'
  };
  return permissionMapper[status] ?? 'unavailable';

}