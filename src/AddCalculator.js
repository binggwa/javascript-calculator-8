import StringParser from './StringParser.js';

class AddCalculator {
    /**
     * 입력받은 텍스트를 파싱하고, 최종 구분자를 결정한 뒤 숫자를 추출해 더한 값을 반환한다.
     * @param {string} text 덧셈을 수행하고 싶은 원본 문자열
     * @returns {number} 문자열에 포함된 숫자의 누적값
     */
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