import React from 'react'

const NewsItem = (props) =>  {
    let {title, description, imageUrl, author, date, newsUrl,source} = props;
    return (
      <div>
        <div className="card" >
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info" style={{ zIndex: '1', backgroundColor: "00d1cd"}}>{source}</span>
          <img src={!imageUrl?"no-image.png":imageUrl} style={{height: 180}} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {author? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target="_blank" rel='noreferrer' className="btn btn-primary mybutton">Read More</a>
          </div>
        </div>
      </div>
    )
  }

export default NewsItem