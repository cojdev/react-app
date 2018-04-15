function uuid(length) {
    var value = '';
    var length = length || 5;
    for (var i = 0; i < 5; i++) {
        value += String.fromCharCode(65 + Math.floor(Math.random() * 36));
    }
    return value;
}

function gradient(props) {
    // Common
    this.id = uuid();
    this.flipped = false;
    this.class = 'gradient-item';


    // Props
    for (const key in props) {
        if (props.hasOwnProperty(key)) {
            this[key] = props[key];
        }
    }
}

class GradientList extends React.Component {

    render() {
        let gradients = this.props.gradients.map(item => {
                //console.log(item.stops[0]);
            if (Array.isArray(item.stops[0])) {
                // let colours = item.stops.join(', ');
                // let direction = item.direction || '225deg';
                // let gradientStyle = { backgroundImage: 'linear-gradient(' + direction + ', ' + colours + ')' };
                // let css = 'background-image: linear-gradient(' + direction + ', ' + colours + ');';
                console.log(item.stops);
                let colours = item.stops.map(comp => comp.join(', '));
                let dir = item.direction;
                
                var styles = [];

                for (let i = 0; i < colours.length; i++) {
                    styles.push('linear-gradient(' + dir[i] + ', ' + colours[i] + ')');
                }

                var gradientStyle =  { backgroundImage: styles.join(', ') };
                var css = 'background-image: ' + styles.join(', ') + ';';
                
            }
            else {
                let colours = item.stops.join(', ');
                let direction = item.direction || '225deg';
                var gradientStyle = { backgroundImage: 'linear-gradient(' + direction + ', ' + colours + ')' };
                var css = 'background-image: linear-gradient(' + direction + ', ' + colours + ');';
            }
            
            return (
                <li
                    className={item.class}
                    key={item.id}>
                    <div className="card-gradient"
                        style={gradientStyle}>
                        <button
                            className="ui-button"
                            onClick={this.props.flipCard.bind(this, item.id)}>
                            <i className="fa fa-plus-circle" aria-hidden="true"></i>
                        </button>
                        <div
                            className="card-label">{item.name}</div>
                    </div>
                    <div
                        className="card-body">
                        <button
                            className="ui-button"
                            onClick={this.props.flipCard.bind(this, item.id)}>
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </button>
                        <h2>{item.name}</h2>
                        <pre>
                        <code
                            className="gradient-code">{css}</code>
                        </pre>
                        <div
                            className="card -float"></div>
                        <button
                            className="sample-button"
                            style={gradientStyle}>Button</button>{' '}
                        <button
                            className="sample-button__ghost"
                            style={gradientStyle}>Button</button>
                        </div>
                </li>
            )
        });

        return (
            <ul className="gradient-list">
                {gradients}
            </ul>
        )
    }
}

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            appTitle: 'Gradients',
            gradients: []
        }
    }

    componentWillMount() {
        this.setState({
            gradients: [
                new gradient({
                    name: 'Rainbow',
                    stops: ['#e14','#e82','#de2','#4e2','#2ae','#22d','#82e'],
                    direction: '90deg'
                }),
                new gradient({
                    name: 'Dusk',
                    stops: ['#0e1b32','#c28993 80%','#ffc7af'],
                    direction: '180deg'
                }),
                new gradient({
                    name: 'Insta',
                    stops: ['#82c','#e31 70%','#fe6'],
                    direction: '225deg'
                }),
                new gradient({
                    name: 'Azure',
                    stops: ['#48c','#6cf']
                }),
                new gradient({
                    name: 'Midnight',
                    stops: ['#213','#236'],
                    direction: '225deg'
                }),
                new gradient({
                    name: 'Vapor',
                    stops: ['#f6c','#84d','#2fc'],
                    direction: '180deg'
                }),
                new gradient({
                    name: 'Tutti',
                    stops: [
                        ['rgba(255,0,0,.8)', 'rgba(255,0,0,0) 70.71%'],
                        ['rgba(0,255,0,.8)', 'rgba(0,255,0,0) 70.71%'],
                        ['rgba(0,0,255,.8)', 'rgba(0,0,255,0) 70.71%']
                    ],
                    direction: ['217deg', '127deg', '336deg'],
                }),
                new gradient({
                    name: 'Pinkish',
                    stops: ['#85c','#d26'],
                    direction: '225deg'
                }),
                new gradient({
                    name: 'Lawn',
                    stops: ['#693','#8c6'],
                }),
                new gradient({
                    name: 'Peach',
                    stops: ['#fe6','#e34'],
                    direction: '225deg'
                }),
            ]
        });
    }

    flipCard(id) {
        // console.log('flip ' + id);
		let gradients = this.state.gradients;
        let target = gradients[gradients.findIndex(index => index.id === id)];
        target.flipped = !target.flipped;

        target.class = 'gradient-item';
        if (target.flipped) {
            target.class = target.class + ' flipped';
        }

		this.setState({gradients: gradients});
    }
 
    render() {
        return (
            <div>
                <div className="container">
                    <h1>{this.state.appTitle}</h1>
                    <GradientList
                        gradients={this.state.gradients}
                        flipCard={this.flipCard.bind(this)} />
                </div>
                <footer
                className="footer">By Charles Ojukwu</footer>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);