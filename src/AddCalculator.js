import StringParser from './StringParser.js';

class AddCalculator {
    static add(text) {
        // 빈 문자열이면 0 반환
        if (text === '') return 0;

        // 입력받은 텍스트에서 구분자와 숫자문자열 구별
        const { separator, numStr } = StringParser.parseSeparatorAndNumber(text);

        // 최종 구분자 결정
        const finalSeparator = StringParser.makeFinalSeparator(separator);

        // 최종 구분자를 이용해 숫자 추출 및 정수로 변환
        const numbers = numStr.split(finalSeparator).map((n) => parseInt(n, 10));

        // 추출한 정수를 누적해서 더하고 반환
        return numbers.reduce((a, b) => a + b, 0);
    }
}

export default AddCalculator