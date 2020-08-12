import React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import PhoneIcon from "@material-ui/icons/Phone";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ListAltIcon from "@material-ui/icons/ListAlt";
import LockIcon from "@material-ui/icons/Lock";
import PersonIcon from "@material-ui/icons/Person";
import useStyles from "./style";
import { useSwipeable } from "react-swipeable";
import { useEffect } from "react";
import Axios from "axios";
import { get } from "lodash";
import { useState } from "react";
import { useCallback } from "react";
import { isBrowser } from "react-device-detect";
import produce from "immer";
import { loadState, saveState } from "./utils";
import CircularProgress from "@material-ui/core/CircularProgress";

function App() {
  const classes = useStyles();
  const handlers = useSwipeable({
    onSwipedLeft,
    onSwipedRight,
  });
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("location"); // profile, contact, location, phone, lock
  const [favourites, setFavourites] = useState(() => loadState("favourites"));
  const [loading, setLoading] = useState(true);

  const getUser = useCallback(async function getUser() {
    try {
      setLoading(true);
      const res = await Axios.get("https://randomuser.me/api/");
      setUser(get(res, "data.results.0", null));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);

  function onSwipedLeft() {
    const nextState = produce(favourites, (draftState) => {
      draftState.push(user);
    });
    setFavourites(nextState);
    saveState("favourites", nextState);
    getUser();
  }

  function onSwipedRight() {
    getUser();
  }

  const image = get(user, "picture.large", "");
  let content = get(user, "location.city", "");
  if (tab === "profile") content = get(user, "login.username", "");
  if (tab === "contact") {
    content = get(user, "name.first", "") + " " + get(user, "name.last", "");
  }
  if (tab === "phone") content = get(user, "phone", "");
  if (tab === "lock") content = get(user, "cell", "");

  if (isBrowser) {
    return (
      <div>
        You need to open the app in mobile mode, f12 and click devive mode and
        refresh browser
      </div>
    );
  }

  if (loading) {
    return (
      <div className={classes.App}>
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <CircularProgress />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={classes.App}>
      <Card className={classes.card} {...handlers}>
        {image && <CardMedia className={classes.media} image={image} />}

        <CardContent className={classes.content}>
          <Typography
            className={"MuiTypography--heading"}
            variant={"h6"}
            gutterBottom
          >
            {get(user, "email", "")}
          </Typography>
          <Typography
            className={"MuiTypography--subheading"}
            variant={"caption"}
          >
            {content}
          </Typography>
          <Divider className={classes.divider} light />
          <PersonIcon
            className={tab === "profile" ? classes.iconActive : classes.icon}
            onClick={() => setTab("profile")}
          />
          <ListAltIcon
            className={tab === "contact" ? classes.iconActive : classes.icon}
            onClick={() => setTab("contact")}
          />
          <LocationOnIcon
            className={tab === "location" ? classes.iconActive : classes.icon}
            onClick={() => setTab("location")}
          />
          <PhoneIcon
            className={tab === "phone" ? classes.iconActive : classes.icon}
            onClick={() => setTab("phone")}
          />
          <LockIcon
            className={tab === "lock" ? classes.iconActive : classes.icon}
            onClick={() => setTab("lock")}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
