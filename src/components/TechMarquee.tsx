'use client';

const techStack = [
  'React', 'TypeScript', 'Next.js', 'Node.js', 'Python', 'Tailwind',
  'Three.js', 'GSAP', 'Astro', 'PostgreSQL', 'MongoDB', 'Docker',
  'AWS', 'FastAPI', 'React Native', 'WebSockets', 'Framer Motion',
];

export default function TechMarquee() {
  return (
    <div className="relative overflow-hidden py-6">
      <div className="mb-3 flex animate-marquee gap-8 whitespace-nowrap">
        {[...techStack, ...techStack].map((tech, i) => (
          <span
            key={`row1-${i}`}
            className="inline-block rounded-full border border-border/40 bg-surface/30 px-4 py-1.5 text-sm font-medium text-text-secondary backdrop-blur-sm"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="flex animate-marquee-reverse gap-8 whitespace-nowrap">
        {[...techStack, ...techStack].reverse().map((tech, i) => (
          <span
            key={`row2-${i}`}
            className="inline-block rounded-full border border-border/40 bg-surface/30 px-4 py-1.5 text-sm font-medium text-text-secondary backdrop-blur-sm"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
