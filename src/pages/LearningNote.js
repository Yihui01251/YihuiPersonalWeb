import React from "react";

const LearningNote = ()=>{
    return(
        <main class="blogArea">
        <div class="section-intro">
            <img src="./images/me.png" alt=""/>
            <p>詹怡慧</p>
            <p>歡迎來到我的個人網站！我是一位資訊模擬與設計學系的大學畢業生，擁有兩年C#遊戲開發經驗 ；
                並主動上職訓局的互動式網頁設計課程實作三個月加深網頁設計的技能。
                我的網站展示設計和程式的作品和學習經歷，正在朝成為前端工程師的方向前進。</p>
            </div >
        <div class="section-content">
            <div class="btnContainer">
                <button>全部</button>
                <button>程式</button>
                <button>設計</button>
                <button>其他</button>
            </div>
            <div class="contentContainer">
                <a href="#" class="simple-learnNoteComponent">
                    <h3>文章標題</h3>
                    <div class="hugTag">
                      <p class="tag-card">tag</p>
                    </div>
                    
                  </a>
                  <a href="#" class="simple-learnNoteComponent">
                    <h3>文章標題</h3>
                    <div class="hugTag">
                      <p class="tag-card">tag</p>
                    </div>
                  </a>
                  <a href="#" class="simple-learnNoteComponent">
                    <h3>文章標題</h3>
                    <div class="hugTag">
                      <p class="tag-card">tag</p>
                    </div>
                    </a>
                    <a href="#" class="simple-learnNoteComponent">
                        <h3>文章標題</h3>
                        <div class="hugTag">
                          <p class="tag-card">tag</p>
                        </div>
                        </a>
           </div>
            </div>
    </main>
    )
}

export default LearningNote;