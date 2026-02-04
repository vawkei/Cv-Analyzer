import classes from "./Loader.module.scss";
import ReactDom from "react-dom";
// import loaderImage from "../../../assets/veeshoploading.gif";
import loaderImage from "../../../assets/loadinggif.gif"



const Loader = () => {
  return ReactDom.createPortal(
    <div className={classes.wrapper}>
      <div className={classes["image-container"]}>
        <img src={loaderImage} alt="loader"  />
      </div>
    </div>,
    document.getElementById("loader")!
//Use this only if:👆👆👆
//  You 100% control index.html
//  You know <div id="loader"></div> always exists in it
  );
};

export default Loader;