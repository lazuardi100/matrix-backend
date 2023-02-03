import { sortedMatrixSearch } from './solver.helper';
let mat = [ [ 0, 6, 8, 9, 11 ],
            [ 20, 22, 28, 29, 31 ],
            [ 36, 38, 50, 61, 63 ],
            [ 64, 66, 100, 122, 128 ] 
          ];

let no_of_rows = 4, no_of_columns = 5
describe("testing binary search",()=>{
  it("should be found",()=>{
    let target = 8;

    const result = sortedMatrixSearch(mat, no_of_rows, no_of_columns, target);
    expect(result).toMatchObject({
      result: true,
      msg: [0, 2],
      status: 200
    })
  })

  it("should not be found", ()=>{
    let target = 10;
    const result = sortedMatrixSearch(mat, no_of_rows, no_of_columns, target);
    expect(result).toMatchObject({
      result: false,
      msg: 'not found',
      status: 201,
    })
  })
})