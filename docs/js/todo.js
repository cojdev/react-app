/**
 * React Todo Application
 */

function uid(len) {
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

class TaskList extends React.Component {
	render() {
		let taskItems = this.props.tasks.map(task => {
      console.log(task.id);
      return (
				<li key={task.id}><input type="checkbox"/>{task.content}</li>
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
					id: uid(),
					content: "Make task list",
					completed: false 
				},
				{
					id: uid(),
					content: "Make Presentation",
					completed: true
				}
			]
		}
	}
	render() {
		return (
			<div className="react">
        <h1>React Todo App</h1>
				<TaskList tasks={this.state.tasks} />
			</div>
		);
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
);