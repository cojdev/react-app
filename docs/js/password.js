// Helpers
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

// Number Input Component
class InputNumber extends React.Component {
  handleChange(e) {
    this.props.onChange(this.props.base, e.target.value);
  }
  render() {
    return (
    <div
      className="form-group">
      <label
        htmlFor={this.props.base.id}>{this.props.base.label}</label>
      <input
        type="number"
        id={this.props.base.id}
        value={this.props.base.value}
        onChange={this.handleChange.bind(this)}
        className="form-control" />
    </div>
    );
  }
}

// Text Input Component
class InputText extends React.Component {
  handleChange(e) {
    this.props.onChange(this.props.base, e.target.value);
  }
  render() {
    return (
      <div
      className="form-group">
      <label
        htmlFor={this.props.base.id}>{this.props.base.label}</label>
      <input
        type="text"
        id={this.props.base.id}
        value={this.props.base.value}
        onChange={this.handleChange.bind(this)}
        className="form-control" />
    </div>
    );
  }
}

// Checkbox Input Component
class InputBoolean extends React.Component {
  render() {
    return (
      <div
        className="form-check">
        <input
          type="checkbox"
          id={this.props.base.id}
          checked={this.props.base.value}
          onChange={this.props.onCheck.bind(this)}
          className="form-check-input" />
        <label
          htmlFor={this.props.base.id}
          className="form-check-label">{this.props.base.label}</label>
      </div>
    );
  }
}

class Options extends React.Component {
  handleSubmit(e) {
    this.props.handleSubmit();
    e.preventDefault();
  }

  render() {
      
      let settings = this.props.settings.map(item => {
        switch(item.type) {
          case 'number':
            return (
              <InputNumber
                key={item.id}
                base={item}
                onChange={this.props.changeSetting.bind(this)} />
            );
            break;
          case 'boolean':
            return (
              <InputBoolean
                key={item.id}
                base={item}
                onCheck={this.props.changeSetting.bind(this, item)} />
            );
            break;
          case 'text':
            return (
              <InputText
                key={item.id}
                base={item}
                onChange={this.props.changeSetting.bind(this)} />
            )
        }
        
      });

    return (
      <div
        className="card">
        <form
          className="card-body"
          onSubmit={this.handleSubmit.bind(this)}>
          {/* <InputNumber
            base={settings.length} />
          <InputBoolean
            base={settings.uppercase}
            onCheck={this.props.changeSetting.bind(this, settings.uppercase)} />
          <InputBoolean
            base={settings.numerals}
            onCheck={this.props.changeSetting.bind(this, settings.numerals)} />
          <InputText
            base={settings.disallowed} /> */}
          {settings}
          <button
            className="btn btn-primary"
            type="submit">Generate</button>
            <Output
              value={this.props.output} />
        </form>
      </div>
    );
  }
}

class Output extends React.Component {
  render() {
    return (
      <div
        className ="input-group mt-3">
        <input
          type="text"
          className="form-control"
          placeholder="Generated Password"
          aria-label="Generated Password"
          aria-describedby="basic-addon2"
          value={this.props.value} />
        <div
          className="input-group-append">
          <button
          className="btn btn-outline-secondary" type="button">Copy to Clipboard</button>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      password: '',
      // App Settings
      settings: [
        {
          name: 'length',
          label: 'Password Length',
          type: 'number',
          value: '8',
          id: uuid(),
        },
        {
          name: 'uppercase',
          label: 'Uppercase',
          type: 'boolean',
          value: true,
          id: uuid(),
        },
        {
          name: 'numerals',
          label: 'Numerals',
          type: 'boolean',
          value: true,
          id: uuid(),
        },
        {
          name: 'disallowed',
          label: 'Disallowed Characters',
          type: 'text',
          value: '',
          id: uuid(),
        },
      ],
    };
  }

  handleChangeSetting(item, value) {
    let settings = this.state.settings;

    let target = settings.findIndex(index => index.id === item.id);

    if (settings[target].type === 'boolean') {
      settings[target].value = !settings[target].value;
    }
    else {
      settings[target].value = value;
    }

    this.setState({settings: settings})
  }

  generatePassword() {

    let result = '';
    let set = this.state.settings;

    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const num = '0123456789';

    let u = set.findIndex(index => index.name === 'uppercase');
    let n = set.findIndex(index => index.name === 'numerals');
    let d = set.findIndex(index => index.name === 'disallowed');
    let l = set.findIndex(index => index.name === 'length');

    let chars = 
      lower +
      (set[u].value ? upper : '') +
      (set[n].value ? num : '');
    
    var charArray = chars.split('').filter(function(item){
      return set[d].value.split('').indexOf(item) === -1;
    });

    for (let i = 0; i < +set[l].value; i++) {
      let elem = (charArray[Math.floor(Math.random() * charArray.length)]);

      if (elem === undefined) {
        result = 'ERROR: No possible characters!';
        break;
      }

      result += elem;
    }



    this.setState({ password: result });
  }

  render() {
    return (
      <div
        className="container">
        <h1>Password Generator</h1>
        <p>Select your parameters and required length then click generate to get your new password.</p>
        <Options
          settings={this.state.settings}
          output={this.state.password}
          handleSubmit={this.generatePassword.bind(this)}
          changeSetting={this.handleChangeSetting.bind(this)} />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);