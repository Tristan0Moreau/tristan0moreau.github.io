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
        showNotification(copyText.value + " a été copié !");
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

// Footer: Copy Email
function copyFooterEmail(event) {
    event.preventDefault();
    var email = "tristan.moreau@etu.inp-n7.fr";
    navigator.clipboard.writeText(email);
    showNotification(email + " a été copié !");
}

// Fonction pour afficher une notification stylisée
function showNotification(message) {
    var notification = document.getElementById("custom-notification");
    
    // Créer l'élément s'il n'existe pas encore
    if (!notification) {
        notification = document.createElement("div");
        notification.id = "custom-notification";
        // Styles CSS appliqués directement en JS
        Object.assign(notification.style, {
            position: "fixed",
            bottom: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#333",
            color: "#fff",
            padding: "12px 24px",
            borderRadius: "50px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            zIndex: "10000",
            opacity: "0",
            transition: "opacity 0.3s ease",
            fontFamily: "'Roboto', sans-serif",
            fontSize: "14px",
            pointerEvents: "none" // Permet de cliquer au travers
        });
        document.body.appendChild(notification);
    }

    notification.textContent = message;
    
    // Afficher
    setTimeout(function() { notification.style.opacity = "1"; }, 10);

    // Masquer après 3 secondes
    setTimeout(function() {
        notification.style.opacity = "0";
    }, 3000);
}

// Update Year and Age automatically
document.addEventListener("DOMContentLoaded", function() {
    var yearSpan = document.getElementById("current-year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    var ageSpan = document.getElementById("my-age");
    if (ageSpan) {
        var birthDate = new Date(2004, 0, 26); // 26 Janvier 2004
        var today = new Date();
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        ageSpan.textContent = age;
    }
});