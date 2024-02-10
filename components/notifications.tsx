import React, { FC } from "react";
import parse from "html-react-parser";
import { Notification as NotificationType} from "../model/cds";

import styles from "./notifications.module.css";

export const Notifications: FC<{ notifications: NotificationType[] }> = ({notifications}) =>
    notifications.length > 0 && (
        <div className={styles.container}>
            <div className={styles.button}>
                <img src="/bell-ringing.svg" height={18}/>
                {notifications.length}
            </div>

            <div className={styles.notificationsWrapper}>
                <div className={styles.notifications}>
                    {notifications.map(({message, title, type}, idx) => (
                        <div className={[styles.notification, styles[type]].join(' ')} key={idx}>
                            <div className={styles.title}>{title}</div>
                            <div className={styles.message}>{parse(message)}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );