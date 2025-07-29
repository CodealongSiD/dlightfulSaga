import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validateName, validateEmail, validatePassword, validateConfirmPassword } from "../../utils/validator";
import { isAxiosError } from "axios";
import axiosInstance from "../../utils/axiosInstance";
import { useAuth } from "../../context/useAuth";
import { Eye, EyeOff, Copy, Check } from "lucide-react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetKey, setResetKey] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [countdown, setCountdown] = useState(45);
  const [showToast, setShowToast] = useState(false);


  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(resetKey).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  useEffect(() => {
    if (showToast && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (countdown === 0) {
      navigate("/login");
    }
  }, [showToast, countdown, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const { name, email, password, confirmPassword } = formData;

  if (!validateName(name))
    return alert("Name must be at least 3 characters.");
  if (!validateEmail(email)) return alert("Invalid email format.");
  if (!validatePassword(password)) {
    return alert(
      "Password must be 8–16 characters, include uppercase, lowercase, number, and special character."
    );
  }
  if (!validateConfirmPassword(password, confirmPassword)) {
    return alert("Passwords do not match.");
  }

  try {
    const res = await axiosInstance.post("/auth/signup", {
      name,
      email,
      password,
      confirmPassword,
    });

    const { token, user } = res.data;

    if (user?.resetKey) {
      setResetKey(user.resetKey);
      setShowToast(true);
      toast.success("Signup successful! Save your reset key.");
    }

    // Delay redirect to let user copy the resetKey
    setTimeout(() => {
      login(token, user);
      navigate("/login");
    }, 30000);
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      alert(error.response.data?.message || "Signup failed. Try again.");
    } else {
      alert("An unexpected error occurred.");
    }
  }
  };

  return (
    <section className="!bg-emerald-900 !py-20 !min-h-screen !flex !items-center !justify-center">
      <div className="!w-full !max-w-[480px] !bg-white !p-8 !rounded-lg !shadow-md !text-center">
        <h2 className="!text-3xl !text-[var(--color-gold)] !font-['Playfair_Display'] !mb-6">
          DlightfulSaga
        </h2>
        <h4 className="!text-xl !font-semibold !text-black !mb-6">
          Create a New Account
        </h4>

        <form onSubmit={handleSubmit} className="!space-y-4 text-left">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="!w-full !border !border-neutral-800 !bg-zinc-200/50 !px-4 !py-2 !rounded-md !focus:outline-none !focus:ring-2 !focus:ring-gold"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Gmail Id"
            value={formData.email}
            onChange={handleChange}
            className="!w-full !border !border-neutral-800 !bg-zinc-200/50 !px-4 !py-2 !rounded-md !focus:outline-none !focus:ring-2 !focus:ring-gold"
            required
          />

          <div className="!relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="New Password"
              value={formData.password}
              onChange={handleChange}
              className="!w-full !border !border-neutral-800 !bg-zinc-200/50 !px-4 !py-2 !rounded-md !focus:outline-none !focus:ring-2 !focus:ring-gold"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="!absolute !right-3 !top-1/2 -translate-y-1/2 !text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="!relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="!w-full !border !border-neutral-800 !bg-zinc-200/50 !px-4 !py-2 !rounded-md !focus:outline-none !focus:ring-2 !focus:ring-gold"
              required
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="!absolute !right-3 !top-1/2 -translate-y-1/2 !text-gray-500"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            className="!w-full !bg-emerald-700 !text-white !py-2 !px-4 !rounded-md !hover:bg-yellow-600 !transition !duration-200"
          >
            Sign Up
          </button>
        </form>

        {showToast && (
            <div className="!mt-6 !bg-white !px-4 !py-3 !w-[300px] !border !border-green-200 !rounded-lg !shadow-md !text-left">
              <h2 className="!text-lg !font-semibold !text-green-700 !mb-2">
                Signup Successful
              </h2>
              <p className="!text-black !text-md">Save your Reset Key:</p>
              <div className="!bg-gray-100 !p-2 !rounded-md !mt-1 !flex !justify-between !items-center">
                <span className="!text-md !font-mono !break-all !select-text">
                  {resetKey}
                </span>
                <button
                  onClick={handleCopy}
                  className="!ml-2 !text-gray-600 hover:text-black"
                  aria-label="Copy reset key"
                >
                  {copySuccess ? (
                    <Check size={18} className="!text-green-600" />
                  ) : (
                    <Copy size={18} />
                  )}
                </button>
              </div>
              <div className="!mt-3 !flex !justify-between !items-center !text-md !text-black">
                <span>Redirecting in {countdown}s</span>
                <button
                  onClick={() => navigate("/")}
                  className="!text-blue-600 hover:underline !text-sm"
                >
                  Go to Home
                </button>
              </div>
            </div>
          )}

        <p className="!text-md !text-black !mt-6">
          Already have an Account?
          <Link
            to="/login"
            className="!ml-1 !text-black !font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </section>
  );

};

export default Signup;