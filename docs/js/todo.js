// React Todo Application

function uuid(len) {
  let length = len || 6;
  let charCodes = [];
  let string = '';

  for (let i = 0; i < 10; i++) {
    charCodes.push(48 + i);
    charCodes.push(97 + i);
  }
  for (let i = 0; i < 16; i++) {
    charCodes.push(107 + i);
  }

  for (let i = 0; i < length; i++) {
    let charIndex = Math.floor(Math.random() * charCodes.length);
    string = string + String.fromCharCode(charCodes[charIndex]);
  }

  return string;
}

function colour() {
	let val = '#',
			chars = '1234567890ABCDEF';
	for (let i = 0; i < 6; i++) {
		let temp = chars.split('')[Math.floor(Math.random()*16)];
		val += temp + '';
	}
	console.log(val);
	return val;
}

class AddTask extends React.Component {

	constructor() {
		super();
		this.state = {
			newTask: {}
		};
	}
	
	handleSubmit(e) {
		if (this.refs.taskName.value === '') {
			alert('Please enter a task');
		}
		else {
			this.setState({newTask: {
				content: this.refs.taskName.value,
				completed: false,
				id: uuid(),
				tag: false
			}}, function () {
				console.log(this.state);
				this.props.addTask(this.state.newTask);
				this.refs.taskName.value = '';
			});
		}
		e.preventDefault();
	}

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)} className="task-form">
				<div className="task-input">
					<input type="text" ref="taskName" placeholder="What do you need to do?"/>
				</div>
				<button className="task-add-button" type="submit" value="Submit">
					<svg viewBox="0 0 40 40">
						<path d="M10 20 L30 20 M20 10 L20 30" />
					</svg>
				</button>
      </form>
    );
  }
}

class TaskItem extends React.Component {
	removeTask(id) {
		this.props.onRemove(id);
	}

	checkTask(id) {
		this.props.onCheck(id);
	}

	render() {
		return (
			<li>
				<input
					id={this.props.task.id}
					type="checkbox"
					checked={this.props.task.completed}
					onChange={this.checkTask.bind(this, this.props.task.id)}/>
				<label htmlFor={this.props.task.id}>
					{this.props.task.content}
				</label>
				<button
					className="task-item-remove"
					onClick={this.removeTask.bind(this, this.props.task.id)}>
					<svg viewBox="0 0 40 40">
						<path d="M15 15 L25 25 M25 15 L15 25" />
					</svg>
				</button>
			</li>
		);
		
	}
}

class TaskList extends React.Component {

	render() {
		let taskItems = this.props.tasks.map(task => {
      // console.log(task.id);
      return (
				<TaskItem task={task} key={task.id} onRemove={this.props.removeTask.bind(this)} onCheck={this.props.checkTask.bind(this)} />
      )
    });

		return (
			<ul className="task-list">
				{taskItems}
			</ul>
		)
	}
}

class TaskControls extends React.Component {
	render() {
		return (
			<div className="task-controls">
				<span>{this.props.completed()} / {this.props.total()} Tasks Completed</span>
				<button
					onClick={this.props.setActiveList.bind(this, 'all')}
					className={this.props.activeList === 'all' ? 'btn-active' : ''}>
					All Tasks
				</button>
				<button
					onClick={this.props.setActiveList.bind(this, 'active')}
					className={this.props.activeList === 'active' ? 'btn-active' : ''}>
					Active
				</button>
				<button
					onClick={this.props.setActiveList.bind(this, 'completed')}
					className={this.props.activeList === 'completed' ? 'btn-active' : ''}>
					Completed
				</button>
				<button
					onClick={this.props.clearCompleted}>
					Clear Completed
				</button>
			</div>
		)
	}
}

class Tags extends React.Component {
	render() {
		let tags = this.props.tags;
		tags = tags.map(tag => {
			let dotStyle = {
				background: tag.colour
			};
			return (
				<button key={tag.id}>
					<span style={dotStyle}></span>
					{tag.name}
				</button>
			);
		});
		return (
			<div className="task-tags">
				{tags}
			</div>
		);
	}
}

class Modal extends React.Component {
	render() {
		return (
			<div className="modal-wrap">
				<div className="modal">
					<p>{this.props.content}</p>
				</div>
			</div>
		);
	}
}

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
						completed: false 
					},
					{
						id: uuid(),
						content: "Make another app",
						completed: false
					},
					{
						id: uuid(),
						content: "Make to do list",
						completed: true 
					}
				]
			})
		}
		this.setState({
			activeList: 'all',
			tags: [
				{
					id: uuid(),
					name: 'Home',
					colour: colour()
				},
				{
					id: uuid(),
					name: 'Work',
					colour: colour()
				},
				{
					id: uuid(),
					name: 'School',
					colour: colour()
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

				<Tags tags={this.state.tags}/>

				<TaskList 
					tasks={this.getActiveList.call(this)}
					removeTask={this.handleRemoveTask.bind(this)}
					checkTask={this.handleCheckTask.bind(this)} />

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