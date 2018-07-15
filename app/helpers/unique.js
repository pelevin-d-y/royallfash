let unique = (arr) => {
  let obj = {};
  arr.forEach((element) => {
      let str = element;
      obj[str] = true; // запомнить строку в виде свойства объекта
    }
  )
  return Object.keys(obj);
}

export default unique