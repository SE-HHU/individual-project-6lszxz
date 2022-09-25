/**
 *
 * @constructor
 * @description 一个Question类，包括两个数a,b，运算符operation和结果result，operator为0代表加，为1代表减
 */
function Question(){
    let opJudge=Math.floor(Math.random()*2);
    if(opJudge===0){
        this.operator ='+';
    }else {
        this.operator ='-';
    }
    this.a= Math.floor(Math.random()*100);
    this.b= Math.floor(Math.random()*100);
    if(this.operator ==='-'){
        while(this.a-this.b<0){
            this.b= Math.floor(Math.random()*100);
        }
    }else {
        while (this.a+this.b>100){
            this.b=Math.floor(Math.random()*100);
        }
    }
    switch (this.operator){
        case '+':
            this.result = this.a + this.b;
            break;
        case "-":
            this.result = this.a - this.b;
            break;
    }
    this.toString =function (){
        return String(this.a)+String(this.operator)+String(this.b) +"=";
    }
}

/**
 *
 * @param A 算式A
 * @param B 算式B
 * @returns {boolean} 相等为true，不相等为false
 * @description 判断两个算式是否是相等的算式
 */
function isTwoQuestionsEqual(A,B)
{
    if(A.operator!==B.operator){
        return false;
    }
    if(A.operator ===1){
        return A.a === B.a && A.b === B.b;
    }else {
        return (A.a === B.a && A.b === B.b) || (A.b === B.a && A.a === B.b);
    }
}

/**
 * @description 生成一定数量的算式，返回一个Question数组。数量由输入框中的参数给出。
 * @returns {null|*[]} 返回的数组
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
    let buttonQuestion = document.getElementById("spawnQuestionFile");
    let buttonAnswer = document.getElementById("spawnAnswerFile");
    buttonAnswer.disabled = false;
    buttonQuestion.disabled = false;
    return res;
}

/**
 * @description 下载算式文件
 * @param questions 传进来的question数组
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
 * @description 下载答案文件
 * @param questions 传进来的question数组
 */
function printAnswers(questions){
    let size = questions.length;
    let stringAnswers = [];
    for(let i =0;i<size;i++){
        stringAnswers[i] = (i+1) +". "+ questions[i].toString() + questions[i].result+ "\n";
    }
    let txtFile = new File(stringAnswers,"Answers.txt");
    let link = document.createElement('a');
    link.download = "Answers.txt";
    link.href = URL.createObjectURL(txtFile);
    link.click();
}

