import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [resetSuccessful, setResetSuccessful] = useState(false);


  useEffect(() => {
    if (resetSuccessful) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 4500); // 4,500 milliseconds = 4.5 seconds

      return () => clearTimeout(timer); // cleanup on unmount
    }
  }, [resetSuccessful, navigate]);
  

  const handleReset = async (e: React.FormEvent) => {
  e.preventDefault();

  if (newPassword !== confirmPassword) {
    return setMessage("Passwords do not match.");
  }

  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get("token"); // ✅ extract token from URL
  if (!token) {
    return setMessage("Invalid request. Missing token.");
  }
  try {
    const res = await axiosInstance.post(`/auth/reset-password/${token}`, {
      newPassword,
      confirmPassword,
    });
    
    if (res.status === 200) {
      setResetSuccessful(true); // ✅ This triggers the redirect
    }

    setMessage(res.data.message);
    
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      setMessage(err.response?.data?.message || "Something went wrong");
    } else {
      setMessage("Unexpected error");
    }
  }
  };

  return (
    <section className="!bg-gray-1 !py-20 !dark:bg-dark !lg:py-[120px]">
      <div className="!container !mx-auto">
        <div className="!-mx-4 !flex !flex-wrap">
          <div className="!w-full !px-4">
            <div className="!relative !mx-auto !max-w-[525px] !overflow-hidden !rounded-lg !bg-neutral-50  !px-10 !py-16 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]">
              <div className="!mb-10 !text-center !md:mb-16">
                <h2 className="!text-3xl !text-[var(--color-gold)] !font-['Playfair_Display']">
                  Reset Password
                </h2>
              </div>

              <form onSubmit={handleReset}>
                {/* New Password Field */}
                <div className="!mb-6 relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="!w-full !rounded-md !border !border-stroke !bg-zinc-200/50 !px-5 !py-3 !text-base !text-body-color !outline-none !focus:border-[var(--color-gold)] !focus-visible:shadow-md !dark:border-dark-3 !dark:text-white transition"
                  />
                  <div
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600 dark:text-gray-300"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                  >
                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div className="!mb-6 relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="!w-full !rounded-md !border !border-stroke !bg-zinc-200/50 !px-5 !py-3 !text-base !text-body-color !outline-none !focus:border-[var(--color-gold)] !focus-visible:shadow-md !dark:border-dark-3 !dark:text-white transition"
                  />
                  <div
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600 dark:text-gray-300"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </div>
                </div>

                <div className="!mb-10">
                  <input
                    type="submit"
                    value="Reset Password"
                    className="!w-full !cursor-pointer !rounded-md !border !border-primary !bg-zinc-900 !px-5 !py-3 !text-base !font-medium !text-white hover:!text-black !transition hover:bg-opacity-90"
                  />
                </div>
              </form>

              {message && (
                <div className="!mt-4 !rounded-md !px-4 !py-3 shadow-md !bg-emerald-600/60 hover:!bg-emerald-600/90 !text-white !mb-4">
                  {message}
                </div>
              )}

              <p className="!text-base !text-zinc-900 !dark:text-dark-6">
                Go back to
                <a href="/login" className="!ml-1 hover:underline !text-zinc-900 font-semibold">
                Sign In
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;