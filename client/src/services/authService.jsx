export const loginWithGoogle = async (credential) => {
  try {
    const res = await fetch("http://localhost:9999/auth/google-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ credential }),
    });
    return await res.json();
  } catch (error) {
    console.error("Error logging in with Google:", error);
  }
};
