import react ,{Component} from 'react'
import '../App.css'
class Counter extends Component {
    constructor(props){
        super(props);
        this.state = {
            count : 1
        }
    }

    handelPropsCounter = (val)=>{
        this.props.onCounterChange(val)
    }

    plus = ()=>{
        this.setState({
            count : this.state.count +1
        },
        ()=>{
            this.handelPropsCounter(this.state.count)
        })

    }

    minus = ()=>{
        this.setState({
            count : this.state.count -1
        },
            ()=> this.handelPropsCounter(this.state.count)
        )
    }

    render(){
        return(
            <div className="but-cont">
            <button className="button" onClick={this.minus}>-</button>
                <p>{this.state.count}</p>
            <button className="button" onClick={this.plus}>+</button>
            </div>
            )
    }
}

export default Counter