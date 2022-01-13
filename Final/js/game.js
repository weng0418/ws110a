// 遊戲本體
/**
 * 
 * @param {*} config 配置參數 { gameData, nextDataList, doms}
 * @param {*} gameData 要掛載的容器
 * 
 */
function Game(config){    
    var gameData = [
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
    ]
    var nextData = [];
    var curData = [];
    var origin = {
        x: 0,
        y: 0
    }
    var gameDivs = this.gameDivs = [];  // 遊戲區span dom集合
    var nextDivs = this.nextDivs = [];  // 下個方塊span dom集合  
       
    var gameDiv = null;  //遊戲區容器
    var nextDiv = null;  //下個方塊容器
    var dirDiv = null;    // 方向容器
    
    var curSquare = null;  //當前方塊
    var nextSquare = null; //下個方塊


    // 方法
    // 生成隨機數
    function createRandomNum(min, max){
        // 1-7  0-3
        return Math.floor(Math.random()*(max-min+1))+min
    }
    // 從方塊複製數據到遊戲區
    function copyData(gameData, curData, origin){
        // gameData 遊戲數據
        // nextData 方塊數據
        // 起始位置         
        for(var i=0; i<curData.length; i++){
            for(var j=0; j<curData[i].length; j++){
                if(checkDotValid(origin, i, j)){
                    gameData[origin.x + i][origin.y + j] = curData[i][j]
                }                
            }
        }
    }
    // 清空遊戲區數據
    function clearData(gameData, curData, origin, value){
        for(var i=0; i<curData.length; i++){        
            for(var j=0; j<curData[i].length; j++){               
                if(checkDotValid(origin, i, j)){
                    gameData[origin.x + i][origin.y + j] = value                    
                }                 
            }
        }
    }
    // 渲染區域
    function renderDiv(container, data, divs){        
        for(var i=0; i<data.length; i++){    
            var rowDivs = [];    
            for(var j=0; j<data[i].length; j++){
                var type = data[i][j];
                var span = document.createElement('span');                
                span.style.top = i*20 + 'px';
                span.style.left = j*20 + 'px'; 
                container.appendChild(span);
                rowDivs.push(span)
            }
            divs.push(rowDivs)
        }
    }
    // 重新渲染區域
    function refreshDiv(data, divs){
        for(var i=0; i<data.length; i++){        
            for(var j=0; j<data[i].length; j++){
                var type = data[i][j];
                var span = divs[i][j];                          
                if(type===0){
                    span.setAttribute('class','box box-none');
                }else if(type===1){
                    span.setAttribute('class','box box-dead');
                }else if(type===2){
                    span.setAttribute('class','box box-next');
                }  
            }
        }
    }
    // 渲染所有區域
    function render(){
        renderDiv(gameDiv, gameData, gameDivs)
        renderDiv(nextDiv, nextSquare.data, nextDivs)
    }
    // 刷新頁面
    function fresh(){
        clearData(gameData, curSquare.data, curSquare.origin, 0);  // 先清空舊數據
        copyData(gameData, curSquare.data, curSquare.origin)    // 複製新數據
        refreshDiv(gameData, gameDivs)                            // 刷新遊戲區
        refreshDiv(nextSquare.data, nextDivs)                            //刷新方块
    }
    function init(config){
        var doms = config.doms ||{};  
        gameDiv = doms.game || document.getElementById('game');  // 遊戲區容器
        nextDiv = doms.next || document.getElementById('next');  // 下個方塊容器
        dirDiv = doms.dir || document.getElementById('dir');    // 方向容器  
        curSquare  = squareFactory(createRandomNum(1, 7), createRandomNum(0, 3));  //下一個方塊複製給當前
        nextSquare = squareFactory(createRandomNum(1, 7), createRandomNum(0, 3));  //下下一個方塊複製給當前
        render();   
        fresh();   
    }

    /**
     * 檢測點是否合法
     * @param {*} origin 檢測方塊的原點坐標
     * @param {*} row 待監測方塊點的行數
     * @param {*} col 待監測方塊點的列數
     */
    function checkDotValid(origin, row, col){        
        var x = origin.x||0;
        var y = origin.y||0;
        var maxRow = gameData.length; // 最大的行數
        var maxCol = gameData[0].length; // 最大列數
        if(x+row <0){
            // 超出遊戲區上面
            return false
        }else if(x+row >= maxRow){
            // 超出遊戲區下面
            return false
        }else if(y+col <0 ){
            // 超出遊戲區左面
            return false
        }else if(y+col >= maxCol ){
            // 超出遊戲區右面
            return false
        }else if( gameData[x+row][y+col] ===1 ){
            // 該位置已有灰色的方塊
            return false
        }
        return true
    }
   
    /**
     * 檢測方塊整體是否合法
     * @param {*} origin 方塊的原點位置
     * @param {*} data   方塊的數據
     */
    function checkSquareValid(origin, data){
        for(var i=0; i<data.length; i++){
            for(var j=0; j<data[i].length; j++){
                if(data[i][j]!==0){
                    // 該點是實體點
                    if(!checkDotValid(origin, i, j)){
                        return false
                    }                    
                }
            }
        }
        return true
    }

    
    // 顯示操作
    function showAct(container, act){
        container.innerHTML = act;
        // console.log('act', act)
    }   
    // 向下 
    function nextDown(){
        clearData(gameData, curSquare.data, curSquare.origin, 0);                  //先清空旧数据
        curSquare.down();   
        copyData(gameData, curSquare.data, curSquare.origin)    // 複製新數據
        refreshDiv(gameData, gameDivs)          // 刷新遊戲區
    }
    function down(){  
        showAct(dirDiv, '下落');
        if(curSquare.canDown(checkSquareValid)){
            // console.log('合法')
            nextDown(); 
            return true          
        }; 
        return false
    }
    // 向左
    function nextLeft(){
        clearData(gameData, curSquare.data, curSquare.origin, 0);                  //先清空旧数据
        curSquare.left();        
        copyData(gameData, curSquare.data, curSquare.origin)    // 複製新數據
        refreshDiv(gameData, gameDivs)          // 刷新遊戲區
    }
    function left(){  
        showAct(dirDiv, '向左');
        if(curSquare.canLeft(checkSquareValid)){
            // console.log('合法')
            nextLeft();           
        }; 
    }
    // 向右
    function nextRight(){
        clearData(gameData, curSquare.data, curSquare.origin, 0);                  //先清空旧数据
        curSquare.right();          
        copyData(gameData, curSquare.data, curSquare.origin)    // 複製新數據
        refreshDiv(gameData, gameDivs)          // 刷新遊戲區 
    }
    function right(){  
        showAct(dirDiv, '向右');
        if(curSquare.canRight(checkSquareValid)){
            // console.log('合法')
            nextRight();           
        }; 
    }
    // 旋轉
    function nextRotate(){
        clearData(gameData, curSquare.data, curSquare.origin, 0);                  //先清空旧数据        
        curSquare.rotate();   // 旋轉       
        copyData(gameData, curSquare.data, curSquare.origin)    // 複製新數據
        refreshDiv(gameData, gameDivs)          // 刷新遊戲區
    }
    function rotate(){  
        showAct(dirDiv, '旋轉');
        if(curSquare.canRotate(checkSquareValid)){
            // console.log('合法')
            nextRotate();           
        }; 
    }
    // 墜落
    function fall(){
        while(this.down()){
            // this.down()
        }
    }
    // 固定當前方塊
    function fixed(){
         // 开始位置          
        for(var i=0; i<curSquare.data.length; i++){
            for(var j=0; j<curSquare.data[i].length; j++){
                if(checkDotValid(curSquare.origin, i, j)){
                    if(gameData[curSquare.origin.x + i][curSquare.origin.y + j] === 2){
                        gameData[curSquare.origin.x + i][curSquare.origin.y + j] = 1
                    }                    
                }                
            }
        }
        refreshDiv(gameData, gameDivs)          // 刷新遊戲區
    }
    // 消分
    function clearSquare(next){    
        var score = 0;
        for(var i= gameData.length-1; i>0; i--){
            var win = true;   // 默認該行是滿的，可以得分
            for(var j=0; j<gameData[i].length; j++){
                if(gameData[i][j]!==1){
                    win = false;
                    break;
                }
            }
            if(win){  
                score++;
                // 下移一行
                for(var m=i;m>0;m-- ){
                    for(var n=0; n<gameData[i].length; n++){
                        gameData[m][n] = gameData[m-1][n];
                    }
                }    
                // 第一行設為灰色
                for(var k=0; k<gameData[0].length; k++){
                    gameData[0][k] = 0;
                }  
                // 重新回到底行，在做循環判斷
                i++;
            }            
        }
        typeof next==='function'&&next(score)
    }
    // 方塊整體下移一行

    // 執行下一條
    function runNext(){
        // console.log('next--');
        curSquare = nextSquare; 
        nextSquare = squareFactory(createRandomNum(1,7), createRandomNum(0,3));  //下一个方块复制给当前
        refreshDiv(nextSquare.data, nextDivs);  // 刷新下個方塊
    }
    
    // 導出api
    this.init = init;
    this.down = down;    
    this.left = left;    
    this.right = right;  
    this.rotate = rotate;  
    this.fall = fall;
    this.fixed = fixed;
    this.clearSquare = clearSquare;
    this.runNext = runNext;
}