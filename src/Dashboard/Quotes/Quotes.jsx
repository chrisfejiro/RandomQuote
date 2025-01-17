import { Component } from "react";
import QuotesText from "../Components/QuotesText";
import QuotesAuthor from "../Components/QuoteAuthor";
import Buttons from "../Components/Buttons";
import "./Quotes.css";
import axios from "axios";
class Quotes extends Component {
  state = {
    quote: "The Best Richness, is the Richness of Soul",
    author: "Prophet Muhammad(Peace be upon him)",
    quotesData: [],
    color: "rgb(243 , 156 , 18)",
  };
  //random color
  randomColor = () => {
    let colorPatterns = "1234567890ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += colorPatterns[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  componentDidMount() {
    if (this.state.quotesData.length > 0) {
      return;
    } else {
      this.fetchQuotes();
    }
  }

  fetchQuotes = () => {
        axios 
      .get(
        "https://type.fit/api/quotes"
      )
      .then((res) => {
        const quotesData = [...res.data];
        console.log(quotesData);
        const color = this.randomColor;
        document.body.style.color = color;
        document.body.style.backgroundColor = color;
      
        this.setState({
          quotesData: quotesData,
          color: color,
        });
      })
      .catch((error) => console.log(error));
  };

  handleClick = () => {
    let randomIndex = Math.floor(Math.random() * 16);
    let { text, author } = this.state.quotesData[randomIndex];

    const color = this.randomColor();
    document.body.style.color = color;
    document.body.style.backgroundColor = color;

    this.setState({
      quote: text,
      author: author,
      color: color,
    });
  };
  render() {
    return (
      <div id="quote-box">
        <QuotesText quote={this.state.quote} color={this.state.color} />
        <QuotesAuthor author={this.state.author} color={this.state.color} />
        <Buttons handleClick={this.handleClick} color={this.state.color} />
      </div>
    );
  }
}

export default Quotes;
