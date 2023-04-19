// Encargado de acceder al local storage del navegador 

export function getDatabase() {
    return localStorage.getItem('db_teachers')
}

export function setDatabase(teachers) {
    localStorage.setItem('db_teachers', teachers)
    
}