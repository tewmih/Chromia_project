export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Footer Content */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Left Section */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold">To-Do App</h3>
              <p className="text-sm text-gray-400">
                Organize your tasks, stay productive, and achieve your goals.
              </p>
            </div>
  
            {/* Middle Section */}
            <div className="text-center">
              <ul className="flex space-x-4">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
  
            {/* Right Section */}
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} To-Do App. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  