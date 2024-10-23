// components/Footer.js
const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white text-sm flex justify-end p-4">
      <div className="container mx-auto text-center">
        © {new Date().getFullYear()} QuickChat. All rights reserved.
      </div>
      <div className="container mx-auto text-center">
        Made with ❤️ by Akshat Jain
      </div>
    </footer>
  );
};

export default Footer;
