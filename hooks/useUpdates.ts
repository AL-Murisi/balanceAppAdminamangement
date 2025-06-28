const handleUpdateStatus = async (userId: any, status: any) => {
  try {
    const res = await fetch("/api/update-user-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userId, status }),
    });

    const data = await res.json();

    if (res.ok) {
      console.log(`User ${userId} status updated to ${status}:`, data);
      // The real-time listener in useNewUsers will automatically update the UI
    } else {
      console.error(
        `Error updating user ${userId} status to ${status}:`,
        data.error
      );
      // Optionally show an error message to the user
    }
  } catch (err) {
    console.error("Network error updating user status:", err);
    // Optionally show a network error message
  }
};
