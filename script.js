// Navigation Functions
function function_about_me() { window.location = "about_me.html"; }
function function_home() { window.location = "index.html"; }
function function_contacts() { window.location = "contacts.html"; }
function function_experience() { window.location = "experience.html"; }
function function_mobility() { window.location = "mobility.html"; }
function function_skills() { window.location = "skills.html"; }
function function_projects() { window.location = "projects.html"; }
function function_career_management() { window.location = "about_me.html"; }
function function_activities() { window.location = "activities_suite.html"; }

// Theme Management
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    var btn = document.querySelector('.theme-toggle');
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        btn.textContent = '☀️';
    } else {
        localStorage.setItem('theme', 'light');
        btn.textContent = '🌙';
    }
}

// Apply theme on load
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    var btn = document.querySelector('.theme-toggle');
    if (btn) btn.textContent = '☀️';
}

// Scroll to Top Button
window.onscroll = function() {
    var btn = document.querySelector('.cornerbutton');
    if (btn) {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            btn.style.display = "block";
        } else {
            btn.style.display = "none";
        }
    }
};

// Contact Page: Copy to Clipboard
function myFunction() {
    var copyText = document.getElementById("myInput");
    if (copyText) {
        navigator.clipboard.writeText(copyText.value);
        alert(copyText.value + " has been copied");
    }
}

// Mobility Page: Modal (Lightbox)
function openModal(element) {
    var modal = document.getElementById("imageModal");
    var modalImg = document.getElementById("modalImg");
    if (modal && modalImg) {
        modal.style.display = "block";
        modalImg.src = element.src;
    }
}
function closeModal() {
    var modal = document.getElementById("imageModal");
    if (modal) modal.style.display = "none";
}