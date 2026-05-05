

// ── بياخد البيانات من localStorage (من signup) ──
const currentUser = {
  name:     localStorage.getItem("username") || "User",
  email:    localStorage.getItem("email")    || "no email",
  role:     localStorage.getItem("role")     || "user",
  location: localStorage.getItem("location") || "Unknown",
  joined:   "Joined 2024",
  applied:  parseInt(localStorage.getItem("applied") || "0"),
  saved:    parseInt(localStorage.getItem("saved")   || "0"),
};

const adminStats = {
  totalUsers:        parseInt(localStorage.getItem("totalUsers")        || "0"),
  totalJobs:         parseInt(localStorage.getItem("totalJobs")         || "0"),
  totalApplications: parseInt(localStorage.getItem("totalApplications") || "0"),
};



function buildProfileHeader(user) {
  const badgeClass = user.role === 'admin' ? 'role-badge--admin' : 'role-badge--user';
  const badgeLabel = user.role === 'admin' ? 'Admin' : 'User';
  return `
    <div class="profile-card">
      <div class="profile-card__avatar">👤</div>
      <div class="profile-card__info">
        <h1 class="profile-card__name">${user.name}</h1>
        <p class="profile-card__email">✉️ ${user.email}</p>
        <div class="profile-card__meta">
          <span class="role-badge ${badgeClass}">${badgeLabel}</span>
          <span>📍 ${user.location}</span>
          <span>📅 ${user.joined}</span>
        </div>
      </div>
      <div class="profile-card__actions">
        <button class="btn btn--ghost" onclick="toggleEditForm()">✏️ Edit Profile</button>
      </div>
    </div>
    <input type="file" id="cvInput" accept=".pdf,.doc,.docx" style="display:none" />
  `;
}

function buildUserProfile(user) {
  const savedSkills     = localStorage.getItem('userSkills')     || '';
  const savedEducation  = localStorage.getItem('userEducation')  || '';
  const savedExperience = localStorage.getItem('userExperience') || '';
  const savedCV         = localStorage.getItem('cvName')         || '';
  const skillCount      = savedSkills ? savedSkills.split(',').filter(s=>s.trim()).length : 0;

  return `
    ${buildProfileHeader(user)}
    <div class="profile-stats profile-stats--user">
      <div class="profile-stat-card profile-stat-card--warm">
        <div class="profile-stat-card__icon">📄</div>
        <div class="profile-stat-card__number">${user.applied}</div>
        <div class="profile-stat-card__label">Applied</div>
      </div>
      <div class="profile-stat-card profile-stat-card--cool">
        <div class="profile-stat-card__icon">🔖</div>
        <div class="profile-stat-card__number">${user.saved}</div>
        <div class="profile-stat-card__label">Saved</div>
      </div>
      <div class="profile-stat-card profile-stat-card--mint">
        <div class="profile-stat-card__icon">⚡</div>
        <div class="profile-stat-card__number">${skillCount}</div>
        <div class="profile-stat-card__label">Skills</div>
      </div>
    </div>
    <div class="profile-grid">
      <div class="profile-section">
        <div class="profile-section__header"><span>🧠</span><h3 class="profile-section__title">Skills</h3></div>
        ${savedSkills
          ? `<div style="display:flex;flex-wrap:wrap;gap:0.4rem;">${savedSkills.split(',').map(s=>`<span class="tag tag--secondary">${s.trim()}</span>`).join('')}</div>`
          : `<p class="profile-section__empty">No skills added yet</p>`}
      </div>
      <div class="profile-section">
        <div class="profile-section__header"><span>🎓</span><h3 class="profile-section__title">Education</h3></div>
        ${savedEducation
          ? `<p style="font-size:0.9rem;line-height:1.6;">${savedEducation.replace(/\n/g,'<br/>')}</p>`
          : `<p class="profile-section__empty">No education added yet</p>`}
      </div>
    </div>
    <div class="profile-grid">
      <div class="profile-section">
        <div class="profile-section__header"><span>💼</span><h3 class="profile-section__title">Experience</h3></div>
        ${savedExperience
          ? `<p style="font-size:0.9rem;line-height:1.6;">${savedExperience.replace(/\n/g,'<br/>')}</p>`
          : `<p class="profile-section__empty">No experience added yet</p>`}
      </div>
      <div class="profile-section">
        <div class="profile-section__header"><span>📎</span><h3 class="profile-section__title">CV / Resume</h3></div>
        <div class="cv-upload">
          <div class="cv-upload__icon">⬆️</div>
          <p class="cv-upload__text">${savedCV ? `📄 ${savedCV}` : 'No CV uploaded yet'}</p>
          <button class="btn btn--accent" onclick="uploadCV()">${savedCV ? '🔄 Replace CV' : '+ Upload CV'}</button>
        </div>
      </div>
    </div>
    <div class="profile-section" id="editForm" style="display:none;">
      <div class="profile-section__header"><span>✏️</span><h3 class="profile-section__title">Edit Profile</h3></div>
      <div class="profile-form">
        <div class="form-group">
          <label>Full Name</label>
          <input id="inputName" type="text" value="${user.name}" placeholder="Your name" />
        </div>
        <div class="form-group">
          <label>Skills (comma separated)</label>
          <input id="inputSkills" type="text" value="${savedSkills}" placeholder="React, TypeScript, Design..." />
        </div>
        <div class="form-group">
          <label>Education (one per line)</label>
          <textarea id="inputEducation" placeholder="BSc Computer Science">${savedEducation}</textarea>
        </div>
        <div class="form-group">
          <label>Experience (one per line)</label>
          <textarea id="inputExperience" placeholder="Frontend Developer at TechCorp">${savedExperience}</textarea>
        </div>
        <button class="btn btn--accent" onclick="saveProfile()">💾 Save Changes</button>
      </div>
    </div>
  `;
}

function buildAdminProfile(user) {
  return `
    ${buildProfileHeader(user)}
    <div class="profile-stats profile-stats--admin">
      <div class="profile-stat-card profile-stat-card--cool">
        <div class="profile-stat-card__icon">👥</div>
        <div class="profile-stat-card__number">${adminStats.totalUsers.toLocaleString()}</div>
        <div class="profile-stat-card__label">Total Users</div>
      </div>
      <div class="profile-stat-card profile-stat-card--mint">
        <div class="profile-stat-card__icon">💼</div>
        <div class="profile-stat-card__number">${adminStats.totalJobs}</div>
        <div class="profile-stat-card__label">Total Jobs</div>
      </div>
      <div class="profile-stat-card profile-stat-card--amber">
        <div class="profile-stat-card__icon">📄</div>
        <div class="profile-stat-card__number">${adminStats.totalApplications.toLocaleString()}</div>
        <div class="profile-stat-card__label">Applications</div>
      </div>
    </div>
    <div class="profile-section" style="margin-bottom:1.5rem;">
      <div class="profile-section__header"><span>⚡</span><h3 class="profile-section__title">Quick Actions</h3></div>
      <div class="quick-actions">
        <a href="addjob.html" class="quick-action-btn"><span class="quick-action-btn__icon">➕</span> Add Job</a>
        <a href="joblist.html" class="quick-action-btn"><span class="quick-action-btn__icon">📋</span> Jobs List</a>
        
        <a href="dashboard.html" class="quick-action-btn"><span class="quick-action-btn__icon">📊</span> Dashboard</a>
      </div>
    </div>
    <div class="profile-grid">
      <div class="profile-section">
        <div class="profile-section__header"><span>👤</span><h3 class="profile-section__title">Account Info</h3></div>
        <div style="display:flex;flex-direction:column;gap:0.75rem;margin-top:0.5rem;">
          <div>
            <div style="font-size:0.75rem;color:var(--muted-fg);font-weight:600;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:0.2rem;">Name</div>
            <div style="font-size:0.9rem;font-weight:600;">${user.name}</div>
          </div>
          <div>
            <div style="font-size:0.75rem;color:var(--muted-fg);font-weight:600;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:0.2rem;">Email</div>
            <div style="font-size:0.9rem;font-weight:600;">${user.email}</div>
          </div>
          <div>
            <div style="font-size:0.75rem;color:var(--muted-fg);font-weight:600;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:0.2rem;">Joined</div>
            <div style="font-size:0.9rem;font-weight:600;">${user.joined}</div>
          </div>
        </div>
      </div>
      <div class="profile-section" id="editForm" style="display:none;">
        <div class="profile-section__header"><span>✏️</span><h3 class="profile-section__title">Edit Profile</h3></div>
        <div class="profile-form">
          <div class="form-group">
            <label>Full Name</label>
            <input id="inputName" type="text" value="${user.name}" />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" value="${user.email}" disabled style="opacity:0.5;" />
          </div>
          <button class="btn btn--accent" onclick="saveProfile()">💾 Save Changes</button>
        </div>
      </div>
    </div>
  `;
}

function toggleEditForm() {
  const form = document.getElementById('editForm');
  if (form) form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

function saveProfile() {
  const name       = document.getElementById('inputName')?.value;
  const skills     = document.getElementById('inputSkills')?.value;
  const education  = document.getElementById('inputEducation')?.value;
  const experience = document.getElementById('inputExperience')?.value;

  if (name)       localStorage.setItem('username', name);
  if (skills !== undefined)     localStorage.setItem('userSkills', skills);
  if (education !== undefined)  localStorage.setItem('userEducation', education);
  if (experience !== undefined) localStorage.setItem('userExperience', experience);

  showToast('✅ Profile saved!');
  setTimeout(() => location.reload(), 1000);
}

function uploadCV() {
  const input = document.getElementById('cvInput');
  input.click();
  input.onchange = () => {
    const file = input.files[0];
    if (file) {
      localStorage.setItem('cvName', file.name);
      showToast('📎 CV uploaded: ' + file.name);
      setTimeout(() => location.reload(), 1000);
    }
  };
}

function showToast(msg) {
  const toast = document.createElement('div');
  toast.textContent = msg;
  toast.style.cssText = `
    position:fixed;bottom:2rem;right:2rem;
    background:var(--foreground);color:#fff;
    padding:0.75rem 1.25rem;border-radius:var(--radius);
    font-size:0.88rem;font-weight:600;
    box-shadow:0 8px 24px rgba(0,0,0,0.2);
    z-index:999;animation:fadeUp 0.3s ease;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

function init() {
  const content = document.getElementById('profileContent');
  /* buildNavbar(currentUser); */
  if (currentUser.role === 'admin') {
    content.innerHTML = buildAdminProfile(currentUser);
  } else {
    content.innerHTML = buildUserProfile(currentUser);
  }
}

document.addEventListener('DOMContentLoaded', init);
