import { Console } from '@woowacourse/mission-utils';
import AddCalculator from './AddCalculator.js';

class App {
  async run() {
    try {

      // 1. 문자열 입력
      const input = Console.readLineAsync('덧셈할 문자열을 입력해주세요.');

      // 2. 문자열 파싱 및 계산
      const output = AddCalculator.add(input);

      // 3. 출력
      Console.print(`결과 : ${output}`);

    } catch (error) {

      // [ERROR] 로 시작하는 메시지 출력
      Console.print(error.message);

    }
  }
}

export default App;