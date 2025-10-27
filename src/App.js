import React, { useEffect, useState } from 'react';
import './portfolio.css';
import ProfileSidebar from './components/ProfileSidebar';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import profile from './data/profile';
import projects from './data/projects';

function App() {
  const [selected, setSelected] = useState(null);
  const [showProjects, setShowProjects] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.innerWidth > 900;
  });
  const [isMobileView, setIsMobileView] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= 900;
  });

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 900;
      setIsMobileView(isMobile);
      if (!isMobile) {
        setShowProjects(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    const { style } = document.body;
    const previousOverflow = style.overflow;
    if (isMobileView && showProjects) {
      style.overflow = 'hidden';
    } else {
      style.overflow = '';
    }
    return () => {
      style.overflow = previousOverflow;
    };
  }, [isMobileView, showProjects]);

  const toggleProjectsVisibility = () => {
    setShowProjects((prev) => !prev);
  };
  const techCounts = new Map();
  (projects || []).forEach((project) => {
    if (!Array.isArray(project.technologies)) return;
    project.technologies.forEach((tech) => {
      techCounts.set(tech, (techCounts.get(tech) || 0) + 1);
    });
  });

  const techFromProjects = Array.from(techCounts.entries())
    .sort((a, b) => {
      if (b[1] !== a[1]) return b[1] - a[1];
      return a[0].localeCompare(b[0]);
    })
    .map(([tech]) => tech);

  const handleProjectSelect = (project) => {
    setSelected(project);
    if (isMobileView) {
      setShowProjects(false);
    }
  };

  const projectGrid = (
    <div className="projects-grid">
      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} onClick={() => handleProjectSelect(p)} />
      ))}
    </div>
  );

  return (
    <main className="portfolio">
      <div className="portfolio-grid">
        <ProfileSidebar
          profile={{ ...profile, technologies: techFromProjects }}
          isMobileView={isMobileView}
          projectsVisible={showProjects}
          onToggleProjects={toggleProjectsVisibility}
        />
        {!isMobileView && <section className="projects">{projectGrid}</section>}
      </div>
      {isMobileView && showProjects && (
        <div className="projects-overlay" role="dialog" aria-modal="true" onClick={toggleProjectsVisibility}>
          <div className="projects-overlay__content" onClick={(event) => event.stopPropagation()}>
            <header className="projects-overlay__header">
              <h2 className="projects-overlay__title">Proyectos</h2>
              <button type="button" className="button button-secondary" onClick={toggleProjectsVisibility}>
                Cerrar
              </button>
            </header>
            {projectGrid}
          </div>
        </div>
      )}
      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </main>
  );
}

export default App;
