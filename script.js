const philosophers = [
  {
    name: "Zeno of Citium",
    quote: "Man conquers the world by conquering himself.",
    url: "https://en.wikipedia.org/wiki/Zeno_of_Citium",
    x: 5, y: 40
  },
  {
    name: "Epicurus",
    quote: "Death does not concern us, because as long as we exist, death is not here. And once it does come, we no longer exist.",
    url: "https://en.wikipedia.org/wiki/Epicurus",
    x: 17, y: 60
  },
  {
    name: "Boethius",
    quote: "Nothing is miserable unless you think it so; and on the other hand, nothing brings happiness unless you are content with it.",
    url: "https://en.wikipedia.org/wiki/Boethius",
    x: 19, y: 69
  },
  {
    name: "Averroes",
    quote: "Knowledge is the conformity of the object and the intellect.",
    url: "https://en.wikipedia.org/wiki/Averroes",
    x: 24, y: 61
  },
  {
    name: "Apollo",
    quote: "Know thyself.",
    url: "https://en.wikipedia.org/wiki/Apollo",
    x: 23, y: 25
  },
  {
    name: "Pythagoras",
    quote: "There is geometry in the humming of the strings, there is music in the spacing of the spheres.",
    url: "https://en.wikipedia.org/wiki/Pythagoras",
    x: 26, y: 68
  },
  {
    name: "Alexander the Great",
    quote: "There is nothing impossible to him who will try.",
    url: "https://en.wikipedia.org/wiki/Alexander_the_Great",
    x: 28, y: 50
  },
  {
    name: "Telauges",
    quote: "The soul is purified by the practice of virtue and the contemplation of truth.",
    url: "https://en.wikipedia.org/wiki/Telauges",
    x: 30, y: 68
  },
  {
    name: "Hypatia",
    quote: "Reserve your right to think, for even to think wrongly is better than not to think at all.",
    url: "https://en.wikipedia.org/wiki/Hypatia",
    x: 31, y: 60
  },
  {
    name: "Antisthenes",
    quote: "The most useful piece of learning for the uses of life is to unlearn what is untrue.",
    url: "https://en.wikipedia.org/wiki/Antisthenes",
    x: 30, y: 50
  },
  {
    name: "Parmenides",
    quote: "What is, is. What is not, is not. You cannot know what is not, nor can you express it.",
    url: "https://en.wikipedia.org/wiki/Parmenides",
    x: 35, y: 60
  },
  {
    name: "Aeschines",
    quote: "The wise learn many things from their enemies.",
    url: "https://en.wikipedia.org/wiki/Aeschines",
    x: 33, y: 50
  },
  {
    name: "Socrates",
    quote: "The unexamined life is not worth living.",
    url: "https://en.wikipedia.org/wiki/Socrates",
    x: 37, y: 50
  },
  {
    name: "Heraclitus",
    quote: "No man ever steps in the same river twice, for it is not the same river and he is not the same man.",
    url: "https://en.wikipedia.org/wiki/Heraclitus",
    x: 44, y: 69
  },
  {
    name: "Plato",
    quote: "Be kind, for everyone you meet is fighting a hard battle.",
    url: "https://en.wikipedia.org/wiki/Plato",
    x: 49, y: 50
  },
  {
    name: "Aristotle",
    quote: "It is the mark of an educated mind to be able to entertain a thought without accepting it.",
    url: "https://en.wikipedia.org/wiki/Aristotle",
    x: 53, y: 50
  },
  {
    name: "Diogenes",
    quote: "I am a citizen of the world.",
    url: "https://en.wikipedia.org/wiki/Diogenes",
    x: 58, y: 65
  },
  {
    name: "Euclid",
    quote: "The laws of nature are but the mathematical thoughts of God.",
    url: "https://en.wikipedia.org/wiki/Euclid",
    x: 82, y: 69
  },
  {
    name: "Minerva",
    quote: "Wisdom begins in wonder.",
    url: "https://en.wikipedia.org/wiki/Minerva",
    x: 79, y: 27
  },
  {
    name: "Zoroaster",
    quote: "Doing good to others is not a duty. It is a joy, for it increases your own health and happiness.",
    url: "https://en.wikipedia.org/wiki/Zoroaster",
    x: 87, y: 61
  },
  {
    name: "Ptolemy",
    quote: "I know that I am mortal by nature and ephemeral, but when I trace the wandering paths of the stars I no longer touch the earth with my feet.",
    url: "https://en.wikipedia.org/wiki/Ptolemy",
    x: 88, y: 63
  },
  {
    name: "Il Sodoma",
    quote: "Art is the stored honey of the human soul.",
    url: "https://en.wikipedia.org/wiki/Il_Sodoma",
    x: 91, y: 61
  },
  {
    name: "Plotinus",
    quote: "Knowledge has three degrees — opinion, science, illumination.",
    url: "https://en.wikipedia.org/wiki/Plotinus",
    x: 82, y: 51
  },
  {
    name: "Raphael",
    quote: "When one is painting one does not think.",
    url: "https://en.wikipedia.org/wiki/Raphael",
    x: 90, y: 60
  },
  {
    name: "Cleanthes",
    quote: "Lead me, O Zeus, and thou, O Destiny — the post to which you have assigned me, I shall follow without hesitation.",
    url: "https://en.wikipedia.org/wiki/Cleanthes",
    x: 88, y: 51
  }
];


/* ── DOM references ────────────────────────────── */

const img             = document.querySelector('#scene img');
const landing         = document.getElementById('landing');
const highlight       = document.getElementById('highlight');
const bubble          = document.getElementById('bubble');
const philosopherName = document.getElementById('philosopher-name');
const quoteEl         = document.getElementById('quote');
const wikiLink        = document.getElementById('wiki-link');
const progress        = document.getElementById('progress');
const progressCurrent = document.getElementById('progress-current');
const progressFill    = document.getElementById('progress-fill');


/* ── State ─────────────────────────────────────── */

let lastIndex       = -1;
let landingVisible   = true;
let isFirstReveal    = true;

/* Apply landing-active class on load for dimmed painting */
document.body.classList.add('landing-active');


/* ── Convert image-% to viewport pixels ──────────
   Accounts for object-fit: cover cropping/scaling */

function imgToViewport(imgPctX, imgPctY) {
  const vw   = window.innerWidth;
  const vh   = window.innerHeight;
  const natW = img.naturalWidth  || 1;
  const natH = img.naturalHeight || 1;

  const imgRatio = natW / natH;
  const vpRatio  = vw / vh;

  let scale, offsetX, offsetY;

  if (vpRatio > imgRatio) {
    /* Viewport wider than image → scale to width, crop top/bottom */
    scale   = vw / natW;
    offsetX = 0;
    offsetY = (vh - natH * scale) / 2;
  } else {
    /* Viewport taller than image → scale to height, crop left/right */
    scale   = vh / natH;
    offsetX = (vw - natW * scale) / 2;
    offsetY = 0;
  }

  return {
    x: offsetX + (imgPctX / 100) * natW * scale,
    y: offsetY + (imgPctY / 100) * natH * scale
  };
}


/* ── Position the highlight oval ────────────────── */

function positionHighlight(phil) {
  var pos = imgToViewport(phil.x, phil.y);
  highlight.style.left = (pos.x - 55) + 'px';   /* 55 = half of 110px width  */
  highlight.style.top  = (pos.y - 80) + 'px';    /* 80 = half of 160px height */
}


/* ── Position the info bubble ──────────────────── */

function positionBubble(phil) {
  var pos = imgToViewport(phil.x, phil.y);
  var vw  = window.innerWidth;
  var vh  = window.innerHeight;

  /* Measure bubble dimensions */
  bubble.style.visibility = 'hidden';
  bubble.style.display    = 'block';
  var bw = bubble.offsetWidth;
  var bh = bubble.offsetHeight;
  bubble.style.visibility = '';

  /* Determine whether bubble goes above or below */
  var above = phil.y > 30;  /* if figure is NOT near top, put bubble above */
  var top, left;

  /* Remove old arrow classes */
  bubble.classList.remove('arrow-bottom', 'arrow-top');

  if (above) {
    /* Bubble above highlight */
    top  = pos.y - 80 - bh - 18;   /* 80=half highlight, 18=gap */
    bubble.classList.add('arrow-bottom');
  } else {
    /* Bubble below highlight (for Apollo, Minerva, etc.) */
    top  = pos.y + 80 + 18;
    bubble.classList.add('arrow-top');
  }

  /* Center horizontally over the figure */
  left = pos.x - bw / 2;

  /* Clamp to viewport edges with padding */
  var pad = 16;
  if (left < pad) left = pad;
  if (left + bw > vw - pad) left = vw - pad - bw;
  if (top < pad) top = pad;
  if (top + bh > vh - pad) top = vh - pad - bh;

  bubble.style.top  = top  + 'px';
  bubble.style.left = left + 'px';
}


/* ── Update bubble content with transition ─────── */

function updateBubble(phil, skipTransition) {
  if (skipTransition) {
    /* First reveal — no animation delay */
    philosopherName.textContent = phil.name;
    quoteEl.textContent         = '\u201C' + phil.quote + '\u201D';
    wikiLink.href               = phil.url;
    positionBubble(phil);
    bubble.classList.add('visible');
  } else {
    /* Fade out → update → fade in */
    bubble.classList.remove('visible');
    setTimeout(function () {
      philosopherName.textContent = phil.name;
      quoteEl.textContent         = '\u201C' + phil.quote + '\u201D';
      wikiLink.href               = phil.url;
      positionBubble(phil);
      bubble.classList.add('visible');
    }, 350);
  }
}


/* ── Update progress bar ──────────────────────── */

function updateProgress(index) {
  progressCurrent.textContent = (index + 1) + ' / ' + philosophers.length;
  progressFill.style.width    = ((index + 1) / philosophers.length * 100) + '%';
}


/* ── Main scroll handler ──────────────────────── */

function onScroll() {
  /* Wait until image dimensions are known */
  if (!img.naturalWidth) return;

  var scrollMax = document.body.scrollHeight - window.innerHeight;
  if (scrollMax <= 0) return;

  var scrollY    = window.scrollY;
  var scrollPct  = Math.min(Math.max(scrollY / scrollMax, 0), 1);

  /* ── Landing fade (first 3% of scroll, reversible) ── */
  var landingEnd  = scrollMax * 0.03;
  var landingFade = Math.min(scrollY / landingEnd, 1);

  landing.style.opacity = 1 - landingFade;

  if (landingFade >= 1) {
    /* Fully scrolled past landing zone */
    if (landingVisible) {
      landing.classList.add('hidden');
      document.body.classList.remove('landing-active');
      landingVisible = false;
    }
  } else {
    /* Back in the landing zone — show it again */
    if (!landingVisible) {
      landing.classList.remove('hidden');
      document.body.classList.add('landing-active');
      landingVisible = true;
    }

    /* While landing is visible, hide philosopher UI */
    highlight.style.opacity = 0;
    bubble.classList.remove('visible');
    progress.classList.remove('visible');
    lastIndex    = -1;
    isFirstReveal = true;
    return;
  }
  /* ── Philosopher progression ── */
  var index = Math.round(scrollPct * (philosophers.length - 1));

  if (index === lastIndex) return;

  var phil = philosophers[index];
  /* First philosopher reveal */
  if (isFirstReveal) {
    highlight.style.opacity = 1;
    progress.classList.add('visible');
    isFirstReveal = false;
  }
  positionHighlight(phil);
  updateProgress(index);
  var skipTransition = lastIndex === -1;
  updateBubble(phil, skipTransition);
  lastIndex = index;
}
/* ── Event listeners ──────────────────────────── */
window.addEventListener('scroll', onScroll, { passive: true });
/* Reposition on resize */
window.addEventListener('resize', function () {
  if (lastIndex < 0) return;
  var phil = philosophers[lastIndex];
  positionHighlight(phil);
  positionBubble(phil);
});
/* Handle image load — in case it loads after JS runs */
img.addEventListener('load', function () {
  if (window.scrollY > 0) {
    onScroll();
  }
});