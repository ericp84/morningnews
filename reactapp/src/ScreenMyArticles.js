import React, {useState, useEffect, useRef} from 'react';
import {gsap} from "gsap";
import './App.css';
import { Card, Icon, Modal} from 'antd';
import Nav from './Nav';
import {connect} from 'react-redux';


const { Meta } = Card;

function ScreenMyArticles(props) {
  let err = "pas d'articles dans vos favoris, veuillez faire votre sélection"
  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  
/////////////////
  var showModal = (title, content) => {
    setVisible(true)
    setTitle(title)
    setContent(content)
  }
  var handleOk = e => {
    console.log(e)
    setVisible(false)
  }
  var handleCancel = e => {
    console.log(e)
    setVisible(false)
  }

  return (  
      
    <div>
            <Nav/>
            <div className="Banner"/>
          {props.wishList.length > 0 ? (
            <div className="Card">
                {props.wishList.map((article,i) => (    
                    <div  style={{display:'flex',justifyContent:'center'}}>
                      <Card
                        style={{  
                          width: 300, 
                          margin:'15px', 
                          display:'flex',
                          flexDirection: 'column',
                          justifyContent:'space-between' }}
                        cover={
                        <img
                           
                            alt="example"
                            src={article.image} 
                        />
                        }
                        actions={[
                          <Icon type="read" key="ellipsis2" onClick={() => showModal(article.title, article.description)}/>,
                          <Icon type="delete" key="ellipsis" onClick={() =>{props.deleteToWishList(article.title)}}/>
                        ]}
                        >
                        <Meta
                          title={article.title}
                          description={article.description}
                        />
                      </Card>
                      <Modal
                        title={title}
                        visible={visible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                      >
                        <p>{content}</p>
                      </Modal>
                    </div>
              ))}      
             </div>
           ) : (
             <h2>{err}</h2>
           )}
      </div>
  );
}
function mapStateToProps(state) {
  console.log(state)
  return {wishList : state.wishList }
  }
  function mapDispatchToProps(dispatch) {
    return {
      deleteToWishList(title) {
        dispatch({ type: "deleteArticle", title });
      },
    };
  }
  export default connect(
  mapStateToProps, mapDispatchToProps
  )(ScreenMyArticles);