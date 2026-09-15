'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FolderGit2, ExternalLink, Code2 } from 'lucide-react';
import { getProjects, Project } from '@/app/lib/api';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then((data) => setProjects(data))
      .catch((err) => console.error('Failed to load projects:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-[#1e2723] dark:text-[#e5e9e3] transition-colors duration-300">
      <div className="mb-12 text-center sm:text-left">
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1c2420] dark:text-[#e5e9e3] mb-4">
          Featured Work & Projects
        </h1>
        <p className="text-[#52635a] dark:text-[#a3b3a9] text-base max-w-2xl">
          Explore production client work, enterprise full-stack web applications, and open-source software systems.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div 
              key={n} 
              className="h-80 rounded-3xl bg-[#dbe3d8] dark:bg-[#1a231e] animate-pulse border border-[#c8d4c4] dark:border-[#2f3e36]" 
            />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="p-16 text-center rounded-3xl bg-[#dbe3d8] dark:bg-[#1a231e] border border-[#c8d4c4] dark:border-[#2f3e36] transition-colors">
          <Code2 className="w-12 h-12 text-[#43574b] dark:text-[#63a375] mx-auto mb-4" />
          <h3 className="text-lg font-bold text-[#1c2420] dark:text-[#e5e9e3]">No projects found</h3>
          <p className="text-[#52635a] dark:text-[#a3b3a9] text-sm mt-1">
            Check back later or populate your database from the admin portal.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="rounded-3xl bg-[#dbe3d8] dark:bg-[#1a231e] border border-[#c8d4c4] dark:border-[#2f3e36] p-6 sm:p-8 hover:shadow-md transition flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Optional Image Banner */}
                {project.imageUrl && (
                  <div className="w-full h-48 sm:h-56 overflow-hidden rounded-2xl mb-6 relative">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    />
                  </div>
                )}

                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#cbd6c8] dark:bg-[#28352e] text-[#284434] dark:text-[#a3c9b1] border border-transparent dark:border-[#2f3e36] transition-colors">
                    {project.category.replace('_', ' ')}
                  </span>
                  <div className="flex space-x-3 text-[#52635a] dark:text-[#a3b3a9]">
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="hover:text-[#1c2420] dark:hover:text-[#e5e9e3] transition"
                        aria-label="GitHub Repository"
                      >
                        <FolderGit2 className="w-5 h-5" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="hover:text-[#1c2420] dark:hover:text-[#e5e9e3] transition"
                        aria-label="Live Demo"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1c2420] dark:text-[#e5e9e3] mb-3">
                  {project.title}
                </h2>
                <p className="text-[#52635a] dark:text-[#a3b3a9] text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-[#c8d4c4] dark:border-[#2f3e36] transition-colors">
                {project.techStack.map((tech) => (
                  <span 
                    key={tech} 
                    className="text-xs bg-[#cbd6c8] dark:bg-[#28352e] text-[#284434] dark:text-[#a3c9b1] border border-transparent dark:border-[#2f3e36] px-3 py-1 rounded-full font-medium transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}