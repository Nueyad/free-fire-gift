const form = document.getElementById("giftForm");
const uidInput = document.getElementById("uid");
const result = document.getElementById("result");
const timerBox = document.getElementById("timerBox");
const timerDisplay = document.getElementById("timer");
const claimButton = document.getElementById("claimButton");

let countdown = null;

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const uid = uidInput.value.trim();

  if (!uid || uid.length > 30) {
    result.hidden = false;
    result.textContent = "Vui lòng nhập UID hợp lệ.";
    return;
  }

  if (countdown !== null) {
    clearInterval(countdown);
  }

  let remaining = 300;

  result.hidden = false;
  result.textContent =
    "Đã ghi nhận UID " + uid +
    ". Đây là bản demo, không có phần thưởng thật.";

  timerBox.hidden = false;
  claimButton.disabled = true;
  claimButton.textContent = "ĐANG MÔ PHỎNG...";

  function updateTimer() {
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;

    timerDisplay.textContent =
      String(minutes).padStart(2, "0") + ":" +
      String(seconds).padStart(2, "0");

    if (remaining <= 0) {
      clearInterval(countdown);
      countdown = null;

      result.textContent =
        "Đã kết thúc bộ đếm mô phỏng cho UID " + uid +
        ". Hãy kiểm tra các kênh chính thức của Garena " +
        "để biết thông tin sự kiện thực tế.";

      claimButton.disabled = false;
      claimButton.textContent = "THAM GIA LẠI";
      return;
    }

    remaining--;
  }

  updateTimer();
  countdown = setInterval(updateTimer, 1000);
});
