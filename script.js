/**
 * @author 6lszxz <2106050119@hhu.edu.cn>
 * @function
 * Question类，一个有若干操作符和操作数的算式
 */
function Question(){
    /**
     * @type {number}
     * 操作数的个数
     */
    this.size = Math.floor(Math.random()*2+2);
    let operators =[];
    for(let i =0;i<this.size-1;i++){
        let opJudge=Math.floor(Math.random()*2);
        if(opJudge===0){
            operators.push("+");
        }else {
            operators.push("-");
        }
    }

    /**
     * @type {*[]}
     * 操作符数组，大小为size-1
     */
    this.operators = operators;
    let numbers = [];
    for (let i = 0; i < this.size; i++) {
        numbers.push(Math.floor(Math.random() * 100));
    }

    /**
     * @type {*[]}
     * 操作数数组，大小为size
     */
    this.numbers = numbers;

    /**
     * @type {*[]}
     * 每个子集的结果
     */
    this.partResults =[];

    /**
     * @returns {boolean}
     * 检测是否超纲，超纲为true，不超纲为false
     */
    this.isOutOfEdge = function (){
        let result =0;
        for(let i=0;i<this.size;i++){
            if(i===0){
                result+=this.numbers[i];
                this.partResults[i] = result;
                continue;
            }
            if(this.operators[i-1]==='+'){
                result+=this.numbers[i];
            }else {
                result -= this.numbers[i];
            }
            this.partResults[i] = result;
        }
        this.totalResult=result;
        for (let partResult of this.partResults) {
            if(partResult<0 || partResult>100){
                return true;
            }
        }
        return false;
    }

    /**
     * @returns {string}
     * 重写toString方法
     */
    this.toString= function (){
        let result ="";
        for(let i=0;i<this.size;i++){
            if(i!==0){
                result+= this.operators[i-1];
            }
            result+= String(this.numbers[i]);
        }
        return result;
    }
}

/**
 * @function
 * 判断两个算式是否相等
 * @param A
 * 算式A
 * @param B
 * 算式B
 * @returns {boolean}
 * 两个算式是否相等，相等为true，不相等为false
 */
function isTwoQuestionsEqual(A,B) {
    return String(A.operators) === String(B.operators) && String(A.numbers) === String(B.numbers)
}

/**
 * @function
 * 生成一定数量的算式，返回一个Question数组。数量由输入框中的参数给出。
 * @returns {null|*[]}
 * 返回的数组
 */
function buildQuestions(){
    let size = document.getElementById("inputNumber").value;
    if(size<=0 || size >100){
        window.alert("The param is illegal. :)")
        return null;
    }
    let res = [];
    for(let i =0;i<size;i++){
        let A = new Question();
        while (A.isOutOfEdge()){
            A = new Question();
        }
        let flag = false;
        for(let j=0;j<i;j++){
            if (isTwoQuestionsEqual(A,res[j])){
                flag = true;
                break;
            }
        }
        if(flag){
            i--;
        }else {
            res.push(A);
        }
    }
    window.alert("The questions have been spawned successfully.");
    let buttonQuestion = document.getElementsByClassName("downloadButton");
    for (let buttonQuestionKey of buttonQuestion) {
        buttonQuestionKey.disabled = false;
    }
    return res;
}

/**
 * @function
 * 下载算式文件
 * @param questions
 * 传进来的question数组
 */
function printQuestions(questions){
    let size = questions.length;
    let stringQuestions = [];
    for(let i=0;i<size;i++){
        stringQuestions[i] = (i+1) +". " +questions[i].toString()+"\n";
    }
    let txtFile = new File(stringQuestions,"Exercises.txt");
    let link = document.createElement('a');
    link.download = "Exercises.txt";
    link.href = URL.createObjectURL(txtFile);
    link.click();
}

/**
 * @function
 * 下载答案文件
 * @param questions
 * 传进来的question数组
 */
function printAnswers(questions){
    let size = questions.length;
    let stringAnswers = [];
    for(let i =0;i<size;i++){
        stringAnswers[i] = (i+1) +". "+ questions[i].toString() + "=" +questions[i].totalResult + "\n";
    }
    let txtFile = new File(stringAnswers,"Answers.txt");
    let link = document.createElement('a');
    link.download = "Answers.txt";
    link.href = URL.createObjectURL(txtFile);
    link.click();
}

