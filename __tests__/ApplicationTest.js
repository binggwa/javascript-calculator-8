import App from '../src/App.js';
import { MissionUtils } from '@woowacourse/mission-utils';

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();
  return logSpy;
};

describe('문자열 계산기', () => {
  test('기본 구분자 사용', async () => {
    const inputs = ['1,2:3'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 6'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('커스텀 구분자 사용', async () => {
    const inputs = ['//;\\n1'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 1'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('커스텀 구분자 및 기본 구분자 섞어서 사용', async () => {
    const inputs = ['//ABC\\n1,3:5ABC7,9:11:13ABC15ABC17'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 81'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('빈 문자열 입력 시 0 반환', async () => {
    const inputs = [''];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 0'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('정규식 메타문자 사용 테스트', async () => {
    const inputs = ['//+\\n1+2:3,4'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 10'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('음수 문자 실패', async () => {
    const inputs = ['-1,2,3'];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow(/^\[ERROR\]/);
  });

  test('구분자로 끝나면 실패', async () => {
    const inputs = ['1,2,3:'];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow(/^\[ERROR\]/);
  });

  test('구분자 사이에 숫자가 없으면 실패', async () => {
    const inputs = ['1,,3'];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow(/^\[ERROR\]/);
  });

  test('구분자 사이가 숫자가 아닌 경우', async () => {
    const inputs = ['1,a,3'];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow(/^\[ERROR\]/);
  });

  test('입력값이 문자열이 아닌 경우', async () => {
    const inputs = [1,2,3];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow(/^\[ERROR\]/);
  });
});
