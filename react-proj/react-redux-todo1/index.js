const ReactCssTransitionGroup = React.addons.CSSTransitionGroup;
const { createStore, combineReducers } = Redux
const { connect, Provider } = ReactRedux


// STORE


// RECUDERS

// TODOS recuder
const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined, action)
            ]
        case 'TOGGLE_TODO':
            return state.map(t => todo(t, action))

        case 'REMOVE_COMPLETED_TODOS':
            return state.filter(
                t => !t.completed
            )

        default:
            return state
    }
}


// TODO reducer
const todo = (state, action) => {
    switch (action.type){
        case 'ADD_TODO':
            return {
                index: action.id,
                text: action.text,
                completed: false
            }
        case 'TOGGLE_TODO':
            if (state.index !== action.id) {
                return state
            }
            return {
                ...state,
                completed: !state.completed
            }

        default:
            return state
    }
}

const addTodo = (
    state = {isFocused: false, isFilled: false},
    action
) => {
    switch(action.type) {
        case 'SET_ADD_TODO_FOCUS':
            return {
                ...state,
                isFocused: action.focus
            }
        case 'SET_ADD_TODO_FILL':
            return {
                ...state,
                isFilled: action.fill
            }
        default:
            return state
    }
}


// VISIBILITY reducer
const showAllTodos = (state = true, action) => {
    switch (action.type) {
        case 'TOGGLE_SHOW_FILTER':
            let newState = !state
            return newState

        default:
            return state
    }
}


// UI reducer
const uiFilter = (state = 'DEFAULT_COLOR', action) => {
    switch (action.type) {
        case 'SET_UI_FILTER':
            return action.filter

        default:
            return state
    }
}


const todoApp = combineReducers({
    todos,
    addTodo,
    showAllTodos,
    uiFilter
})


// ACTION CREATORS

const setFocusAddTodoAction = (focus) => {
    return {
        type: 'SET_ADD_TODO_FOCUS',
        focus
    }
}

const onChangeAddTodoAction = (fill) => {
    return {
        type: 'SET_ADD_TODO_FILL',
        fill
    }
}

const addTodoAction = (text) => {
    return {
        type: 'ADD_TODO',
        id: Date.now(),
        text
    }
}

const toggleTodoAction = (id) => {
    return {
        type: 'TOGGLE_TODO',
        id
    }
}


const setUiFilterAction = (filter) => {
    return {
        type: 'SET_UI_FILTER',
        filter
    }
}

const showAllTodosAction = () => {
    return {
        type: 'TOGGLE_SHOW_FILTER'
    }
}

const clearCompletedTodos = () => {
    return {
        type: 'REMOVE_COMPLETED_TODOS'
    }
}

// CREATING STORE
const defaultTodos = {
    todos: [
        { index: 1, text: 'first todo', completed: false},
        { index: 2, text: 'second todo', completed: true}
    ]
}

const store = createStore(todoApp, defaultTodos)


/////////////////////////////////

const _AddTodo = ({
                      isFilled,
                      onSubmit,
                      setFocus,
                      onChange
                  }) => {
    let input = null

    return(
        <div className='su-form-wrapper'>
            <form
                className={`su-form-add ${isFilled ? 'is-filled' : ''}`}
                onSubmit={(e) => {
                    e.preventDefault()
                    onSubmit(input.value)
                    input.value = ''
                    onChange(input.value.length > 0)
                }}>
                <input
                    ref = {node => {input = node}}
                    onFocus = {() => setFocus(true) }
                    onBlur = {() => setFocus(false) }
                    onChange = {() => onChange(input.value.length > 0)}
                    className = 'su-form-field su-field-todo'
                    placeholder = 'What is next?'/>
                <button type="submit" className='su-button su-btn-add'>Add</button>
            </form>
        </div>
    )
}

const mapAddTodoStateProps = (state) => {
    return {
        isFilled: state.addTodo.isFilled
    }
}


const AddTodo = connect(
    mapAddTodoStateProps,
    {
        onSubmit: addTodoAction,
        setFocus: setFocusAddTodoAction,
        onChange: onChangeAddTodoAction
    }
)(_AddTodo)


///////////////////////////////


const _TodoList = ({todos, onTodoClick}) => (
    <div className='su-widget-content'>
        <ul className='su-list su-todo-list'>
            <ReactCssTransitionGroup
                transitionName='is-fade'
                transitionEnterTimeout={200}
                transitionLeaveTimeout={200}
            >
                {todos.map(todo =>
                    <Todo key={todo.index}
                          {...todo}
                          onClick={() => onTodoClick(todo.index)}
                    />
                )}
            </ReactCssTransitionGroup>
        </ul>
    </div>
)

////

const getVisibleTodos = (
    todos,
    showAllTodos
) => {
    if (showAllTodos) {
        return todos
    } else {
        return todos.filter(
            t => !t.completed
        )
    }
}

const mapTodoListStateToProps = (state) => {
    return {
        todos: getVisibleTodos(state.todos, state.showAllTodos)
    }
}

const TodoList = connect(
    mapTodoListStateToProps,
    { onTodoClick: toggleTodoAction }
)(_TodoList)


/////////////////////////////////


const Todo = ({
                  onClick,
                  completed,
                  text
              }) => (
    <li
        onClick={onClick}
        className={`su-todo-item ${completed ? 'is-completed' : ''}`}>
        <span>{text}</span>
    </li>
)


/////////////////////////////////


const _FilterButton = ({
                           isEnabled,
                           showAllTodos,
                           onClick
                       }) => {
    return (
        <div className='su-action-filter'>
            <button disabled={!isEnabled}
                    className='su-button su-btn-filter'
                    onClick={e => {
                        e.preventDefault()
                        onClick(showAllTodos)
                    }}>
                {showAllTodos ? 'Only Active' : 'Show All'}
            </button>
        </div>
    )
}


const mapFilterButtonStateProps = (state) => {
    return {
        showAllTodos: state.showAllTodos
    }
}


const FilterButton = connect(
    mapFilterButtonStateProps,
    { onClick:  showAllTodosAction }
)(_FilterButton)


///////

const ClearButton = ({
                         children,
                         isEnabled,
                         onClick
                     }) => (
    <div className='su-action-filter'>
        <button
            disabled={!isEnabled}
            onClick={() => onClick()}
            className='su-button su-btn-filter'>
            {children}
        </button>
    </div>
)

///////

const _TodoFilters = ({
                          isEnabled,
                          showAllTodos,
                          clearCompletedTodos
                      }) => (
    <div className={`su-widget-footer su-actions ${isEnabled ? 'is-shown' : ''}`}>
        <FilterButton
            isEnabled={isEnabled}>
        </FilterButton>
        <ClearButton
            isEnabled={isEnabled}
            onClick={clearCompletedTodos}>
            Clear done
        </ClearButton>
    </div>
)


const mapTodoFiltersStateProps = (state) => {
    return {
        isEnabled: state.todos.length > 0
    }
}

const TodoFilters = connect(
    mapTodoFiltersStateProps,
    { clearCompletedTodos }
)(_TodoFilters)


/////////////////////////////////

const ColorButton = ({
                         active,
                         color,
                         filter,
                         children,
                         onClick
                     }) => {
    return (
        <div>
            <button className={`su-button su-color-picker ${color} ${active ? 'is-selected' : ''}`}
                    onClick={e => {
                        e.preventDefault
                        onClick(filter)
                    }}>{children}</button>
        </div>
    )
}


const mapColorButtonToProps = (
    state,
    ownProps
) => {
    return {
        active: ownProps.filter === state.uiFilter,
        filter: ownProps.filter,
        color: 'su-color-'+ownProps.color
    }
}

const FilterColor = connect(
    mapColorButtonToProps,
    { onClick: setUiFilterAction }
)(ColorButton)


// UI FILTERS Container

const UiFilters = () => (
    <footer className='su-footer su-ui-filters'>
        <FilterColor
            filter='DEFAULT_COLOR'
            color='default'>
        </FilterColor>
        <FilterColor
            filter='SATURATED_COLOR'
            color='saturated'>
        </FilterColor>
        <FilterColor
            filter='DARK_COLOR'
            color='dark'>
        </FilterColor>
    </footer>
)


// TODO APP Cointaner

const _TodoApp = ({
                      isFocused,
                      isFilled
                  }) => (
    <div className='su-widget'>
        <div className={`su-widget-header ${isFocused || isFilled ? 'is-shown': ''}`}>
            <h3>Today</h3>
            <span className='su-date'>March 03, 2017</span>
            <AddTodo />
        </div>
        <TodoList />
        <TodoFilters />
    </div>
)

const mapTodoAppStateProps = (state) => {
    return {
        isFocused: state.addTodo.isFocused || state.todos < 1,
        isFilled: state.addTodo.isFilled
    }
}

const TodoApp = connect(
    mapTodoAppStateProps
)(_TodoApp)

// ROOT Container

const AppRoot = ({
                     theme
                 }) => (
    <div className='su-layout'>
        <TodoApp />
        <UiFilters />
        {console.log(store.getState())}
    </div>
)


// THEME Container

const getSelectedTheme = (filter) => {
    switch (filter) {
        case 'DEFAULT_COLOR':
            return 'default-theme'

        case 'SATURATED_COLOR':
            return 'saturated-theme'

        case 'DARK_COLOR':
            return 'dark-theme'
    }
}

const clearClassNames = (node) => {
    let classes = node.className.split(' ')
    if (classes.length < 2 && classes[0] == "") {
        return
    }
    classes.forEach((className) => {
        document.body.classList.remove(className)
    })
}

const _ThemePicker = React.createClass({

    componentDidMount() {
        document.body.classList.add(getSelectedTheme(this.props.filter))
    },

    componentWillReceiveProps(nextProps) {
        clearClassNames(document.body)
        document.body.classList.add(getSelectedTheme(nextProps.filter))
    },

    render() {
        return this.props.children
    }
})


const mapThemeStateProps = (
    state
) => {
    return {
        filter: state.uiFilter
    }
}

const ThemePicker = connect(
    mapThemeStateProps
)(_ThemePicker)


////////////////////////////////////

ReactDOM.render(
    <Provider store={store}>
        <ThemePicker>
            <AppRoot />
        </ThemePicker>
    </Provider>,
    document.getElementById('app')
)


console.log('new Render')