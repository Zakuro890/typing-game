let Q = [
  "apple",
  "zakuro",
  "melon",
  "mango",
  "starwberry",
  "blueberry",
  "orange",
  "acerola",
  "avocado",
  "chestnut",
  "persimmon",
  "banana",
  "watermelon",
  "lychee",
  "papaya",
  "prune",
  "pear",
  "guava",
  "ume",
  "quince",
];

let Q_No = Math.floor(Math.random() * Q.length); // 問題をランダムで出題する

let Q_i = 0; // 回答初期値・現在単語どこまで合っているか判定している文字番号
let Q_l = Q[Q_No].length; // 計算用の文字の長さ

let score = 0; // スコア
let startTime; // ゲーム開始時刻
let endTime; // ゲーム終了時刻

let timeLimit = 60; // ゲームの制限時間（秒）

window.addEventListener("keydown", push_Keydown);

function push_Keydown(event) {
  let keyCode = event.key;
  if (score === 0) {
    // ゲーム開始時の処理
    startTime = new Date(); // 開始時刻を記録
    setInterval(gameTimer, 1000); // 1秒ごとにタイマーを更新
  }

  if (Q_l - Q_i === 0) {
    // 全部正解したら
    score++; // スコアを増やす

    if (score % 5 === 0) {
      // 5回正解したらレベルアップ
      Q_No = Math.floor(Math.random() * Q.length); // 問題をランダムで出題する
      Q_i = 0; // 回答初期値・現在どこまで合っているか判定している文字番号
      Q_l = Q[Q_No].length; // 計算用の文字の長さ
    }

    document.getElementById("score").innerHTML = "スコア: " + score;

    if (score === 10) {
      // ゲーム終了時の処理
      endTime = new Date(); // 終了時刻を記録
      let totalTime = (endTime - startTime) / 1000; // プレイ時間（秒）
      document.getElementById("result").innerHTML =
        "ゲーム終了！ スコア: " + score + " プレイ時間: " + totalTime + "秒";
      clearInterval(gameTimer); // 制限時間のタイマーを停止
    }

    Q_No = Math.floor(Math.random() * Q.length); // 次の問題をランダムで出題する
    Q_i = 0; // 回答初期値・現在どこまで合っているか判定している文字番号
    Q_l = Q[Q_No].length; // 計算用の文字の長さ
  } else {
    if (Q[Q_No].charAt(Q_i) == keyCode) {
      // 押したキーが合っていたら
      Q_i++; // 判定する文章に１足す
    } else {
      // 間違った入力の処理
      score--; // スコアを減らす（適切なペナルティを設定）
      document.getElementById("score").innerHTML = "スコア: " + score;
    }
  }

  document.getElementById("start").innerHTML = Q[Q_No].substring(Q_i, Q_l); // 問題を書き出す
}

function gameTimer() {
  let currentTime = new Date(); // 現在時刻を取得
  let elapsedTime = (currentTime - startTime) / 1000; // 経過時間（秒）

  if (elapsedTime >= timeLimit) {
    // 制限時間を超えたらゲーム終了
    endTime = currentTime;
    document.getElementById("result").innerHTML =
      "制限時間終了！ スコア: " + score + " プレイ時間: " + timeLimit + "秒";
    clearInterval(gameTimer); // 制限時間のタイマーを停止
  }
}
