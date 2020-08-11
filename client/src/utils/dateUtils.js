// Easier to use than Date()
import moment from "moment";

export function formatDateYYYYmmDD(date) {
	return (date !== null) ? moment(date).format('YYYY-MM-DD') : "";
}