export abstract class BaseNotification{ 

  notifications: Array<{ message: String }>

  constructor() {
    this.notifications = new Array<{ message: String }>();
  }

  AddNotification(message: String): void {
    this.notifications.push({ message: message })
  }

  isTrue(value, message) {
    if( value ) this.notifications.push({ message: message })
  }

  isRequired(value, message) {
    if( !value || value.length <= 0 ) this.notifications.push({ message: message })
  }

  hasMinLen(value, min, message) {
    if( !value || value.length <= min ) this.notifications.push({ message: message })
  }

  hasMaxLen(value, max, message) {
    if( !value || value.length > max ) this.notifications.push({ message: message })
  }

  isFixedLen(value, len, message) {
    if( value.length !== len ) this.notifications.push({ message: message })
  }

  isEmail(value, message) {
    let reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)
    if( !reg.test(value) ) this.notifications.push({ message: message }) 
  }

  get allNotifications(): Array<{ message : String }> {
    return this.notifications
  }

  valid(): Boolean {
    return this.notifications.length == 0
  }
}