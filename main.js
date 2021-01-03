var form = document.getElementById("myForm");
form.addEventListener("submit" ,saveBookmark);

function saveBookmark(e){
   let siteName= document.getElementsByClassName("bege")[0].value;
   let siteUrl= document.getElementsByClassName("bege")[1].value;

   var bookMark = {
       name:siteName,
       Url: siteUrl,
   };

   var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
   var regex = new RegExp(expression);

   if (!siteUrl.match(regex)){
    var beep = new Audio ("crash.mp3");
    beep.play();
      document.getElementsByClassName("bege")[1].style.border="1px red solid";
      document.getElementsByTagName("span")[0].style.display="inline";
      
 
       return false;
   }
   else{
    document.getElementsByClassName("bege")[1].style.border="";
    document.getElementsByTagName("span")[0].style.display="";
   }

   if (localStorage.getItem("bookmarks")=== null){
       var bookmarks = [];
       bookmarks.push(bookMark);
       localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
       
   }
   else{
       var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
       bookmarks.push(bookMark);

      //    Resetting to localStorage
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
   }
     form.reset();
    showBookmarks();
    e.preventDefault();
};
 

function deleteBmk(url, name) {
       alert(`Are you sure you want to delete ${name} bookmark?`);
      var  bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
        for (var i=0; i<bookmarks.length; i++){
            if (bookmarks[i].Url=== url ){
                bookmarks.splice(i, 1);
            }
        }
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  showBookmarks();
}



var body= document.getElementsByTagName("body")[0];
body.addEventListener("load", showBookmarks());

   function showBookmarks(){
     var bookmarks =  JSON.parse(localStorage.getItem("bookmarks"));
     var bkmkResult = document.getElementsByClassName("bookmarkResult")[0];

     bkmkResult.innerHTML="";

     for (i=0; i < bookmarks.length; i++) {
         var name = bookmarks[i].name;
         var url = String(bookmarks[i].Url);
        

         bkmkResult.innerHTML += `<div class="learn">
                                       <h3>${name}</h3>
                                       <div>
                                           <a class="learn-btn" target="_blank" href="${url}">Visit</a>
                                           <a onClick="deleteBmk('${url}', '${name}')" class="learn-delete" target="" href="#">Delete</a>
                                     </div>
                                 </div>     `;           
    
     }
   }