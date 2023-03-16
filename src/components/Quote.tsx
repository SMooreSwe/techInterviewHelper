
type QuoteProps = {
    userId: string,
    quote: string
    setter: Function,
}

export const Quote = ({userId, quote, setter} : QuoteProps) => {

    const deleteQuote = () => {
        const quoteInput = {
            id: userId,
            quote: quote,
        }
        fetch('http://localhost:8080/users/quotes', {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(quoteInput)
        })
        setter(quote)
    }

    return(
        <li>
            {quote}
            <button onClick={() => deleteQuote()}>Delete</button>
        </li>
    )
}