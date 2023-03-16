import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Quote } from "./Quote";

export const User = () => {
    const { state } = useLocation();
    const { _id, username, savedQuotes } = state.user
    const [quote, setQuote] = useState<string>('')
    const [quoteList, setQuoteList] = useState<string[]>(savedQuotes)

    const quoteGenerator = () => {
        fetch('http://localhost:8080/quotes')
        .then(response => response.json())
        .then(response => setQuote(response))
    }

    const saveQuote = () => {
        const quoteInput = {
            id: _id,
            quote: quote
        }
        fetch('http://localhost:8080/users/quotes', {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(quoteInput)
        })
        const newQuoteList = [...quoteList, quote]
        setQuoteList(newQuoteList)
    }

    const quoteDeleter = (selection: string) => {
        const newQuoteList = quoteList.filter(quote => quote !== selection)
        setQuoteList(newQuoteList)
    }

    return(
        <div className="user">
        <div className="user__title-container">
        <h2>{username}</h2>
        </div>
        <div className="user__content">
        <section className="user__generator">
            <p>{quote}</p>
            <button className="generator__btn" onClick={() => quoteGenerator()}>Generate a new quote!</button>
            <button className="generator__btn" onClick={() => saveQuote()}>Save this quote!</button>
        </section>
        <div className="user__quote-container">
            <h3 className="quote-container__title">Your saved quotes</h3>
            <ul className="quote-container__list">
                {quoteList && quoteList.map((quote : string) => {
                    return( <Quote key={crypto.randomUUID()} userId={_id} quote={quote} setter={quoteDeleter}/>)
                })}
            </ul>
        </div>
        </div>
        <div className="user__btn-container">
            <Link className="btn-container__link" to='/'>Logout</Link>
        </div>
        </div>
        
    )
}