import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <img
            src="/images/loading.webp"
            alt="Loading Character"
            width={150}
            height={150}
            className="object-contain"
          />
        </motion.div>
      </div>
    </div>
  );
}
