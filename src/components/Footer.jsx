export default function Footer() {
  return (
    <footer className="bg-white text-gray-600 text-sm border-t mt-8">
      <div className="max-w-screen-xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
        <p>&copy; {new Date().getFullYear()} Skinvia. All rights reserved.</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="/company-profile" className="hover:underline">
            About
          </a>
          <a href="/contact" className="hover:underline">
            Contact
          </a>
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
