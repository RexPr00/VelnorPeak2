
(() => {
  const body = document.body;
  const focusableSel = 'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

  const trapFocus = (container, e) => {
    const f = [...container.querySelectorAll(focusableSel)].filter(el => el.offsetParent !== null);
    if (!f.length || e.key !== 'Tab') return;
    const first = f[0];
    const last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  document.querySelectorAll('[data-dropdown]').forEach(drop => {
    const btn = drop.querySelector('.active-lang');
    btn?.addEventListener('click', (e) => {
      e.stopPropagation();
      drop.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(drop.classList.contains('open')));
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('[data-dropdown]').forEach(drop => {
      drop.classList.remove('open');
      drop.querySelector('.active-lang')?.setAttribute('aria-expanded', 'false');
    });
  });

  const drawer = document.querySelector('.mobile-drawer');
  const drawerContent = drawer?.querySelector('.drawer-content');
  const burger = document.querySelector('.burger');
  const closeDrawerBtn = drawer?.querySelector('.drawer-close');

  const closeDrawer = () => {
    if (!drawer) return;
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    burger?.setAttribute('aria-expanded', 'false');
    body.classList.remove('no-scroll');
  };

  const openDrawer = () => {
    if (!drawer) return;
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    burger?.setAttribute('aria-expanded', 'true');
    body.classList.add('no-scroll');
    drawerContent?.querySelector('a,button')?.focus();
  };

  burger?.addEventListener('click', openDrawer);
  closeDrawerBtn?.addEventListener('click', closeDrawer);
  drawer?.addEventListener('click', (e) => {
    if (e.target === drawer) closeDrawer();
  });

  const privacyModal = document.querySelector('.privacy-modal');
  const privacyPanel = privacyModal?.querySelector('.privacy-panel');

  const closePrivacy = () => {
    if (!privacyModal) return;
    privacyModal.classList.remove('open');
    privacyModal.setAttribute('aria-hidden', 'true');
    body.classList.remove('no-scroll');
  };

  const openPrivacy = () => {
    if (!privacyModal) return;
    privacyModal.classList.add('open');
    privacyModal.setAttribute('aria-hidden', 'false');
    body.classList.add('no-scroll');
    privacyPanel?.querySelector('button')?.focus();
  };

  document.querySelectorAll('[data-open-privacy]').forEach(btn => btn.addEventListener('click', openPrivacy));
  document.querySelectorAll('[data-close-privacy]').forEach(btn => btn.addEventListener('click', closePrivacy));
  privacyModal?.addEventListener('click', (e) => {
    if (e.target === privacyModal) closePrivacy();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
      closePrivacy();
      document.querySelectorAll('[data-dropdown]').forEach(drop => drop.classList.remove('open'));
    }
    if (drawer?.classList.contains('open')) trapFocus(drawerContent, e);
    if (privacyModal?.classList.contains('open')) trapFocus(privacyPanel, e);
  });

  document.querySelectorAll('.drawer-nav a').forEach(link => link.addEventListener('click', closeDrawer));

  const faqItems = [...document.querySelectorAll('.faq-item')];
  faqItems.forEach(item => {
    item.querySelector('.faq-question')?.addEventListener('click', () => {
      faqItems.forEach(other => {
        const isActive = other === item && !other.classList.contains('open');
        other.classList.toggle('open', isActive);
        other.querySelector('.faq-question')?.setAttribute('aria-expanded', String(isActive));
      });
    });
  });

  document.querySelectorAll('.lead-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = form.querySelector('.success-message');
      if (msg) msg.textContent = 'Success. After you sign up, you get instant access to the next steps.';
      form.reset();
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();
