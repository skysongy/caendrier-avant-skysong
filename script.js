// --- Configuration ---
// Nom des fichiers audio attendus (place les mp3 dans /audio/)
// day01.mp3 ... day24.mp3
const AUDIO_PATH = "audio/"; // dossier audio à la racine du repo
const AUDIO_FILENAME = 👎 => day${String(n).padStart(2,'0')}.mp3;

// Titres / messages pour chaque jour — personnalise ces textes
const messages = [
  "Jour 1 — Un premier souffle. Écoute.", 
  "Jour 2 — Pour toi, une mélodie douce.",
  "Jour 3 — Quand le ciel devient musique.",
  "Jour 4 — Chanson pour les soirs d'hiver.",
  "Jour 5 — Un écho d'espoir.",
  "Jour 6 — Rêves en bleu.",
  "Jour 7 — Lumière d'étoile.",
  "Jour 8 — Souvenir doré.",
  "Jour 9 — Frisson tranquille.",
  "Jour 10 — Petite prière en musique.",
  "Jour 11 — Pour sourire encore.",
  "Jour 12 — Milieu du chemin, message d'amour.",
  "Jour 13 — La nuit murmure.",
  "Jour 14 — Réchauffe-toi au son.",
  "Jour 15 — Promesse en accords.",
  "Jour 16 — Étreinte sonore.",
  "Jour 17 — Mélancolie qui soigne.",
  "Jour 18 — Un pas vers la paix.",
  "Jour 19 — Brise et étoiles.",
  "Jour 20 — Avant-goût de Noël.",
  "Jour 21 — Soupir d'or.",
  "Jour 22 — Presque là.",
  "Jour 23 — Dernières préparations.",
  "Jour 24 — Cadeau : écoute et respire."
];

// --- Code ---
const grid = document.getElementById('grid');

function isPreviewMode(){
  try{
    return new URLSearchParams(location.search).get('preview') === 'true';
  }catch(e){ return false; }
}

// retourne vrai si le jour (1-24) est accessible
function isDayAccessible(day){
  if(isPreviewMode()) return true;
  const now = new Date();
  const year = now.getFullYear();
  // On considère le calendrier de l'Avent du même année, mois 11 = décembre (JS: months 0-indexed)
  const today = new Date(year, 11, now.getDate());
  const target = new Date(year, 11, day);
  // accessible si la date actuelle est >= jour demandé
  return today >= target;
}

function createCard(day){
  const card = document.createElement('article');
  card.className = 'card';
  const top = document.createElement('div');
  top.className = 'top';

  const num = document.createElement('div');
  num.className = 'day-num';
  num.textContent = day;

  const lock = document.createElement('div');
  lock.className = 'lock';
  lock.textContent = isDayAccessible(day) ? '' : '🔒';

  top.appendChild(num);
  top.appendChild(lock);

  const msg = document.createElement('div');
  msg.className = 'message';
  msg.textContent = messages[day-1] || Jour ${day};

  // Player
  const player = document.createElement('div');
  player.className = 'player';

  const audio = document.createElement('audio');
  audio.src = AUDIO_PATH + AUDIO_FILENAME(day);
  audio.preload = 'none';
  audio.controls = true;
  audio.style.width = '100%';

  const title = document.createElement('div');
  title.className = 'audio-title';
  title.textContent = Morceau du jour ${day};

  const btn = document.createElement('button');
  btn.className = 'play-btn';
  btn.textContent = 'Écouter';
  btn.onclick = () => {
    // play/pause simple
    if(audio.paused) { audio.play(); btn.textContent = 'Pause'; }
    else { audio.pause(); btn.textContent = 'Écouter'; }
  };

  player.appendChild(btn);
  player.appendChild(title);

  // assemble
  card.appendChild(top);
  card.appendChild(msg);

  // si accessible on montre le player
  if(isDayAccessible(day)){
    card.appendChild(player);
    // ajoute aussi l'élément audio (visuel via controls)
    card.appendChild(audio);
  } else {
    const overlay = document.createElement('div');
    overlay.className = 'locked-overlay';
    overlay.textContent = Accessible le ${day} décembre;
    card.appendChild(overlay);
  }

  return card;
}

function buildGrid(){
  for(let d=1; d<=24; d++){
    const card = createCard(d);
    grid.appendChild(card);
  }
}

// initialisation
buildGrid();
