export default class TimeConversion {
    miliSecToPersionDate(time) {
        var year = Math.floor(time / (365 * 12 * 60 * 60 * 1000));
        time = time - year * 365 * 12 * 60 * 60 * 1000;
        var month = Math.floor(time / 30 / 12 / 60 / 60 / 1000);
        time = time - month * 30 * 12 * 60 * 60 * 1000;
        var today = Math.floor(time / 12 / 60 / 60 / 1000);
        time = time - today * 12 * 60 * 60 * 1000;
        var hour = Math.floor(time / 60 / 60 / 1000);
        time = time - hour * 60 * 60 * 1000;
        var minute = Math.floor(time / 60 / 1000);
        time = time - minute * 60 * 1000;
        var second = Math.floor(time / 1000);
        if (year != 0) {
            return year + " سال" + month + "ماه " + today + "روز " + hour + "ساعت " + minute + "دقیقه " + second + "ثانیه";
        } else if (month != 0) {
            return month + "ماه " + today + "روز " + hour + "ساعت " + minute + "دقیقه " + second + "ثانیه";
        } else if (today != 0) {
            return today + "روز " + hour + "ساعت " + minute + "دقیقه " + second + "ثانیه";
        } else if (hour != 0) {
            return hour + "ساعت " + minute + "دقیقه " + second + "ثانیه";
        } else if (minute != 0) {
            return second + "ثانیه";
        }
    }
}
