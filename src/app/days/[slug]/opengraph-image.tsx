import { ImageResponse } from 'next/og';
import { getProject } from '@/lib/markdown';

// Image metadata
export const alt = 'Design Engineering Day Project';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Generate images for day pages
export default async function Image({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const project = await getProject(slug);

  if (!project) {
    return new ImageResponse(
      (
        <div
          style={{
            background: 'white',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '64px',
            fontWeight: 'bold',
          }}
        >
          Day {slug} - Not Found
        </div>
      ),
      { ...size }
    );
  }

  const dayNumber = parseInt(slug, 10);
  const projectColor = project.color || '#333333';
  const backgroundColor = 'white';

  console.log(project.project)

  return new ImageResponse(
    (
      <div
        style={{
          position: 'relative',
          background: backgroundColor,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          overflow: 'hidden',
        }}
      >
        {/* Background project name */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingRight: '80px',
            fontSize: '120px',
            textAlign: 'right',
            color: projectColor,
            fontWeight: 600,
            letterSpacing: '-2px',
            lineHeight: 1.2,
            opacity: 0.15,
            pointerEvents: 'none',
          }}
        >
          {project.project}
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
              fontSize: '20px',
              fontWeight: 600,
              color: projectColor,
              marginBottom: '12px',
            }}
          >
            Day {dayNumber}
          </div>
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
            {project.title}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: '24px',
              fontWeight: 400,
              color: '#666',
            }}
          >
            100 Days of Design Engineering
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
