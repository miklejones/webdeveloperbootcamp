let matrix = [[1,2,3],[4,5,6],[7,8,9]]

function diagonalDifference(matrix){
    let length=matrix.length;
    let sum1 = 0;
    let sum2 = 0;
    for(var i = 0; i< matrix.length; i++){
        sum1 += matrix[i][i];
        sum2 += matrix[length-1-i][i];
    };
    return Math.abs(sum1-sum2);
}