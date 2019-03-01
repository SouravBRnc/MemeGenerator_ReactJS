import React from 'react'

class App extends React.Component{
    constructor(){
        super()
        this.state={
            topText:"",
            bottomText:"",
            memeImg:"",
            allmemes:[],
            showMeme:false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event){
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    handleSubmit(){
        this.setState({
            showMeme:true
        })
    }

    componentDidMount(){
        fetch('https://api.imgflip.com/get_memes').
        then(response=> response.json()).
        then(response=>{
            const digit = Math.floor(Math.random()*100)
            this.setState({
                allmemes:response.data,
                memeImg:response.data.memes[digit].url
            })
            console.log(this.state.allmemes)
        })
    }

    render(){
        const topStyle={
            color:'white',
            fontSize:'18px',
            fontWeight:'bold',
            position:'absolute',
            top:'5px',
            left:75
        }
        const bottomStyle={
            color:'white',
            fontSize:'18px',
            fontWeight:'bold',
            position:'absolute',
            top:'260px',
            left: 75
        }
        const imgStyle={
            height:300,
            width:300
        }
        return(
            <div>
                {
                this.state.showMeme
                ?
                <div>
                    <p style = {topStyle}>{this.state.topText}</p>
                    <p style = {bottomStyle}>{this.state.bottomText}</p>
                    <img style = {imgStyle} src={this.state.memeImg} alt='Loading....' />
                </div>
                :
                <div>
                    <img style = {imgStyle} src={this.state.memeImg} alt='Loading....' />
                    <br />
                    <form onSubmit={this.handleSubmit}>
                    <label>TopText: </label>
                    <input type = 'text' name = 'topText' placeholder = 'Top Text...' value = {this.state.topText} onChange={this.handleChange} />
                    <br />
                    <label>BottomText: </label>
                    <input type = 'text' name = 'bottomText' placeholder = 'Bottom Text...' value = {this.state.bottomText} onChange={this.handleChange} />
                    <br />
                    <button type = 'submit'> Generate Meme</button>
                    </form>
                </div>
            }
            </div>            
        )
    }
}

export default App
