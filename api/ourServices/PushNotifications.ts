import * as gcm from 'node-gcm';

export class PushNotifications {
  sendPushNotification(
    device_token: string,
    title: string,
    body: string,
    data: any,
    cb: any
  ) {
    let sender = new gcm.Sender(ConstantService.GCM_KEY);

    var message = new gcm.Message({
      collapseKey: 'demo',
      priority: 'high',
      contentAvailable: true,
      data: data,
      notification: {
        title: title,
        icon: 'ic_launcher',
        body: body,
        click_action: 'FCM_PLUGIN_ACTIVITY',
        sound: 'default'
      }
    });

    let recipients: gcm.IRecipient = { to: device_token };
    sender.send(message, recipients, cb);
  }
}
