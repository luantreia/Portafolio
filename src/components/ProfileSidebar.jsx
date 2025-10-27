import React from 'react';

export default function ProfileSidebar({ profile }) {
  const initials = profile?.name ? profile.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'NA';
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

      {profile?.technologies?.length ? (
        <section className="section">
          <h2 className="section-title">Tecnologías</h2>
          <div className="chips">
            {profile.technologies.map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>
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
