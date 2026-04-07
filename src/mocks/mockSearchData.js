const semanticScenarios = [
  {
    triggers: ['bateria', 'carro', 'eletrico', 'mobilidade'],
    semantic: {
      themes: ['Mobilidade eletrica', 'Armazenamento de energia', 'Descarbonizacao industrial'],
      categories: ['Desafio tecnologico', 'Pesquisa aplicada', 'Parceria universidade-empresa'],
      areas: ['Engenharia de materiais', 'Energia', 'Automacao'],
      technologies: ['Ion-litio', 'Telemetria', 'Analise termica', 'Recarga inteligente'],
      keywords: ['bateria eletrica', 'carros eletricos', 'degradacao', 'autonomia'],
    },
    results: [
      {
        id: 'res-01',
        type: 'pesquisador',
        title: 'Dra. Camila Nunes',
        subtitle: 'Materiais energeticos e packs de bateria',
        description:
          'Atua com caracterizacao eletroquimica, vida util de celulas e transferencia para aplicacoes industriais.',
        tags: ['UFSCar', 'Mobilidade eletrica', 'Baterias'],
        relevance: '93% de compatibilidade',
        cta: 'Ver perfil',
      },
      {
        id: 'res-02',
        type: 'pesquisa',
        title: 'Projeto: Sensoriamento termico para baterias veiculares',
        subtitle: 'Pesquisa aplicada em engenharia de materiais',
        description:
          'Estudo para monitoramento termico de packs de bateria com foco em seguranca, durabilidade e manutencao preditiva.',
        tags: ['Termica', 'Sensores', 'P&D aplicado'],
        relevance: '89% de relevancia',
        cta: 'Ver pesquisa',
      },
      {
        id: 'res-03',
        type: 'desafio',
        title: 'Desafio: reduzir peso e custo de baterias urbanas',
        subtitle: 'Empresa EcoMove Mobility',
        description:
          'Busca parceria para prototipar solucoes com maior densidade energetica e menor impacto no custo final do veiculo.',
        tags: ['Industria', 'Energia', 'Prototipagem'],
        relevance: '86% de aderencia',
        cta: 'Visualizar desafio',
      },
      {
        id: 'res-04',
        type: 'empresa',
        title: 'Voltway Systems',
        subtitle: 'Infraestrutura de recarga e telemetria',
        description:
          'Empresa interessada em pesquisadores com experiencia em sistemas de recarga rapida, baterias e software embarcado.',
        tags: ['Recarga', 'Telemetria', 'Parceria'],
        relevance: '81% de compatibilidade',
        cta: 'Ver empresa',
      },
    ],
  },
  {
    triggers: ['embalagem', 'sustentavel', 'alimento', 'residuo'],
    semantic: {
      themes: ['Economia circular', 'Materiais sustentaveis', 'Pesquisa aplicada ao mercado'],
      categories: ['Biotecnologia', 'Desafio industrial', 'Projeto em transferencia'],
      areas: ['Ciencia dos materiais', 'Engenharia de alimentos', 'Quimica'],
      technologies: ['Biopolimeros', 'Compostagem', 'Barreira ativa'],
      keywords: ['embalagem sustentavel', 'materiais biodegradaveis', 'cadeia de alimentos'],
    },
    results: [
      {
        id: 'res-05',
        type: 'pesquisador',
        title: 'Profa. Larissa Costa',
        subtitle: 'Biopolimeros e embalagens ativas',
        description:
          'Especialista em materiais biodegradaveis para industria de alimentos, com experiencia em colaboracao com PMEs.',
        tags: ['Biopolimeros', 'Alimentos', 'Transferencia'],
        relevance: '94% de compatibilidade',
        cta: 'Ver perfil',
      },
      {
        id: 'res-06',
        type: 'desafio',
        title: 'Desafio: substituir embalagem plastica de alto impacto',
        subtitle: 'Cooperativa Vale Verde',
        description:
          'Procura parceria para desenvolver alternativa sustentavel com barreira adequada para cadeia refrigerada.',
        tags: ['Embalagem', 'Sustentabilidade', 'Alimentos'],
        relevance: '88% de aderencia',
        cta: 'Visualizar desafio',
      },
      {
        id: 'res-07',
        type: 'pesquisa',
        title: 'Projeto: Filme biodegradavel com sensores de frescor',
        subtitle: 'Linha de pesquisa em materiais funcionais',
        description:
          'Pesquisa com foco em rastreabilidade, tempo de prateleira e reducao de perdas logísticas.',
        tags: ['Materiais', 'Sensores', 'Inovacao'],
        relevance: '83% de relevancia',
        cta: 'Ver pesquisa',
      },
    ],
  },
]

const defaultSemantic = {
  themes: ['Pesquisa aplicada', 'Parcerias de P&D', 'Conexao entre empresa e academia'],
  categories: ['Busca semantica', 'Match por IA', 'Oportunidades de colaboracao'],
  areas: ['Engenharia', 'Saude', 'Tecnologia'],
  technologies: ['PLN', 'Relevancia semantica', 'Recomendacao'],
  keywords: ['pesquisa', 'parceria', 'inovacao'],
}

const defaultResults = [
  {
    id: 'default-01',
    type: 'pesquisador',
    title: 'Dr. Rafael Mendes',
    subtitle: 'Automacao industrial e dados aplicados',
    description:
      'Perfil com experiencia em diagnostico de processos, manutencao preditiva e projetos com industria de medio porte.',
    tags: ['Automacao', 'Dados', 'Industria'],
    relevance: '84% de compatibilidade',
    cta: 'Ver perfil',
  },
  {
    id: 'default-02',
    type: 'desafio',
    title: 'Desafio: rastrear perdas operacionais em linha produtiva',
    subtitle: 'Metal Nova Componentes',
    description:
      'Empresa busca parceria para melhorar leitura de dados e reduzir gargalos produtivos com apoio de pesquisa aplicada.',
    tags: ['Dados', 'Processos', 'Parceria'],
    relevance: '79% de aderencia',
    cta: 'Visualizar desafio',
  },
  {
    id: 'default-03',
    type: 'pesquisa',
    title: 'Projeto: modelos de apoio a decisao para P&D industrial',
    subtitle: 'Linha de pesquisa em engenharia de producao',
    description:
      'Projeto com foco em priorizacao de investimento, avaliacao de oportunidades e tomada de decisao tecnica.',
    tags: ['Engenharia', 'Gestao', 'P&D'],
    relevance: '76% de relevancia',
    cta: 'Ver pesquisa',
  },
]

function normalizeText(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

export function buildSearchExperience(query) {
  const normalized = normalizeText(query || '')

  const scenario = semanticScenarios.find(({ triggers }) =>
    triggers.some((trigger) => normalized.includes(trigger))
  )

  const semantic = scenario?.semantic ?? defaultSemantic
  const results = scenario?.results ?? defaultResults

  return {
    query,
    helper:
      'Descreva o problema, tema ou necessidade que deseja encontrar. A plataforma interpreta sua frase e organiza resultados por aderencia semantica.',
    semantic,
    results,
  }
}
