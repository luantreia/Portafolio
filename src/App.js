import React, { useState } from 'react';
import './portfolio.css';
import ProfileSidebar from './components/ProfileSidebar';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import profile from './data/profile';
import projects from './data/projects';

function App() {
  const [selected, setSelected] = useState(null);
  const techFromProjects = Array.from(
    new Set(
      (projects || []).flatMap((p) => Array.isArray(p.technologies) ? p.technologies : [])
    )
  ).sort();

  return (
    <main className="portfolio">
      <div className="portfolio-grid">
        <ProfileSidebar profile={{ ...profile, technologies: techFromProjects }} />
        <section className="projects">
          <div className="projects-grid">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} onClick={() => setSelected(p)} />
            ))}
          </div>
        </section>
      </div>
      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </main>
  );
}

export default App;
