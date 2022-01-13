
// 工具函数
(function (win, undefined){
    /**  
     * 將矩陣旋轉90度
     * @params matrix 目標矩陣
     * return 旋轉的新矩陣
     */    
    var rotate = function( matrix ){  
        //  matrix 為正方形矩陣 
        var length = matrix[0].length;
        // rotatedMatrix 轉換後的矩陣
        var rotatedMatrix = [];
        for(var i=0; i< length; i++){            
            var row = [];
            for(var j=0; j< length; j++){                
                row[j] = matrix[length-j-1][i];                 
            }
            rotatedMatrix.push(row)
        }  
        return rotatedMatrix      
    }
    var Util = {
        rotate: rotate
    }
    win.Util = Util
})(window)