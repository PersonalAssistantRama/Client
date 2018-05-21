import PushNotification from 'react-native-push-notification';
import { PushNotificationIOS } from 'react-native';

const configure = () => {
 PushNotification.configure({

   onRegister: function(token) {
     //process token
   },

   onNotification: function(notification) {
     // process the notification
     // required on iOS only
     notification.finish(PushNotificationIOS.FetchResult.NoData);
   },

   permissions: {
     alert: true,
     badge: true,
     sound: true
   },

   popInitialNotification: true,
   requestPermissions: true,

 });
};

const localNotificationSchedule = (objNotif) => {
  PushNotification.localNotificationSchedule({
    title: objNotif.title,
    largeIcon: "ic_launcer",
    smallIcon: "ic_notification",
    message: objNotif.message,
    playSound: true,
    vibrate: true,
    vibration: 300,
    date: new Date(objNotif.date)
  })
}

export {
 configure, localNotificationSchedule
};