class App extends React.Component {
	constructor() {
		super();
		this.state = {
			tasks: []
		}
	}

	componentWillMount() {
        let initial = [
            {
                id: uuid(),
                content: "Learn React",
                completed: false,
                tag: 'Work'
            },
            {
                id: uuid(),
                content: "Make another app",
                completed: false,
                tag: false
            },
            {
                id: uuid(),
                content: "Make to do list",
                completed: true,
                tag: false
            }
        ];
		if (localStorage && localStorage.getItem('tasks')) {
			this.setState({
				tasks: JSON.parse(localStorage.getItem('tasks'))
			});
		}
		else {
			this.setState({tasks: initial})
		}
		this.setState({
			activeList: 'all',
            activeTag: 'all',
            initial: initial,
			tags: [
				{
					id: uuid(),
					name: 'all',
					colour: colour(true)
				},
				{
					id: uuid(),
					name: 'Home',
					colour: colour(true)
				},
				{
					id: uuid(),
					name: 'Work',
					colour: colour(true)
				},
				{
					id: uuid(),
					name: 'School',
					colour: colour(true)
				}
            ],
            filters: [
                {   
                    id: uuid(),
                    name: 'all',
                    label: 'All Tasks',
                    method: function (item) {
                        return item;
                    }
                },
                {   
                    id: uuid(),
                    name: 'active',
                    label: 'Active',
                    method: function (item) {
                        return item.completed === false;
                    }
                },
                {   
                    id: uuid(),
                    name: 'completed',
                    label: 'Completed',
                    method: function (item) {
                        return item.completed === true;
                    }
                }
            ]
		})
		
	}

	// Handlers
	handleAddTask(task) {
		console.log(task);
		let tasks = this.state.tasks;
		tasks.unshift(task);
		this.setState({tasks: tasks});
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}

	handleRemoveTask(id) {
		console.log('Delete ' + id);
		let tasks = this.state.tasks;
		let target = tasks.findIndex(index => index.id === id);
		tasks.splice(target, 1);
		this.setState({tasks: tasks});
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}

	handleCheckTask(id) {
		console.log('Check ' + id);
		let tasks = this.state.tasks;
		let target = tasks.findIndex(index => index.id === id);
		tasks[target].completed = tasks[target].completed === true ? false : true;
		this.setState({tasks: tasks});
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}

	// Setters
	setFilter(filter) {
		let activeFilter = filter.name;
		this.setState({activeFilter: activeFilter});
	}  

	setTag(tag) {
        let activeTag = tag.name;
		this.setState({activeTag: activeTag});
	}

	reset() {
        let tasks =  this.state.initial;
		this.setState({tasks: tasks});
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}

	// Getters
	getTotalCompleted() {
		let tasks = this.state.tasks;
		let completed = tasks.filter(item => item.completed === true);
		return completed.length;
	}

	getTotalTasks() {
		return this.state.tasks.length;
	}

	getActiveList() {
        let filter = this.state.activeFilter;
        let tag = this.state.activeTag;
		let tasks = this.state.tasks;

        //Filte by Filter
        for (let i = 0, len = this.state.filters.length; i < len; i++) {
            const element = this.state.filters[i];
            if (filter === element.name) {
                tasks = tasks.filter(function (item) {
                    return element.method(item);
                });
            }
        }

        // Filter by Tag
        if (tag === 'all') {
            return tasks;
        }
        else {
            return tasks.filter(item => item.tag === tag);
        }
	}

	clearCompleted() {
		let tasks = this.state.tasks;
		tasks = tasks.filter(item => item.completed === false);
		this.setState({tasks: tasks});
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}

	render() {
		return (
			<div className="app">
        <AddTask addTask={this.handleAddTask.bind(this)} />

				<Tags
					tags={this.state.tags}
					setTag={this.setTag.bind(this)}
					activeTag={this.state.activeTag}
					reset={this.reset.bind(this)}/>

				<TaskList 
					tasks={this.getActiveList.call(this)}
					removeTask={this.handleRemoveTask.bind(this)}
					checkTask={this.handleCheckTask.bind(this)}
					tags={this.state.tags} />

				<TaskControls
                    completed={this.getTotalCompleted.bind(this)}
                    filters={this.state.filters}
					total={this.getTotalTasks.bind(this)}
					activeFilter={this.state.activeFilter}
					setFilter={this.setFilter.bind(this)}
					clearCompleted={this.clearCompleted.bind(this)} />

				 {/* <Modal content="Nothing yet" /> */}
			</div>
		);
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
);