import React, { useState } from "react";
import Card from "../../../components/shared/Card/Card";
import Button from "../../../components/shared/Button/Button";
import styles from "./StepAvatar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setAvatar } from "../../../store/activateSlice";
import { activate } from "../../../http/index";
import { setAuth } from "../../../store/authSlice";
import Loader from "../../../components/shared/Loader/Loader";

const StepAvatar = ({ onNext }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState("images/monkey-avatar.png");
  const [loading, setLoading] = useState(false);
  const { name, avatar } = useSelector((state) => state.activateSlice);
  function captureImage(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      setImage(reader.result);
      dispatch(setAvatar(reader.result));
    };
  }

  async function submit() {
    setLoading(true);
    try {
      if (!avatar) return;
      const { data } = await activate({ name, avatar });
      if (data.auth) {
        dispatch(setAuth(data));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  if (loading) return <Loader message="Activation in Progress..." />;
  return (
    <>
      <Card title={`Okay, ${name}`} icon="monkey-emoji">
        <p className={styles.subHeading}>How’s this photo?</p>
        <div className={styles.avatarWrapper}>
          <img src={image} alt="" />
        </div>
        <div>
          <input
            id="avatarInput"
            onChange={captureImage}
            type="file"
            className={styles.avatarInput}
          />
          <label htmlFor="avatarInput" className={styles.avatarLabel}>
            Choose different Photo
          </label>
        </div>

        <div>
          <div className={styles.actionButtonWrap}>
            <Button text="Next" onClick={submit} />
          </div>
        </div>
      </Card>
    </>
  );
};

export default StepAvatar;
