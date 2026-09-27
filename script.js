const openInvitation = document.querySelector('#openInvitation');
const rsvpOpen = document.querySelector('#rsvpOpen');
const dialog = document.querySelector('#rsvpDialog');
const closeDialog = document.querySelector('#rsvpClose');
const form = document.querySelector('#rsvpForm');
const formNote = document.querySelector('#formNote');
const musicToggle = document.querySelector('#musicToggle');
const homeLinks = document.querySelectorAll('a[href="#home"]');
const coupleDialog = document.querySelector('#coupleDialog');
const coupleClose = document.querySelector('#coupleClose');
const coupleDialogRole = document.querySelector('#coupleDialogRole');
const coupleDialogName = document.querySelector('#coupleDialogName');
const coupleDialogCopy = document.querySelector('#coupleDialogCopy');
const coupleButtons = document.querySelectorAll('[data-person]');

const coupleDetails = {
  rakesh: {
    role: 'The groom',
    name: 'Rakesh',
    copy: 'Rakesh brings a calm heart, a kind spirit, and a lifetime of memories waiting to be made with Nourin.'
  },
  nourin: {
    role: 'The bride',
    name: 'Nourin',
    copy: 'Nourin brings warmth, grace, and a joy that makes every ordinary moment feel like a celebration.'
  }
};

openInvitation.addEventListener('click', () => {
  document.body.classList.add('invitation-opened');
  document.querySelector('#story').scrollIntoView({ behavior: 'smooth' });
});

homeLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    document.body.classList.remove('invitation-opened');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
rsvpOpen.addEventListener('click', () => dialog.showModal());
closeDialog.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
coupleButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const details = coupleDetails[button.dataset.person];
    coupleDialogRole.textContent = details.role;
    coupleDialogName.textContent = details.name;
    coupleDialogCopy.textContent = details.copy;
    coupleDialog.showModal();
  });
});
coupleClose.addEventListener('click', () => coupleDialog.close());
coupleDialog.addEventListener('click', (event) => { if (event.target === coupleDialog) coupleDialog.close(); });
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = new FormData(form).get('name');
  formNote.textContent = `Thank you, ${name}. Your RSVP is on its way to us.`;
  form.reset();
});
musicToggle.addEventListener('click', () => {
  const active = musicToggle.classList.toggle('playing');
  musicToggle.setAttribute('aria-pressed', String(active));
});

const weddingDate = new Date('2026-10-23T13:00:00+05:30');
const countdownUnits = {
  days: document.querySelector('[data-unit="days"]'),
  hours: document.querySelector('[data-unit="hours"]'),
  minutes: document.querySelector('[data-unit="minutes"]'),
  seconds: document.querySelector('[data-unit="seconds"]')
};

function updateCountdown() {
  const difference = Math.max(0, weddingDate - new Date());
  const days = Math.floor(difference / 86400000);
  const hours = Math.floor((difference / 3600000) % 24);
  const minutes = Math.floor((difference / 60000) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  countdownUnits.days.textContent = String(days).padStart(2, '0');
  countdownUnits.hours.textContent = String(hours).padStart(2, '0');
  countdownUnits.minutes.textContent = String(minutes).padStart(2, '0');
  countdownUnits.seconds.textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

const sections = document.querySelectorAll('.section-pad');
const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) entry.target.classList.add('in-view');
}), { threshold: 0.12 });
sections.forEach((section) => observer.observe(section));
