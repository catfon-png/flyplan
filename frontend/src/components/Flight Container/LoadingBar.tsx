import {useState} from 'react'
import { FaPlane } from 'react-icons/fa';

const LoadingBar = () => {
  const [percentLoaded, setPercentLoaded] = useState(0);

  const updateProgressBar = () => {
    setPercentLoaded((prevPercent) => {
      if (prevPercent < 100) {
        return prevPercent + 5;
      }
      return prevPercent;
    });
    if (percentLoaded < 100) {
      setTimeout(updateProgressBar, 5000);
    }
  };

  return (
    <div className="w-full h-2 bg-white rounded-full mt-10">
    <div
      className="h-full bg-flyplanyellow rounded-full transition-all duration-1500"
      style={{ width: `${percentLoaded}%` }}
    >
    <FaPlane
    className="text-yellow-600 plane-icon relative -top-4 -mt-5 ml-5 w-10 h-10 transition-all duration-1500"
    style={{
      left: `${percentLoaded}%`,
      transform: `translateX(-${percentLoaded}%)`,
    }}
    
    />
    </div>
  </div>
  )
}

export default LoadingBar
