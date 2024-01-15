import React from 'react'
import { Checkbox, Col, Row, Input } from 'antd'
import classNames from "classnames";

import styles from "./Filter.module.scss";

const { Search } = Input;

const Filter = ({
    data,
    onChange,
    handleSearch,
    value
}) => {

    return (
        <div className={classNames(styles.root)}>
            <Row>
                <Col span={24}>
                    <Search placeholder="Search" onChange={(e) => handleSearch && handleSearch(e.target.value)} />
                </Col>
            </Row>
            <Row className={classNames(styles.items)}>
                <Checkbox.Group options={data} onChange={onChange && onChange} value={value} />
            </Row>
        </div>
    )
}

export default Filter