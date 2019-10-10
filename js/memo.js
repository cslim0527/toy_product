console.log("memo.js loaded");

window.addEventListener("load",function(){

    const newBtn = document.querySelector(".btn_new_memo");
    const saveBtn = document.querySelector(".btn_save_memo");
    const modifyBtn = document.querySelector(".btn_modify_memo");
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
        setIndex();
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
        setIndex();
        titleInput.focus();
    });

    // 메모 변경 버튼
    modifyBtn.addEventListener("click",function(){
        const index = this.getAttribute("modify-list");
        const targetList = document.querySelectorAll(".lists_area ul li");
        const title = document.querySelector(".write_title");
        const desc = document.querySelector(".write_desc");
        
        for(let t=0; t<targetList.length; t++){
            if ( index == t) {
                console.log(title, desc);
                targetList[t].children[1].innerText = title.value;
                targetList[t].children[2].innerText = desc.value;
                title.value = "";
                desc.value = "";
            }
        }
        console.log(index);
    });

    // 새로운 메모 추가
    function newListAdd(title, desc, timePoint) {
        const newList = document.createElement("li");
        const memoHeader = document.createElement("div");
        const newTitle = title || titleInput.value || "제목없음";
        const newDesc = desc || descInput.value || "내용없음";
        const newRemoveBtn = document.createElement("button");
        let writeTime = document.createElement("span");

        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const time = today.getHours() + ":" + today.getMinutes();
        writeTime.innerText = timePoint || date + " " + time;
        
        let newMemo = "";   

        memoHeader.setAttribute("class","memo_header");

        newMemo += '<div class="memo_title">'+ newTitle +'</div>';
        newMemo += '<div class="memo_desc">'+ newDesc +'</div> ';
        newList.innerHTML = newMemo;

        // 메모 삭제 버튼
        newRemoveBtn.textContent = "x";
        newRemoveBtn.setAttribute("class","btn_remove_memo");
        newRemoveBtn.setAttribute("type","button");
        newRemoveBtn.addEventListener("click",function(){
            memoList.removeChild(newList);
            setIndex();
        });

        newList.insertBefore(memoHeader, newList.children[0]);
        memoHeader.appendChild(newRemoveBtn);
        memoHeader.insertBefore(writeTime, memoHeader.children[memoHeader.children.length-1]);
        memoList.appendChild(newList);

        // 리스트 클릭 시 내용 출력
        newList.addEventListener("click",function(list){
            const index = this.getAttribute("data-index");
            const title = list.currentTarget.children[1].innerText;
            const desc = list.currentTarget.children[2].innerText;
            const titleInput = document.querySelector(".write_title");
            const descInput = document.querySelector(".write_desc");
            document.querySelector(".btn_modify_memo").setAttribute("modify-list", index);

            titleInput.value = title;
            descInput.value = desc;

            // 현재 클릭 된 리스트 selected
            for ( let mml_i = 0; mml_i < memoList.children.length; mml_i++){
                memoList.children[mml_i].classList.remove("selected");
            }
            list.currentTarget.classList.add("selected");
        });
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