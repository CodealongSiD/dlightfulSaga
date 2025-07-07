import { Link } from "react-router-dom";

const Login = () => {
  return (
    <section className="!bg-gray-1 !py-20 !dark:bg-dark !lg:py-[120px]">
      <div className="!container !mx-auto">
        <div className="!-mx-4 !flex !flex-wrap">
          <div className="!w-full !px-4">
            <div className="!relative !mx-auto !max-w-[525px] !overflow-hidden !rounded-lg !bg-emerald-700 !px-10 !py-16 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]">
              <div className="!mb-10 !text-center !md:mb-16">
                <h2 className="!text-3xl !text-[var(--color-gold)] !font-['Playfair_Display'] grow">
                  DlighfulSaga
                </h2>
              </div>

              <form>
                <InputBox type="email" name="email" placeholder="Email" />
                <InputBox
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <div className="!mb-10">
                  <input
                    type="submit"
                    value="Sign In"
                    className="!w-full !cursor-pointer !rounded-md !border !border-primary !bg-primary hover:!bg-white !px-5 !py-3 !text-base !font-medium !text-white hover:!text-black !transition hover:bg-opacity-90"
                  />
                </div>
              </form>

              <p className="!mb-6 !text-base !text-secondary-color !dark:text-dark-7">
                Connect With
              </p>

              <ul className="-mx-2 mb-12 flex justify-between">
                <li className="!w-full !px-2">
                  <a
                    href="#"
                    className="flex items-center justify-center h-11 px-4 rounded-md bg-white border border-gray-300 gap-x-2 hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 533.5 544.3"
                    >
                      <path
                        fill="#4285f4"
                        d="M533.5 278.4c0-18.5-1.5-37-4.7-54.9H272.1v103.9h146.9c-6.3 34.6-25.1 63.9-53.3 83.4v68h85.9c50.3-46.3 82-114.6 82-200.4z"
                      />
                      <path
                        fill="#34a853"
                        d="M272.1 544.3c71.7 0 132-23.9 176-64.8l-85.9-68c-23.8 15.9-54.5 25-90.1 25-69.2 0-127.8-46.8-148.8-109.7h-89.6v68.9c44.3 87.8 134.7 148.6 238.4 148.6z"
                      />
                      <path
                        fill="#fbbc04"
                        d="M123.3 326.8c-10.1-30.2-10.1-62.7 0-92.9v-68.9H33.7c-37.9 75.7-37.9 164.9 0 240.6l89.6-68.8z"
                      />
                      <path
                        fill="#ea4335"
                        d="M272.1 107.7c37.1-.6 72.8 12.8 100.2 37.5l74.7-74.7C401.8 23.6 339.7-1.3 272.1 0 168.4 0 78 60.8 33.7 148.6l89.6 68.9c20.9-63 79.5-109.8 148.8-109.8z"
                      />
                    </svg>
                    <span className="text-black font-medium">
                      Continue with Google
                    </span>
                  </a>
                </li>
              </ul>

              <Link
                to="/ForgotPassword"
                className="!my-2 !mt-8 !inline-block !text-base !text-dark hover:text-primary hover:underline dark:text-white"
              >
                Forgot Password?
              </Link>
              <p className="!text-base !text-body-color !dark:text-dark-6">
                <span className="!pr-0.5">Not a member yet?</span>
                <Link
                  to="/Signup"
                  className="!ml-1 !mt-3 !text-primary hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

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
      />
    </div>
  );
};
