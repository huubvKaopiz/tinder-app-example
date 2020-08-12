import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  return {
    App: {
      fontFamily: "sans-serif",
      textAlign: "center",
      marginTop: "50px",
    },
    card: {
      maxWidth: 300,
      margin: "auto",
      transition: "0.3s",
      boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
      "&:hover": {
        boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
      },
    },
    media: {
      paddingTop: "56.25%",
    },
    content: {
      textAlign: "center",
      padding: 10,
    },
    divider: {
      margin: `10px 0`,
    },
    heading: {
      fontWeight: "bold",
    },
    subheading: {
      lineHeight: 1.8,
    },
    avatar: {
      display: "inline-block",
      border: "2px solid white",
      "&:not(:first-of-type)": {
        marginLeft: -10,
      },
    },
    icon: {
      color: "#ccc",
      cursor: "pointer",
      "&:hover": {
        color: "green",
      },
    },
    iconActive: {
      color: "green",
      cursor: "pointer",
      "&:hover": {
        color: "green",
      },
    },
    root: {
      textAlign: "center",
      display: "flex",
      "& > * + *": {
        marginLeft: theme.spacing(2),
      },
    },
  };
});

export default useStyles;
