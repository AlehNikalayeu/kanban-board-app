const initialState = {
    appName: 'Kanban Board',
    boardStatuses: [
        {id: "1", status: "Todo"},
        {id: "2", status: "In progress"},
        {id: "3", status: "In review"},
        {id: "4", status: "Done"},
    ],
    tasks: [
        {name: 'Learn redux', id: 111, description: 'do kanban with redux', status: 'Todo', priority: 5},
        {name: 'Learn axios', id: 112, description: 'do kanban with server', status: 'In progress', priority: 2},
        {name: 'Learn Typescript', id: 113, description: 'do homework on Typescript', status: 'In progress', priority: 3},
        {name: 'Learn graphQL', id: 114, description: 'learn documentation', status: 'In review', priority: 8},
        {name: 'Learn unit tests', id: 115, description: 'join to webinar', status: 'Done', priority: 7},
        {name: 'Find a job', id: 116, description: 'good salary, remote', status: 'Done', priority: 10},
    ],
    priorities: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
}

const kanban = (state = initialState, action) => {
    switch (action.type) {
        case 'DELETE_TASK':
            const updatedTask = state.tasks.filter((task) => task.id !== action.payload)
            return {...state, tasks: updatedTask};

        case 'CHANGE_PRIORITY':
            const value = action.payload.direction === 'up' ? 1 : -1;
            const newTask = state.tasks.map(task => task.id === action.payload.id ? {...task, priority: task.priority + value} : task)
            return {...state, tasks: newTask}

        case 'MOVE_TASK':
            const stringArrayStatuses = state.boardStatuses.map(el => el.status);
            const currentIndexStatus = stringArrayStatuses.indexOf(action.payload.status);
            const newStatusIndex = currentIndexStatus + (action.payload.direction === 'right' ? 1 : -1);
            const newStatus = stringArrayStatuses[newStatusIndex];
            const newTask2 = state.tasks.map(task => task.id === action.payload.id ? {...task, status: newStatus} : task);
            return {...state, tasks: newTask2}

        case 'CREATE_TASK':
            return {...state, tasks: [...state.tasks, action.payload]}

        case 'UPDATE_TASK':
            const updateTask = state.tasks.map((task) => task.id === action.payload.id ? {...task, ...action.payload} : task)
            return {...state, tasks: updateTask}

        default:
            return state
    }
}

export default kanban