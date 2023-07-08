import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <AnimatePresence mode='wait' initial={false}>
      <motion.div
        key={router.route}
        initial='initialState'
        animate='animateState'
        exit='exitState'
        variants={{
          initialState: {
            x: 300,
            opacity: 0,
          },
          animateState: {
            x: 0,
            opacity: 1,
          },
          exitState: {
            scale: 0.9,
          },
        }}
      >
        <Component {...pageProps} />
      </motion.div>
    </AnimatePresence>
  );
}
