import { useEffect, useRef, useState } from 'react';
import React from 'react'

function EmailLottie() {

  const ref = useRef(null);
  const [lottie, setLottie] = useState(null);

  useEffect(() => {
    import('lottie-web').then((Lottie) => setLottie(Lottie.default));
  }, []);

  useEffect(() => {
    if (lottie && ref.current) {
      const animation = lottie.loadAnimation({
        container: ref.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        // path to your animation file, place it inside public folder
        path: '/images/emaillottie.json',
      });

      return () => animation.destroy();
    }
  }, [lottie]);

  return (
    <div ref={ref} />
  );
}


export default EmailLottie


 

