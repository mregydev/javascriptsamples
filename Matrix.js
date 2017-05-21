///*****Mr-EgyDev*****///
///*****Main Concepts used Here are (Arrow functions - Array Map Filter Reduce - ES Classes - Deep Copy with Object.assign - Default paramter values - Spread - ES class getters and settters ) *****///
///**********///

class Matrix {

    constructor(rowLen=0, colLen=0) {
        this.__rows = new Array(rowLen);

        this.__rows.fill(new Array(colLen));
    }

    //Getter for rows property
    get Rows() {
        return this.__rows;
    }

    //Getter for rows length
    get RowsLen()
    {
        return this.IsValid()?this.__rows.length:0;
    }

    //Getter for column length
    get ColumnsLen()
    {
        return this.IsValid()?this.__rows[0].length:0;
    }


    //Setter for rows property
    set Rows(value) {
        if (value) {
            this.__rows = value;
        }
    }

    //Is current instance valid and contains passed column and row index
    IsValid(rowIndex = -1, colIndex = -1) {
        return this.__rows && this.__rows.length && this.__rows.length > rowIndex && this.__rows[0] && this.__rows[0].length > colIndex;
    }

    //Deep copy current instance from passed matrix instance
    CopyFromAnother(matrix) {
        if (matrix && matrix.IsValid()) {

            matrix.Rows.forEach((row, rowIndex) => {
                this.CopyRowFromArray(rowIndex, ...row);
            });
            return true;
        }
        return false;
    }


    //Gets deep copy of current instance
    GetCopy() {
        return this.IsValid() ? Object.assign(new Matrix(), this) : undefined;
    }

    //Add new element at passeed row and column index
    AddElemet(rowIndex, colIndex, value) {
        if (this.IsValid(rowIndex, colIndex)) {
            this.__rows[rowIndex][colIndex] = value;
            return true;
        }
        return false;
    }

    //Deep copy passed array value into row with passed row index
    CopyRowFromArray(rowIndex, ...value) {
        if (this.IsValid(rowIndex)) {
            this.__rows[rowIndex]=Object.assign(this.__rows[rowIndex], value);
            return true;
        }
        return false;
    }


    //Deep copy passed array value into column with passed column index
    CopyColumnFromArray(colIndex, ...value) {
        if (this.IsValid(undefined, colIndex)) {
            this.__rows.forEach((elem,index) => {
               Object.assign(elem[colIndex],value[index]); return elem;
            });
            return true;
        }
        return false;
    }

    //Deep copy row with passed row index
    GetCopyOfRow(rowIndex) {
        return this.IsValid(rowIndex) ? Object.assign([], this.__rows[rowIndex]) : undefined;
    }


    //Deep copy column with passed column index
    GetCopyOfColumn(colIndex) {
        return this.IsValid(undefined, colIndex) ? this.__rows.map(row => row[colIndex]) : undefined;
    }


    //return multiply of current instance with passed matrix instance
    Multiply(matrix) {
        var result = new Matrix();

        if (this.IsValid() && matrix.IsValid()) {
            result.__rows = Object.assign([], this.__rows.map(arr, rowIndex => arr.map(elem, colIndex => elem * matrix.__rows[rowIndex][colIndex])));
        }
        return result;
    }


    //Multiply row with passed row index with passed value
    MultiplyRowBy(rowIndex, value) {
        if (this.IsValid(rowIndex)) {
            this.__rows[rowIndex] = this.__rows[rowIndex].map(elem => elem * value);
        }
    }

    //Get sum of row with passed row index
    GetRowsum(rowIndex) {
        if (this.IsValid(rowIndex)) {
            return this.__rows[rowIndex].reduce((sum, elem) => {
                return sum + elem;
            }, 0);
        }
    }

    //Get sun of column with column index
    GetColumnSum(colIndex) {
        if (this.IsValid(undefined, colIndex)) {
            return this.__rows.reduce((sum, elem) => {
                return elem[colIndex] += sum;
            }, 0);
        }
    }


    toString() {
        var str = "";
        this.__rows.forEach(arr => {
            arr.forEach(elem => str +=elem+" ");
            str += "\n";
        });

        return str;
    }
}




//Example
var matrix = new Matrix(3, 3);

matrix.CopyRowFromArray(0, 1, 2, 3, 4, 5);
matrix.CopyRowFromArray(1, 11, 12, 13, 34, 25);
matrix.CopyRowFromArray(2, 21, 52, 73, 64, 35);

var copyMatrix = matrix.GetCopy();

var newMatrix=new Matrix(copyMatrix.RowsLen,copyMatrix.ColumnsLen);

newMatrix.CopyFromAnother(copyMatrix);


console.log(matrix.toString());

// console.log(matrix.GetRowsum(0));

// console.log(matrix.GetCopyOfColumn(0));

// newMatrix.CopyColumnFromArray(0,20,40,50);

// console.log(newMatrix.toString())
