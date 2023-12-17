import React from 'react'

const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, author, date, source } = props
    return (
        <div className='my-3'>
            <div className="card">
                <div>

                    <span className="badge rounded-pill bg-danger" style={{ display: "flex", justifyContent: "flex-end", position: "absolute", right: "0" }}>{source}</span>
                </div>
                <img src={imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title" style={{ display: "flex", justifyContent: "justify" }}>{title}...</h5>
                    <p className="card-text" >{description}...</p>
                    <p className="card-text"><small className="text-muted">By {author ? author : "Unkown"} on {new Date(date).toGMTString()} </small></p>
                    <a href={newsUrl} className="btn btn-sm btn-primary">Read more</a>
                </div>
            </div>
        </div>
    )
}

export default NewsItem
