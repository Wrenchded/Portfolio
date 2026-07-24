/* ==========================================================================
   Aditya Sarmalkar — Portfolio interactions
   Header condense · mobile nav · scroll reveals · active link · form UX
   ========================================================================== */

   document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Header condense on scroll ---------- */
    const header = document.querySelector('header');
    const onScroll = () => {
      if (window.scrollY > 24) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  
    /* ---------- Mobile burger menu ---------- */
    const burger = document.getElementById('burger-menu');
    const navLinks = document.getElementById('nav-links');
  
    if (burger && navLinks) {
      burger.addEventListener('click', () => {
        burger.classList.toggle('open');
        navLinks.classList.toggle('open');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
      });
  
      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          burger.classList.remove('open');
          navLinks.classList.remove('open');
          document.body.style.overflow = '';
        });
      });
    }
  
    /* ---------- Active nav link on scroll ---------- */
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a');
  
    const setActiveLink = () => {
      let current = '';
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
  
      sections.forEach(section => {
        if (scrollPos >= section.offsetTop) current = section.id;
      });
  
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
      });
    };
    setActiveLink();
    window.addEventListener('scroll', setActiveLink, { passive: true });
  
    /* ---------- Scroll reveal ---------- */
    const revealTargets = document.querySelectorAll('.reveal, .reveal-stagger');
  
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  
      revealTargets.forEach(el => io.observe(el));
    } else {
      revealTargets.forEach(el => el.classList.add('is-visible'));
    }
  
    /* ---------- Assign reveal classes to sections that don't have them inline ---------- */
    // (Kept separate from the markup so index.html never needed to change.)
    const autoReveal = [
      { selector: '#about .about-box', type: 'reveal' },
      { selector: '#skills .skills-list', type: 'reveal-stagger' },
      { selector: '#experience .experience-item', type: 'reveal' },
      { selector: '#projects .project-container', type: 'reveal-stagger' },
      { selector: '#contact #contact-form', type: 'reveal' },
    ];
  
    autoReveal.forEach(({ selector, type }) => {
      const el = document.querySelector(selector);
      if (el && !el.classList.contains('reveal') && !el.classList.contains('reveal-stagger')) {
        el.classList.add(type);
        if ('IntersectionObserver' in window) {
          const io2 = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
              }
            });
          }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
          io2.observe(el);
        } else {
          el.classList.add('is-visible');
        }
      }
    });
  
    /* ---------- Section heading reveal (h2 + eyebrow) ---------- */
    document.querySelectorAll('section .container > h2').forEach(h2 => {
      h2.classList.add('reveal');
      if ('IntersectionObserver' in window) {
        const io3 = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.2 });
        io3.observe(h2);
      } else {
        h2.classList.add('is-visible');
      }
    });
  
    /* ---------- Contact form: friendly inline confirmation (no backend) ---------- */
    const form = document.getElementById('contact-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.textContent;
        btn.textContent = 'Message sent ✓';
        btn.style.opacity = '0.85';
        btn.disabled = true;
        form.reset();
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.opacity = '';
          btn.disabled = false;
        }, 2600);
      });
    }
  
  });
