import React, { useState } from 'react';

export default function ProfileSidebar({ profile, isMobileView = false, projectsVisible = true, onToggleProjects }) {
  const initials = profile?.name ? profile.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'NA';
  const INITIAL_VISIBLE = 15;
  const technologies = Array.isArray(profile?.technologies) ? profile.technologies : [];
  const totalTechnologies = technologies.length;
  const [showAllTechnologies, setShowAllTechnologies] = useState(false);
  const visibleTechnologies = showAllTechnologies ? technologies : technologies.slice(0, INITIAL_VISIBLE);
  const shouldShowToggle = totalTechnologies > INITIAL_VISIBLE;

  const toggleTechnologiesView = () => {
    setShowAllTechnologies((prev) => !prev);
  };

  return (
    <aside className="sidebar">
      <div className="avatar">
        {profile?.photo ? (
          <img src={profile.photo} alt={profile.name} />
        ) : (
          <div className="avatar-fallback">{initials}</div>
        )}
      </div>
      <h1 className="name">{profile?.name || 'Tu Nombre'}</h1>
      <p className="role">{profile?.role || 'Tu Rol'}</p>

      {isMobileView ? (
        <button
          type="button"
          className="button sidebar-mobile-toggle"
          onClick={onToggleProjects}
        >
          {projectsVisible ? 'Ocultar proyectos' : 'Ver proyectos'}
        </button>
      ) : null}

      <div className="contact">
        {profile?.location && <div className="contact-item">{profile.location}</div>}
        {profile?.email && (
          <div className="contact-item">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </div>
        )}
        {profile?.phone && <div className="contact-item">{profile.phone}</div>}
        <div className="links">
          {profile?.links?.github && (
            <a href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a>
          )}
          {profile?.links?.linkedin && (
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          )}
          {profile?.links?.website && (
            <a href={profile.links.website} target="_blank" rel="noreferrer">Web</a>
          )}
        </div>
      </div>

      {technologies.length ? (
        <section className="section">
          <h2 className="section-title">Tecnologías</h2>
          <div className="chips">
            {visibleTechnologies.map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>
          {shouldShowToggle && (
            <button
              type="button"
              className="button button-secondary"
              onClick={toggleTechnologiesView}
            >
              {showAllTechnologies ? 'Ver menos' : 'Ver más'}
            </button>
          )}
        </section>
      ) : null}

      {profile?.skills?.length ? (
        <section className="section">
          <h2 className="section-title">Habilidades</h2>
          <ul className="skills">
            {profile.skills.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>
      ) : null}
    </aside>
  );
}
