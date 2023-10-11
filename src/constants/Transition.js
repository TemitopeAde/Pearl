import { motion } from "framer-motion";
const animationConfiguration = {
  initial: { translateX: -6, opacity: 0 },
  animate: { translateX: 0, opacity: 1 },
  exit: { translateX: 6, opacity: 0 },
};
const Transitions = ({ children }) => {
  return (
    <motion.div
      variants={animationConfiguration}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 1.5 }}
    >
      {children}
    </motion.div>
  );
};
export default Transitions;