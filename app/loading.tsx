'use client'
import { EllipsisIcon } from "@/components/ui/EllipsisIcon";
import { useState, useEffect } from "react";

const Loading = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-semibold mb-4">Loading...<EllipsisIcon /></h2>
      
      <div className="w-4/5 h-5 bg-gray-300 rounded-full overflow-hidden mb-2">
        <div
          className="h-full bg-primary transition-all duration-100"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p className="text-gray-700 font-medium">{progress}%</p>
    </div>
  );
};

export default Loading;
