import styles from './overlay.module.scss';
import IconButton from '../iconButton'

const Overlay = ({children, triggerIcon, title, id, onShow}) => {

    let overlayVisible = false;

    function showOverlay() {
        onShow();
        console.log(`show overlay ${title}`)
        overlayVisible = true;
        document.querySelector(`.${styles["overlay"]}#${id}`)
            .classList.add(styles["overlay--visible"]);
    }

    function hideOverlay() {
        overlayVisible = false;
        document.querySelector(`.${styles["overlay"]}#${id}`)
            .classList.remove(styles["overlay--visible"]);
    }

    function toggleOverlay() {
        overlayVisible ? hideOverlay() : showOverlay();
    }

    return <div>
        {/* <button className="overlay__trigger" onClick={showOverlay}></button> */}
        <IconButton icon={triggerIcon}
            clickHandler={showOverlay}></IconButton>
        <div className={styles["overlay"]} id={id}>
            <div className={styles["overlay__header"]}>
                <h2 className={styles['overlay__header-title']}>{ title }</h2>
                <IconButton icon={"/img/close.svg"}
                    clickHandler={hideOverlay}
                    size={36} />
            </div>
            <div className={styles["overlay__contents"]}>
                { children }
            </div>
            <div className={styles["overlay__scrim"]} />
        </div>
    </div>
}

export default Overlay;