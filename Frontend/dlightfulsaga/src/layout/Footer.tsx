const Footer = () => {
  return (
    <footer className="bg-[--color-bg] text-[--color-text] py-6 px-4 text-center mt-10 border-t !border-[--color-gold]">
      <p className="!font-[--font-sans] !text-md !my-2">
        &copy; {new Date().getFullYear()} Dlightful Saga. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
