import React from 'react';
import styles from "./SideMenu.module.css";
export default function Profile({isOpen}) {
    return  (
        <div style={{display: isOpen ? "block" : "none"}}>
            <div className={styles.prorfile}>
                <img
                    className={styles.image}
                    width="50"
                    src="https://uniim1.shutterfly.com/ng/services/mediarender/THISLIFE/021036514417/media/23148907008/medium/1501685726/enhance"
                    alt="" />
                <div>
                    <h5>행복하세요^^</h5>
                </div>
            </div>
            
        </div>   
    );
    
}

