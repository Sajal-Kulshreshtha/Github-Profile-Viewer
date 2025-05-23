const input=document.getElementById("username");
const button=document.getElementById("fetchButton");
const errorMessage=document.getElementById("errorMessage");
const profileContainer=document.getElementById("profileContainer");

button.addEventListener("click",async ()=>{
    const username=input.value.trim();

    errorMessage.textContent="";
    profileContainer.innerHTML="";

    if(username===""){
        errorMessage.textContent="Please enter a username";
        return;
    }

    try{
        const response=await fetch(`https://api.github.com/users/${username}`);
         if(!response.ok){
            if(response.status===404){
             errorMessage.textContent="User not found";
    }
        else{
            errorMessage.textContent="Some error occurred...Please try again later";
        }
        return ;
    
    }
    const data=await response.json();

    const profileHTML = `
      <div class="profile-info">
        <img src="${data.avatar_url}" alt="Avatar" width="100" height="100">
        <h2>${data.name || 'No Name Available'}</h2>
        <p><strong>Bio:</strong> ${data.bio || 'N/A'}</p>
        <p><strong>Location:</strong> ${data.location || 'N/A'}</p>
        <p><strong>Public Repos:</strong> ${data.public_repos}</p>
        <p><strong>Followers:</strong> ${data.followers}</p>
        <p><a href="${data.html_url}" target="_blank">View GitHub Profile</a></p>
      </div>
    `;

    profileContainer.innerHTML=profileHTML;
    }
    

    //Making the profile card

catch(error){
    console.error("Error fetching data:", error);
    errorMessage.textContent="Network error occurred...Please try again later";
}

});
