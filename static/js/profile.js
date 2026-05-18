function getCSRF() {
    return document.cookie.split('; ')
        .find(r => r.startsWith('csrftoken='))
        ?.split('=')[1] || '';
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
        z-index:999;
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function toggleEditForm() {
    const form = document.getElementById('editForm');
    if (form) form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

async function saveProfile() {
    const username = document.getElementById('inputName')?.value;
    const age      = document.getElementById('inputAge')?.value;
    const gender   = document.getElementById('inputGender')?.value;
    const location = document.getElementById('inputLocation')?.value;

    const res  = await fetch("/accounts/profile/", {
        method : "POST",
        headers: { "Content-Type": "application/json", "X-CSRFToken": getCSRF() },
        body   : JSON.stringify({ username, age, gender, location })
    });
    const data = await res.json();

    if (!res.ok) {
        alert(data.error);
        return;
    }

    showToast('✅ Profile saved!');
    setTimeout(() => location.reload(), 1000);
}

function buildProfileHeader(user) {
    const badgeClass = user.role === 'admin' ? 'role-badge--admin' : 'role-badge--user';
    const badgeLabel = user.role === 'admin' ? 'Admin' : 'User';
    return `
        <div class="profile-card">
            <div class="profile-card__avatar">👤</div>
            <div class="profile-card__info">
                <h1 class="profile-card__name">${user.username}</h1>
                <p class="profile-card__email">✉️ ${user.email}</p>
                <div class="profile-card__meta">
                    <span class="role-badge ${badgeClass}">${badgeLabel}</span>
                    <span>📍 ${user.location || 'Unknown'}</span>
                </div>
            </div>
            <div class="profile-card__actions">
                <button class="btn btn--ghost" onclick="toggleEditForm()">✏️ Edit Profile</button>
            </div>
        </div>
    `;
}

function buildEditForm(user) {
    return `
        <div class="profile-section" id="editForm" style="display:none;">
            <div class="profile-section__header"><span>✏️</span><h3 class="profile-section__title">Edit Profile</h3></div>
            <div class="profile-form">
                <div class="form-group">
                    <label>Username</label>
                    <input id="inputName" type="text" value="${user.username}" placeholder="Your username" />
                </div>
                <div class="form-group">
                    <label>Age</label>
                    <input id="inputAge" type="number" value="${user.age || ''}" placeholder="Your age" />
                </div>
                <div class="form-group">
                    <label>Gender</label>
                    <input id="inputGender" type="text" value="${user.gender || ''}" placeholder="Your gender" />
                </div>
                <div class="form-group">
                    <label>Location</label>
                    <input id="inputLocation" type="text" value="${user.location || ''}" placeholder="Your location" />
                </div>
                <button class="btn btn--accent" onclick="saveProfile()">💾 Save Changes</button>
            </div>
        </div>
    `;
}

function buildUserProfile(user) {
    return `
        ${buildProfileHeader(user)}
        <div class="profile-stats profile-stats--user">
            <div class="profile-stat-card profile-stat-card--warm">
                <div class="profile-stat-card__icon">📄</div>
                <div class="profile-stat-card__number">${user.applications_count || 0}</div>
                <div class="profile-stat-card__label">Applied</div>
            </div>
            <div class="profile-stat-card profile-stat-card--cool">
                <div class="profile-stat-card__icon">🔖</div>
                <div class="profile-stat-card__number">${user.saved_count || 0}</div>
                <div class="profile-stat-card__label">Saved</div>
            </div>
        </div>
        ${buildEditForm(user)}
    `;
}

function buildAdminProfile(user) {
    return `
        ${buildProfileHeader(user)}
        <div class="profile-stats profile-stats--admin">
            <div class="profile-stat-card profile-stat-card--cool">
                <div class="profile-stat-card__icon">💼</div>
                <div class="profile-stat-card__number">${user.jobs_count || 0}</div>
                <div class="profile-stat-card__label">Total Jobs</div>
            </div>
            <div class="profile-stat-card profile-stat-card--amber">
                <div class="profile-stat-card__icon">📄</div>
                <div class="profile-stat-card__number">${user.applications_count || 0}</div>
                <div class="profile-stat-card__label">Applications</div>
            </div>
        </div>
        <div class="profile-section" style="margin-bottom:1.5rem;">
            <div class="profile-section__header"><span>⚡</span><h3 class="profile-section__title">Quick Actions</h3></div>
            <div class="quick-actions">
                <a href="/jobs/addjob/" class="quick-action-btn">➕ Add Job</a>
                <a href="/jobs/joblist/" class="quick-action-btn">📋 Jobs List</a>
                <a href="/jobs/dashboard/" class="quick-action-btn">📊 Dashboard</a>
            </div>
        </div>
        ${buildEditForm(user)}
    `;
}

async function init() {
    const res  = await fetch("/accounts/me/");
    const user = await res.json();

    if (!user.logged_in) {
        window.location.href = "/accounts/login/";
        return;
    }

    const content = document.getElementById('profileContent');
    if (user.role === 'admin') {
        content.innerHTML = buildAdminProfile(user);
    } else {
        content.innerHTML = buildUserProfile(user);
    }
}

document.addEventListener('DOMContentLoaded', init);