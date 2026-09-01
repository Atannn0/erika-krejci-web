(function () {
  'use strict';

  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  /* Mobile navigation */
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen);
      navToggle.setAttribute('aria-label', isOpen ? 'Zavřít menu' : 'Otevřít menu');
    });

    nav.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Otevřít menu');
      });
    });

    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Otevřít menu');
      }
    });
  }

  /* Contact form: client-side validation & submission to Formspree */
  if (contactForm) {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const subjectField = document.getElementById('formSubject');

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const message = contactForm.message.value.trim();

      formStatus.textContent = '';
      formStatus.className = 'form-status';

      if (!name || !email || !message) {
        formStatus.textContent = 'Vyplňte prosím povinná pole (jméno, e-mail, zpráva).';
        formStatus.classList.add('form-status--error');
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        formStatus.textContent = 'Zadejte prosím platnou e-mailovou adresu.';
        formStatus.classList.add('form-status--error');
        return;
      }

      if (subjectField) {
        subjectField.value = 'Dotaz z webu od ' + name;
      }

      const formData = new FormData(contactForm);

      submitBtn.disabled = true;
      formStatus.textContent = 'Odesílání zprávy…';

      fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' }
      })
        .then(function (response) {
          if (response.ok) {
            formStatus.textContent = 'Děkujeme! Vaše zpráva byla úspěšně odeslána, brzy se ozveme.';
            formStatus.classList.add('form-status--success');
            contactForm.reset();
          } else {
            return response.json().then(function (data) {
              const detail = data && data.errors && data.errors.length
                ? data.errors.map(function (err) { return err.message; }).join(' ')
                : null;
              formStatus.textContent = detail || 'Zprávu se nepodařilo odeslat. Zkuste to prosím znovu nebo napište přímo na erika.havlasova@seznam.cz.';
              formStatus.classList.add('form-status--error');
            });
          }
        })
        .catch(function () {
          formStatus.textContent = 'Zprávu se nepodařilo odeslat. Zkontrolujte prosím připojení k internetu nebo napište přímo na erika.havlasova@seznam.cz.';
          formStatus.classList.add('form-status--error');
        })
        .finally(function () {
          submitBtn.disabled = false;
        });
    });
  }

  /* Info modal: detailní popis služeb a workshopů */
  const modalContent = {
    sps: {
      title: 'Spirální stabilizace SPS',
      body: [
        'Ve svých cvičebních jednotkách používám metodu SM systém, kterou vytvořil MUDr. Richard Smíšek. Mám s ní dlouholeté zkušenosti. Metoda protahuje a posiluje tělo a zároveň ukládá do centrální nervové soustavy správné pohybové stereotypy, pokud se cvičí správně a pravidelně.',
        'Spirální svalové řetězce zajišťují stabilizaci pohybu, vertikální svalové řetězce stabilizaci klidu. Cvičení spirální stabilizace protahuje tělo i páteř směrem vzhůru a umožňuje nacvičit stabilní chůzi, což je pro každého jedince velmi důležité.',
        'Cvičení je vhodné pro každého pod odborným vedením. Vedu ho výhradně individuálně, včetně poradenství, a cviky volím přímo na míru podle aktuálního stavu klienta.'
      ]
    },
    cviceni: {
      title: 'Zdravotně-kompenzační cvičení',
      body: [
        'Používám různá zdravotní cvičení podle stanovené diagnózy. Cvičím s pomůckami i bez nich, nacvičujeme správnou koordinaci těla, mimo jiné pomocí efektu zrcadla.',
        'Z pomůcek využívám například lana SPS, balanční podložky, propriodestičky, bosu, thera pásy, overbally, fitbally, flexi bar, facilitační míčky, ježky, bloky nebo pilates válce.',
        'Naučíte se správné pohybové návyky, odstraníte dysbalance i nevhodné pohybové stereotypy. Důležitou součástí je i cvičení s váhou vlastního těla. Vhodné pro každého, kdo chce na svém těle něco změnit.'
      ]
    },
    manualni: {
      title: 'Manuální techniky a lymfodrenáž',
      body: [
        'Manuální techniky slouží k odborné anatomické masáži, která cíleně uvolní svalové spasmy, triggerpointy, tenderpointy, měkké tkáně i blokády páteře. Využívám k tomu speciální trakční pásy, odborné techniky a pomůcky.',
        'Cílem je zlepšit funkci pohybového aparátu, aby mohl normálně fungovat. Zaměřuji se také na zjizvené tkáně po operacích a porodu, a to u klientů všech věkových kategorií.'
      ]
    },
    diagnostika: {
      title: 'Diagnostika a poradenství',
      body: [
        'Na začátku spolupráce vždy provádím vstupní vyšetření pohybového aparátu. Na jeho základě navrhnu individuální doporučení a sestavím cvičení přesně podle vaší diagnózy a aktuálního stavu.',
        'Poradenství se týká mimo jiné vadného držení těla, skoliózy, výhřezu ploténky, plochonoží, diastázy a poruch pánevního dna, potíží kolen a kyčlí i těhotenství a stavů po porodu nebo císařském řezu.'
      ]
    },
    autogenni: {
      title: 'Autogenní trénink',
      body: [
        'Autogenní trénink je relaxační technika, která pomáhá zvládat stres a napětí současné uspěchané doby. Vede k hlubokému uvolnění těla i mysli a naučíte se ho používat samostatně i v běžném životě.',
        'Vycházím ze svého certifikovaného kurzu relaxačně symbolické techniky a nejvyššího stupně autogenního tréninku, který spadá pod Asociaci psychiatrické společnosti v ČR.'
      ]
    },
    pamet: {
      title: 'Paměťové techniky',
      body: [
        'Na workshopu se naučíte praktické paměťové techniky, které využijete v běžném životě i v profesním rozvoji. Jsou vhodné pro každý věk a představují skvělou prevenci úbytku kognitivních funkcí ve vyšším věku.',
        'Vzdělání v této oblasti jsem získala jako aktivizační pracovnice v rámci akreditovaného výcviku Asociace paměti.'
      ]
    },
    organizace: {
      title: 'Workshop pro vaši organizaci',
      body: [
        'Ráda připravím přednášku nebo workshop na míru pro školu, firmu, spolek či jinou organizaci. Podobně jsem spolupracovala například v rámci projektu Dny zdraví s městskou částí Kolovraty nebo na pravidelné Kavárně pro seniory v Praze Chabrech.',
        'Obsah workshopu vždy přizpůsobím věku a potřebám konkrétní skupiny. Ozvěte se mi a domluvíme se na podrobnostech.'
      ]
    }
  };

  const modal = document.getElementById('infoModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  let lastFocusedElement = null;

  function openModal(id) {
    const data = modalContent[id];
    if (!modal || !data) return;

    modalTitle.textContent = data.title;
    modalBody.innerHTML = data.body.map(function (paragraph) {
      return '<p>' + paragraph + '</p>';
    }).join('');

    lastFocusedElement = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    modal.querySelector('.modal__close').focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = '';
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  document.querySelectorAll('[data-modal]').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      openModal(trigger.getAttribute('data-modal'));
    });
  });

  if (modal) {
    modal.querySelectorAll('[data-modal-close]').forEach(function (closer) {
      closer.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.hidden) closeModal();
    });
  }

  /* Cookie souhlas: mapa Google se načte, jen pokud uživatel udělí souhlas */
  const COOKIE_KEY = 'ek_cookie_consent';
  const cookieBanner = document.getElementById('cookieBanner');
  const cookieAccept = document.getElementById('cookieAccept');
  const cookieReject = document.getElementById('cookieReject');
  const cookieSettingsLink = document.getElementById('cookieSettingsLink');
  const mapContainer = document.getElementById('contactMap');
  const mapConsentBtn = document.getElementById('contactMapConsentBtn');

  function loadMap() {
    if (!mapContainer || mapContainer.querySelector('iframe')) return;
    const src = mapContainer.getAttribute('data-map-src');
    if (!src) return;
    const iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.title = mapContainer.getAttribute('data-map-title') || 'Mapa';
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.allowFullscreen = true;
    mapContainer.innerHTML = '';
    mapContainer.appendChild(iframe);
  }

  function hideBanner() {
    if (cookieBanner) cookieBanner.hidden = true;
  }

  function showBanner() {
    if (cookieBanner) cookieBanner.hidden = false;
  }

  function applyConsent(consent) {
    hideBanner();
    if (consent === 'accepted') loadMap();
  }

  const savedConsent = localStorage.getItem(COOKIE_KEY);
  if (savedConsent) {
    applyConsent(savedConsent);
  } else {
    showBanner();
  }

  if (cookieAccept) {
    cookieAccept.addEventListener('click', function () {
      localStorage.setItem(COOKIE_KEY, 'accepted');
      applyConsent('accepted');
    });
  }

  if (cookieReject) {
    cookieReject.addEventListener('click', function () {
      localStorage.setItem(COOKIE_KEY, 'rejected');
      applyConsent('rejected');
    });
  }

  if (cookieSettingsLink) {
    cookieSettingsLink.addEventListener('click', showBanner);
  }

  if (mapConsentBtn) {
    mapConsentBtn.addEventListener('click', function () {
      localStorage.setItem(COOKIE_KEY, 'accepted');
      hideBanner();
      loadMap();
    });
  }
})();
