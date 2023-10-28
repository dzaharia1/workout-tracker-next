import styles from './overlay.module.scss';
import IconButton from '../iconButton';
import React, { useState } from 'react';

const Overlay = ({triggerIcon, title, id, sizing, buttonType, onShow, children}) => {
    let [overlayVisible, setOverlayVisible] = useState(false);

    function showOverlay() {
        if (onShow) onShow();
        setOverlayVisible(true);
    }
        
    function hideOverlay() {
        setOverlayVisible(false);
    }

    function toggleOverlay() {
        overlayVisible ? hideOverlay() : showOverlay();
    }

    return <div>
        {/* <button className="overlay__trigger" onClick={showOverlay}></button> */}
        <IconButton icon={triggerIcon} clickHandler={showOverlay} type={buttonType} />
        <button className={`${styles["overlay__scrim"]} ${overlayVisible && styles["overlay__scrim--visible"]}`} id={id} onClick={hideOverlay}/>
        <div className={`${styles["overlay"]} ${styles[`overlay--${sizing}`]} ${overlayVisible && styles['overlay--visible']}`} id={id}>
            <div className={styles["overlay__header"]}>
                <img className={styles['overlay__header-icon']} src={triggerIcon} alt="" />
                <h2 className={styles['overlay__header-title']}>{ title }</h2>
                <IconButton icon={"/img/close.svg"}
                    clickHandler={hideOverlay}
                    size={36}
                    type="tertiary" />
            </div>
            <div className={styles["overlay__contents"]}>
                { React.cloneElement(children, { hideOverlay: hideOverlay }) }
            </div>
        </div>
    </div>
}

export default Overlay;