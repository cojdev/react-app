class App extends React.Component {
	constructor() {
		super();
		this.state = {
			tasks: []
		}
	}

	componentWillMount() {
		if (localStorage && localStorage.getItem('tasks')) {
			this.setState({
				tasks: JSON.parse(localStorage.getItem('tasks'))
			});
		}
		else {
			this.setState({
				tasks: [
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
				]
			})
		}
		this.setState({
			activeList: 'all',
			activeTag: 'all',
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
	setActiveList(list) {
		let activeList = list;
		this.setState({activeList: activeList});
	}  

	setTag(tag) {
		this.setState({activeTag: tag.name});
	}

	update() {
		let tasks = this.state.tasks;
		tasks.forEach(function(obj) {
			if (obj.tag === undefined) {
				obj.tag = false;
			}
		})
		this.setState({tasks: tasks});
	}

	// Getters
	getCompletedTasks() {
		let tasks = this.state.tasks;
		let completed = tasks.filter(item => item.completed === true);
		return completed.length;
	}

	getTotalTasks() {
		return this.state.tasks.length;
	}

	getActiveList() {
		let active = this.state.activeList;
		let tasks = this.state.tasks;
		switch (active) {
			case 'all':
				return tasks;
				break;
			case 'active':
				return tasks.filter(item => item.completed === false);
				break;
			case 'completed':
				return tasks.filter(item => item.completed === true);
				break;
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
					update={this.update.bind(this)}/>

				<TaskList 
					tasks={this.getActiveList.call(this)}
					removeTask={this.handleRemoveTask.bind(this)}
					checkTask={this.handleCheckTask.bind(this)}
					tags={this.state.tags} />

				<TaskControls
					completed={this.getCompletedTasks.bind(this)}
					total={this.getTotalTasks.bind(this)}
					activeList={this.state.activeList}
					setActiveList={this.setActiveList.bind(this)}
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