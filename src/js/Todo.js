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

function colour(bright) {
  let val;

  if (bright) {
    val = 'hsl(' + Math.floor(Math.random() * 360) + ', 100%, 60%)';
  }
  else {
    val = '#';
    let chars = '1234567890ABCDEF'.split('');
    for (let i = 0; i < 6; i++) {
      val += chars[Math.floor(Math.random() * chars.length)];
    }
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
      this.setState({
        newTask: {
          content: this.refs.taskName.value,
          completed: false,
          id: uuid(),
          tag: 'Home'
        }
      }, function () {
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
          <input type="text" ref="taskName" placeholder="What do you need to do?" />
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
    let tags = this.props.tags,
      task = this.props.task;

    //let colour = tags[task.tag] !== undefined ? tags[task.tag].colour : '#ccc';

    //let tagStyle = {
    //	borderColor: tags[task.tag].colour
    //}
    return (
      <li>
        <input
          id={this.props.task.id}
          type="checkbox"
          checked={this.props.task.completed}
          onChange={this.checkTask.bind(this, this.props.task.id)} />
        <label
          htmlFor={this.props.task.id}>
          {this.props.task.content}
          <span
            className="task-strike">
          </span>
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
        <TaskItem
          task={task}
          key={task.id}
          onRemove={this.props.removeTask.bind(this)}
          onCheck={this.props.checkTask.bind(this)}
          tags={this.props.tags} />
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
    let filters = this.props.filters;
    filters = filters.map(filter => {
      console.log(filter);
      return (
        <button
          key={filter.id}
          onClick={this.props.setFilter.bind(this, filter)}
          className={this.props.activeFilter === filter.name ? 'btn-active' : ''}>
          {filter.label || filter.name}
        </button>
      );
    });

    return (
      <div className="task-controls">
        <span>{this.props.completed()} / {this.props.total()} Completed</span>
        {filters}
        <button
          onClick={this.props.clearCompleted}>
          <i className="fa fa-trash-o" aria-hidden="true"></i> Clear Completed
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
      let activeStyle = {
        boxShadow: '0 0 0 2px ' + tag.colour
      };
      return (
        <button
          key={tag.id}
          onClick={this.props.setTag.bind(this, tag)}
          style={tag.name === this.props.activeTag ? activeStyle : {}}>
          <span style={dotStyle}></span>
          {tag.name}
        </button>
      );
    });
    return (
      <div className="task-tags">
        <span>Tags </span> &nbsp;
                  {tags}
        <button
          onClick={this.props.reset.bind(this)}>Reset</button>
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