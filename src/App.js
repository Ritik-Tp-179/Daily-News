import './App.css';
import React from 'react'
import Navbar from './compenents/Navbar';
import News from './compenents/News';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'
import { useState } from 'react';

const App =()=> {
  const apikey = process.env.REACT_APP_NEWS_API;
  
  const [ progress, setProgress] = useState(0)
  

    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            color='#f11946'
            progress={progress}
          // onLoaderFinished={() => setProgress(0)}
          />
          <Routes>

            <Route exact path="/" element={<News setProgress={setProgress} apikey={apikey} key="general" pagesize={6} country="in" category="general" />}></Route>
            <Route exact path="/general" element={<News setProgress={setProgress} apikey={apikey} key="general" pagesize={6} country="in" category="general" />}></Route>
            <Route exact path="/entertainment" element={<News setProgress={setProgress} apikey={apikey} key="entertainment" pagesize={6} country="in" category="entertainment" />}></Route>
            <Route exact path="/business" element={<News setProgress={setProgress} apikey={apikey} key="business" pagesize={6} country="in" category="business" />}></Route>
            <Route exact path="/health" element={<News setProgress={setProgress} apikey={apikey} key="health" pagesize={6} country="in" category="health" />}></Route>
            <Route exact path="/science" element={<News setProgress={setProgress} apikey={apikey} key="science" pagesize={6} country="in" category="science" />}></Route>
            <Route exact path="/technology" element={<News setProgress={setProgress} apikey={apikey} key="technology" pagesize={6} country="in" category="technology" />}></Route>
            <Route exact path="/sports" element={<News setProgress={setProgress} apikey={apikey} key="sports" pagesize={6} country="in" category="sports" />}></Route>
          </Routes>

        </Router>
      </div>
    )
  
}

export default App;