type TParts = (string | false | undefined | null)[]

export const buildClass = (...parts: TParts) => parts.filter(Boolean).join(' ')
