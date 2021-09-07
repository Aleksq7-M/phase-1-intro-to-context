// Your code here

function createEmployeeRecord([name1,name2,title,payPerHour]){
    const employeeObject = {
        firstName: name1,
        familyName: name2,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };

    return employeeObject;
}

function createEmployeeRecords(arrays){
    let newRecordsArray = arrays.map(array => createEmployeeRecord([...array]));
    return newRecordsArray;
}

function createTimeInEvent(employeeObj, dateStr/*!!MUST BE "YYYY-MM-DD HHMM" FORMAT*/){
    let timeInEvent = {
        type: 'TimeIn',
        hour: parseInt(dateStr.slice(11)),
        date: dateStr.slice(0,10)
    }
    employeeObj.timeInEvents.push(timeInEvent);
    return employeeObj;
    console.log(employeeObj);
}

function createTimeOutEvent(employeeObj, dateStr/*!!MUST BE "YYYY-MM-DD HHMM" FORMAT*/){
    let timeOutEvent = {
        type: 'TimeOut',
        hour: parseInt(dateStr.slice(11)),
        date: dateStr.slice(0,10)
    }
    employeeObj.timeOutEvents.push(timeOutEvent);
    return employeeObj;
    console.log(employeeObj);
}

function hoursWorkedOnDate(employeeObj, dateStr/*MUST BE IN "YYYY-MM-DD" FORMAT*/){
    let a = 0;
    let b = 0;
    employeeObj.timeInEvents.forEach(event => {
        if (event.date === dateStr){
            a = event.hour;
        }
    })
    employeeObj.timeOutEvents.forEach(event => {
        if (event.date === dateStr){
            b = event.hour;
        }
    })

    return (b-a)/100;
    
}

function wagesEarnedOnDate(employeeObj, dateStr){
    return (employeeObj.payPerHour) * hoursWorkedOnDate(employeeObj, dateStr);

}

function allWagesFor(employeeObj){
    let dates = [];
    employeeObj.timeOutEvents.forEach(event => {
        dates.push(event.date);
    })
    let result = 0;
    dates.forEach(date => {
        result += wagesEarnedOnDate(employeeObj, date)
    })
    return result;
}

function calculatePayroll(employees){
    let totalPayrollAmount = 0;
    employees.forEach(employee => {
        totalPayrollAmount += allWagesFor(employee);
    })
    return totalPayrollAmount;
}
