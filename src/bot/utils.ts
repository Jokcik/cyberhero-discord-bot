import * as moment from "moment";

moment.locale('ru');
export class UtilsService {
  public formatDate(date: string | Date) {
    const dt = moment(date).format('L');
    const time = moment(date).format('LT');

    return `${dt} в ${time}`;
  }

  public formatToPremium(date: Date) {
    return moment(date).format('YYYY-MM-DD HH:mm')
  }
}
