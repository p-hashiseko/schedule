
/**
 * Q1.　以下の関数を参考にして、a と b を引数に取り a と b の積を算出する関数を作成してください。
 * ヒント：引数の型を指定してみましょう。
 * ヒント：アロー関数を使用してみましょう。
 * 
 * const a = 2;
 * const b = 3;
 *
 * const add = (a: number, b: number) => {
 *     return a + b;
 * }
 *
 * const result = add(a, b);
 * console.log(result);    // 5  
 * 
 */
const a = 91;
const b = 72;

const multiply = (a: number, b: number) => {
    return a * b;
}

const result = multiply(a, b);
console.log(result);


/**
 * Q2.　以下の関数を参考にして、配列 `names` の中身を順番に console.log で出力してください。
 * ヒント：拡張for文を使用してみましょう。
 * 
 * const numbers = [1, 2, 3, 4, 5];
 * 
 * const sum = (numbers: number[]) => {
 *     let total = 0;
 *     for (const number of numbers) {
 *         total += number;
 *     }
 *     return total;
 * }
 * 
 * const result = sum(numbers);
 * console.log(result);    // 15
 * 
 */
const names = ["Alice", "Bob", "Charlie"];

const printNames = (names: string[]) => {
    for (const name of names) {
        console.log(name);
    }
};

printNames(names);


/**
 * Q3.　以下の関数を参考にして、number と boolean を引数に受け取って true なら2倍した値。 false なら 0 を返す関数を作ってください。
 * ヒント：条件分岐を使用してみましょう。
 * 
 * const isDouble = true;
 * const number = 5;
 * 
 * const doubleOrZero = (number: number, isDouble: boolean) => {
 *    if (isDouble) {
 *       return number * 2;
 *   } else {
 *      return 0;
 *  }
 * }
 * 
 * const result = doubleOrZero(number, isDouble);
 * console.log(result);    // 10
 * 
 */
const number = 5;
const isDouble = false;
    
const doubleOrZero = (number: number, isDouble: boolean) => {
    if (isDouble) {
        return number * 2;
    } else {
        return 0;
    }
};

const result3 = doubleOrZero(number, isDouble);
console.log(result3);    