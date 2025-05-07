import React from "react";

function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-black text-gray-300 px-6">
      {/* Navigation Bar */}
      <nav className="w-full max-w-6xl mx-auto py-6 flex justify-center gap-6 items-center">
        <a href="#features" className="text-gray-400 hover:text-white transition">Features</a>
        <a href="#contribute" className="text-gray-400 hover:text-white transition">Contribute</a>
        <a href="#community" className="text-gray-400 hover:text-white transition">Community</a>
      </nav>

      {/* Hero Section */}
      <div className="max-w-3xl text-center my-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">Welcome to DocsWrite</h1>
        <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
          A structured and well-organized documentation platform designed to help you explore, learn,
          and master various technologies, tools, and frameworks. Whether you're a beginner or an expert,
          find everything you need in one place.
        </p>
        <div className="mt-8 border-t border-gray-700 w-20 mx-auto"></div>
        <p className="mt-6 text-gray-500 text-sm">
          Navigate through detailed guides, reference materials, and best practices, all structured for
          seamless learning and efficient knowledge discovery.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://github.com/nk1044/autoDocs"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent hover:bg-gray-800 text-gray-300 border border-gray-700 px-6 py-3 rounded-md font-medium transition"
          >
            Explore Github Repository
          </a>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="w-full max-w-6xl mx-auto py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Why docsWrite?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Structured Learning",
              description: "Follow a logical progression from basics to advanced topics with our carefully organized documentation flow.",
              icon: (
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              )
            },
            {
              title: "Community-Powered",
              description: "Benefit from the collective knowledge of developers worldwide who contribute their expertise to our platform.",
              icon: (
                <path fillRule="evenodd" clipRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z" />
              )
            },
            {
              title: "Code Examples",
              description: "Learn through practical, real-world code examples that you can implement in your own projects.",
              icon: (
                <path fillRule="evenodd" clipRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" />
              )
            }
          ].map(({ title, description, icon }) => (
            <div key={title} className="bg-neutral-900 p-6 rounded-lg border border-neutral-800">
              <div className="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  {icon}
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
              <p className="text-gray-400">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
