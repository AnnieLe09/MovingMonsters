var Utilities = {
    randomizeInt:function(start, end){
        return rndInt = Math.floor(Math.random() * (end - start + 1)) + start;
    },
    randomizeFloat:function(start, end){
        return rndInt = Math.random() * (end - start) + start;
    },
    compressString: function(arr){
        if(arr.length == 0) return;
        var charArr = [];
        var numArr = [];
        var tmpChar = arr[0];
        var tmpNum = 1;
        for(var i = 1; i < arr.length; ++i){
            if(arr[i] != tmpChar){
                charArr.push(tmpChar);
                numArr.push(tmpNum);
                tmpChar = arr[i];
                tmpNum = 1;
            }
            else{
                tmpNum++;
            }
        }
        charArr.push(arr[arr.length - 1]);
        numArr.push(tmpNum);
        return {
            chars: charArr,
            num: numArr
        };
    }
};