import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";

const NotFoundPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [0, 1], [15, -15]);
  const rotateY = useTransform(x, [0, 1], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const bounds = containerRef.current?.getBoundingClientRect();
    if (!bounds) return;

    const posX = (e.clientX - bounds.left) / bounds.width;
    const posY = (e.clientY - bounds.top) / bounds.height;

    x.set(posX);
    y.set(posY);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        ref={containerRef}
        className="relative"
        style={{ rotateX, rotateY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.h1
          className="text-[12rem] font-extrabold text-gray-900 select-none pointer-events-none"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 12 }}
        >
          404
        </motion.h1>

        <motion.div
          className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-24 h-24"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-full h-full text-pink-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </motion.div>
      </motion.div>

      <motion.p
        className="text-gray-700 text-lg md:text-xl max-w-md mt-8 mx-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Oops! The page you are looking for doesn’t exist or has been moved.
      </motion.p>

      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <a
          href="/"
          className="px-6 py-3 bg-pink-600 text-white rounded-xl shadow-lg hover:bg-pink-500 hover:scale-105 transition-transform duration-300"
        >
          Go Back Home
        </a>
      </motion.div>

      <motion.span
        className="mt-12 text-gray-400 text-sm select-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        If you think this is an error, contact support.
      </motion.span>
    </div>
  );
};

export default NotFoundPage;