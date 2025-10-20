class StringParser {

    // 커스텀 문자열 구분을 위한 정규식
    static REGEX = /^(?:\/\/(.+)\\n((?:\d+(?:(?:[:,]|\1)\d+)*))|((?:\d+(?:(?:[:,])\d+)*)))$/;

    /**
     * 입력받은 문자열을 정규식으로 필터링하여, 구분자와 덧셈 문자열로 반환한다.
     * @param {string} text 정규식으로 검사할 문자열
     * @throws {Error} 정규식 매칭에 실패했을 때
     * @returns {{ separator: string|null, numStr: string }} 구분자 및 덧셈 문자열
     */
    static parseSeparatorAndNumber(text) {

        // 입력값이 문자열이 아닐 경우 필터링
        if (typeof text !== 'string') {
            throw new Error('[ERROR] 입력값이 문자열이 아닙니다!');
        }

        // match 메소드를 이용해 커스텀 구분자 존재여부 확인
        const match = text.match(StringParser.REGEX);

        // 정규식에 맞지 않는 문자열이 들어왔을 경우 필터링
        if (!match) {
            throw new Error('[ERROR] 정규식 매칭 실패!');
        }

        // 커스텀 구분자가 있는 경우
        if (match[1]) {
            return {
                separator: match[1],
                numStr: match[2],
            };
        }

        // 커스텀 구분자가 없는 경우
        return {
            separator: null,
            numStr: match[3],
        };
    }

    /**
     * 정규식을 터뜨릴 수 있는 메타문자에 이스케이프 문자를 붙여 안전하게 처리하기 위한 메소드
     * @param {string} separator 정규식에서 사용할 원래 구분자
     * @returns {string} 이스케이프 문자가 붙어 안전한 구분자
     */
    static makeSafeRegex(separator) {
        return separator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    /**
     * 커스텀 구분자가 있는 경우, 커스텀 구분자를 포함한 최종 구분자를 반환하고, 없는 경우 기본 구분자로 구성된 정규식을 반환한다.
     * @param {string | null} separator 커스텀 구분자, 커스텀이 없다면 null
     * @returns {RegExp} 최종 구분자로 사용할 정규식 객체
     */
    static makeFinalSeparator(separator) {
        if (!separator) return /[:,]/;
        const safe = StringParser.makeSafeRegex(separator);
        return new RegExp(`(?:${[':',',',safe].join('|')})`);
    }
}

export default StringParser;