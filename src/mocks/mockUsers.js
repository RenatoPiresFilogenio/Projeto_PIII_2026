export const demoAccounts = {
  empresa: {
    id: 'usr-empresa-01',
    email: 'contato@ecomove.com.br',
    password: 'empresa123',
    tipoUsuario: {
      id: 'tipo-empresa',
      nome: 'empresa',
      label: 'Empresa',
    },
    usuarioTelefone: ['(19) 3344-8899'],
    empresa: {
      id: 'emp-01',
      nome: 'EcoMove Mobility',
      cnpj: '12.345.678/0001-90',
      status: 'Validada',
      comprovanteInscricao: 'Comprovante validado',
      setor: 'Mobilidade eletrica',
      localizacao: 'Campinas, SP',
      dados: {
        porte: 'Medio porte',
        descricao:
          'Empresa focada em sistemas de mobilidade eletrica, armazenamento energetico e eletrificacao de frotas urbanas.',
        focoPdi: 'Baterias, telemetria e infraestrutura de recarga',
        site: 'www.ecomove.com.br',
      },
      desafios: [
        {
          id: 'desafio-001',
          titulo: 'Baterias mais leves para veiculos urbanos',
          status: 'Recebendo propostas',
          areaPesquisa: 'Materiais e energia',
          prazo: '90 dias',
        },
        {
          id: 'desafio-002',
          titulo: 'Analise termica para packs de bateria',
          status: 'Em avaliacao',
          areaPesquisa: 'Engenharia mecanica',
          prazo: '60 dias',
        },
      ],
    },
  },
  pesquisador: {
    id: 'usr-pesq-01',
    email: 'camila.nunes@ufscar.br',
    password: 'pesquisa123',
    tipoUsuario: {
      id: 'tipo-pesquisador',
      nome: 'pesquisador',
      label: 'Pesquisador',
    },
    usuarioTelefone: ['(16) 98877-1122'],
    pesquisador: {
      id: 'pesq-01',
      nome: 'Dra. Camila Nunes',
      disponibilidade: 'Disponivel para novas parcerias',
      status: 'Vinculo validado',
      universidade: {
        id: 'uni-01',
        nome: 'Universidade Federal de Sao Carlos',
      },
      areaPesquisa: [
        'Materiais energeticos',
        'Mobilidade eletrica',
        'Armazenamento de energia',
      ],
      curriculo: {
        resumo:
          'Pesquisadora com foco em materiais catodicos, diagnostico de degradacao de celulas e aplicacao industrial em sistemas de mobilidade.',
        habilidades: [
          'Caracterizacao eletroquimica',
          'Analise de ciclo de vida',
          'Modelagem termica',
          'Transferencia tecnologica',
        ],
        formacao: [
          {
            instituicao: 'UFSCar',
            curso: 'Doutorado em Ciencia e Engenharia de Materiais',
            conclusao: '2023',
          },
          {
            instituicao: 'USP',
            curso: 'Mestrado em Engenharia Quimica',
            conclusao: '2019',
          },
        ],
        experiencias: [
          {
            titulo: 'Laboratorio de Armazenamento de Energia',
            periodo: '2021 - atual',
            descricao:
              'Pesquisa aplicada em degradacao de celulas de ion-litio e colaboracao com industria automotiva.',
          },
          {
            titulo: 'Centro de Inovacao em Materiais',
            periodo: '2018 - 2021',
            descricao:
              'Projetos de transferencia tecnologica e prototipagem para sistemas de recarga rapida.',
          },
        ],
      },
      pesquisas: [
        {
          id: 'pesquisa-01',
          titulo: 'Materiais catodicos para baterias de veiculos leves',
          status: 'Ativa',
          area: 'Energia',
          prazo: '2026',
        },
        {
          id: 'pesquisa-02',
          titulo: 'Sensoriamento termico para packs eletricos',
          status: 'Em transferencia',
          area: 'Engenharia de materiais',
          prazo: '2025',
        },
      ],
    },
  },
}

export function getDemoAccountByType(type) {
  return demoAccounts[type] ?? null
}

export function sanitizeSessionUser(account) {
  if (!account) return null

  const { password, ...safeAccount } = account
  return safeAccount
}
