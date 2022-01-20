const newUser = document.querySelector("#newuser")
console.log(newUser)

newUser.addEventListener("submit", (e)=> { 
  e.preventDefault();
  let email = newUser[0].value.trim()
  let name = newUser[1].value.trim()
  let password = newUser[2].value.trim()

  if(!email  || !password || !name) return ;

  let userObject = { 
    email ,
    name , 
    password
  }
  
  fetch('/api/users/createuser',{
    method:'POST',
    body: JSON.stringify(userObject),
    headers: { 'Content-Type': 'application/json' },
  }).then((res)=>res.json())
  .then((data)=>{
    document.location.replace('/');
  })

  newUser[0].value = ""
  newUser[1].value = ""
  newUser[2].value = ""


})