///*****Mr-EgyDev*****///
///*****Main Concepts used Here are (Arrow functions - Destructring - Recusrion - block scoped declaration with let - foreach looping) *****///
///**********///


//Deep copy an object into another 
//Returns cloned object
function DeepCopy(srcObj) {
    //In case source object is primitive return
    if (typeof srcObj != "object")
        return null;
    let clonedObject = {};
    //extract source object properites
    let keys = Object.keys(srcObj);
    //Clone properties of source object into new cloned one
    keys.forEach((key) => {
        clonedObject[key] = typeof srcObj[key] === "object" ? DeepCopy(srcObj[key]) : srcObj[key];
    });
    return clonedObject;
}





/**********Example using DeepCopy function **********/
console.log("%cMr.Egydev --- DeepCopy function Test ---", "color:blue;font-weight:bold;");

//Intialize instances and then clone them
var firstStudent = { firstName: "alaa", major: "computer science", university: { name: "AinShams", location: "Cairo" } },
    secondStudent = { firstName: "yehia", major: "computer science", university: { name: "Helwan", location: "Helwan" } },
    //Cloning two objects (firstStudent,secondStudent) and assign them using destructring
    [firstStudentClone, secondStudentClone] = [DeepCopy(firstStudent), DeepCopy(secondStudent)];


console.log(firstStudentClone, secondStudentClone);
