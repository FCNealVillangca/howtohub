export default function makeUniqueById<T extends { _id: string }>(
	array: T[]
): T[] {
	// Create a Map to store unique objects by their _id
	const uniqueMap = new Map<string, T>();

	array.forEach((item) => {
		uniqueMap.set(item._id, item);
	});

	// Convert the Map values back to an array
	return Array.from(uniqueMap.values());
}
