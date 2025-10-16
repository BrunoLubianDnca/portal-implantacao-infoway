export const getConcludedFromStorage = () => {
  try {
    const raw = localStorage.getItem('modulosConcluidos')
    const arr = raw ? JSON.parse(raw) : []
    return Array.isArray(arr) ? arr : []
  } catch {
    return []
  }
}

export const getAllowedModuleId = (total) => {
  const concluded = getConcludedFromStorage()
  if (concluded.length === 0) return 1
  const max = Math.max(...concluded)
  const next = Math.min(total, max + 1)
  // Invariant: if any previous was unmarked, max drops accordingly
  return next || 1
}

export const isModuleBlocked = (id, total) => {
  const allowed = getAllowedModuleId(total)
  return id > allowed
}

export const getStatuses = (total) => {
  const concluded = getConcludedFromStorage()
  const allowed = getAllowedModuleId(total)
  const statuses = []
  for (let i = 1; i <= total; i++) {
    let status = 'bloqueado'
    if (concluded.includes(i)) status = 'concluido'
    else if (i === allowed) status = 'em-andamento'
    statuses.push({ id: i, status })
  }
  return { statuses, concluded, allowed }
}
