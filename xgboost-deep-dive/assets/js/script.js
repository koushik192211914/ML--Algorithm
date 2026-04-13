document.addEventListener('DOMContentLoaded', () => {
    // Theme Switch Logic
    const toggleSwitch = document.querySelector('#checkbox');
    const currentTheme = localStorage.getItem('theme');

    console.log('Theme toggle initialized. Current stored theme:', currentTheme);

    if (currentTheme) {
        if (currentTheme === 'light') {
            document.body.classList.add('light-mode');
            if (toggleSwitch) toggleSwitch.checked = true;
        } else {
            document.body.classList.remove('light-mode');
            if (toggleSwitch) toggleSwitch.checked = false;
        }
    }

    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', function () {
            console.log('Toggle changed. Checked:', this.checked);
            if (this.checked) {
                document.body.classList.add('light-mode');
                localStorage.setItem('theme', 'light');
            } else {
                document.body.classList.remove('light-mode');
                localStorage.setItem('theme', 'dark');
            }
        });
    } else {
        console.error('Theme toggle checkbox not found in the DOM.');
    }

    // Reveal animations on scroll
    const cards = document.querySelectorAll('.card');

    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });

    // Navigation hover effect
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.color = 'var(--accent-color)';
        });
        link.addEventListener('mouseleave', () => {
            if (!link.classList.contains('active')) {
                link.style.color = 'var(--text-color)';
            }
        });
    });
});
