// Navigation Functions
// Fonction générique pour naviguer vers la bonne version (FR ou EN)
function navigateTo(pageName) {
    const isFr = window.location.pathname.includes('_fr.html');
    window.location.href = pageName + (isFr ? '_fr.html' : '.html');
}

function function_about_me() { navigateTo("about_me"); }
function function_home() { navigateTo("index"); }
function function_contacts() { navigateTo("contacts"); }
function function_experience() { navigateTo("experience"); }
function function_mobility() { navigateTo("mobility"); }
function function_skills() { navigateTo("skills"); }
function function_projects() { navigateTo("projects"); }
function function_career_management() { navigateTo("about_me"); }
function function_activities() { navigateTo("activities_suite"); }

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

    // Création dynamique du modal s'il n'existe pas (pour les pages autres que Mobilité)
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "imageModal";
        modal.className = "image-modal";
        modal.innerHTML = '<span class="close-modal" onclick="closeModal()">&times;</span><img class="image-modal-content" id="modalImg">';
        document.body.appendChild(modal);
        modalImg = document.getElementById("modalImg");
        modal.onclick = function(e) { if(e.target === modal) closeModal(); };
    }

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
    // --- Language Button Management ---
    updateLangButton();

    // --- TypeWriter Effect (Generic) ---
    const typeWriterElement = document.getElementById('typing-text');
    if (typeWriterElement) {
        const text = typeWriterElement.getAttribute('data-text') || "";
        let i = 0;
        typeWriterElement.innerHTML = ""; // Clear content initially
        
        function typeWriter() {
            if (i < text.length) {
                typeWriterElement.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        typeWriter();
    }

    // --- Footer Year ---
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

    // --- Scroll Reveal Animation ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Déclenche l'animation quand 10% de l'élément est visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // L'animation ne se joue qu'une fois
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    // --- Automatic Skills Progress Bars ---
    // Met à jour la largeur de la barre en fonction du texte (ex: "60%")
    const skillBoxes = document.querySelectorAll('.skill_box');
    skillBoxes.forEach(box => {
        const percentageElement = box.querySelector('.skill_title span:last-child');
        const barElement = box.querySelector('.skill_per');
        
        if (percentageElement && barElement) {
            const targetText = percentageElement.textContent.trim();
            const targetValue = parseInt(targetText);

            // Applique la largeur pour l'animation CSS
            barElement.style.width = targetText;

            // Animation du compteur (ex: 0% -> 60%)
            if (!isNaN(targetValue)) {
                let startTimestamp = null;
                const duration = 1500; // 1.5s pour correspondre à l'animation CSS

                const step = (timestamp) => {
                    if (!startTimestamp) startTimestamp = timestamp;
                    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                    const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease-out cubic pour un effet naturel
                    
                    const currentValue = Math.floor(easeProgress * targetValue);
                    percentageElement.textContent = currentValue + "%";

                    if (progress < 1) {
                        window.requestAnimationFrame(step);
                    } else {
                        percentageElement.textContent = targetText; // S'assure de la valeur finale exacte
                    }
                };
                window.requestAnimationFrame(step);
            }
        }
    });

    // --- Civic Engagement Images Click Event ---
    const civicImages = document.querySelectorAll('.civic_image_wrapper img');
    civicImages.forEach(img => {
        img.addEventListener('click', function() {
            openModal(this);
        });
    });

    // Add icons to courses automatically
    addCourseIcons();
});

// --- Language Management ---
function toggleLanguage() {
    const currentPath = window.location.pathname;
    const filename = currentPath.split('/').pop();
    let newFilename;

    if (filename.includes('_fr.html')) {
        // Passer en Anglais
        newFilename = filename.replace('_fr.html', '.html');
        localStorage.setItem('lang', 'en');
    } else {
        // Passer en Français
        let base = filename.replace('.html', '');
        if (!base) base = 'index'; // Cas racine
        newFilename = base + '_fr.html';
        localStorage.setItem('lang', 'fr');
    }
    window.location.href = newFilename;
}

function updateLangButton() {
    const btn = document.querySelector('.lang-toggle');
    if (!btn) return;
    
    // Si on est sur une page FR, le bouton propose l'anglais, et inversement
    const isFr = window.location.pathname.includes('_fr.html');
    btn.textContent = isFr ? 'English' : 'Français';
}

// --- Automatic Course Icons ---
function addCourseIcons() {
    const courses = document.querySelectorAll('.skills_skills details ul li');
    
    const iconMap = {
        // Networks & Telecom
        'network': 'fa-network-wired', 'réseau': 'fa-network-wired',
        'interconnexion': 'fa-network-wired', 'interconnection': 'fa-network-wired',
        'telecom': 'fa-satellite-dish', 'télécom': 'fa-satellite-dish',
        'wireless': 'fa-wifi', 'sans fil': 'fa-wifi', 'mobile': 'fa-mobile-screen',
        'signal': 'fa-wave-square', 'ofdm': 'fa-wave-square', 'physique': 'fa-microchip', 'physical': 'fa-microchip',
        'internet': 'fa-globe', 'web': 'fa-globe',
        
        // Programming & CS
        'program': 'fa-code', 'code': 'fa-code', 'coding': 'fa-code', 'codage': 'fa-code',
        'java': 'fa-java', 'objet': 'fa-cubes', 'object': 'fa-cubes',
        'system': 'fa-server', 'système': 'fa-server', 'os': 'fa-server', 'linux': 'fa-linux',
        'data': 'fa-database', 'donnée': 'fa-database',
        'architecture': 'fa-microchip', 'concurrent': 'fa-arrows-split-up-and-left',
        'security': 'fa-shield-halved', 'sécurité': 'fa-shield-halved',
        
        // Math & Science
        'math': 'fa-calculator', 'calcul': 'fa-calculator', 'algebra': 'fa-calculator',
        'analysis': 'fa-chart-line', 'analyse': 'fa-chart-line',
        'probabilit': 'fa-dice', 'statistic': 'fa-chart-pie', 'statistique': 'fa-chart-pie',
        'graph': 'fa-circle-nodes', 'graphe': 'fa-circle-nodes',
        'model': 'fa-project-diagram', 'modélisation': 'fa-project-diagram',
        'control': 'fa-gears', 'automatique': 'fa-gears', 'learning': 'fa-brain', 'apprentissage': 'fa-brain',
        'optimization': 'fa-arrow-trend-up', 'optimisation': 'fa-arrow-trend-up',
        
        // Soft Skills / Management
        'management': 'fa-people-group', 'gestion': 'fa-people-group',
        'english': 'fa-language', 'anglais': 'fa-language',
        'project': 'fa-list-check', 'projet': 'fa-list-check'
    };

    courses.forEach(li => {
        const text = li.textContent.toLowerCase();
        let iconClass = 'fa-book-open'; // Default icon

        for (const [key, value] of Object.entries(iconMap)) {
            if (text.includes(key)) {
                iconClass = value;
                break;
            }
        }

        const icon = document.createElement('i');
        // Check if it's a brand icon
        if (['fa-java', 'fa-linux', 'fa-html5', 'fa-python'].includes(iconClass)) {
            icon.className = `fa-brands ${iconClass}`;
        } else {
            icon.className = `fa-solid ${iconClass}`;
        }
        
        icon.style.marginRight = '12px';
        icon.style.color = 'cadetblue';
        icon.style.width = '20px'; // Fixed width for alignment
        icon.style.textAlign = 'center';

        li.prepend(icon);
    });
}