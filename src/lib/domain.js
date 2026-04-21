export function normalizeText(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

export function formatBooleanLabel(value, labels = {}) {
  const {
    trueLabel = 'Sim',
    falseLabel = 'Não',
    nullLabel = 'Não informado',
  } = labels

  if (value === true) {
    return trueLabel
  }

  if (value === false) {
    return falseLabel
  }

  return nullLabel
}

export function formatDateLabel(value, fallback = 'Em andamento') {
  if (!value) {
    return fallback
  }

  const parsedDate = new Date(value)

  if (Number.isNaN(parsedDate.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat('pt-BR').format(parsedDate)
}

export function matchesSearch(value, query) {
  return normalizeText(value).includes(normalizeText(query))
}
