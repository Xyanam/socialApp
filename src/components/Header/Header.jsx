import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
const Header = () => {
  const { id } = useSelector((state) => state.user);
  return (
    <header className={classes.header}>
      <div className={classes.navigation}>
        <ul className={classes.navItems}>
          <div className={classes.blockNav}>
            <svg
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              className={classes.icon}
            >
              <title />
              <g id="about">
                <path d="M16,16A7,7,0,1,0,9,9,7,7,0,0,0,16,16ZM16,4a5,5,0,1,1-5,5A5,5,0,0,1,16,4Z" />
                <path d="M17,18H15A11,11,0,0,0,4,29a1,1,0,0,0,1,1H27a1,1,0,0,0,1-1A11,11,0,0,0,17,18ZM6.06,28A9,9,0,0,1,15,20h2a9,9,0,0,1,8.94,8Z" />
              </g>
            </svg>
            <Link to={`/profile/${id}`} className={classes.navItem}>
              Профиль
            </Link>
          </div>
          <div className={classes.blockNav}>
            <svg
              className={classes.icon}
              height="25px"
              version="1.1"
              viewBox="0 0 26 32"
              width="24px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title />
              <desc />
              <g
                fill="none"
                fillRule="evenodd"
                id="Social-/-18---Social,-blog,-feed,-news,-paper,-website-icon"
                stroke="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
              >
                <path
                  d="M2,19.98 L2,1.92 C2,1.68804041 2.18804041,1.5 2.42,1.5 L21.58,1.5 C21.8119596,1.5 22,1.68804041 22,1.92 L22,19.98 C22,21.3717576 20.8717576,22.5 19.48,22.5 L4.52,22.5 C3.12824243,22.5 2,21.3717576 2,19.98 Z"
                  id="Path"
                  stroke="#000000"
                  strokeWidth="2"
                />
                <path
                  d="M6.4,5.5 C6.1790861,5.5 6,5.6790861 6,5.9 L6,10 L18,10 L18,5.9 C18,5.6790861 17.8209139,5.5 17.6,5.5 L6.4,5.5 Z"
                  id="Path"
                  stroke="#000000"
                  strokeWidth="2"
                />
                <line
                  id="Path"
                  stroke="#000000"
                  strokeWidth="2"
                  x1="6"
                  x2="12"
                  y1="14"
                  y2="14"
                />
              </g>
            </svg>
            <Link to={`/news`} className={classes.navItem}>
              Новости
            </Link>
          </div>
          <div className={classes.blockNav}>
            <svg
              className={classes.icon}
              fill="none"
              height="25px"
              viewBox="0 5 34 27"
              width="24px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.60001 12.6C7.1464 12.6 8.39999 11.3464 8.39999 9.8C8.39999 8.25361 7.1464 7 5.60001 7C4.05361 7 2.8 8.25361 2.8 9.8C2.8 11.3464 4.05361 12.6 5.60001 12.6Z"
                stroke="#4F4F4F"
                strokeMiterlimit="10"
                strokeWidth="2"
              />
              <path
                d="M8.3 23.6H2.60001C1.70001 23.6 1.10001 22.9 1.10001 22V19.2C1.10001 17 2.8 15.3 5 15.3H8.5"
                stroke="#4F4F4F"
                strokeMiterlimit="10"
                strokeWidth="2"
              />
              <path
                d="M17.6 10C20.0301 10 22 8.03007 22 5.60001C22 3.16996 20.0301 1.20001 17.6 1.20001C15.17 1.20001 13.2 3.16996 13.2 5.60001C13.2 8.03007 15.17 10 17.6 10Z"
                stroke="#4F4F4F"
                strokeMiterlimit="10"
                strokeWidth="2"
              />
              <path
                d="M24.1 25.2H10.7C9.3 25.2 8.2 24.1 8.2 22.7V18.4C8.2 15 11.1 12.2 14.6 12.2H20.3C23.8 12.2 26.7 15 26.7 18.4V22.7C26.6 24.1 25.5 25.2 24.1 25.2Z"
                stroke="#4F4F4F"
                strokeMiterlimit="10"
                strokeWidth="2"
              />
              <path
                d="M29 12.6C30.5464 12.6 31.8 11.3464 31.8 9.8C31.8 8.25361 30.5464 7 29 7C27.4536 7 26.2 8.25361 26.2 9.8C26.2 11.3464 27.4536 12.6 29 12.6Z"
                stroke="#4F4F4F"
                strokeMiterlimit="10"
                strokeWidth="2"
              />
              <path
                d="M26.3 23.6H32C32.9 23.6 33.5 22.9 33.5 22V19.2C33.5 17 31.8 15.3 29.6 15.3H26.1"
                stroke="#4F4F4F"
                strokeMiterlimit="10"
                strokeWidth="2"
              />
            </svg>
            <Link to={`/users`} className={classes.navItem}>
              Пользователи
            </Link>
          </div>
        </ul>
      </div>
    </header>
  );
};

export default Header;
