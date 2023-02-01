import * as fs from 'fs'
export function findNumber (matrix: any, target: number) {
  let tempVal = null
  let result = null
  for (let yIndex = 0; yIndex < matrix.length; yIndex++) {
    for (let xIndex = 0; xIndex < matrix[yIndex].length; xIndex++) {
      if (tempVal != null && tempVal > matrix[yIndex][xIndex]){
        result = {
          result: false,
          msg: "The matrix not sorted from low to high number",
          status: 400
        }
        break
      }
      if (target == matrix[yIndex][xIndex]){
        result = {
          result: true,
          msg: [yIndex, xIndex],
          status: 200
        }
      }
      tempVal = matrix[yIndex][xIndex]
    }
  }

  if (result == null){
    result = {
      result: false,
      msg: "not found",
      status: 201
    }
  }
  createJsonFile(matrix, target, result)
  return result
}

function createJsonFile(matrix, target, result){
  const date = new Date(Date.now())
  const folder = 'results/'
  const filename = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.json`

  const data = {
    input: {
      M: matrix,
      N: target
    },
    result: result
  }

  fs.writeFile(folder + filename, JSON.stringify(data, null, 2), function(err){
    if (err) throw err;
  })
}