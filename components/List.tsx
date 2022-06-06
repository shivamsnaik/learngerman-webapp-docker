import styles from '../styles/List.module.scss'

const List = ({style, children, ...props}) => {
    return(
        <div className={styles.container} style={style}>
          <div className={styles.scroll_area}>
            {children}
          </div>
        </div>
    );
};

export default List;