import React from "react";
import back from '../assets/BACK.jpg'; // Import your background image

const Hero = () => {
  return (
    <div className="relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${back})` }}
      ></div>

      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between px-4 py-6 md:px-6 lg:px-8 lg:py-12 relative">
        {/* Left Side: Lottie Animation */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-start mb-8 lg:mb-0">
          <dotlottie-player
            src="https://lottie.host/b3237743-7474-4264-bed9-2728560852aa/tZW4WKxJp1.json"
            background="transparent"
            speed="1"
            style={{ width: '100%', maxWidth: '600px', height: 'auto' }}
            loop
            autoplay
          ></dotlottie-player>
        </div>

        {/* Right Side: Heading, Line, and Button */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-montserrat tracking-tight leading-tight text-gray-900 dark:text-white">
            Making life better with EliteFocus😎.
          </h1>
          <div className="border-b-4 border-blue-500 w-3/4 lg:w-1/2 my-4 mx-auto lg:mx-0"></div>
          <p className="mt-4 text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400">
            We focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.
          </p>
          <div className="w-full relative mt-4">
            <p className="text-base md:text-lg text-gray-800 font-semibold font-manrope">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-no-repeat bg-bottom p-1 text-white">
                Pagedone
              </span>{" "}
              Design System
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-3 items-center mt-8">
            <button className="w-full md:w-auto px-6 py-3 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg">
              Get Started
            </button>

            <div className="mt-4 md:mt-0">
              <lottie-player
                src="https://lottie.host/c2ad9588-764e-44ac-84ae-7fe27fd049af/6IKIKho5KP.json"
                background="transparent"
                speed="1"
                style={{ width: '75px', height: '75px' }}
                loop
                autoplay
                direction="1"
                mode="normal"
              ></lottie-player>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
