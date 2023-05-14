import { useState, useEffect } from 'react';
import likeImg from '../assets/like.svg';
import dislikeImg from '../assets/dislike.svg';

import { collection, getDocs, getDoc, setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

export default function Reactions({ props }) {
  const [like, setLike] = useState();
  const [dislike, setDislike] = useState();
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

  //console.log(localStorage.getItem(`${props}.like`));

  //async function getReactions(db) {
  //  const citiesCol = collection(db, 'reactions');
  //  const citySnapshot = await getDocs(citiesCol);
  //  const cityList = citySnapshot.docs.map((doc) => doc.data());
  //  console.log(cityList);

  //  return cityList;
  //}
  //getReactions(db);

  async function getRr(db) {
    const docSnap = await getDoc(doc(db, 'reactions', `${props}`));
    const docData = docSnap.data();
    //console.log(`hhh ${docData}`);

    setLike(docData.like);
    setDislike(docData.dislike);
  }

  const g = getRr(db).then((res) => {
    return res;
  });
  const gg = JSON.stringify(g);
  //console.log(`jjjj ${JSON.stringify(gg)}`);

  async function getR(db) {
    const docRef = doc(db, 'reactions', `${props}`);
    const docSnap = await getDoc(docRef);

    const docData = docSnap.data();
    for (var key in docData) {
      // этот код будет вызван для каждого свойства объекта
      // ..и выведет имя свойства и его значение

      //console.log( "Ключ: " + key + " значение: " + docData[key] );
      if (key == 'like') {
        //console.log(key);
        setLike(docData[key]);
      } else if (key == 'dislike') {
        //console.log(key);
        setDislike(docData[key]);
      }
    }
    return docSnap;
  }

  async function Like(db) {
    await setDoc(doc(db, 'reactions', `${props}`), {
      like: like,
      dislike: dislike,
    });
  }
  //async function Dislike(db) {
  //  await setDoc(doc(db, "reactions", `${props}`), {dislike: like});
  //}
  Like(db);
  //Dislike(db)

  const inc = () => {
    if (localStorage.getItem(`${props}.disabledLike`) !== null) {
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

  //useEffect(() => {
  //  localStorage.setItem(`${props}.like`, JSON.stringify(like));
  //}, [like]);

  //useEffect(() => {
  //  localStorage.setItem(`${props}.dislike`, JSON.stringify(dislike));
  //}, [dislike]);

  useEffect(() => {
    getRr(db);
    getR(db);
  }, []);

  //useEffect(() => {
  //  localStorage.setItem(`${props}.disabledLike`, JSON.stringify(disabledLike));
  //}, [disabledLike]);

  //useEffect(() => {
  //  localStorage.setItem(
  //    `${props}.disabledDislike`,
  //    JSON.stringify(disabledDislike)
  //  );
  //}, [disabledDislike]);

  const handleClick = (e) => {
    var foo = document.querySelector('.reaction');

    for (var i = 0; i < foo.length; i++) {
      foo[i].classList.remove('firework');
    }

    e.currentTarget.classList.add('firework');
  };

  return (
    <div className="reactions">
      <div onClick={handleClick}>
        <button className="reaction" disabled={disabledLike} onClick={inc}>
          {like}
          <img className="img" src={likeImg} alt="" />
        </button>
      </div>

      <div onClick={handleClick}>
        <button className="reaction" disabled={disabledDislike} onClick={dec}>
          {dislike}
          <img className="img" src={dislikeImg} alt="" />
        </button>
      </div>
    </div>
  );
}
