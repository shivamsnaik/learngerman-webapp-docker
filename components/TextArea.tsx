import styles from '../styles/TextArea.module.scss'


const TextArea = ({style, children, ...props}) => {
    return(
        <div className={styles.container} style={style}>
          <div className={styles.scroll_area}>
            {children}
          </div>
        </div>
    );
};

export default TextArea;