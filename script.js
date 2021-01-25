let costButton = document.querySelectorAll(".question__cost");
let modalWindow = document.querySelector(".modal");
let questionField = document.querySelector(".question");
let closeButton = document.querySelector(".button-close");
let nextButton = document.querySelector(".button-next");
let modalQuestion = document.querySelector(".modal__question");

let modalText = document.querySelector(".modal__text");


let img = document.createElement("img");


let video = document.createElement("video");
let rateScore = "";


questionField.addEventListener ("click", (event) => {
let question = event.target;
if (question.classList.contains("question__cost")) {
    
    question.classList.add("question--completed");
    modalWindow.classList.toggle("modal--active");
    modalText.classList.add("text-without-img");

    point = question.textContent;

    let questionContainer = question.parentElement;
    let questionText = questionContainer.lastElementChild;


    
    if (!question.nextElementSibling.classList.contains("video-question")) {

        if (question.id == "auction") {
            rate = document.querySelector(".rate");
            rate.classList.add("rate--active");
           

            nextButton.addEventListener("click", () => {
                rateScore = rate.value;
                modalText.innerText = questionText.textContent.trim(); 
                modalText.classList.remove('question__text');
            }, options={once: true});
        }

        
        else {
            modalText.innerText = questionText.textContent.trim(); 
            modalText.classList.remove('question__text');
        }
        

       
        if (question.nextElementSibling.classList.contains("img-question")) {

            

            modalQuestion.append(img);
            modalQuestion.classList.add("question-with-img");
            modalText.classList.add("text-with-img");
            modalText.classList.remove('text-without-img');

            let url = question.nextElementSibling.textContent;
            img.src = url;
            img.classList.add("img-question");

            nextButton.addEventListener("click", () => {
                let newUrl = question.nextElementSibling.nextElementSibling.textContent;
                img.src = newUrl;
                img.classList.remove("img-question");
                img.classList.add("img-answer");
                
                modalText.classList.add('question__text');
                modalText.classList.remove('modal__text');
            }, options={once: true});
            

        }


    }

    if (question.nextElementSibling.classList.contains("video-question")) {
        modalQuestion.append(video);

        modalText.classList.remove('text-without-img');
        modalQuestion.classList.add('question-with-video');

        let url = question.nextElementSibling.textContent;
        video.src = url;
        video.controls = "controls";
        // video.autoplay = 'autoplay';
        video.poster = "./img/anon.jpg";
        
        video.addEventListener("keydown", () => {
                if (questionContainer.children.length > 1) {

                    modalText.innerHTML = questionText.textContent; 
                    modalText.classList.remove('question__text');
                    video.classList.add("video-question--completed");
                }
            }, options={once: true})
        nextButton.addEventListener("click", () => {
                if (question.nextElementSibling.nextElementSibling.classList.contains("img-question")) {
                    modalQuestion.append(img);
                    let url = question.nextElementSibling.nextElementSibling.textContent;
                    img.src = url;
                    img.classList.remove("img-question");
                    img.classList.add("img-answer");
                    
                    modalText.classList.remove('modal__text');
                    modalText.classList.add('question__text');
                    modalQuestion.classList.remove('question-with-video');
                    modalQuestion.classList.add('img-answer');
                }
        }, options={once: true})
    }

}
})

let scoreButton = document.querySelectorAll(".button-score");
for (let pointButton of scoreButton) {
    pointButton.addEventListener("click", () => {
        
    let firstTeamScore = document.querySelector(".team__first");
    let secondTeamScore = document.querySelector(".team__second");

    if (rateScore !== "") {
        point = rateScore;
    }
    
        for (let className of pointButton.classList) {
        
        if (className == "modal__plus-first") {
            firstTeamScore.innerHTML = Number(firstTeamScore.textContent) + Number(point);
        }
        else if (className == "modal__plus-second") {
            secondTeamScore.innerHTML = Number(secondTeamScore.textContent) + Number(point);   
        }
        else if (className == "modal__minus-second") {
            secondTeamScore.innerHTML = Number(secondTeamScore.textContent) - Number(point);   
        }
        else if (className == "modal__minus-first") {
            firstTeamScore.innerHTML = Number(firstTeamScore.textContent) - Number(point);   
        }
    }
    })
}


closeButton.addEventListener("click", () => {
    closeButton.classList.toggle("button-close--acive");
    modalWindow.classList.toggle("modal--active");
    modalText.innerText = "";
    
    

    if (rateScore !== "") {
        rateScore = "";
        rate.classList.remove("rate--active");
    }
    

    modalQuestion.childNodes.forEach(element => {
        if (element == img) {
            img.classList.remove("img-answer");
            modalQuestion.removeChild(img);
            modalQuestion.classList.remove("question-with-img");
            modalText.classList.remove("text-with-img");
            modalText.classList.add('text-without-img');
            modalText.classList.add('modal__text');
        }
       
    });
    modalQuestion.childNodes.forEach(element => {
        
        if (element == video) {
            img.classList.remove("img-answer");
            video.classList.remove("video-question--completed");
            modalQuestion.removeChild(video);
            modalQuestion.classList.remove('img-answer');
            modalText.classList.add('modal__text');
            modalQuestion.classList.remove('question-with-video');
        }
    });
   
    
    
    
})



