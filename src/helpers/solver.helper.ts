import * as fs from 'fs';

// Time complexity: O(n+m), For traversing.
// Auxiliary Space: O(n+m), For mapping.
export function bruteForce(matrix: any, target: number) {
  let tempVal = null;
  let result = null;
  for (let yIndex = 0; yIndex < matrix.length; yIndex++) {
    for (let xIndex = 0; xIndex < matrix[yIndex].length; xIndex++) {
      if (tempVal != null && tempVal > matrix[yIndex][xIndex]) {
        result = {
          result: false,
          msg: 'The matrix not sorted from low to high number',
          status: 400,
        };
        break;
      }
      if (target == matrix[yIndex][xIndex]) {
        result = {
          result: true,
          msg: [yIndex, xIndex],
          status: 200,
        };
      }
      tempVal = matrix[yIndex][xIndex];
    }
  }

  if (result == null) {
    result = {
      result: false,
      msg: 'not found',
      status: 201,
    };
  }
  createJsonFile(matrix, target, result);
  return result;
}

function binarySearch(matrix, i, j_low, j_high, target) {
  let result = null;
  while (j_low <= j_high) {
    let j_mid = Math.floor((j_low + j_high) / 2);

    if (matrix[i][j_mid] == target) {
      return result = {
        result: true,
        msg: [i, j_mid],
        status: 200,
      };
      return;
    } else if (matrix[i][j_mid] > target) j_high = j_mid - 1;
    else j_low = j_mid + 1;
  }

  // Element not found
  return result = {
    result: false,
    msg: 'not found',
    status: 201,
  };
}
// Time complexity: O(log n + log m)
// Auxiliary Space: O(1)
export function sortedMatrixSearch(matrix, no_of_rows, no_of_columns, target) {
  
  if (no_of_rows == 1) {
    return binarySearch(matrix, 0, 0, no_of_columns - 1, target);
  }

  let i_low = 0;
  let i_high = no_of_rows - 1;
  let j_mid = Math.floor(no_of_columns / 2);

  while (i_low + 1 < i_high) {
    let i_mid = Math.floor((i_low + i_high) / 2);

    if (matrix[i_mid][j_mid] == target) {
      return{
        result: true,
        msg: [i_mid, j_mid],
        status: 200,
      };
    } else if (matrix[i_mid][j_mid] > target) i_high = i_mid;
    else i_low = i_mid;
  }

  if (matrix[i_low][j_mid] == target)
    return{
      result: true,
      msg: [i_low, j_mid],
      status: 200,
    };
  else if (matrix[i_low + 1][j_mid] == target)
    return{
      result: true,
      msg: [i_low+1, j_mid],
      status: 200,
    };
  // Search element on 1st half of 1st row
  else if (target <= matrix[i_low][j_mid - 1])
    return binarySearch(matrix, i_low, 0, j_mid - 1, target);
  // Search element on 2nd half of 1st row
  else if (target >= matrix[i_low][j_mid + 1] && target <= matrix[i_low][no_of_columns - 1])
  return binarySearch(matrix, i_low, j_mid + 1, no_of_columns - 1, target);
  // Search element on 1st half of 2nd row
  else if (target <= matrix[i_low + 1][j_mid - 1])
  return binarySearch(matrix, i_low + 1, 0, j_mid - 1, target);
  // search element on 2nd half of 2nd row
  else return binarySearch(matrix, i_low + 1, j_mid + 1, no_of_columns - 1, target);
}

function createJsonFile(matrix, target, result) {
  const date = new Date(Date.now());
  const folder = 'results/';
  const filename = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.json`;

  const data = {
    input: {
      M: matrix,
      N: target,
    },
    result: result,
  };

  fs.writeFile(
    folder + filename,
    JSON.stringify(data, null, 2),
    function (err) {
      if (err) throw err;
    },
  );
}
