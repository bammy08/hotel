const Footer = () => {
  return (
    <footer className="bg-[#003366] py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-white">
        {/* Branding */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Holidays.com
          </h1>
          <p className="text-sm text-gray-300 mt-2">
            Your trusted partner for unforgettable vacations.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row gap-4 text-center md:text-right">
          <a
            href="#"
            className="text-sm font-medium hover:underline cursor-pointer"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-sm font-medium hover:underline cursor-pointer"
          >
            Terms of Service
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-6 border-t border-gray-500 pt-4">
        <p className="text-sm text-center text-gray-300">
          © {new Date().getFullYear()} Holidays.com. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
