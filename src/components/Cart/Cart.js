import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '../../stores/cartSlice';
import { Button, Col, Row } from 'antd';
import classNames from 'classnames';

import styles from './Cart.module.scss';

const dataByIdHandler = (data) => {
    const objById = {}
    data.forEach(element => {
        objById[element.id] = element
    });
    return objById;
}

const Cart = ({items}) => {
    const { data } = useSelector((state) => state.data);

    const dataById = useMemo(() => dataByIdHandler(data), [data])

    const dispatch = useDispatch();

    return (
        <div className={classNames(styles.root)}>
            {Object.keys(items).length > 0 ? Object.keys(items).map((el) => (
                <Row justify={"space-between"}>
                    <Col span={14} className={classNames(styles.dataGroup)}>
                        <div className={classNames(styles.name)}>
                            {dataById[el].name}
                        </div>
                        <div className={classNames(styles.price)}>
                            {`${dataById[el].price} $`}
                        </div>
                    </Col>
                    <Col span={10} className={classNames(styles.buttonGroup)}>
                        <Button size='small' onClick={() => dispatch(removeItem(dataById[el]))}>-</Button>
                        <div className={classNames(styles.count)}>
                            {items[el]}
                        </div>
                        <Button size='small' onClick={() => dispatch(addItem(dataById[el]))}>+</Button>
                    </Col>
                </Row>
            ))
            :
            <div>
                Your cart is empty!
            </div>
        }
                <Col xs={24} lg={0}>
                    <Button
                        type="primary"
                        className={classNames(styles.actionButton)}
                    >
                        Checkout
                    </Button>
                </Col>
        </div>
    )
}

export default Cart