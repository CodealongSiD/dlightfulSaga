const Footer = () => {
  return (
    <footer
      className="
        fixed bottom-0 left-0 w-full
        !bg-zinc-800/90 !text-[--color-text] !py-2 !px-4 !text-center 
        !border-t !border-[--color-gold] z-50
      "
    >
      <p className="!font-[--font-sans] !text-md !my-2">
        &copy; {new Date().getFullYear()} Dlightful Saga. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
