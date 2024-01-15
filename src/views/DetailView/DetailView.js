import React, { useMemo, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { generatePath, useNavigate } from "react-router-dom";
import { Routes } from "../../Routes";
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { addItem } from '../../stores/cartSlice';


import styles from "./DetailView.module.scss";
import { Button } from 'antd';

const dataFinder = (data, id) => {
  const dataById = data.find(item => item.id === id);
  return dataById
}

const DetailView = () => {
  let { id } = useParams();
  const { data } = useSelector((state) => state.data);

  const dataToRender = useMemo(() => dataFinder(data, id), [data, id])
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) {
      navigate(generatePath(Routes.List.Root));
    }
  }, [id, navigate])

  const handleAddToCart = () => {
    dispatch(addItem(dataToRender));
  }

  return (
    <>
      {dataToRender &&
        <div className={styles.root}>
          <div className={styles.image}>
            <img src={dataToRender.image} alt={dataToRender.name} />
          </div>
          <div className={styles.info}>
            <div className={classNames(styles.name)}>
              {dataToRender.name}
              </div>
            <div className={classNames(styles.price)}>
              {`${dataToRender.price} $`}
              </div>
            <Button
              type="primary"
              className={classNames(styles.actionButton)}
              onClick={handleAddToCart}>
              Add to Card
            </Button>
            <p>{dataToRender.description}</p>
          </div>
        </div>
      }
    </>
  );
}

export default DetailView