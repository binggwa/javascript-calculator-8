class StringParser {

    // 커스텀 문자열 구분을 위한 정규식
    const regex = /^(?:\/\/(.+)\n(.+)|(.+))$/;

    // 입력받은 text를 파싱하는 기능
    function parseSeparatorAndNumber(text) {

        // match 메소드를 이용해 커스텀 구분자 존재여부 확인
        const match = text.match(regex);

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

    // 커스텀 구분자를 포함한 최종 구분자 생성
    function makeFinalSeparator(separator) {
        if (!separator) return /[:,]/;
        return new RegExp(`(?:${[':',',',separator].join('|')})`);
    }
}

export default StringParser;