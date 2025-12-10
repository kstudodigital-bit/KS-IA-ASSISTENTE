import { Article, Checklist, FAQ } from './types';

export const APP_NAME = "KS Digital Helper";

export const ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Dominando o Facebook Ads',
    summary: 'Como estruturar suas campanhas para maximizar o ROI e evitar bloqueios.',
    category: 'Tráfego Pago',
    imageUrl: 'https://picsum.photos/400/200?random=1'
  },
  {
    id: '2',
    title: 'O Funil de Vendas Perfeito',
    summary: 'Etapas essenciais para transformar visitantes em clientes fiéis.',
    category: 'Estratégia',
    imageUrl: 'https://picsum.photos/400/200?random=2'
  },
  {
    id: '3',
    title: 'SEO para Iniciantes',
    summary: 'Guia básico para ranquear seu site no Google organicamente.',
    category: 'SEO',
    imageUrl: 'https://picsum.photos/400/200?random=3'
  },
  {
    id: '4',
    title: 'Copywriting que Converte',
    summary: 'Gatilhos mentais e estruturas de texto para anúncios.',
    category: 'Vendas',
    imageUrl: 'https://picsum.photos/400/200?random=4'
  }
];

export const CHECKLISTS: Checklist[] = [
  {
    id: 'launch-checklist',
    title: 'Checklist de Lançamento Semente',
    description: 'Passos essenciais para seu primeiro lançamento digital.',
    items: [
      { id: '1', text: 'Definir a Promessa do Produto', isCompleted: false },
      { id: '2', text: 'Criar Avatar (Persona)', isCompleted: false },
      { id: '3', text: 'Configurar Business Manager', isCompleted: false },
      { id: '4', text: 'Criar Página de Captura', isCompleted: false },
      { id: '5', text: 'Configurar Email Marketing', isCompleted: false },
      { id: '6', text: 'Gravar Criativos (Anúncios)', isCompleted: false },
      { id: '7', text: 'Configurar Pixel do Facebook/Google', isCompleted: false },
    ]
  },
  {
    id: 'insta-checklist',
    title: 'Otimização de Perfil Instagram',
    description: 'Deixe sua bio pronta para converter seguidores em clientes.',
    items: [
      { id: '1', text: 'Foto de perfil clara e profissional', isCompleted: false },
      { id: '2', text: 'Nome com palavra-chave do nicho', isCompleted: false },
      { id: '3', text: 'Bio com promessa clara', isCompleted: false },
      { id: '4', text: 'Link na bio (CTA)', isCompleted: false },
      { id: '5', text: 'Destaques organizados', isCompleted: false },
    ]
  }
];

export const FAQS: FAQ[] = [
  {
    question: "Como funciona a consultoria da KS?",
    answer: "Nossa consultoria é personalizada. Analisamos seu negócio e criamos um plano de ação focado em vendas e branding."
  },
  {
    question: "Qual o melhor valor para começar em anúncios?",
    answer: "Recomendamos iniciar com pelo menos R$ 20,00/dia para testes de validação de público e criativo."
  },
  {
    question: "Vocês fazem gestão de redes sociais?",
    answer: "Sim! A KS-Tudo Digital oferece pacotes completos de gestão, criação de conteúdo e design."
  }
];