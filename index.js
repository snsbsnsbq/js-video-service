let arrVideos=[]
let aarrVideos=[]
let offset;
let realArr =[];
var db = firebase.firestore();
let wrongAnswers = 0;




firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        
        document.querySelector("div.feedback").style.cssText = 'display: none;'
        document.querySelector("div.sign").style.cssText = 'display: none;'
        document.querySelector("div.user").style.cssText = 'display: inline;'
        document.querySelector("span.userEmail").innerHTML = user.email;
        
            

        async function z() {
        var docRef = db.collection("users").doc(user.email);
        docRef.get().then((doc) => {
            if (doc.exists) {
               
             //   console.log("Document data:", doc.data());
                offset = doc.data().offset
               // console.log(offset);
            } else {
                // doc.data() will be undefined in this case
              //  console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }
    z()
        
        async function f() {
            
            await
         db.collection("videos").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                arrVideos.push(doc.data())
             //  console.log(doc.data())
                            });
        }
        )
//

        //
        realArr =  arrVideos
        //.slice(offset, arrVideos.length)
        console.log(realArr[offset])
        // Проверка наличия следующего видео
        if (realArr[offset]){
     document.querySelector("source.video").src = realArr[offset].video  
     document.querySelector("video").load()
     document.querySelector("video").play()
    }
     
     else{
        document.querySelector("div.video").style.cssText = 'display: none;'
        document.querySelector("div.end").style.cssText = 'display: inline;'
     }
     
     //console.log(realArr[0].meta[0].rightAnswer)
     
    }
    f()
    
   
// переменная номера вопроса
let i=0
    function updateTime() {
       if (document.querySelector('video').currentTime>realArr[offset].meta[i].time){
        document.querySelector('h2.question').innerHTML = realArr[offset].meta[i].question
        document.querySelector('button.answer1').innerHTML = realArr[offset].meta[i].answers[0]
        document.querySelector('button.answer2').innerHTML = realArr[offset].meta[i].answers[1]
        video.pause();
        document.querySelector("div.modal").style.cssText = 'display: inline;'
       }
    }
// Функции ответа на вопросы
function letsplay (){
    if (realArr[offset].meta[i].answers[0] ==realArr[offset].meta[i].rightAnswer){
    document.querySelector("div.modal").style.cssText = 'display: none;'
    i=i+1
    video.play()
    }
else{
    document.querySelector("div.modal").style.cssText = 'display: none;'
    document.querySelector('video').currentTime= realArr[offset].meta[i-1].time;
    wrongAnswers = wrongAnswers +1;

///////
   
      
    
        video.play()
}
}
function letsplay2 (){
    if (realArr[offset].meta[i].answers[1] ==realArr[offset].meta[i].rightAnswer){
    document.querySelector("div.modal").style.cssText = 'display: none;'
    i=i+1
    video.play()
    }
else{
    document.querySelector("div.modal").style.cssText = 'display: none;'
    if(realArr[offset].meta[i].time == realArr[offset].meta[0].time){
        document.querySelector('video').currentTime = 0
    }
    else{
        document.querySelector('video').currentTime= realArr[offset].meta[i-1].time;
    }
    wrongAnswers = wrongAnswers +1;
  
    

       
        video.play()
}
}
//Событие обновления времени
    document.querySelector("video").addEventListener("timeupdate",updateTime );

//Событие нажатия на кнопку
    document.querySelector("button.answer1").addEventListener("click",letsplay);
    document.querySelector("button.answer2").addEventListener("click",letsplay2);
    

    // Событие видео закончилось
    document.querySelector('video').addEventListener('ended', myHandler, false);
    function myHandler(e) {
        i=0;
        // update просмотров
        db.collection("videos").doc(realArr[offset].id).update({
            wrongAnswers: wrongAnswers            
        }).then(() => {
            console.log("Document successfully written!");
            
            
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
        wrongAnswers = 0;
        console.log('Видео закончилось')
        // update нерпавильных ответов
        db.collection("videos").doc(realArr[offset].id).update({
            views: realArr[offset].views +1            
        }).then(() => {
            console.log("Document successfully written!");
            
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });

        db.collection("users").doc(user.email).set({
            offset: offset+1
            
        })
        .then(() => {
            console.log("Document successfully written!");
            
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
        
        db.collection("users").doc(user.email).get().then((doc) => {
            if (doc.exists) {
                   
                offset = doc.data().offset
                if (realArr[offset]){
                    document.querySelector("source.video").src = realArr[offset].video
                    document.querySelector("video").load()
                    document.querySelector("video").play()
                }
                else {
                    
                    document.querySelector("div.video").style.cssText = 'display: none;'
                    document.querySelector("div.end").style.cssText = 'display: inline;'
                }
             
            } else {
                // doc.data() will be undefined in this case
              //  console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });



        
        
        
    }
 


    } 
  });




var elem = document.querySelector("a.q");

elem.onclick = func;
function func() {
    document.querySelector("div.sign").style.cssText = 'display: inline;'
    document.querySelector("div.feedback").style.cssText = 'display: none;'
      
}

var elem1 = document.querySelector("a.w");
elem1.onclick = func1;
function func1() {
    document.querySelector("div.forgetPass").style.cssText = 'display: inline;'
    document.querySelector("div.feedback").style.cssText = 'display: none;'
      
}

var elem2 = document.querySelector("a.e");
elem2.onclick = func2;
function func2() {
    document.querySelector("div.feedback").style.cssText = 'display: inline;'
    document.querySelector("div.sign").style.cssText = 'display: none;'
      
}

var elem3 = document.querySelector("a.r");
elem3.onclick = func3;
function func3() {
    document.querySelector("div.feedback").style.cssText = 'display: inline;'
    document.querySelector("div.forgetPass").style.cssText = 'display: none;'
      
}

var elem4 = document.querySelector("a.t");
elem4.onclick = func4;
function func4() {
    document.querySelector("div.sign").style.cssText = 'display: inline;'
    document.querySelector("div.forgetPass").style.cssText = 'display: none;'
      
}
// Отправка формы входа:
document.querySelector("input.submitBtn").onclick = submit1;
function submit1(){
    const email = document.querySelector("input.email").value;
    const password = document.querySelector("input.password").value;
    firebase.auth().signInWithEmailAndPassword(email, password).then((response)=>{
        document.querySelector("div.feedback").style.cssText = 'display: none;'
        document.querySelector("div.user").style.cssText = 'display: inline;'
        document.querySelector("span.userEmail").innerHTML = response.user.email;
        document.querySelector("div.loginError").innerHTML = ''
        
    })
    .catch((error)=>{
        console.log(error.code)
        if (error.code == 'auth/invalid-email')
        document.querySelector("div.loginError").innerHTML = 'Неправильный E-mail';
        else if (error.code == 'auth/user-not-found') {
            document.querySelector("div.loginError").innerHTML = 'Несуществующий пользователь';
        }
        else if (error.code == 'auth/wrong-password') {
            document.querySelector("div.loginError").innerHTML = 'Неправильный пароль';
        }
    })

}
// Отправка формы регистрации:

document.querySelector("input.regSubmit").onclick = submit2;
function submit2(){
    const email = document.querySelector("input.regEmail").value
    const password = document.querySelector("input.regPassword").value
    const name = document.querySelector("input.regName").value
    const language = document.querySelector("select.language").value
    const birthday = document.querySelector("input.bDay").value
    const gender = document.querySelector("select.gender").value
    const location = document.querySelector("input.location").value
    const maritalStatus = document.querySelector("select.maritalStatus").value
    const childrenQuantity = document.querySelector("select.childrenQuantity").value
    
    const childrens = writeChildren ()
    const incomeLevel=  document.querySelector("select.incomeLevel").value
    const FamilyIncomeLevel = document.querySelector("select.FamilyIncomeLevel").value
    const car = document.querySelector("input.car").value
    const carAge = document.querySelector("input.carAge").value

    
    //const location = document.querySelector("input.location").value
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(()=>{db.collection("users").doc(email).set({
        offset: 0,
        user: {  name, language, birthday, gender, location, maritalStatus, childrenQuantity, childrens, incomeLevel, FamilyIncomeLevel, car, carAge }
        // location: location
    })
    .then(() => {
        console.log("Document successfully written!");
        f()
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });})
    .catch((error)=>{alert('Ошибка регистрации')})

  offset = 0;
}

// отправка формы напоминание пароля

document.querySelector("input.forgetSubmit").onclick = submit3;
function submit3(){
    debugger
    const email = document.querySelector("input.forgetEmail").value
    firebase.auth().sendPasswordResetEmail(email).then(function() {
        console.log(email + 'отправлен')
      }).catch(function(error) {
       console.log(error)
      });
    
}

//Выход
document.querySelector("button.signOut").onclick = signOut;
function signOut(){
    firebase.auth().signOut().then(() => {
        
        document.querySelector("div.user").style.cssText = 'display: none;'
        document.querySelector("div.feedback").style.cssText = 'display: inline;'
        document.querySelector("div.modal").style.cssText = 'display: none;'
        video.pause()
      }).catch((error) => {
        console.log(error)
      });
    
}




// Изменение количества детей
document.querySelector('select.childrenQuantity').onchange = showChildren;

let parent = document.querySelector('div.parent');
let child = document.querySelector('div.elemChildren');


function showChildren() {
    document.querySelector("div.parent").style.cssText = 'display: inline;'
    while (parent.firstChild) {
        parent.firstChild.remove()
    }
    
    let i = 0
    
    while (i < Number(document.querySelector('select.childrenQuantity').value)){
        let clone = child.cloneNode(true);
        parent.appendChild(clone);
        i++
    }
console.log(parent.childNodes.length)

}
function writeChildren () {
    let childArr = []
    debugger
    if (parent.childNodes.childNodes){
    for (let i = 0; i < parent.childNodes.length; i++){
        let childObj = {}
         childObj = {
childGender : parent.childNodes[i].childNodes[3].value,
childAge : parent.childNodes[i].childNodes[7].value,
childStatus : parent.childNodes[i].childNodes[11].value
        }
        childArr.push(childObj)
    }
}
    return childArr
}