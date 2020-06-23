const initialState = {
    students: [],
    teachers: [],
    tests: [],
    logged_in: false,
    role: 'student',
    user: null
}


/*const updatePost = (state, postId, details) => {
    const { posts } = state;
    if ( postId === -1) {
        let newId = Math.floor(Math.random()*(27-6))+6;
        const newPost = { ...details, id: newId};
        return [
            ...posts,
            newPost
        ]
    } else {
        const curPostIdx = posts.findIndex(({id}) => id === postId);
        const post = posts[curPostIdx];
        const newPost = {...post, ...details};
        return [
            ...posts.slice(0, curPostIdx),
            newPost,
            ...posts.slice(curPostIdx + 1)
        ]
    }
};*/

const reducer = (state = initialState, action) => {

    console.log(action.type, action.payload);

    switch (action.type) {  

        case 'TEST':   
            return {
                ...state
            };
            
        case 'STUDENTS_LOADED':   
            return {
                ...state,
                students: action.payload
            };

        case 'TEACHERS_LOADED':   
            return {
                ...state,
                teachers: action.payload
            };
        
        case 'STUDENT_LOGGEDIN':
            return {
                ...state,
                logged_in: true,
                role: 'student',
                user: action.payload
            };

        case 'TEACHER_LOGGEDIN':
            return {
                ...state,
                logged_in: true,
                role: 'teacher',
                user: action.payload
            };
        
        default:
            return state;
    };
};

export default reducer;