export function truncate(str, cutoff, useWordBoundary) {
	if (str.length <= cutoff) {
		return str;
	}
	const subString = str.substr(0, cutoff - 1);
	return (
		(useWordBoundary
			? subString.substr(0, subString.lastIndexOf(" "))
			: subString) + "..."
	);
}

/* export function formatDescription(description) {
	if (description.length < 1) {
		return "...";
	} else {
		return description;
	}
} */