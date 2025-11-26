import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      <style jsx>{`
        .wave {
          position: absolute;
          width: 100%;
          height: 100%;
          background: transparent;
          opacity: 0.6;
          filter: blur(50px);
        }

        .wave-1 {
          top: 10%;
          left: 0;
          background: radial-gradient(circle at 50% 50%, rgba(0, 255, 255, 0.4) 0%, transparent 50%);
          animation: flow 20s infinite linear alternate;
          transform: scale(1.5);
        }

        .wave-2 {
          bottom: 5%;
          right: 0;
          background: radial-gradient(circle at 50% 50%, rgba(0, 150, 255, 0.3) 0%, transparent 60%);
          animation: flow-reverse 25s infinite linear alternate;
          transform: scale(1.2);
        }

        .wave-3 {
          top: 50%;
          left: 20%;
          background: radial-gradient(circle at 50% 50%, rgba(102, 126, 234, 0.5) 0%, transparent 70%);
          animation: flow 15s infinite linear alternate;
          transform: scale(1.8);
        }

        @keyframes flow {
          0% {
            transform: translate(0, 0) scale(1.5) rotate(0deg);
          }
          50% {
            transform: translate(10vw, 5vh) scale(1.6) rotate(5deg);
          }
          100% {
            transform: translate(-5vw, -10vh) scale(1.5) rotate(0deg);
          }
        }

        @keyframes flow-reverse {
          0% {
            transform: translate(0, 0) scale(1.2) rotate(0deg);
          }
          50% {
            transform: translate(-15vw, -8vh) scale(1.3) rotate(-3deg);
          }
          100% {
            transform: translate(5vw, 10vh) scale(1.2) rotate(0deg);
          }
        }
      `}</style>
      <div className="wave wave-1"></div>
      <div className="wave wave-2"></div>
      <div className="wave wave-3"></div>
    </div>
  );
};

export default AnimatedBackground;