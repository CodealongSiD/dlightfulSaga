import React, { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { AxiosError } from "axios";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const ForgotPassword: React.FC = () => {
  const [formData, setFormData] = useState({
  email: "",
  resetKey: "",
});

const navigate = useNavigate();

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const [showKey, setShowKey] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!formData.email) {
    return toast.error("Email is required.");
  }

  try {
  const response = await axiosInstance.post("/auth/forgot-password", {
    email: formData.email,
    resetKey: formData.resetKey,
  });

  const data = response.data;

  if (data.success) {
    toast.success("Reset key verified!");
    navigate(`/reset-password?email=${formData.email}&token=${data.resetToken}`);
  }
} catch (error: unknown) {
  console.log("🚨 Axios full URL was:", axiosInstance.defaults.baseURL + "/auth/forgot-password");

  const err = error as AxiosError<{ message?: string }>;
  if (err.response?.data?.message) {
    toast.error(err.response.data.message);
  } else {
    toast.error("Something went wrong.");
  }
}
};


  return (
    <section className="!bg-gray-1 !py-20 !dark:bg-dark !lg:py-[120px]">
      <div className="!container !mx-auto">
        <div className="!-mx-4 !flex !flex-wrap">
          <div className="!w-full !px-4">
            <div className="!relative !mx-auto !max-w-[525px] !overflow-hidden !rounded-lg !bg-neutral-50 !px-10 !py-16 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]">
              <div className="!mb-10 !text-center !md:mb-16">
                <h2 className="!text-3xl !text-[var(--color-gold)] !font-['Playfair_Display']">
                  DlightfulSaga
                </h2>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="!mb-6">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="!w-full !rounded-md !border !border-neutral-800 !py-3 !px-5 !text-base !text-black !bg-zinc-200/50  !outline-none !focus:border-primary !focus-visible:shadow-md"
                  />
                </div>

                {/* Reset Key */}
                <div className="relative w-full">
                  <input
                    type={showKey ? "text" : "password"}
                    name="resetKey"
                    value={formData.resetKey}
                    onChange={handleChange}
                    required
                    placeholder="Enter your Reset Key"
                    className="!w-full !rounded-md !border !border-neutral-800 !py-3 !px-5 !mb-6 !text-base !text-black !bg-zinc-200/50  !outline-none !focus:border-primary !focus-visible:shadow-md"
                  />
                  <div
                    className="absolute right-4 top-1/3 -translate-y-1/3 text-gray-500 cursor-pointe"
                    onClick={() => setShowKey((prev) => !prev)}
                  >
                    {showKey ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </div>
                </div>

                <div className="!mb-10">
                  <input
                    type="submit"
                    value="Reset Password"
                    className="!w-full !cursor-pointer !rounded-md  !bg-zinc-900 hover:!bg-white !px-5 !py-3 !text-base !font-medium !text-white hover:!text-black !transition hover:bg-opacity-90"
                  />
                </div>
              </form>

              <p className="!text-base !text-zinc-800 !mt-2.5">
                Remembered your password?
                <Link
                  to="/login"
                  className="!ml-1 !text-zinc-800 !font-bold hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default ForgotPassword;