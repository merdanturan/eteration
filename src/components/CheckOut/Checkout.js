import React from 'react'
import classNames from "classnames";
import { useSelector } from 'react-redux'
import { Button, Col, Row } from 'antd';

import styles from "./Checkout.module.scss";

const Checkout = () => {
    const { totalPrice } = useSelector((state) => state.cart);

    return (
        <div className={classNames(styles.root)}>
            <Row justify={"start"} gutter={[0,16]}>
                <Col span={10} className={classNames(styles.totalPriceText)}>
                    Total Price:
                </Col>
                <Col span={6} className={classNames(styles.totalValue)}>
                    {totalPrice && `${totalPrice} $`}
                </Col>
                <Col span={24}>
                    <Button
                        type="primary"
                        className={classNames(styles.actionButton)}
                    >
                        Checkout
                    </Button>
                </Col>
            </Row>
        </div>
    )
}

export default Checkout