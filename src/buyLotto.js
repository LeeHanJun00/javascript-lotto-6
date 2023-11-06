import { Console, Random } from '@woowacourse/mission-utils';
import { MESSAGE } from './constants/Constant.js';
import Validator from './utils/Validator.js';

export async function inputMoney() {
  try {
    const userInputAmount = await Console.readLineAsync(MESSAGE.enterPurchaseAmount);
    const amount = await validateAmount(userInputAmount);
    const numberOfLottoTickets = amount / 1000;

    return buyLotto(numberOfLottoTickets);
  } catch (error) {
    Console.print(error.message);

    return inputMoney();
  }
}

async function validateAmount(userInputAmount) {
  Validator.checkThousandWonUnit(userInputAmount);
  Validator.checkBelowThousand(userInputAmount);

  return userInputAmount;
}

async function buyLotto(numberOfLottoTickets) {
  await Console.print(`\n${numberOfLottoTickets}${MESSAGE.bought}`);
  const userLottoList = await userAutomaticLottoNumber(numberOfLottoTickets);

  return userLottoList;
}

async function randomNumber() {
  const number = Random.pickUniqueNumbersInRange(1, 45, 6);
  return number.sort((a, b) => a - b);
}

async function userAutomaticLottoNumber(numberOfLottoTickets) {
  const userLottoList = [];
  for (let i = 1; i <= numberOfLottoTickets; i += 1) {
    const randomNumbers = await randomNumber();
    Console.print(randomNumbers);
    userLottoList.push(randomNumbers);
  }

  return userLottoList;
}