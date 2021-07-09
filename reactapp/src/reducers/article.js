export default function (wishList = [], action) {
    let doublon = false
    if (action.type === "addArticle") {
      let wishListCopy = [...wishList];
      for(let i=0;i<wishListCopy.length;i++){
          if(wishListCopy[i].title === action.articleLiked.title){
              doublon = true
          }
      }
      if(!doublon){
        wishListCopy.push(action.articleLiked);  
      }
        return wishListCopy;
      } else if (action.type === "deleteArticle") {
        return wishList.filter((article) => article.title !== action.title)
      } else {
        return wishList;
      }

  }
