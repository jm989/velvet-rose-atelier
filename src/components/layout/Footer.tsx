import { Link } from "react-router-dom";
import { Instagram, Facebook, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="section-dark py-16 md:py-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="font-serif text-3xl tracking-tight">
              YoursTrulyS
            </Link>
            <p className="mt-4 body-refined opacity-70 max-w-xs">
              Crafting moments of beauty, one bouquet at a time.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="caption-elegant mb-6 opacity-50">Navigate</h4>
            <nav className="flex flex-col gap-3">
              <Link to="/" className="link-underline inline-block opacity-70 hover:opacity-100 transition-opacity">
                Home
              </Link>
              <Link to="/about" className="link-underline inline-block opacity-70 hover:opacity-100 transition-opacity">
                About Us
              </Link>
              <Link to="/flowers" className="link-underline inline-block opacity-70 hover:opacity-100 transition-opacity">
                Flowers
              </Link>
              <Link to="/valentines" className="link-underline inline-block opacity-70 hover:opacity-100 transition-opacity">
                Vals Day
              </Link>
              <Link to="/contact" className="link-underline inline-block opacity-70 hover:opacity-100 transition-opacity">
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Social */}
          <div>
            <h4 className="caption-elegant mb-6 opacity-50">Connect</h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-oat/20 hover:bg-oat hover:text-noir transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-oat/20 hover:bg-oat hover:text-noir transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="mailto:hello@yourstrulys.com"
                className="p-3 border border-oat/20 hover:bg-oat hover:text-noir transition-all duration-300"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-oat/10 text-center">
          <p className="text-sm opacity-50">
            © {new Date().getFullYear()} YoursTrulyS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
