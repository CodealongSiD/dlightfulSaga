// context/global.d.ts

import { RazorpayInstance, RazorpayOptions } from "./razorpayTypes";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}
