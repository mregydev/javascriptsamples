///*****Mr-EgyDev*****///
//Destructuring   
///**********///

//Insertion sort 
Array.prototype.InsertionSort = function (isAsecending = false) {
    for (let mainCounter = 1; mainCounter < this.length; ++mainCounter) {
        //Destructuring
        let [counter, key] = [mainCounter - 1, this[mainCounter]];

        while (counter >= 0 && (!isAsecending && this[counter] < key || isAsecending && this[counter] > key)) {
            //Assign is done first then decrement :)
            this[counter + 1] = this[counter--];
        }
        //Increment is made then assigment
        this[++counter] = key;
    };
    return this;
};

//Selection Sort 
Array.prototype.SelectionSort = function (isAscending = false) {

    let currentIndex = 0;

    for (let mainCounter = 0; mainCounter < this.length - 1; ++mainCounter) {

        let biggestIndex = mainCounter;

        for (let counter = mainCounter + 1; counter < this.length; ++counter) {
            biggestIndex = !isAscending && this[biggestIndex] > this[counter] || isAscending && this[biggestIndex] < this[counter] ? biggestIndex : counter;
        }

        if (biggestIndex != mainCounter) {
            //replace with destructuring
            [this[biggestIndex], this[mainCounter]] = [this[mainCounter], this[biggestIndex]];
        }
    }
    return this;
};

//Merge sort
Array.prototype.MergeSort = function (isAscending = true) {
    return MergeSort(this, isAscending);
};


//Count sort
Array.prototype.QuickSort = function (isAsecending = true) {
    return Quicksort(this,0,this.length,isAsecending);
};




//Helper functions 
function Quicksort(arr, low, high,isAsecending){
    if (low < high){
        let pivot_location = Partition(arr,low,high,isAsecending);
        Quicksort(arr,low, pivot_location,isAsecending)
        Quicksort(arr, pivot_location + 1, high,isAsecending)
        return arr;
    }
}

function Partition(arr, low, high,isAscending) {
    let pivot = arr[low];
    let currentIndex = low;

    for (let i = low + 1; i < high; ++i) {
        if (!isAscending&& arr[i] > pivot  || isAscending && arr[i]<pivot) {
            [arr[i], arr[currentIndex]] = [arr[currentIndex], arr[i]];
            currentIndex += 1;
        }
    }
    [pivot, arr[currentIndex]] = [arr[currentIndex], pivot];
    return currentIndex;
}


function Merge(firstArr, secondArr, isAscending) {
    let mergeResult = new Array();

    while ([firstArrValue, secondArrValue] = [firstArr[0], secondArr[0]]) {
        //read value from first array or second array 
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

    let subArr1 = MergeSort(arr.slice(0, arr.length / 2), isAscending);

    let subArr2 = MergeSort(arr.slice(arr.length / 2, arr.length), isAscending);


    return Merge(subArr1, subArr2, isAscending);
};
