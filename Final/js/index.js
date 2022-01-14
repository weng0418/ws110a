// 當前玩家
function Player(){
    var game;
    var status = 'pause'; //默認暫停 ‘run’
    var timerId;
    var score = 0;
    // 綁定事件
    function bindEvent(){
        // var body = document.body;
        document.addEventListener('keydown', function(e){ 
            // console.log('e',e)
            switch(e.keyCode){
                case 87:// W鍵           
                    game.rotate(); // 旋轉
                    run()
                    break;
                case 68:// D鍵
                    game.right(); // 向右
                    run()
                    break;
                case 65:// A鍵
                    game.left(); // 向左
                    run()
                    break;
                case 83:// S鍵
                    game.down(); // 下落
                    run()
                    break;
                case 32:// 空白鍵
                    game.fall(); // 到底
                    run()
                    break;
                case 81: // Q鍵
                    _play();   //暫停
                    break;
                default:
                    break;
            }       
        })
    } 
    // 初始化
    function _start(){
        game = new Game();
        game.init({
            doms: {
                game: document.getElementById('game'),
                next:  document.getElementById('next'),
                dir: document.getElementById('dir')
            }
        });
        bindEvent();
        run();
        showScore();
    }
    // 向下移動
    function move(){
        if(!game.down()){
            // 如果不能繼續向下，則將當前方塊固定在底部
            game.fixed();
            // 檢測能否消分
            game.clearSquare(function(data){
                if(data>0){                    
                    calScore(data);
                    showScore();
                }               
            });
             // 執行下一條
            game.runNext();
        }    
    }
    //開始
    function run(){
        status = 'run';
        // console.log(status)
        if(!timerId){
            timerId = setInterval(move, 1000)
        }        
    }
    // 暫停
    function pause(){
        status = 'pause';
        // console.log(status);
        clearInterval(timerId);
        timerId = null
    }
    // 開關按鈕
    function _play(){
        if(status==='run'){
            // 暫停
            pause()
        }else{
            // 開始
            run()
        }
    }
    //計算分數 
    function calScore(level){       
        switch(level){
            case 1:
                score += 10;
                break;
            case 2:
                score += 30;
                break;
            case 3:
                score += 60;
                break;
            case 4:
                score += 80;
                break;
            default:
                break
        }
    }
    // 刷新分數
    function showScore(){
       var dom_score = document.getElementById('score');
       dom_score.innerHTML = score;

    }

    //暴露介面
    this.start = _start;  // 初始化    
}

var player = new Player();
player.start();

