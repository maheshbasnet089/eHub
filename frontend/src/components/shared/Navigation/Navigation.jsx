import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";
import { logOut } from "../../../http/index";
import { useDispatch } from "react-redux";
import { setAuth } from "../../../store/authSlice";
import { useSelector } from "react-redux";
// import { setAvatar } from "../../../store/activateSlice";

const Navigation = () => {
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.auth);
  //   const { avatar } = useSelector((state) => state.activateSlice);

  async function logOutUser() {
    try {
      const { data } = await logOut();
      dispatch(setAuth(data));
    } catch (e) {
      console.log(e);
    }
  }
  const brandStyle = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "22px",
    display: "flex",
    alignItems: "center",
  };

  const logoText = {
    marginLeft: "10px",
  };
  //   http://localhost:3000/localhost:5500/storage/1637909428078-355477915.png
  return (
    <nav className={`${styles.navbar} container`}>
      <Link style={brandStyle} to="/">
        <img src="/images/logo.png" alt="logo" />
        <span style={logoText}>eHub</span>
      </Link>
      {isAuth && (
        <div className={styles.navRight}>
          <h3 className={styles.navName}>{user.name}</h3>
          {/* <img src={user.avatar} alt="avatar" /> */}
          <Link to="/">
            <img
              className={styles.navAvatar}
              src={user.avatar}
              width="40"
              height="40"
              alt="avatar"
            />
          </Link>

          <button className={styles.navlogout} onClick={logOutUser}>
            <img src="/images/logout.png" alt="logout" />
          </button>
        </div>
      )}

      {/* { isAuth && <button onClick={logOutUser}>Logout</button> }  */}
    </nav>
  );
};

export default Navigation;
