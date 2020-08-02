export const shortenDescriptionForDisplay = (description) => {
	const cutoff = 200;
		if (description.length > cutoff) {
			for (let endOfWordIndex = cutoff; endOfWordIndex > 0; endOfWordIndex--) {
				if (description.charAt(endOfWordIndex) === " ") {
					return description.substring(0, endOfWordIndex) + "...";
				}
			}
		} else {
			return description;
		}
}