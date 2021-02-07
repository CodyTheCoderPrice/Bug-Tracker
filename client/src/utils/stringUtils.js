export function stripNonDigits(stringValue) {
	return Number(stringValue.replace(/[^\d.-]/g, ""));
}

export function capitalizeFistLetterOfEachWord(str) {
	return str.toLowerCase().replace(/\w\S*/g, (txt) => {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}
