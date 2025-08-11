// utils/loadRazorpay.ts
export const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};
// This function dynamically loads the Razorpay checkout script and returns a promise that resolves when the script is loaded.
// It can be used to ensure that the Razorpay library is available before attempting to use it