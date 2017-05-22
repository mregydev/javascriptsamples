///*****Mr-EgyDev*****///
///*****Main Concepts used Here are (Arrow functions - Array Map Filter Reduce - ES Classes - Deep Copy with Object.assign - Default paramter values - Spread - Rest - ES class getters and settters ) *****///
///**********///

class Matrix {

    constructor(rowLen = 0, colLen = 0) {
        this._rows = new Array(rowLen);

        this._rows.fill(new Array(colLen));
    }

    //Getter for rows property
    get Rows() {
        return this._rows;
    }

    //Getter for rows length
    get RowsLen() {
        return this.IsValid() ? this._rows.length : 0;
    }

    //Getter for column length
    get ColumnsLen() {
        return this.IsValid() ? this._rows[0].length : 0;
    }


    //Setter for rows property
    set Rows(value) {
        if (value) {
            this._rows = value;
        }
    }

    //ensure inserted values are number 
    IsNumber(value) {

        //Shadows parent function :)
        let IsNumber = (value) => { return !isNaN(Number.parseFloat(value)) || !isNaN(Number.parseInt(value)) };

        return typeof value == "object" ? value.reduce((acc, elem) => { return acc && IsNumber(elem) }, true) : IsNumber(value);
    }

    //Is current instance valid and contains passed column and row index
    IsValid(rowIndex = -1, colIndex = -1) {
        return this._rows && this._rows.length && this._rows.length > rowIndex && this._rows[0] && this._rows[0].length > colIndex;
    }

    //Deep copy current instance from passed matrix instance
    CopyFromAnother(matrix) {
        if (matrix && matrix.IsValid()) {
            matrix.Rows.forEach((row, rowIndex) => this.CopyRowFromArray(rowIndex, ...row));
            return true;
        }
        return false;
    }


    //Gets deep copy of current instance
    GetCopy() {
        if (this.IsValid()) {
            var copyMatrix = new Matrix(this.RowsLen, this.ColumnsLen);
            copyMatrix.Rows = copyMatrix.Rows.map((row, rowIndex) => this.GetCopyOfRow(rowIndex));
            return copyMatrix;
        }
        return undefined;
    }

    //Add new element at passeed row and column index
    AddElemet(rowIndex, colIndex, value) {
        if (!this.IsNumber(value)) {
            return false;
        }


        if (this.IsValid(rowIndex, colIndex)) {
            this._rows[rowIndex][colIndex] = value;
            return true;
        }
        return false;
    }

    //Deep copy passed array value into row with passed row index
    CopyRowFromArray(rowIndex, ...value) {
        if (!this.IsNumber(value)) {
            return false;
        }

        if (this.IsValid(rowIndex)) {
            this._rows[rowIndex] = Object.assign([], value);
            return true;
        }
        return false;
    }


    //Deep copy passed array value into column with passed column index
    CopyColumnFromArray(colIndex, ...value) {
        if (!this.IsNumber(value)) {
            return false;
        }

        if (this.IsValid(undefined, colIndex)) {
            this._rows.forEach((elem, index) => elem[colIndex] = value[index]);
            return true;
        }
        return false;
    }

    //Deep copy row with passed row index
    GetCopyOfRow(rowIndex) {
        return this.IsValid(rowIndex) ? Object.assign([], this._rows[rowIndex]) : undefined;
    }


    //Deep copy column with passed column index
    GetCopyOfColumn(colIndex) {
        return this.IsValid(undefined, colIndex) ? this._rows.map(row => row[colIndex]) : undefined;
    }


    //return multiply of current instance with passed matrix instance
    Multiply(matrix) {
        var result = new Matrix();

        if (this.IsValid() && matrix.IsValid()) {
            result._rows = Object.assign([], this._rows.map((arr, rowIndex) => arr.map((elem, colIndex) => elem * matrix._rows[rowIndex][colIndex])));
        }
        return result;
    }


    //Multiply row with passed row index with passed value
    MultiplyRowBy(rowIndex, value) {
        if (this.IsValid(rowIndex)) {
            this._rows[rowIndex] = this._rows[rowIndex].map(elem => elem * value);
        }
    }

    //Get sum of row with passed row index
    GetRowsum(rowIndex) {
        if (this.IsValid(rowIndex)) {
            return this._rows[rowIndex].reduce((sum, elem) => {
                return sum + elem;
            }, 0);
        }
    }

    //Get sun of column with column index
    GetColumnSum(colIndex) {
        if (this.IsValid(undefined, colIndex)) {
            return this._rows.reduce((sum, elem) => {
                return sum + elem[colIndex];
            }, 0);
        }
    }

    //string representation
    toString() {
        var str = "";
        this._rows.forEach(arr => {
            arr.forEach(elem => str += `${elem} `);
            str += `\n`;
        });

        return str;
    }
}


//Example
var matrix = new Matrix(3, 3);
matrix.CopyRowFromArray(0, 1, 2, 3, 4, 5);
matrix.CopyRowFromArray(1, 3, 1, 6, 8, 4);
matrix.CopyRowFromArray(2, 2, 3, 9, 10, 4);

var copyMatrix = matrix.GetCopy();


var newMatrix = new Matrix(matrix.RowsLen, matrix.ColumnsLen);

newMatrix.CopyFromAnother(matrix);

console.log(matrix.toString());

console.log(copyMatrix.toString());

console.log(matrix.GetRowsum(0));

console.log(matrix.GetColumnSum(0));

newMatrix.CopyColumnFromArray(2, ...matrix.GetCopyOfColumn(4));

console.log(newMatrix.toString());


console.log(matrix.Multiply(matrix).toString());
