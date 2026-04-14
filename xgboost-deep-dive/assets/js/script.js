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

    // Scroll Progress Bar
    const progressBar = document.getElementById('progressBar');
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progressBar) progressBar.style.width = scrolled + "%";
    });

    // Reveal animations and Active Navigation Highlighting
    const sections = document.querySelectorAll('section.reveal');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        threshold: 0.2,
        rootMargin: "-10% 0px -20% 0px"
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Reveal section
                entry.target.classList.add('visible');

                // Update active link
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Individual reveal for top elements (headers/intro)
    const fadeElements = document.querySelectorAll('.reveal');
    fadeElements.forEach(el => sectionObserver.observe(el));
});
