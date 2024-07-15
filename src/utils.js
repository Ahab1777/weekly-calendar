export const range = (keyCount) => [...Array(keyCount).keys()]

export const areDatesSame = (first, second) => {
    return first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
}

export const addDateBy = (date, count) => {
    const d = new Date(date);
    return new Date(d.setDate(d.getDate() + count))
    //d é um novo objeto de Date com a data passa nos argumentos.
    //o dia atual de d é obtido e adiciona-se count à ele.
    //O dia atual somado ao count é atribuído ao próprio d, mudando assim seu dia com base no seu dia original
}

export const getMonday = () => {
    const today = new Date(); //sets today to present moment   
    const first = today.getDate() - today.getDay() + 1// dia de hoje - dia da semana de hoje + 1 (a segunda feira é o dia 1, então se o desejo fosse encontrar o domingo, seria usado o 0)
    return new Date(today.setDate(first))//retorna a data da segunda feira da semana atual
}