
const dock = document.querySelector(".nav-floating");
const items = document.querySelectorAll(".nav-floating a");

dock.addEventListener("mousemove", (e) => {
  const rect = dock.getBoundingClientRect();
  const x = e.clientX - rect.left;

  items.forEach((item) => {
    const itemRect = item.getBoundingClientRect();
    const itemCenter = itemRect.left + itemRect.width / 2 - rect.left;
    const distance = Math.abs(x - itemCenter);

    // Ajuste da intensidade do efeito
    const scale = Math.max(1, 1.8 - distance / 90);
    const lift = (scale - 1) * -18; // sobe mais quando maior

    item.style.transform = `scale(${scale}) translateY(${lift}px)`;
  });
});

dock.addEventListener("mouseleave", () => {
  items.forEach((item) => {
    item.style.transform = "scale(1) translateY(0)";
  });
});










// ===== Navegação suave ===== //
const navLinks = document.querySelectorAll(".nav-floating a");

navLinks.forEach(link => {
  const href = link.getAttribute("href");
  if (href && href.startsWith("#")) {
    link.addEventListener("click", e => {
      e.preventDefault();
      const targetSection = document.querySelector(href);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
        removeFadeClassesFrom(targetSection);
        applyRandomFadeTo(targetSection);
      }
    });
  }
});

// ===== Animações aleatórias de fade por seção ===== //
const sections = document.querySelectorAll("section");
const fadeAnimations = [

  "fade-in-zoom",
  "fade-in-blur"
];

function removeFadeClassesFrom(element) {
  fadeAnimations.forEach(anim => element.classList.remove(anim));
}

function applyRandomFadeTo(element) {
  const randomAnim = fadeAnimations[Math.floor(Math.random() * fadeAnimations.length)];
  setTimeout(() => {
    element.classList.add(randomAnim);
  }, 10);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const el = entry.target;
    if (entry.isIntersecting && !fadeAnimations.some(anim => el.classList.contains(anim))) {
      applyRandomFadeTo(el);
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => observer.observe(section));


document.addEventListener("DOMContentLoaded", () => {
  const introText = "Olá, eu sou o Abner 👋";

  const animatedLines = [
    [
      { text: 'desenvolvedor', className: 'intro-style' },
      { text: 'web,', className: 'intro-style' }
    ],
    [
      { text: 'apaixonado', className: '' },
      { text: 'por', className: '' }
    ],
    [
      { text: 'transformar', className: '' },
      { text: 'codigo', className: '' },
      { text: 'em', className: '' }
    ],
    [
      { text: 'experiências', className: '' },
      { text: 'Online.', className: 'underline' },
    ]
  ];

  const introContainer = document.getElementById("intro");
  const animatedContainer = document.getElementById("animated-text");
  const btnGroup = document.querySelector(".btn-group");
  const navLinks = document.querySelectorAll("nav a"); // <-- seus links de navegação
  const delayStep = 200;

  // Cria span com animação para cada palavra
  const createWordSpan = (word, className = '') => {
    const span = document.createElement('span');
    span.textContent = word;
    if (className) span.classList.add(className);
    span.classList.add('fade-word');
    return span;
  };

  // Função para limpar e reanimar
  function startAnimation() {
    introContainer.innerHTML = '';
    animatedContainer.innerHTML = '';
    btnGroup.querySelectorAll('a.fancy-button').forEach(btn => {
      btn.classList.remove('underline-in');
      const icon = btn.querySelector('.hover-img');
      if (icon) icon.remove(); // remove ícone temporariamente
      btn.innerHTML = btn.textContent.trim(); // reseta texto
      if (icon) btn.appendChild(icon); // reanexa ícone
    });

    // Renderiza intro
    introText.split(' ').forEach((word, index, arr) => {
      const span = createWordSpan(word);
      introContainer.appendChild(span);
      if (index < arr.length - 1) introContainer.appendChild(document.createTextNode(' '));
    });

    // Renderiza texto principal
    animatedLines.forEach(lineWords => {
      const line = document.createElement('div');
      line.classList.add('animated-line');
      lineWords.forEach(({ text, className }, index) => {
        const span = createWordSpan(text, className);
        line.appendChild(span);
        if (index < lineWords.length - 1) {
          line.appendChild(document.createTextNode(' '));
        }
      });
      animatedContainer.appendChild(line);
    });

    // Botões com delay e underline
    const buttons = btnGroup.querySelectorAll('a.fancy-button');
    let currentDelay = animatedLines.flat().length + introText.split(' ').length;

    buttons.forEach(button => {
      const text = button.textContent.trim();
      const icon = button.querySelector('.hover-img');
      button.textContent = '';

      const words = text.split(' ');
      const spans = [];

      words.forEach((word, index) => {
        const span = createWordSpan(word);
        button.appendChild(span);
        spans.push(span);
        if (index < words.length - 1) button.appendChild(document.createTextNode(' '));
      });

      if (icon) button.appendChild(icon);

      spans.forEach((span, i) => {
        setTimeout(() => {
          span.classList.add('fade-in');
        }, delayStep * (currentDelay + i));
      });

      const totalDelay = delayStep * (currentDelay + spans.length);
      setTimeout(() => {
        button.classList.add('underline-in');
      }, totalDelay);

      currentDelay += spans.length;
    });

    // Animação geral
    const allWords = document.querySelectorAll('.fade-word');
    allWords.forEach((word, i) => {
      setTimeout(() => {
        word.classList.add('fade-in');
      }, delayStep * i);
    });
  }

  // Inicialização automática
  startAnimation();

  // Ao clicar em qualquer link da nav, reinicia animação
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      startAnimation();
    });
  });
});

// ===== Filtros dos projetos ===== //




document.addEventListener("DOMContentLoaded", () => {
  const filters = document.querySelectorAll(".filter");
  const projects = document.querySelectorAll(".project-card");

  const gridBtn = document.getElementById("grid-view");
  const listBtn = document.getElementById("list-view");
  const projectsGrid = document.querySelector(".projects-grid");

  // Função para filtrar projetos
  function filterProjects(filterValue) {
    projects.forEach(project => {
      const tags = project.querySelector(".tags").textContent;

      if (filterValue === "Todos") {
        project.style.display = "block";
      } else {
        if (tags.includes(filterValue)) {
          project.style.display = "block";
        } else {
          project.style.display = "none";
        }
      }
    });
  }

  // Event listeners dos filtros
  filters.forEach(btn => {
    btn.addEventListener("click", function () {
      filters.forEach(f => f.classList.remove("active"));
      this.classList.add("active");

      const filterValue = this.textContent.trim();
      filterProjects(filterValue);
    });
  });

  // Event listeners dos botões de visualização
  gridBtn.addEventListener("click", () => {
    gridBtn.classList.add("active");
    listBtn.classList.remove("active");
    projectsGrid.classList.remove("projects-list");
    projectsGrid.classList.add("projects-grid");
  });

  listBtn.addEventListener("click", () => {
    listBtn.classList.add("active");
    gridBtn.classList.remove("active");
    projectsGrid.classList.remove("projects-grid");
    projectsGrid.classList.add("projects-list");
  });
});






// ===== toggle view ===== //

// Seletores principais
const gridBtn = document.getElementById("grid-view");
const listBtn = document.getElementById("list-view");
const projectsGrid = document.querySelector(".projects-grid");
const filterBtns = document.querySelectorAll(".filter");

// ------------------------------
// Função para animar os cards
// ------------------------------
function animateCards() {
  const cards = document.querySelectorAll(".project-card");

  cards.forEach((card, i) => {
    // remove classe show para resetar
    card.classList.remove("show");
    // força reflow -> garante que a animação reinicie
    void card.offsetWidth;
    // aplica com delay em cascata
    setTimeout(() => {
      card.classList.add("show");
    }, i * 120);
  });
}

// ------------------------------
// Alternância de visualização
// ------------------------------
gridBtn.addEventListener("click", () => {
  projectsGrid.classList.remove("projects-list");
  projectsGrid.classList.add("projects-grid");

  gridBtn.classList.add("active");
  listBtn.classList.remove("active");
  document.querySelector(".view-toggle").classList.remove("active-list");

  animateCards();
});

listBtn.addEventListener("click", () => {
  projectsGrid.classList.remove("projects-grid");
  projectsGrid.classList.add("projects-list");

  listBtn.classList.add("active");
  gridBtn.classList.remove("active");
  document.querySelector(".view-toggle").classList.add("active-list");

  animateCards();
});

// ------------------------------
// Filtros de tecnologia
// ------------------------------
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.textContent.trim().toLowerCase();

    // Marca botão ativo
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    // Filtra os projetos
    document.querySelectorAll(".project-card").forEach((card) => {
      const tags = Array.from(card.querySelectorAll(".tags span")).map((t) =>
        t.textContent.trim().toLowerCase()
      );

      if (filter === "todos" || tags.includes(filter)) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });

    // Reanima os que ficaram
    animateCards();
  });
});

// ------------------------------
// Dispara animação inicial
// ------------------------------
window.addEventListener("DOMContentLoaded", () => {
  animateCards();
});



// ===== Form Contatos ===== //
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");
  const toast = document.getElementById("toast");

  function showToast(message, isSuccess = true) {
    toast.textContent = message;
    toast.className = ""; // limpa classes
    toast.classList.add("show");
    toast.classList.add(isSuccess ? "success" : "error");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 4000);
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        form.reset();
        showToast("Mensagem enviada com sucesso! 🚀", true);
      } else {
        const errorData = await response.json();
        const errorMsg = errorData.errors ? 
          errorData.errors.map(err => err.message).join(", ") : 
          "Erro ao enviar. Tente novamente.";
        showToast(errorMsg, false);
      }
    } catch (error) {
      showToast("Erro na conexão. Tente novamente.", false);
    }
  });
});



  // pega todos os wrappers (caso você tenha mais de um)
  document.querySelectorAll('.form-wrapper').forEach((wrapper) => {
    const overlay = wrapper.querySelector('.overlay');

    wrapper.addEventListener('pointermove', (e) => {
      const r = wrapper.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      overlay.style = `--opacity:1; --x:${x}px; --y:${y}px;`;
    });

    wrapper.addEventListener('pointerleave', () => {
      overlay.style = `--opacity:0;`;
    });
  });
