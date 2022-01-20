
const formBTN = document.querySelector("#postblog")

const deleteBtns = document.querySelectorAll(".deleteBtn")
const changeBTN = document.querySelectorAll(".editBtn")

formBTN.addEventListener("submit", (e)=> { 
  e.preventDefault();
  let postTitle = formBTN[0].value.trim()
  let postContent = formBTN[1].value.trim()

  if(!postTitle  || !postContent) return ;
  
  let blogEditId =formBTN.getAttribute("data-id")
  if(blogEditId){

    fetch('/api/blog/editblog',{
      method:'PUT',
      body: JSON.stringify({title: postTitle,content: postContent, id:blogEditId}),
      headers: { 'Content-Type': 'application/json' },
    }).then((res)=>res.json())
    .then((data)=>{
      document.location.replace('/dashboard');
    })

  } else { 
    fetch('/api/blog/createblog',{
      method:'POST',
      body: JSON.stringify({title: postTitle,content: postContent}),
      headers: { 'Content-Type': 'application/json' },
    }).then((res)=>res.json())
    .then((data)=>{
      document.location.replace('/dashboard');
    })
  }
  formBTN[0].value = ""
  formBTN[1].value = ""
})

deleteBtns.forEach(button => button.addEventListener('click', (e)=> {
  let el = e.target.getAttribute("data-item")

  fetch('/api/blog/deleteblog',{
  method:'DELETE',
  body: JSON.stringify({blogId:el}),
  headers: { 'Content-Type': 'application/json' },
}).then((res)=>res.json())
.then((data)=>{
  document.location.replace('/dashboard');
})
}));

changeBTN.forEach(btn => btn.addEventListener('click', (e)=> {
  let id = e.target.getAttribute("data-item")

  fetch(`/api/blog/getblog/${id}`).then((res)=>res.json())
.then((data)=>{
  formBTN[0].value = data.title
  formBTN[1].value = data.content
  formBTN.setAttribute("data-id", id)
  formBTN[2].textContent = "Edit Post"
})
}));