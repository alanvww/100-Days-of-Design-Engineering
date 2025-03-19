import { ImageResponse } from 'next/og';

// Image metadata
export const alt = '100 Days of Design Engineering by Alan Ren';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          position: 'relative',
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Background name */}
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: '25%',
            transform: 'translateX(36%)',
            fontSize: '160px',
            color: '#000',
            fontWeight: 600,
            textAlign: 'right',
            width: '100%',
            paddingRight: '160px',
            letterSpacing: '-2px',
            lineHeight: 0.9,
            opacity: 0.05,
            pointerEvents: 'none',
          }}
        >
          Alan Ren
        </div>

        {/* Foreground title */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '120px',
            width: '75%',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: '64px',
              fontWeight: 700,
              color: '#333',
              marginBottom: '20px',
              lineHeight: 1.2,
            }}
          >
            100 Days of Design Engineering
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: '28px',
              fontWeight: 400,
              color: '#666',
            }}
          >Showcase of Alan's design engineering journey over 100 days.</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
