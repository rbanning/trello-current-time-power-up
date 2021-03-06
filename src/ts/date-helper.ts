export namespace DateHelper {

  export const isExpired = (d: Date | string): boolean => {
    if (!d) { return false; }

    d = typeof(d) === 'string' ? new Date(d) : d;
    if (typeof(d.valueOf) !== 'function' || isNaN(d.valueOf())) {
      return null;  //invalid date
    }

    return d < new Date();
  };


  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  export const monthLong = (d: Date) => {
    if (d.getMonth) {
      return months[d.getMonth()];
    } 
    //else
    return '';
  };

  export const monthShort = (d: Date) => {
    if (d.getMonth) {
      return months[d.getMonth()].substring(0, 3);
    } 
    //else
    return '';
  };

  export const dateMedium = (d: Date) => {
    if (d.getMonth) {
      return `${monthShort(d)}. ${d.getDate().toString().padStart(2, '0')}, ${d.getFullYear()}`;
    }
    //else
    return '';
  };

  export const time = (d: Date) => {
    let h = d.getHours();
    let m = d.getMinutes();
    let s = d.getSeconds();
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    if (h === 0) { h = 1; }
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')} ${ampm}`;
  }

  export const dayOfWeek = (d: Date, short: boolean = false) => {
    const dow = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = dow[d.getDay() % dow.length];
    return short ? day.substr(0, 3) : day;
  }
}
