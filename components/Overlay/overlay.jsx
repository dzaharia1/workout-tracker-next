import styles from './overlay.module.scss';
import IconButton from '../iconButton';

const Overlay = ({children, triggerIcon, title, id, onShow}) => {

    let overlayVisible = false;

    function showOverlay() {
        if (onShow) onShow();
        console.log(`show overlay ${title}`)
        overlayVisible = true;
        document.querySelector(`.${styles["overlay"]}#${id}`)
            .classList.add(styles["overlay--visible"]);
        document.querySelector(`.${styles["overlay__scrim"]}#${id}`)
            .classList.add(styles["overlay__scrim--visible"]);
    }
        
    function hideOverlay() {
        overlayVisible = false;
        document.querySelector(`.${styles["overlay"]}#${id}`)
        .classList.remove(styles["overlay--visible"]);
        document.querySelector(`.${styles["overlay__scrim"]}#${id}`)
            .classList.remove(styles["overlay__scrim--visible"]);
    }

    function toggleOverlay() {
        overlayVisible ? hideOverlay() : showOverlay();
    }

    return <div>
        {/* <button className="overlay__trigger" onClick={showOverlay}></button> */}
        <IconButton icon={triggerIcon}
            clickHandler={showOverlay}></IconButton>
        <button className={styles["overlay__scrim"]} id={id} onClick={hideOverlay}/>
        <div className={styles["overlay"]} id={id}>
            <div className={styles["overlay__header"]}>
                <img className={styles['overlay__header-icon']} src={triggerIcon} alt="" />
                <h2 className={styles['overlay__header-title']}>{ title }</h2>
                <IconButton icon={"/img/close.svg"}
                    clickHandler={hideOverlay}
                    size={36} />
            </div>
            <div className={styles["overlay__contents"]}>
                { children }
            </div>
        </div>
    </div>
}

export default Overlay;