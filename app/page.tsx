import { GiFedora } from "react-icons/gi";

export default function VisionAssistAdminLogin() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-blue-500 via-blue-600 to-blue-700 p-12 flex-col justify-between relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>


        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <GiFedora className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <span className="text-2xl font-bold text-white block">
                VisionAssist
              </span>
              <span className="text-sm text-blue-100">
                Admin Panel
              </span>
            </div>
          </div>
        </div>

        <div className="relative z-10 mb-90">
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            Manage VisionAssist
            <br />
            Smart Devices
          </h2>
          <p className="text-blue-100 text-lg leading-relaxed">
            Monitor and manage all VisionAssist hat devices, track user locations,
            handle alerts, and ensure the safety of visually impaired users.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">

          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl mb-3 shadow-lg">
              <GiFedora className="w-9 h-9 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">VisionAssist</h1>
            <p className="text-sm text-gray-600">Admin Panel</p>
          </div>

          {/* Welcome Text */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Admin!</h2>
            <p className="text-gray-600">Sign in to manage VisionAssist devices and users</p>
          </div>

          {/* Login Form */}
          <form className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Admin Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                 transition placeholder-gray-400"
                  placeholder="admin@visionassist.com"
                />
              </div>
            </div>


            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Password
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  type="password"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                 transition placeholder-gray-400"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* secure connection */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <svg className="h-4 w-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Secure Connection
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Sign In to Dashboard
            </button>

            {/* Admin Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <svg className="h-5 w-5 text-blue-600 mt-0.5 mr-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-blue-900 mb-1">Admin Access Only</p>
                  <p className="text-xs text-blue-700">
                    This panel is restricted to authorized VisionAssist administrators.
                    All login attempts are monitored and logged.
                  </p>
                </div>
              </div>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Need help?{' '}
              <a href="/support" className="font-semibold text-blue-600 hover:text-blue-700 transition">
                Contact Support
              </a>
            </p>
            <p className="text-xs text-gray-500 mt-3">
              © 2026 VisionAssist. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}