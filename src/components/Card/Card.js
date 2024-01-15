import React from 'react'
import classNames from "classnames";

import styles from "./Card.module.scss";
import { Button, Col, Row } from 'antd';


const Card = ({ name, img, type, onClick, price, buttonAction }) => {
  return (
    <Row className={classNames(styles.root, styles[type])} justify={"space-evenly"}>
      <Col span={24} onClick={onClick}>
        <img src={img} alt="Avatar" className={classNames(styles.image)} />
      </Col>
      <Col span={24} className={classNames(styles.price)}>
        {price}
      </Col>
      <Col span={24} className={classNames(styles.name)} onClick={onClick}>
        {name}
      </Col>
      <Col span={24}>
        <Button
          type="primary"
          className={classNames(styles.actionButton)}
          onClick={buttonAction && buttonAction}>
          Add to Card
        </Button>
      </Col>
    </Row>
  )
}

export default Card