document.addEventListener('DOMContentLoaded', () => {
    // Splash Screen Logic
    const splashScreen = document.getElementById('splash-screen');
    document.body.classList.add('splash-active');

    // Hide splash screen after 1.5s or on window load (whichever is slower for safety)
    const hideSplash = () => {
        if (splashScreen) {
            splashScreen.classList.add('fade-out');
            document.body.classList.remove('splash-active');
            // Remove from DOM after animation
            setTimeout(() => {
                splashScreen.remove();
            }, 800);
        }
    };

    window.addEventListener('load', () => {
        setTimeout(hideSplash, 1000); // Small grace period
    });

    // Failsafe hiding
    setTimeout(hideSplash, 3000);

    document.body.classList.add('js-ready');
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
    const revealElements = document.querySelectorAll('.reveal');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        threshold: 0.1, // More lenient threshold
        rootMargin: "0px 0px -50px 0px" // Only trigger when slightly entering from bottom
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Reveal section
                entry.target.classList.add('visible');

                // Update active link if the element is a section
                if (entry.target.tagName === 'SECTION') {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        sectionObserver.observe(el);
    });

    // Failsafe: Reveal all if not triggered within 2 seconds
    setTimeout(() => {
        revealElements.forEach(el => {
            if (!el.classList.contains('visible')) {
                el.classList.add('visible');
                console.log('Failsafe triggered for:', el);
            }
        });
    }, 2000);
});
