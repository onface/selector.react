var React = require('react')
var ReactDOM = require('react-dom')
var Selector = require('selector.react')
class Simple extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: []
        }
    }
    render () {
        const self = this
        return (
            <div>
                <Selector
                    options={self.props.area}
                    value={self.state.value}
                    onChange={(value) => {
                        self.setState({
                            value: value
                        })
                    }}
                />
            </div>
        )
    }
}

Simple.defaultProps = {
    area: require('./data.js')
}
/*ONFACE-DEL*/Simple = require("react-hot-loader").hot(module)(Simple)
ReactDOM.render(
    <Simple />,
    document.getElementById('simple-demo')
)
