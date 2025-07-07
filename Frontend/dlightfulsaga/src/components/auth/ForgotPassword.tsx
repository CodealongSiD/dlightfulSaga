import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true); // Simulate submission
  };

  return (
    <section className="!bg-gray-1 !py-20 !dark:bg-dark !lg:py-[120px]">
      <div className="!container !mx-auto">
        <div className="!-mx-4 !flex !flex-wrap">
          <div className="!w-full !px-4">
            <div className="!relative !mx-auto !max-w-[525px] !overflow-hidden !rounded-lg !bg-emerald-700 !px-10 !py-16 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]">
              <div className="!mb-10 !text-center !md:mb-16">
                <h2 className="!text-3xl !text-[var(--color-gold)] !font-['Playfair_Display']">
                  DlightfulSaga
                </h2>
              </div>

              <form onSubmit={handleSubmit}>
                <InputBox type="email" name="email" placeholder="Email" />
                <div className="!mb-10">
                  <input
                    type="submit"
                    value="Reset Password"
                    className="!w-full !cursor-pointer !rounded-md !border !border-primary !bg-primary hover:!bg-white !px-5 !py-3 !text-base !font-medium !text-white hover:!text-black !transition hover:bg-opacity-90"
                  />
                </div>
              </form>

              {submitted && (
                <div className="mt-4 bg-white text-black p-4 rounded-md shadow-md">
                  ✅ Check your email for a link to reset your password.
                </div>
              )}

              <p className="!text-base !text-body-color !dark:text-dark-6 !mt-2.5">
                Remembered your password?
                <Link to="/" className="!ml-1 !text-primary hover:underline">
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

type InputBoxProps = {
  type: string;
  placeholder: string;
  name: string;
};

const InputBox = ({ type, placeholder, name }: InputBoxProps) => {
  return (
    <div className="!mb-6">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        className="!w-full !rounded-md !border !border-stroke !bg-zinc-200/50 !px-5 !py-3 !text-base !text-body-color !outline-none !focus:border-primary !focus-visible:shadow-none !dark:border-dark-3 !dark:text-white"
        required
      />
    </div>
  );
};
