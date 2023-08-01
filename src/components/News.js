import React, {useEffect,useState} from 'react'

import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"


const News = (props) => {
  const [articles, setarticles] = useState([])
  const [loading, setloading] = useState(true)
  const [page, setpage] = useState(1)
  const [totalResults, settotalResults] = useState(0)

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const updateNews = async(pageNo) => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setloading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setarticles(parsedData.articles)
    settotalResults(parsedData.totalResults)
    setloading(false)
    props.setProgress(100)
  }
  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - Newsful`
    updateNews()
    //eslint-disable-next-line
  }, [])
  
  
  const fetchMoreData = async() => {
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
      setpage(page+1)
      let data = await fetch(url);
      let parsedData = await data.json()
      setarticles(articles.concat(parsedData.articles))
      settotalResults(parsedData.totalResults)
  };
  

    return (
      <>
      <div className="container my-3">
        
      <h1 className='text-center'>Newsful - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        <br />
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
        <div className="row news" >
          {articles.map((element)=>{
            return <div className="flex col-md-4" key={element.url} style={{marginBottom: '25px'}}>
              <NewsItem title={element.title.slice(0,70)} description={element.description?.slice(0,88)} imageUrl={element.urlToImage} author={element.author} date={element.publishedAt} newsUrl={element.url} source={element.source.name} />  
            </div>
          })}
        </div>
        </InfiniteScroll>
      </div>
      </>
    )
}
News.defaultProps = {
  country : 'in',
  pageSize : 9,
  category : 'general'
}
News.propTypes = {
  country : PropTypes.string,
  pageSize : PropTypes.number,
  category : PropTypes.string
}
export default News