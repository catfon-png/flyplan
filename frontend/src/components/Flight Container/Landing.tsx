import React from "react";

export default function Landing() {
  const places = [
    "Paris",
    "New York",
    "Rio de Janeiro",
    "Lisbon",
    "London",
    "Rome",
    "Beijing",
    "Cairo",
  ];
  return (
    <div>
      {/* <h1 className='flex items-center'>Or choose a destination!</h1> */}
      <div className="grid gap-4 md:grid-cols-2 mt-8">
        {/* {places.map((_, index) => ( */}
          <div className="h-300px">
            <div className="flex items-center bg-white rounded-lg border border-gray-300 h-300px">
              <img
                src="https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2970&q=105"
                alt="Rome"
                className="rounded-l-lg w-20 object-fill"
              />
              <div className="flex-grow">
                <h3 className="text-lg font-bold ml-5">Rome</h3>
                <div className="flex items-center ml-5">
                  <p className="text-sm text-gray-600 mr-2">Search flight</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M13.707 9.293a1 1 0 00-1.414-1.414L10 10.586V3a1 1 0 00-2 0v7.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 000-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="h-300px">
            <div className="flex items-center bg-white rounded-lg border border-gray-300 max-h-300px">
              <img
                src="https://images.unsplash.com/photo-1562679299-266edbefd6d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1746&q=80"
                alt="Cairo"
                className="rounded-l-lg w-20 object-fill"
              />
              <div className="flex-grow">
                <h3 className="text-lg font-bold ml-5">Cairo</h3>
                <div className="flex items-center ml-5">
                  <p className="text-sm text-gray-600 mr-2">Search flight</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M13.707 9.293a1 1 0 00-1.414-1.414L10 10.586V3a1 1 0 00-2 0v7.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 000-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="h-300px">
            <div className="flex items-center bg-white rounded-lg border border-gray-300 max-h-300px">
              <img
                src="https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                alt="New York"
                className="rounded-l-lg w-20 object-fill"
              />
              <div className="flex-grow">
                <h3 className="text-lg font-bold ml-5">New York</h3>
                <div className="flex items-center ml-5">
                  <p className="text-sm text-gray-600 mr-2">Search flight</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M13.707 9.293a1 1 0 00-1.414-1.414L10 10.586V3a1 1 0 00-2 0v7.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 000-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="h-300px">
            <div className="flex items-center bg-white rounded-lg border border-gray-300 max-h-300px">
              <img
                src="https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
                alt="Rio de Janeiro"
                className="rounded-l-lg w-20 object-fill"
              />
              <div className="flex-grow">
                <h3 className="text-lg font-bold ml-5">Rio de Janeiro</h3>
                <div className="flex items-center ml-5">
                  <p className="text-sm text-gray-600 mr-2">Search flight</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M13.707 9.293a1 1 0 00-1.414-1.414L10 10.586V3a1 1 0 00-2 0v7.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 000-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        {/* ))} */}
      </div>
    </div>
  );
}
