
import React from 'react';

const WaveBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 bg-[#140f11]">
      {/* Background Gradients inspired by the image colors */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#8b6d7a]/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#b3889b]/10 blur-[150px] rounded-full"></div>
      
      {/* Animated Waves Svg using the new palette */}
      <svg className="absolute bottom-0 left-0 w-full opacity-20" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <defs>
          <linearGradient id="wave-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b6d7a" />
            <stop offset="100%" stopColor="#b3889b" />
          </linearGradient>
        </defs>
        <path fill="url(#wave-grad)" d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,213.3C672,203,768,149,864,138.7C960,128,1056,160,1152,149.3C1248,139,1344,85,1392,58.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
          <animate attributeName="d" dur="20s" repeatCount="indefinite" values="
            M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,213.3C672,203,768,149,864,138.7C960,128,1056,160,1152,149.3C1248,139,1344,85,1392,58.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
            M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,224C960,245,1056,235,1152,213.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
            M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,213.3C672,203,768,149,864,138.7C960,128,1056,160,1152,149.3C1248,139,1344,85,1392,58.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z
          " />
        </path>
      </svg>
    </div>
  );
};

export default WaveBackground;
