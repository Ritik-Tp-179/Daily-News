import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)



    // articles = [
    //     {
    //         "source": {
    //             "id": null,
    //             "name": "Kusports.com"
    //         },
    //         "author": null,
    //         "title": "Quick recap: Kansas rallies from double-digit deficit to survive Kentucky in Champions Classic - KUsports",
    //         "description": "Chicago — Kentucky was missing three seven-footers, two injured and one not yet eligible, in the paint, and that disparity was apparent from the opening minutes Tuesday night at the United Center, as Hunter Dickinson scored practically at will — at least, whe…",
    //         "url": "https://www2.kusports.com/sports/2023/nov/14/quick-recap-kansas-rallies-from-double-digit-deficit-to-survive-kentucky-in-champions-classic/",
    //         "urlToImage": "https://ogden_images.s3.amazonaws.com/www.kusports.com/images/2023/11/14214704/AP23319132802160-1200x800.jpeg",
    //         "publishedAt": "2023-11-15T05:12:14Z",
    //         "content": "Quick recap: Kansas rallies from double-digit deficit to survive Kentucky in Champions Classic\r\nKansas head coach Bill Self shouts from the sidelines during the first half of an NCAA college basketba… [+5352 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "cnn",
    //             "name": "CNN"
    //         },
    //         "author": "David Shortell, Helen Regan",
    //         "title": "Israel launches ‘targeted’ military operation inside Gaza’s Al-Shifa Hospital - CNN",
    //         "description": "Israel said it had launched a military operation against Hamas early Wednesday morning inside Gaza’s largest hospital Al-Shifa, where thousands of Palestinians are believed to be sheltering.",
    //         "url": "https://www.cnn.com/2023/11/15/middleeast/shifa-hospital-gaza-idf-intl/index.html",
    //         "urlToImage": "https://media.cnn.com/api/v1/images/stellar/prod/231113084539-al-shifa-hospital-gv-110823.jpg?c=16x9&q=w_800,c_fill",
    //         "publishedAt": "2023-11-15T05:11:00Z",
    //         "content": "Israel said it had launched a targeted military operation against Hamas early Wednesday morning inside Gazas largest hospital Al-Shifa, where thousands of Palestinians are believed to be sheltering.\r… [+5990 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": null,
    //             "name": "CNBC"
    //         },
    //         "author": "Melissa Repko",
    //         "title": "Target will report earnings before the bell. Here's what to expect - CNBC",
    //         "description": "The big-box retailer, which sells a heavier mix of clothing, home goods and impulse purchases, has been particularly squeezed by inflation.",
    //         "url": "https://www.cnbc.com/2023/11/15/target-tgt-earnings-q3-2023.html",
    //         "urlToImage": "https://image.cnbcfm.com/api/v1/image/107257023-1686775871826-gettyimages-1491042036-dsc03042_gayitpjr.jpeg?v=1699979792&w=1920&h=1080",
    //         "publishedAt": "2023-11-15T05:01:01Z",
    //         "content": "Target will report fiscal third-quarter earnings on Wednesday, as the company tries to claw its way back from a string of disappointing results and high-profile setbacks.\r\nInvestors will listen for a… [+2094 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": null,
    //             "name": "SciTechDaily"
    //         },
    //         "author": null,
    //         "title": "Any Activity – Even Sleeping – Is Better for Your Heart Than Sitting, New Research Shows - SciTechDaily",
    //         "description": "Replacing sitting with as little as a few minutes of moderate exercise a day tangibly improves heart health, according to new research from UCL and the University of Sydney. The study, supported by the British Heart Foundation (BHF) and published in the Europ…",
    //         "url": "https://scitechdaily.com/any-activity-even-sleeping-is-better-for-your-heart-than-sitting-new-research-shows/",
    //         "urlToImage": "https://scitechdaily.com/images/Happy-Woman-Waking-Up-in-Bed-Good-Sleep.jpg",
    //         "publishedAt": "2023-11-15T04:59:36Z",
    //         "content": "ByUniversity College LondonNovember 14, 2023\r\nA study from UCL and the University of Sydney shows that substituting just a few minutes of daily sitting with moderate exercise can greatly benefit hear… [+8812 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": null,
    //             "name": "Yahoo Entertainment"
    //         },
    //         "author": "Jason Owens",
    //         "title": "Duke fends off Michigan State with breakout from freshman Caleb Foster, sends struggling Spartans to 1-2 - Yahoo Sports",
    //         "description": "Duke saw a breakout game from freshman Caleb Foster while Michigan State's shooting woes loomed large again.",
    //         "url": "https://sports.yahoo.com/duke-fends-off-michigan-state-with-breakout-from-freshman-caleb-foster-sends-struggling-spartans-to-1-2-021431699.html",
    //         "urlToImage": "https://s.yimg.com/ny/api/res/1.2/ongNNYC1po5eCBXY92p4mg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD04ODY-/https://s.yimg.com/os/creatr-uploaded-images/2023-11/aa953120-835f-11ee-bd3e-2b4790d15108",
    //         "publishedAt": "2023-11-15T04:58:00Z",
    //         "content": "Freshman Caleb Foster sparked Duke's offense against an aggressive Michigan State defense. (Michael Hickey/Getty Images) (Michael Hickey via Getty Images)\r\nIt wasn't always pretty.\r\nBut No. 9 Duke av… [+3139 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "reuters",
    //             "name": "Reuters"
    //         },
    //         "author": "Saurabh Sharma",
    //         "title": "Indian workers remain trapped in collapsed tunnel as rescue hampered - Reuters India",
    //         "description": "Rescue teams were unable on Wednesday to reach 40 workers trapped in a collapsed highway tunnel in India, as huge boulders were blocking efforts to create an evacuation passage, officials said.",
    //         "url": "https://www.reuters.com/world/india/indian-workers-remain-trapped-collapsed-tunnel-rescue-hampered-2023-11-15/",
    //         "urlToImage": "https://www.reuters.com/resizer/9-HVh7Up7DjL-aWLGIYFkQkMMDc=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/HUADDUYGT5LXZJAPOP62GJXKTE.jpg",
    //         "publishedAt": "2023-11-15T04:33:01Z",
    //         "content": "LUCKNOW, India, Nov 15 (Reuters) - Rescue teams were unable on Wednesday to reach 40 workers trapped in a collapsed highway tunnel in India, as huge boulders were blocking efforts to create an evacua… [+1843 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": null,
    //             "name": "BBC News"
    //         },
    //         "author": "https://www.facebook.com/bbcnews",
    //         "title": "Xi Jinping arrives in the US as his Chinese Dream sputters - BBC.com",
    //         "description": "Economic woes put the Chinese leader in a more vulnerable negotiating position on this visit.",
    //         "url": "https://www.bbc.com/news/world-asia-china-67423040",
    //         "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/1748C/production/_131727359_gettyimages-1782797992-1.jpg",
    //         "publishedAt": "2023-11-15T03:54:16Z",
    //         "content": "When Xi Jinping stepped off his plane in San Francisco for the Apec summit, it was in circumstances very different to the last time he landed on American soil.\r\nFive years ago, when he was wined and … [+6460 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "espn",
    //             "name": "ESPN"
    //         },
    //         "author": "Kendra Andrews",
    //         "title": "Green, Thompson, McDaniels ejected after Wolves-Warriors fight - ESPN - ESPN",
    //         "description": "Golden State's Draymond Green and Klay Thompson and Minnesota's Jaden McDaniels were ejected for their roles in a fight less than two minutes into the Wolves' win.",
    //         "url": "https://www.espn.com/nba/story/_/id/38900628/thompson-green-mcdaniels-ejected-wolves-warriors-fight",
    //         "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fphoto%2F2023%2F1115%2Fr1253413_1296x729_16%2D9.jpg",
    //         "publishedAt": "2023-11-15T03:54:00Z",
    //         "content": "SAN FRANCISCO -- Golden State Warriors guard Klay Thompson and forward Draymond Green and Minnesota Timberwolves guard Jaden McDaniels were ejected Tuesday night for their roles in a fight less than … [+1367 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": null,
    //             "name": "CBS Sports"
    //         },
    //         "author": "",
    //         "title": "College Football Playoff Rankings: Georgia jumps Ohio State for No. 1 spot as Missouri enters top 10 - CBS Sports",
    //         "description": "The third top 25 rankings of the 2023 season have arrived from the CFP Selection Committee",
    //         "url": "https://www.cbssports.com/college-football/news/college-football-playoff-rankings-georgia-jumps-ohio-state-for-no-1-spot-as-missouri-enters-top-10/",
    //         "urlToImage": "https://sportshub.cbsistatic.com/i/r/2023/11/15/0423607e-5419-4675-b4a3-bd41c5333d9c/thumbnail/1200x675/84e8bcd4917c57220fc7e7fa2b016f3a/graphic-cfp-gomf.png",
    //         "publishedAt": "2023-11-15T03:32:00Z",
    //         "content": "The third edition of the College Football Playoff Rankings was released Tuesday night with a bit of a shakeup coming to the top four. While the top eight teams in last week's rankings all won, Georgi… [+4463 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": null,
    //             "name": "WLWT Cincinnati"
    //         },
    //         "author": "Emily Sanderson",
    //         "title": "3 students, 3 adults killed in multi-vehicle crash involving bus on Ohio highway - WLWT Cincinnati",
    //         "description": "A charter bus carrying students from a high school was rear-ended by a semitruck, resulting in a fiery crash on an Ohio highway Tuesday.",
    //         "url": "https://www.wlwt.com/article/crash-i-70-licking-county-ohio-fire-multiple-injured/45834156",
    //         "urlToImage": "https://kubrick.htvapps.com/htv-prod-media.s3.amazonaws.com/images/crash-70-6553ce187d0ca.png?crop=1.00xw:0.981xh;0,0&resize=1200:*",
    //         "publishedAt": "2023-11-15T03:08:00Z",
    //         "content": "LICKING COUNTY, Ohio —A charter bus carrying students from a high school was rear-ended by a semitruck, resulting in a fiery crash on an Ohio highway Tuesday.\r\nAccording to the Ohio State Highway Pat… [+3609 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": null,
    //             "name": "Variety"
    //         },
    //         "author": "Emily Longeretta",
    //         "title": "'Dancing WIth the Stars': Barry Williams Goes Shirtless, Is Eliminated - Variety",
    //         "description": "The final six couples were revealed on 'Dancing WIth the Stars' after 'Whitney Houston Night.'",
    //         "url": "https://variety.com/lists/dancing-with-the-stars-barry-williams-eliminated/",
    //         "urlToImage": "https://variety.com/wp-content/uploads/2023/11/402125142_265491909410741_3168188702748784815_n.jpg?crop=0px%2C0px%2C746px%2C419px&resize=1000%2C563",
    //         "publishedAt": "2023-11-15T03:05:00Z",
    //         "content": "It was “Whitney Houston Night” on “Dancing With the Stars” and every couple pulled out every stop.\r\nLast week, Xochitl Gomez and Val Chmerkovskiy struggled after she suffered an ankle injury and a wa… [+1268 chars]"
    //     }
    // ]
    // constructor() {
    //     super();
    //     this.state = {
    //     }
    // }

    const updateNews = async () => {
        props.setProgress(10)
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=1&pagesize=${props.pagesize}`
        setLoading(true)
        let data = await fetch(url)
        props.setProgress(30)
        let parsedData = await data.json()
        // console.log(parsedData)
        props.setProgress(70)

        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100)
    }

    useEffect(() => {
        updateNews();
        //eslint-disable-next-line
    }, [])

    const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pagesize=${props.pagesize}`
        setPage(page + 1)
        let data = await fetch(url)
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    };


    return (
        <div className='container' >
            <h2 style={{margin:"100px"}} className='my-2 text-center'>Daily headlines here...</h2>
            {loading && <Spinner />}

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">

                    <div className="row" >
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""}
                                    description={element.description ? element.description : ""}
                                    imageUrl={element.urlToImage}
                                    newsUrl={element.url}
                                    author={element.author}
                                    date={element.publishedAt}
                                    source={element.source.name}
                                />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </div>
    )

}

News.defaultProps = {
    country: "in",
    pagesize: 6,
    category: "general"
}
News.propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string
}

export default News
