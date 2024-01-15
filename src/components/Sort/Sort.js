import React from 'react'
import { Radio } from 'antd'
import classNames from 'classnames';
import styles from "./Sort.module.scss";


const Sort = ({ onChange, value, data }) => {
    return (
        <div className={classNames(styles.root)}>
            <Radio.Group onChange={(e) => onChange && onChange(e.target.value)} value={value}>
                {data.map((item) => (
                    <Radio value={item.value} key={item.value}>{item.label}</Radio>
                ))}
            </Radio.Group>
        </div>
    )
}

export default Sort