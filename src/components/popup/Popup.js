import React from "react";
import cookieHandler from "../../utils/cookieHandler";
import "./style.css";

const isOpen =
  cookieHandler("dialog").length === 0
    ? true
    : JSON.parse(cookieHandler("dialog"));

export default () => {
  const [countdownDate, setCountdownDate] = React.useState(
    new Date("11/30/2020").getTime()
  );
  const [time, setTime] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  React.useEffect(() => {
    setInterval(() => setNewTime(), 1000);
  }, []);

  const setNewTime = () => {
    if (countdownDate) {
      const currentTime = new Date().getTime();

      const distanceToDate = countdownDate - currentTime;

      let days = Math.floor(distanceToDate / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (distanceToDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor(
        (distanceToDate % (1000 * 60 * 60)) / (1000 * 60)
      );
      let seconds = Math.floor((distanceToDate % (1000 * 60)) / 1000);

      const numbersToAddZeroTo = [1, 2, 3, 4, 5, 6, 7, 8, 9];

      days = `${days}`;
      if (numbersToAddZeroTo.includes(hours)) {
        hours = `0${hours}`;
      } else if (numbersToAddZeroTo.includes(minutes)) {
        minutes = `0${minutes}`;
      } else if (numbersToAddZeroTo.includes(seconds)) {
        seconds = `0${seconds}`;
      }

      setTime({ days: days, hours: hours, minutes, seconds });
    }
  };

  const [modalState, setModalState] = React.useState(isOpen);
  return (
    <dialog open={modalState} id={"promoDialog"}>
      <button
        type="button"
        onClick={() => {
          setModalState(false);
          document.cookie = "dialog=false";
        }}
      >
        X
      </button>
      <div className={'offerInfo'}>
        <h1>Wait, dont go!</h1>
        <h3>
          During November use code DISCOUNT for <br /> 15% off all orders over
          £20
        </h3>
        <h2>
          {`${time.days}d:${time.hours}h:${time.minutes}m:${time.seconds}s`}
        </h2>
      </div>
    </dialog>
  );
};
