export const projects = [
  {
    id: 1,
    name: "Meu Portfólio",
    description: "Um site pessoal para apresentar minhas habilidades, experiências e projetos.",
    tags: ["HTML", "CSS", "JavaScript"],
    image: "/img/project1.svg",
    demo: "#",
    code: "#",
  },
  {
    id: 2,
    name: "Área do Cliente — E-commerce",
    description:
      "Sistema integrado à Shopify para rastreamento de pedidos utilizando APIs logísticas, com frontend em React/TypeScript e backend em Python/FastAPI.",
    tags: ["React", "TypeScript", "Python", "FastAPI", "PostgreSQL"],
    image: "/img/project2.svg",
    demo: "#",
    code: "#",
  },
];

export const experiences = [
  {
    id: 1,
    title: "Teknisa",
    date: "Out 2025 – Atual",
    subtitle: "Programador Full Stack Júnior",
    text: "Desenvolvimento de soluções corporativas com React, TypeScript, Python, FastAPI e PostgreSQL. Criação de sistemas, relatórios, integrações e documentação técnica.",
  },
  {
    id: 2,
    title: "Pedilar Atendimento Domiciliar",
    date: "2022 – 2025",
    subtitle: "Assistente de TI",
    text: "Suporte e desenvolvimento de soluções de TI, com experiência em relatórios, customização de sistemas, administração de bancos de dados e documentação técnica.",
  },
];

export const education = [
  {
    id: 1,
    title: "UNA - CN",
    date: "2022 – 2025",
    subtitle: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
    text: "Formação sólida voltada para a criação, implementação e manutenção de soluções tecnológicas eficientes.",
  },
];

export const skills = {
  frontend: [
    { name: "React", icon: "fab fa-react" },
    { name: "TypeScript", icon: "fab fa-js-square" },
    { name: "JavaScript", icon: "fab fa-js-square" },
    { name: "HTML", icon: "fab fa-html5" },
    { name: "CSS", icon: "fab fa-css3-alt" },
  ],
  backend: [
    { name: "Python", icon: "fab fa-python" },
    { name: "FastAPI", icon: "fas fa-bolt" },
    { name: "PostgreSQL", icon: "fas fa-database" },
    { name: "Node.js", icon: "fab fa-node-js" },
  ],
  tools: [
    { name: "GitHub / GitLab", icon: "fab fa-github" },
    { name: "Figma", icon: "fab fa-figma" },
    { name: "Trello", icon: "fab fa-trello" },
  ],
};

export const socialLinks = {
  github: "https://github.com/AbnerEsquarcio",
  linkedin: "https://www.linkedin.com/in/abner-esquarcio-b50087242",
  instagram: "https://www.instagram.com/abner.squarcio",
  email: "abner-squarcio@hotmail.com",
};

export const navItems = [
  { href: "#home", icon: "fas fa-home", title: "Home" },
  { href: "#sobre-mim", icon: "fas fa-user", title: "Sobre Mim" },
  { href: "#projetos", icon: "fas fa-folder-open", title: "Projetos" },
  { href: "#contatos", icon: "fas fa-envelope", title: "Contatos" },
];
