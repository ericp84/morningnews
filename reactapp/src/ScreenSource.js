import React, {useState, useEffect, useRef} from 'react';
import {gsap} from "gsap";
import {Link} from 'react-router-dom'
import './App.css';
import { List, Avatar} from 'antd';
import Nav from './Nav'

function ScreenSource() {
  const[toggle, setToggle] = useState(false)
  const [sourceList, setSourceList] = useState([])
  const [langue, setLangue] = useState("fr");
  const [pays, setPays] = useState("fr");
  const changeState = () => {
    setToggle(!toggle)
  };
  const avatRef = useRef(null)
  useEffect(() => {
    gsap.to(avatRef.current, {
      scale: 1.1,
      rotateX: 360,
      duration: 1.2
    })

    const apiques= async() => {
      const apireq = await fetch(`https://newsapi.org/v2/sources?language=${langue}&country=${pays}&apiKey=9a4637363ab14af2b5e9bd6bd48b4bab`)
      const apires = await apireq.json()
      setSourceList(apires.sources)
      console.log(langue, pays)
    }
    apiques()
  }, [langue, pays])
  return (
    <div>
      <Nav/>
        <div className="Banner">
        <div className="flag" onClick={changeState} ref={avatRef}>
          <Avatar
            style={{ cursor: "pointer" }}
            size={65}
            src="./images/fr.png"
            onClick={() => {
              setLangue("fr");
              setPays("fr");
            }}
          />
          <Avatar
            style={{ cursor: "pointer" }}
            size={65}
            src="./images/ang.png"
            onClick={() => {
              setLangue("en");
              setPays("gb");
            }}
          />
        </div>
      </div>
       <div className="HomeThemes"> 
              <List
                  itemLayout="horizontal"
                  dataSource={sourceList}
                  renderItem={source => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={`/images/${source.category}.png`} />}
                        title={<Link to={`/screenarticlesbysource/${source.id}`}>{source.name}</Link>}
                        description={source.description}
                      />
                    </List.Item>
                  )}
                />
          </div>    
      </div>
  );
}

export default ScreenSource;
