const catchError = (error) => {
  const { response } = error;

  if (response) {
    const { status, data } = response;

    // Check if the response contains HTML
    if (typeof data === "string" && data.trim().startsWith("<!DOCTYPE html>")) {
      return {
        message: `Unexpected HTML response received. Status: ${status}.`,
        success: false,
      };
    }

    // If response data exists and is an object, return it
    if (data) {
      return {
        message: data.message || "An error occurred.",
        success: false,
        data,
      };
    }

    // Default case for a response without data
    return {
      message: `Request failed with status code ${status}.`,
      success: false,
    };
  }

  // Handle errors without a response (e.g., network errors)
  return {
    message: error.message || "An unknown error occurred.",
    success: false,
  };
};

export default catchError;

export function formatDate(dateString) {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}