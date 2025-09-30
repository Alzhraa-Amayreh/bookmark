 const  input =Array.from(document.querySelectorAll(".form-control"));
const bookMarkForm=document.querySelector(".bookMarkForm");
const  removeAll=document.querySelector(".remove-all");
const searchInput=document.querySelector(".searchInput");
const errorMassege= Array.from(document.querySelectorAll(".massege"));
const addBtn=document.querySelector(".addbtn");
const updateBtn=document.querySelector(".updatbtn"); 



let sites = JSON.parse(localStorage.getItem("sites"))||[];
let currentIndex=null;
const siteValidation=()=>{
  const regex=/^[A-Z][a-zA-Z0-9]*$/;  // اول حرف كبير
  if(!regex.test(input[0].value))
    { input[0].classList.remove("is-valid");
      input[0].classList.add("is-invalid");
      errorMassege[0].textContent="Invalid Name,First letter must be capital";
   return false;
}
  else
   { input[0].classList.remove("is-invalid") 
    input[0].classList.add("is-valid");
     errorMassege[0].textContent="";

    return true;
   }
  }
   const siteURLvalidation=()=>{
    
    const regex=/^.*\.com$/;   // يحتوي على ".com" في أي مكان
    if(!regex.test(input[1].value)){
     input[1].classList.remove("is-valid");
      input[1].classList.add("is-invalid");
       errorMassege[1].textContent="Invalid URL, must contain .com";
      return false;
    }
    else
    {
      input[1].classList.remove("is-invalid") 
     input[1].classList.add("is-valid");
      errorMassege[1].textContent=" ";
     return true;

    }
   }
    const siteEmailvalidation=()=>{
    const regex=/^[a-zA-Z0-9._%+-]+@gmail\.com$/;  // يقبل بريد إلكتروني ينتهي بـ @gmail.com فقط


    if(!regex.test(input[2].value)){
     input[2].classList.remove("is-valid");
      input[2].classList.add("is-invalid");
       errorMassege[2].textContent="Invalid Email, must contain ....@gmail.com";
      return false;
    }
    else
    {
      input[2].classList.remove("is-invalid") 
     input[2].classList.add("is-valid");
      errorMassege[2].textContent=" ";
     return true;

    }
   }
  //   const sitePasswordvalidation=()=>{
  //   const regex=/^[A-Z](?=(?:.*[\W_]))[0-9\W_]{7}$/;  // كلمة مرور 8 خانات: تبدأ بحرف كبير، وتحتوي على الأقل رمز واحد، والباقي أرقام أو رموز
  //   if(!regex.test(input[3].value)){
  //    input[3].classList.remove("is-valid");
  //     input[3].classList.add("is-invalid");
  //      errorMassege[3].textContent="Invalid password, must start with capital lettter and contain at least one sympol ";
  //     return false;
  //   }
  //   else
  //   {
  //     input[3].classList.remove("is-invalid") 
  //    input[3].classList.add("is-valid");
  //     errorMassege[3].textContent="  ";
  //    return true;

  //   }
  //  }


 input[0].addEventListener("input",siteValidation);
 input[1].addEventListener("input",siteURLvalidation);
 input[2].addEventListener("input",siteEmailvalidation);
//  input[3].addEventListener("input",sitePasswordvalidation);


bookMarkForm.addEventListener("submit",(e)=>{
  e.preventDefault();
  let isValid=true;
  if(!(siteValidation()&&siteURLvalidation()&&siteEmailvalidation)){//()&&sitePasswordvalidation())){
    isValid=false;
  }
  if(isValid==false)  return;
 
 
   const site ={
    siteName:input[0].value,
    siteURL:input[1].value,
    siteEmail:input[2].value,
    SitePassword:input[3].value,
    
   }
   
   if (currentIndex !== null){
     sites[currentIndex] = site;
     currentIndex = null;
      addBtn.textContent = "Add";
    addBtn.classList.remove("updating");
   }
   else{
  sites.push(site);
   }



   localStorage.setItem("sites",JSON.stringify(sites));
     displaySites();
    bookMarkForm.reset();
  
}
);

 const displaySites = ()=>{
    const result = sites.map((site,index)=>{
        return `<tr>
              
               <td>${site.siteName}</td>
                <td>${site.siteURL}</td>
                <td>${site.siteEmail}</td>
                <td>${site.SitePassword}</td>
                <td><button class="btn btn-outline-danger" onclick='removeItem(${index})'>Delete</button></td>
                <td><button class="btn btn-outline-success  " onclick='updateItem(${index}); 'updateItem(${index})'>Edit</button></td>
               </tr> `                    //delete
    });result.join(' ');


   console.log(result);
 document.querySelector(".sites-data").innerHTML=result.join(' ');
 }

 const removeItem=(index)=>{
 
 sites.splice(index,1);
 localStorage.setItem("sites",JSON.stringify(sites));
 displaySites();
 }

removeAll.addEventListener("click",()=>{
  localStorage.removeItem("sites");
  sites=[];
  displaySites();
})
searchInput.addEventListener("input",()=>{
  const filterText =searchInput.value.toLowerCase();
  console.log(filterText);
 const filterdSites= sites.filter((site)=>{
  return site.siteName.toLowerCase().includes(filterText);


  })

})



console.log(input);
 const updateItem=(index)=>
  { currentIndex=index;
 
  
    input[0].value=sites[index].siteName;
    input[1].value=sites[index].siteURL;
    input[2].value=sites[index].siteEmail;
    input[3].value=sites[index].SitePassword;

  addBtn.textContent="Update";
  addBtn.classList.add("updatbtn");//delete
}




 