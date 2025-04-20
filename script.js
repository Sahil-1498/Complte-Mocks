let subBars = document.querySelector('.sub-bars');
let subSideMenu = document.querySelector('.sub-side-menu');
let closeloginxmark = document.querySelector('.close-xmark');
let closesignupxmark = document.querySelector('.close-signup-xmark');
let login = document.querySelector('.login');
let userr = document.querySelector('.userr');
let userbox = document.querySelector('.user-log-box');
let singUpLinkBtn = document.querySelector('.signup-link-btn');
let signupbox = document.querySelector('.sign-up-box');
let loginlinkbtn = document.querySelector('.login-link-btn');





/*.............................................*/
subBars.addEventListener('click', ()=>
{
    if(subSideMenu.style.left===""){
        subSideMenu.style.left="-20vw";

    }

    if(subSideMenu.style.left==="-20vw"){
        subSideMenu.style.left='0vw';
    }

    else{
        subSideMenu.style.left="-20vw";
    }
})
// ...................................................

userr.addEventListener('click', ()=>
    {
        if(userbox.style.display===""){
            userbox.style.display="none";
        }

        if(userbox.style.display==="none"){
            userbox.style.display="block";
            // signupbox.style.transform = "rotateY(-180deg)";
            // signupbox.style.backfaceVisibility = "hidden";
        }
        else{
            userbox.style.display="none";
        }
    })

    closeloginxmark.addEventListener('click', ()=>
        {
            if(userbox.style.display===""){
                userbox.style.display="block";
            }
    
            if(userbox.style.display==="block"){
                userbox.style.display="none";
            }
            // else{
            //     userbox.style.display="none";
            // }
        })
    
        singUpLinkBtn.addEventListener('click', () => {
           
                login.style.transform = "rotateY(-180deg)";
                login.style.backfaceVisibility = "hidden";
                
                signupbox.style.transform = "rotateY(0deg)";
                signupbox.style.backfaceVisibility = "hidden";
        });
        

        loginlinkbtn.addEventListener('click', () => {
           
            login.style.transform = "rotateY(0deg)";
            login.style.backfaceVisibility = "hidden";
            signupbox.style.transform = "rotateY(-180deg)";
            signupbox.style.backfaceVisibility = "hidden";
    });



    closesignupxmark.addEventListener('click', ()=>
        {
            if(userbox.style.display===""){
                userbox.style.display="block";
            }
    
            if(userbox.style.display==="block"){
                userbox.style.display="none";
            }
            // else{
            //     userbox.style.display="none";
            // }
        })




        // ..................................................
    



// ......................................................................


// ........................................................................

let userfirst = document.querySelector('.userfirst');
let userlast = document.querySelector('.userlast');
let usermobile = document.querySelector('.usermobile');
let userdate = document.querySelector('.userdate');
let userpasswrd = document.querySelector('.userpasswrd');
let signupBtns = document.querySelector('.signup-btns');





signupBtns.addEventListener('click', ()=>
    {
        console.log(userfirst);
        localStorage.setItem("First Name",JSON.stringify(userfirst.value));
        localStorage.setItem("Last Name",JSON.stringify(userlast.value));
        localStorage.setItem("DOB",JSON.stringify(userdate.value));
        localStorage.setItem("Mobile No.",JSON.stringify(usermobile.value));
        localStorage.setItem("Password",JSON.stringify(userpasswrd.value));
        userbox.style.display="none";
        userr.style.display="none";
        console.log(userfirst.value);
        console.log(userlast.value);
        console.log(userdate.value);
        console.log(usermobile.value);
        console.log(userpasswrd.value);

    })





/*
userfirst
userlast
userdate
usermobile
userpasswrd
signup-btns
*/ 