import React, { useEffect } from 'react';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

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
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 id="project-modal-title" className="modal-title">{project.name}</h2>
          <span className={`badge ${statusClass}`}>{statusLabel}</span>
        </div>
        {project.description && <p className="modal-description">{project.description}</p>}
        {project.problem && (
          <div className="modal-section">
            <h3 className="section-title">Problema</h3>
            <p>{project.problem}</p>
          </div>
        )}
        {Array.isArray(project.technologies) && project.technologies.length > 0 && (
          <div className="modal-section">
            <h3 className="section-title">Tecnologías</h3>
            <div className="chips">
              {project.technologies.map((t) => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>
          </div>
        )}
        <div className="modal-actions">
          {project.url && (
            <a href={project.url} target="_blank" rel="noreferrer" className="button">Ver proyecto</a>
          )}
          {project.repos?.frontend && (
            <a href={project.repos.frontend} target="_blank" rel="noreferrer" className="button button-secondary">Repo Frontend</a>
          )}
          {project.repos?.backend && (
            <a href={project.repos.backend} target="_blank" rel="noreferrer" className="button button-secondary">Repo Backend</a>
          )}
          <button className="button button-secondary" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}
