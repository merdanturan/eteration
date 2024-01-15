import React, {useEffect} from "react";
import classNames from "classnames";
import Header from "../../components/Header/Header";
import { generatePath, useNavigate } from "react-router-dom";
import { Routes } from "../../Routes";
import { fetchData } from '../../stores/dataSlice';
import { Row, Col } from "antd";
import Cart from "../../components/Cart/Cart";
import Checkout from "../../components/CheckOut/Checkout";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'

import styles from "./MainLayout.module.scss";

export const MainLayout = ({
    className,
    style,
    children,
}) => {
    const { items } = useSelector((state) => state.cart);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    const handleHome = () => {
        navigate(
            generatePath(Routes.List.Root)
        );
    };

    return (
        <div className={classNames(className, styles.root)} style={style}>
            <Header
                onClick={() => handleHome()}
            />
            <Row>
                <Col lg={18} xs={24}>
                    <div className={styles.main}>{children}</div>
                </Col>
                <Col lg={4} xs={0} className={classNames(styles.cartControl)}>
                    <Row
                        gutter={[32, 24]}
                        justify="center"
                    >
                        <Col span={24}>
                            Cart
                            <Cart items={items} />
                        </Col>
                        <Col span={24}>
                            Checkout
                            <Checkout />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};
