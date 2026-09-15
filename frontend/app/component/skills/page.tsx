'use client';

export default function SkillsPage() {
  const skillCategories = [
    {
      title: 'Frontend Development',
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML5/CSS3', 'Redux/Zustand'],
    },
    {
      title: 'Backend & APIs',
      skills: ['Node.js', 'Express.js', 'REST APIs', 'GraphQL', 'Prisma ORM', 'Authentication (JWT/Auth.js)'],
    },
    {
      title: 'Databases & Infrastructure',
      skills: ['MongoDB', 'PostgreSQL', 'Redis', 'Docker', 'Git/GitHub', 'Vercel / Render'],
    },
  ];

  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-[#1e2723] dark:text-[#e5e9e3] transition-colors duration-300">
      <div className="mb-12">
        <h1 className="text-4xl font-bold font-serif mb-4 text-[#1c2420] dark:text-[#e5e9e3]">
          Technical Skills
        </h1>
        <p className="text-[#52635a] dark:text-[#a3b3a9] text-lg">
          Languages, frameworks, tools, and databases I work with daily.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {skillCategories.map((cat, idx) => (
          <div 
            key={idx} 
            className="bg-[#e5e9e3] dark:bg-[#1a231e] p-6 rounded-2xl border border-[#cbd4c9] dark:border-[#2f3e36] transition-colors"
          >
            <h2 className="font-serif font-bold text-xl mb-4 text-[#355843] dark:text-[#63a375]">
              {cat.title}
            </h2>
            <ul className="space-y-3">
              {cat.skills.map((skill, sIdx) => (
                <li key={sIdx} className="flex items-center gap-2 text-[#52635a] dark:text-[#a3b3a9] text-sm">
                  <span className="w-2 h-2 rounded-full bg-[#355843] dark:bg-[#63a375]" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}