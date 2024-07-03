function sha256(message) {
	const encoder = new TextEncoder();
	const data = encoder.encode(message);
	return crypto.subtle.digest("SHA-256", data).then((hashBuffer) => {
		const hashArray = Array.from(new Uint8Array(hashBuffer));
		return hashArray
			.map((byte) => byte.toString(16).padStart(2, "0"))
			.join("");
	});
}

const hashedApiKey = "2c8f1b3d5a1d5f9c1b0d3e4f5a6b7c8";
const hashedAuthDomain = "4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9";

const hashedProjectId = "7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c";
const hashedStorageBucket = "2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c";
const hashedMessagingSenderId = "4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c";
const hashedAppId = "9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c";
const hashedMeasurementId = "3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c";

// Export the hashed Firebase config
export const firebaseConfig = {
	apiKey: "AIzaSyBIvpv8iLn7dJ3rA6cTo00rmR0gLkf550E",
	authDomain: hashedAuthDomain,
	databaseURL:
		"https://f2m-latrinidad-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: hashedProjectId,
	storageBucket: hashedStorageBucket,
	messagingSenderId: hashedMessagingSenderId,
	appId: hashedAppId,
	measurementId: hashedMeasurementId,
};
