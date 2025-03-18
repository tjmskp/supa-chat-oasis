import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Supa Chat Oasis. All rights reserved.
          </div>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <Link
              to="/privacy"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
            <a
              href="mailto:your-email@example.com"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 