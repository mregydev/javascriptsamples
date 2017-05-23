///*****Mr-EgyDev*****///
///**********///

//Insertion Sort Ascending 
Array.prototype.InsertionSortAsc = function () {
    for (let mainCounter = 1; mainCounter < this.length; ++mainCounter) {
        //Destructuring
        let [counter, key] = [mainCounter - 1, this[mainCounter]];

        while (counter >= 0 && this[counter] > key) {
            //Assign is done first then decrement :)
            this[counter + 1] = this[counter--];
        }
        //Increment is made then assigment
        this[++counter] = key;
    };
    return this;
};


//Insertion sort Descending
Array.prototype.InsertionSortDesc = function () {
    for (let mainCounter = 1; mainCounter < this.length; ++mainCounter) {
        //Destructuring
        let [counter, key] = [mainCounter - 1, this[mainCounter]];

        while (counter >= 0 && this[counter] < key) {
            //Assign is done first then decrement :)
            this[counter + 1] = this[counter--];
        }
        //Increment is made then assigment
        this[++counter] = key;
    };
    return this;
};

//Selection Sort Ascending
Array.prototype.SelectionSortAsc = function () {

    let currentIndex = 0;

    for (let mainCounter = 0; mainCounter < this.length - 1; ++mainCounter) {

        let smallestIndex = mainCounter;

        for (let counter = mainCounter + 1; counter < this.length; ++counter) {
            smallestIndex = this[smallestIndex] < this[counter] ? smallestIndex : counter;
        }
        if (smallestIndex != mainCounter) {
            //replace with destructuring
            [this[smallestIndex], this[mainCounter]] = [this[mainCounter], this[smallestIndex]];
        }
    }
    return this;
};


//Selection Sort Descending
Array.prototype.SelectionSortDesc = function () {

    let currentIndex = 0;

    for (let mainCounter = 0; mainCounter < this.length - 1; ++mainCounter) {

        let biggestIndex = mainCounter;

        for (let counter = mainCounter + 1; counter < this.length; ++counter) {
            biggestIndex = this[biggestIndex] > this[counter] ? biggestIndex : counter;
        }

        if (biggestIndex != mainCounter) {
            //replace with destructuring
            [this[biggestIndex], this[mainCounter]] = [this[mainCounter], this[biggestIndex]];
        }
    }
    return this;
};


function Merge(firstArr, secondArr, isAscending) {
    let mergeResult = new Array();

    while ([firstArrValue, secondArrValue] = [firstArr[0], secondArr[0]]) {

        let getFromFirstArr = isAscending && firstArrValue < secondArrValue || !isAscending && firstArrValue > secondArrValue;

        mergeResult.push(getFromFirstArr ? firstArrValue : secondArrValue);

        [].shift.apply(getFromFirstArr ? firstArr : secondArr);

        if (!firstArr.length || !secondArr.length) {
            break;
        }
    }

    while (firstArr.length && [cuurentValue = firstArr.shift()] || secondArr.length && [cuurentValue = secondArr.shift()]) {
        mergeResult.push(cuurentValue);
    }
    return mergeResult;
};

function MergeSort(arr, isAscending) {
    if (arr.length <= 1) {
        return arr;
    }

    let subArr1 = MergeSort(arr.slice(0, (arr.length-1)/ 2));

    let subArr2 = MergeSort(arr.slice((arr.length-1)/ 2 + 1, arr.length - 1));

    return Merge(subArr1, subArr2, isAscending);
}

Array.prototype.MergeSort = function (isAscending) {
    return  MergeSort(this, isAscending);
}



//Example 
// var arr = [3, 2, 1, 5];
// console.log(arr.InsertionSortDesc());

var arr = [3,2,1,5];

console.log(arr.MergeSort(true));
