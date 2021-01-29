// Easier to use than Date()
import moment from "moment";

export function formatDateYYYYmmDD(date) {
	return (date !== null) ? moment.utc(date).format('YYYY-MM-DD') : "";
}

export function formatDateMMddYYYY(date) {
	return (date !== null) ? moment.utc(date).format('MM-DD-YYYY') : "";
}

export function dateToInt(date) {
	return (date !== null) ? Number(moment.utc(date)) : 0;
}
