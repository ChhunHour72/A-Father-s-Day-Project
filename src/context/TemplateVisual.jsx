import React from 'react';

/**
 * Renders a unique, visually rich background for a given template.
 * @param {{visualType: string, palette: object}} props
 */
const TemplateVisual = ({ visualType, palette }) => {
  const styles = {
    container: {
      width: '100%',
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: palette.bg,
    },
  };

  const renderVisual = () => {
    switch (visualType) {
      case 'paper-texture':
        return (
          <div style={styles.container}>
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="paper" x="0%" y="0%" width="100%" height="100%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/>
                  <feDiffuseLighting in="noise" lightingColor="#e0ddd1" surfaceScale="2">
                    <feDistantLight azimuth="45" elevation="60" />
                  </feDiffuseLighting>
                </filter>
              </defs>
              <rect width="100%" height="100%" fill={palette.bg} />
              <rect width="100%" height="100%" filter="url(#paper)" opacity="0.3" />
            </svg>
            <div className="absolute top-4 left-4 w-1 h-8 bg-black/10 rounded-full"></div>
            <div className="absolute top-4 left-6 w-1 h-8 bg-black/10 rounded-full"></div>
          </div>
        );

      case 'tool-grid':
        return (
          <div style={styles.container}>
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="toolGrid" patternUnits="userSpaceOnUse" width="40" height="40">
                  <path d="M0 10h40M10 0v40M0 20h40M20 0v40M0 30h40M30 0v40" stroke={palette.border} strokeWidth="0.5" />
                  <circle cx="10" cy="10" r="1.5" fill={palette.border} />
                  <circle cx="30" cy="30" r="1.5" fill={palette.border} />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#toolGrid)" />
            </svg>
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-orange-500/10 rounded-full"></div>
          </div>
        );

      case 'circuit-board':
        return (
          <div style={styles.container}>
            <svg width="100%" height="100%">
              <rect width="100%" height="100%" fill={palette.bg}/>
              <g stroke={palette.accent} strokeOpacity="0.3" strokeWidth="2">
                  <path d="M -10 20 L 20 20 L 20 50 L 50 50" fill="none" />
                  <path d="M 60 10 L 60 40 L 90 40" fill="none" />
                  <path d="M 90 60 L 90 90 L 120 90" fill="none" />
                  <path d="M 10 70 L 40 70 L 40 100" fill="none" />
              </g>
            </svg>
          </div>
        );
        
      case 'gamer':
        return(
            <div style={styles.container}>
                <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_25%_25%,_rgba(139,92,246,0.5)_0%,_rgba(139,92,246,0)_50%)]"></div>
                <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_75%_75%,_rgba(74,222,128,0.5)_0%,_rgba(74,222,128,0)_50%)]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="flex gap-1">
                        <div className="w-4 h-4 bg-green-400/50 rounded-sm"></div>
                        <div className="w-4 h-4 bg-green-400/50 rounded-sm"></div>
                    </div>
                     <div className="w-8 h-4 bg-green-400/50 rounded-sm mt-1"></div>
                </div>
            </div>
        )

      case 'gardener':
        return (
            <div style={{...styles.container, backgroundColor: palette.bg}}>
                <svg width="100%" height="100%"><rect width="100%" height="100%" fill="url(#gardenerPattern)" /></svg>
                 <svg className="absolute w-0 h-0">
                    <defs>
                        <pattern id="gardenerPattern" patternUnits="userSpaceOnUse" width="60" height="60" >
                            <path d="M10 10 Q 20 0 30 10 T 50 10" stroke={palette.accent} strokeWidth="2" fill="none" opacity="0.3"/>
                            <path d="M0 30 Q 10 20 20 30 T 40 30" stroke={palette.accent} strokeWidth="2" fill="none" opacity="0.3"/>
                            <path d="M20 50 Q 30 40 40 50 T 60 50" stroke={palette.accent} strokeWidth="2" fill="none" opacity="0.3"/>
                        </pattern>
                    </defs>
                </svg>
            </div>
        );


      default:
        return (
          <div style={styles.container}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full" style={{ backgroundColor: palette.accent, opacity: 0.5 }}></div>
          </div>
        );
    }
  };

  return <div style={styles.container}>{renderVisual()}</div>;
};

export default TemplateVisual;
