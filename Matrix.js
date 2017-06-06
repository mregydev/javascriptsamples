///*****Mr-EgyDev*****///
///*****Main Concepts used Here are (Arrow functions - Array Map Filter Reduce - ES Classes - Deep Copy with Object.assign - Default paramter values - Spread - Rest - ES class getters and settters ) *****///
///**********///
class Matrix {

    constructor(rowLen = 10, colLen = 10) {

        this._rowsLen = rowLen;

        this._colLen = colLen;

        this._rows = new Array(rowLen);

        this._rows.fill(new Array(colLen));

        //Intialize default value to 0
        this._rows.forEach(row => row.fill(0));
    }

    //Getter for rows property
    get Rows() {
        return this._rows;
    }

    //Getter for rows length
    get RowsLen() {
        return this._rowsLen;
    }

    //Getter for column length
    get ColumnsLen() {
        return this._colLen;
    }


    //Setter for rows property
    set Rows(value) {
        if (value && value.length < this.RowsLen) {
            this._rows = value;
        }
    }

    //ensure inserted values are number 
    IsNumber(value) {
        //Shadows parent function :)
        let IsNumber = (value) => {
            return !isNaN(Number.parseFloat(value)) || !isNaN(Number.parseInt(value))
        };

        return typeof value == "object" ? value.reduce((acc, elem) => {
            return acc && IsNumber(elem)
        }, true) : IsNumber(value);
    }

    //Is current instance valid and contains passed column and row index
    IsValid(rowIndex = -1, colIndex = -1) {
        return this._rows && this._rows.length && this._rows.length > rowIndex && this._rows[0] && this._rows[0].length > colIndex;
    }

    // copy current instance from passed matrix instance
    CopyFromAnother(matrix) {
        if (matrix && matrix.IsValid()) {
            matrix.Rows.forEach((row, rowIndex) => this.CopyRowFromArray(rowIndex, ...row));
            return true;
        }
        return false;
    }
    //Gets  copy of current instance
    GetCopy() {
        if (this.IsValid()) {
            let copyMatrix = new Matrix(this.RowsLen, this.ColumnsLen);
            copyMatrix.Rows.forEach((row, rowIndex) => {
                copyMatrix.CopyRowFromArray(rowIndex, this.GetCopyOfRow(rowIndex));
            });
            return copyMatrix;
        }
        return undefined;
    }

    //Add new element at passeed row and column index//Add new element at passeed row and column index
    AddElement(rowIndex, colIndex, value) {
        if (!this.IsNumber(value)) {
            return false;
        }

        if (this.IsValid(rowIndex, colIndex)) {
            this._rows[rowIndex][colIndex] = value;
            return true;
        }
        return false;
    }

    // copy passed array value into row with passed row index
    CopyRowFromArray(rowIndex, ...value) {
        if (value.length > this.ColumnsLen || !this.IsNumber(value)) {
            return false;
        }

        if (this.IsValid(rowIndex)) {
            this._rows[rowIndex] = Object.assign([], value);
            return true;
        }
        return false;
    }


    // copy passed array value into column with passed column index
    CopyColumnFromArray(colIndex, ...value) {
        if (value.length > this.RowsLen || !this.IsNumber(value)) {
            return false;
        }

        if (this.IsValid(undefined, colIndex)) {
            this._rows.forEach((row, index) => row[colIndex] = value[index]);
            return true;
        }
        return false;
    }

    // copy row with passed row index
    GetCopyOfRow(rowIndex) {
        return this.IsValid(rowIndex) ? Object.assign([], this._rows[rowIndex]) : undefined;
    }


    // copy column with passed column index
    GetCopyOfColumn(colIndex) {
        return this.IsValid(undefined, colIndex) ? this._rows.map(row => row[colIndex]) : undefined;
    }


    //return multiply of current instance with passed matrix instance
    Multiply(matrix) {
        let result = new Matrix();

        if (this.IsValid() && matrix.IsValid()) {
            result._rows = Object.assign([], this._rows.map((row, rowIndex) => row.map((val, colIndex) => val * matrix._rows[rowIndex][colIndex])));
        }
        return result;
    }
    //Multiply row with passed row index with passed value
    MultiplyRowBy(rowIndex, value) {
        if (this.IsValid(rowIndex)) {
            this._rows[rowIndex].forEach((elem, index) => {
                this._rows[rowIndex][index] *= value;
            });
        }
    }

    //Multiply column with passed column index with passed value
    MultiplyColumnBy(colIndex, value) {
        if (this.IsValid(undefined, colIndex)) {
            this._rows.forEach(row => {
                row[colIndex] *= value;
            });
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
            return this._rows.reduce((sum, row) => {
                return sum + row[colIndex];
            }, 0);
        }
    }

    //string representation
    toString() {
        let str = "";
        this._rows.forEach(arr => {
            arr.forEach(elem => str += `${elem} `);
            str += `\n`;
        });

        return str;
    }
}


/**********Example using Matrix Class **********/
console.log("%cMr.Egydev --- Matrix class Test ---", "color:blue;font-weight:bold;");


var matrix = new Matrix(3, 5);

//CopyRowFromArray test
console.log("%c******Matrix after using CopyRowFromArray Test******", "color:red;font-weight:bold;");
matrix.CopyRowFromArray(0, 1, 2, 3, 4, 5);
matrix.CopyRowFromArray(1, 3, 7, 6, 8, 4);
matrix.CopyRowFromArray(2, 2, 99, 9, 10, 4);
console.log(matrix.toString());


//AddElement test
console.log("%c******Same previous Matrix after using AddElement Test******", "color:red;font-weight:bold;");
matrix.AddElement(0, 0, 3);
console.log(matrix.toString());


// Copy from another test using CopyFromAnother
console.log("%c******Copy previous Matrix with CopyFromAnother Test******", "color:red;font-weight:bold;");
var copyMatrix = new Matrix(matrix.RowsLen, matrix.ColumnsLen);
copyMatrix.CopyFromAnother(matrix);
console.log(copyMatrix.toString());

// Copy from another test using CopyColumnFromArray
console.log("%c******Previous Matrix with CopyColumnFromArray Test******", "color:red;font-weight:bold;");
copyMatrix.CopyColumnFromArray(1, 44, 55, 66);
console.log(copyMatrix.toString());

//GetColumnSum Test
console.log("%c******GetColumnSum Test******", "color:red;font-weight:bold;");
console.log(`Sum of elements in first column in previous matrix is ${copyMatrix.GetColumnSum(0)}`);

//GetRowsum Test
console.log("%c******GetRowsum Test******", "color:red;font-weight:bold;");
console.log(`Sum of elements in first row in previous matrix is ${copyMatrix.GetRowsum(0)}`);

//GetCopy Test
console.log("%c******Matrix with GetCopy Test******", "color:red;font-weight:bold;");
console.log(`This is a copy of previous matrix \n${copyMatrix.GetCopy()}`);

//GetCopyOfColumn Test
console.log("%c******Matrix with GetCopyOfColumn Test******", "color:red;font-weight:bold;");
console.log(`This is the first column of previous matrix \n${copyMatrix.GetCopyOfColumn(0)}`);


//GetCopyOfRow Test
console.log("%c******Matrix with GetCopyOfRow Test******", "color:red;font-weight:bold;");
console.log(`This is the second row of previous matrix \n${copyMatrix.GetCopyOfRow(1)}`);


//MultiplyRowBy Test
console.log("%c******Matrix with Multiply Test******", "color:red;font-weight:bold;");
console.log(`This is result of multply previous matrix by itself \n${copyMatrix.Multiply(copyMatrix)}`);

//MultiplyRowBy Test
console.log("%c******Matrix with MultiplyRowBy Test******", "color:red;font-weight:bold;");
copyMatrix.MultiplyRowBy(1, 2);
console.log(`This is result of multply second row with 2 \n${copyMatrix}`);


//MultiplyColumnBy Test
console.log("%c******Matrix with MultiplyColumnBy Test******", "color:red;font-weight:bold;");
copyMatrix.MultiplyColumnBy(1, 2);
console.log(`This is result of multply second column with 2 \n${copyMatrix}`);
