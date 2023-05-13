import { useState, useEffect } from "react";
import likeImg from "../assets/like.svg";
import dislikeImg from "../assets/dislike.svg";

export default function Reactions({ props }) {
  const prop = props;
  const [like, setLike] = useState(
    localStorage.getItem(`${props}.like`)
      ? JSON.parse(localStorage.getItem(`${props}.like`))
      : 0
  );
  const [dislike, setDislike] = useState(
    localStorage.getItem(`${props}.dislike`)
      ? JSON.parse(localStorage.getItem(`${props}.dislike`))
      : 0
  );
  const [disabledLike, setDisabledLike] = useState(
    localStorage.getItem(`${props}.disabledLike`)
      ? JSON.parse(localStorage.getItem(`${props}.disabledLike`))
      : false
  );
  const [disabledDislike, setDisabledDislike] = useState(
    localStorage.getItem(`${props}.disabledDislike`)
      ? JSON.parse(localStorage.getItem(`${props}.disabledDislike`))
      : false
  );

  console.log(localStorage.getItem(`${props}.like`));

  const inc = () => {
    if (dislike !== 0) {
      setLike(like + 1);
      setDislike(dislike - 1);
      setDisabledDislike(false);
    }

    setLike(like + 1);
    setDisabledLike(true);
  };

  const dec = () => {
    if (like !== 0) {
      setDislike(dislike + 1);
      setLike(like - 1);
      setDisabledLike(false);
    }

    setDislike(dislike + 1);
    setDisabledDislike(true);
  };

  useEffect(() => {
    localStorage.setItem(`${props}.like`, JSON.stringify(like));
  }, [like]);

  useEffect(() => {
    localStorage.setItem(`${props}.dislike`, JSON.stringify(dislike));
  }, [dislike]);

  useEffect(() => {
    localStorage.setItem(`${props}.disabledLike`, JSON.stringify(disabledLike));
  }, [disabledLike]);

  useEffect(() => {
    localStorage.setItem(
      `${props}.disabledDislike`,
      JSON.stringify(disabledDislike)
    );
  }, [disabledDislike]);

  return (
    <div className="reactions">
      <button className="reaction" disabled={disabledLike} onClick={inc}>
        {like}
        <img className="img" src={likeImg} alt="" />
      </button>
      <button className="reaction" disabled={disabledDislike} onClick={dec}>
        {dislike}
        <img className="img" src={dislikeImg} alt="" />
      </button>
    </div>
  );
}
