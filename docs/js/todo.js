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

class TaskForm extends React.Component {
	addTask(e) {
		e.preventDefault();
	}

  render() {
    return (
      <form onSubmit={this.addTask.bind(this)} className="task-form">
				<div className="task-input">
					<input type="text" placeholder="What do you need to do?"/>
				</div>
				<button className="task-add-button" type="Submit">
					<svg viewBox="0 0 40 40">
						<path d="M10 20 L30 20 M20 10 L20 30" />
					</svg>
				</button>
      </form>
    );
  }
}

class TaskList extends React.Component {
	render() {
		let taskItems = this.props.tasks.map(task => {
      console.log(task.id);
      return (
				<li key={task.id}><input id={task.id} type="checkbox"/>
          <label htmlFor={task.id}>{task.content}</label>
          <button className="task-item-remove"></button>
        </li>
      )
    });

		return (
			<ul className="task-list">
				{taskItems}
			</ul>
		)
	}
}

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			tasks: [
				{
					id: uuid(),
					content: "Make task list",
					completed: false 
				},
				{
					id: uuid(),
					content: "Make Presentation",
					completed: true
				}
			]
		}
	}
	render() {
		return (
			<div className="app">
        <TaskForm />
				<TaskList tasks={this.state.tasks} />
			</div>
		);
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
);