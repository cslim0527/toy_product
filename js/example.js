console.log("example.js loaded");

window.addEventListener("load",function(){

    const newBtn = document.querySelector(".btn_new_memo");
    const saveBtn = document.querySelector(".btn_save_memo");
    const titleInput = document.querySelector(".write_title");
    const descInput = document.querySelector(".write_desc");
    const memoList = document.querySelector(".lists_area > ul");
  
    // 유저 데이터
    let userData = {
        "user" : 
        [
            {
                "name" : "임찬수",
                "password" : "1234",
                "memo" : 
                [
                    {
                        title : "임찬수의 메모1",
                        desc : "임찬수의 메모1"
                    },
                    {
                        title : "임찬수의 메모2",
                        desc : "임찬수의 메모2"
                    },
                    {
                        title : "임찬수의 메모3",
                        desc : "임찬수의 메모3"
                    }
                ]
            },
            {
                "name" : "손혜림",
                "password" : "2213",
                "memo" : 
                [
                    {
                        title : "손혜림의 메모1",
                        desc : "손혜림의 메모1"
                    },
                    {
                        title : "손혜림의 메모2",
                        desc : "손혜림의 메모2"
                    },
                ]
            },
        ]
    }

    // 데이터 받아오기
    function syncData (){
        for(let data_i = 0; data_i<userData["user"].length; data_i++){
            for(let user_i = 0; user_i<userData["user"][data_i].memo.length; user_i++){
                const dataTitle = userData["user"][data_i].memo[user_i].title;
                const dataDesc = userData["user"][data_i].memo[user_i].desc;
                newListAdd(dataTitle, dataDesc);
            }
        }
    }
  
    // 새 메모 버튼 (작성중인 메모 초기화)
    newBtn.addEventListener("click",function(){
        const warning = confirm("입력중인 메모는 저장되지 않습니다. \n새 메모를 작성하시겠어요?");
        if (warning){
            // 입력값 초기화
            resetMemo();
        }
    });

    // 메모 저장
    saveBtn.addEventListener("click",function(){
        newListAdd();
        resetMemo();
        titleInput.focus();
        setIndex();
    });

    // 새로운 메모 추가
    function newListAdd(title = '', desc = ''){
        const newList = document.createElement("li");
        // newList.setAttribute("data-index", memoList.childNodes.length);
        const newTitle = title || titleInput.value || "제목없음";
        const newDesc = desc || descInput.value || "내용없음";
        const newRemoveBtn = document.createElement("button");
        let newMemo = "";   
        
        newMemo += '<div class="memo_title">'+ newTitle +'</div>';
        newMemo += '<div class="memo_desc">'+ newDesc +'</div> ';
        newList.innerHTML = newMemo;

        newRemoveBtn.textContent = "x";
        newRemoveBtn.setAttribute("class","btn_remove_memo");
        newRemoveBtn.setAttribute("type","button");
        newRemoveBtn.addEventListener('click', () => {
          memoList.removeChild(newList);
          setIndex();
        })

        newList.appendChild(newRemoveBtn);
        memoList.appendChild(newList);
    }

    // 입력값 초기화
    function resetMemo(){
        titleInput.value = "";
        descInput.value = "";
    }

    // 리스트 인덱스 셋팅
    function setIndex(){
        const li = document.querySelectorAll(".lists_area li");
        for(let li_i=0; li_i<li.length; li_i++){
            li[li_i].setAttribute("data-index",li_i);
        }
    }

    function init(){
        syncData ();
    }
    init();
});