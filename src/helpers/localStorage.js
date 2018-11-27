const getPasswords = () => {
  const passwords = localStorage.getItem('passwords')
  return passwords ? JSON.parse(passwords) : {}
}

export const getPasswordFromLocalStorage = playlist => getPasswords()[playlist]

export const savePasswordInLocalStorage = (playlist, password) => {
  const passwords = getPasswords()
  passwords[playlist] = password
  localStorage.setItem('passwords', JSON.stringify(passwords))
}
