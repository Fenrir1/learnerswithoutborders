const studentsLoaded = (students) => {
    return {
        type: 'STUDENTS_LOADED',
        payload: students
    };     
}

const teachersLoaded = (teachers) => {
    return {
        type: 'TEACHERS_LOADED',
        payload: teachers
    };     
}

const teacherLoggedIn = (teacher) => {
    return {
        type: 'TEACHER_LOGGEDIN',
        payload: teacher
    };     
}

const studentLoggedIn = (student) => {
    /*console.log('studentLoggedIn');*/
    return {
        type: 'STUDENT_LOGGEDIN',
        payload: student
    };     
}

const testAction = (student) => {
    console.log('testing...');
    return {
        type: 'TEST',
        payload: 'test action'
    };     
}

export {
    studentsLoaded,
    teachersLoaded,
    teacherLoggedIn,
    studentLoggedIn,
    testAction
};