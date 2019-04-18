export default class Utils {

    isPositiveInteger(s) {
        return /^\+?[1-9][\d]*$/.test(s);
    }
}