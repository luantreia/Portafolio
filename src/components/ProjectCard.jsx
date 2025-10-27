import React from 'react';

export default function ProjectCard({ project, onClick }) {
  const statusLabel = {
    completed: 'Completado',
    in_progress: 'En progreso',
    experimental: 'Experimental',
  }[project.status] || project.status;

  const statusClass = {
    completed: 'status-completed',
    in_progress: 'status-in-progress',
    experimental: 'status-experimental',
  }[project.status] || 'status-default';

  return (
    <button className="project-card" onClick={onClick} aria-label={`Ver ${project.name}`}>
      <div className="project-card-header">
        <h3 className="project-title">{project.name}</h3>
        <span className={`badge ${statusClass}`}>{statusLabel}</span>
      </div>
      {project.short && <p className="project-short">{project.short}</p>}
      {Array.isArray(project.technologies) && project.technologies.length > 0 && (
        <div className="project-tech">
          {project.technologies.slice(0, 4).map((t) => (
            <span key={t} className="chip">{t}</span>
          ))}
        </div>
      )}
    </button>
  );
}
