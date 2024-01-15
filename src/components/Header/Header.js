import React, { useState, useMemo, useCallback } from 'react';
import { Row, Col, Input, Drawer } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCartOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { setSearchValue } from '../../stores/searchSlice';
import { setBrandFilters, setModelFilters } from '../../stores/filterSlice';
import { setSortValue } from '../../stores/sortSlice';
import Cart from '../Cart/Cart';
import Sort from '../Sort/Sort';
import Filter from '../Filter/Filter';

import styles from './Header.module.scss'

const { Search } = Input;

const sortData = [
  { value: "dateAsc", label: "Old to new" },
  { value: "dateDesc", label: "New to old" },
  { value: "priceDesc", label: "Price high to low" },
  { value: "priceAsc", label: "Price low to high" },
]

const filterSearchHandler = (data, field, filterVal) => {
  const array = [...new Set(data.map((item) => item[field]))]
  const filteredArray = array.filter((item) => item.toLowerCase().includes(filterVal?.toLowerCase()))
  return filteredArray
}

const Header = ({ onClick, user = "Kerem" }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [brandFilter, setBrandFilter] = useState('')
  const [modelFilter, setModelFilter] = useState('')

  const { searchValue } = useSelector((state) => state.search);
  const { totalPrice } = useSelector((state) => state.cart);
  const filters = useSelector((state) => state.filter);
  const sortValue = useSelector((state) => state.sort);
  const { data } = useSelector((state) => state.data);
  const { items } = useSelector((state) => state.cart);

  const brands = useMemo(() => filterSearchHandler(data, 'brand', brandFilter), [data, brandFilter])
  const models = useMemo(() => filterSearchHandler(data, 'model', modelFilter), [data, modelFilter])

  const dispatch = useDispatch();

  const handleSearch = useCallback((val) => {
    dispatch(setSearchValue(val));
  }, [dispatch]);

  const toggleMenu = useCallback(() => {
    setMenuVisible((prevMenuVisible) => !prevMenuVisible);
  }, []);

  const handleBrandFilterChange = (filters) => {
    dispatch(setBrandFilters(filters));
  };

  const handleModelFilterChange = (filters) => {
    dispatch(setModelFilters(filters));
  };

  const handleSortChange = (value) => {
    dispatch(setSortValue(value));
  };

  return (
    <>
      <Row align={"middle"} justify="space-around" className={classNames(styles.root)} gutter={[16, 16]}>
        <Col xs={22} sm={22} md={8} lg={6} xl={4}>
          <div className={classNames(styles.home)} onClick={onClick}>
            Eteration
          </div>
        </Col>
        <Col xs={2} sm={0}>
          <MenuOutlined style={{ fontSize: '24px', color: 'white' }} onClick={toggleMenu} />
        </Col>
        <Col xs={24} sm={24} md={12} lg={10} xl={10}>
          <Search placeholder="Search" onChange={(e) => handleSearch(e.target.value)} value={searchValue} />
        </Col>
        <Col xs={0} sm={0} md={2} lg={0}>
          <MenuOutlined style={{ fontSize: '24px', color: 'white' }} onClick={toggleMenu} />
        </Col>
        <Col xs={0} sm={0} md={4} lg={4} xl={3} className={classNames(styles.totalPriceContainer)}>
          <ShoppingCartOutlined style={{ fontSize: '24px', color: "white" }} />
          <div className={classNames(styles.totalPrice)}>
            {totalPrice && `${totalPrice} $`}
          </div>
        </Col>
        <Col xs={0} sm={0} md={4} lg={4} xl={3} className={classNames(styles.userContainer)}>
          <UserOutlined style={{ fontSize: '22px', color: "white" }} />
          <div className={classNames(styles.user)}>
            {user && user}
          </div>
        </Col>
      </Row>
      <Drawer
        placement="right"
        onClose={toggleMenu}
        visible={menuVisible}
        className={classNames(styles.drawer)}
        width="80%"
        maskClosable={true}
      >
        <div className={classNames(styles.menuContent)}>
          <Row
            gutter={[32, 24]}
            justify="center"
          >
            <Col span={10} className={classNames(styles.drawerTotalPriceContainer)}>
              <ShoppingCartOutlined style={{ fontSize: '24px', color: "black" }} />
              <div className={classNames(styles.totalPrice, styles.drawer)}>
                {totalPrice && `${totalPrice} $`}
              </div>
            </Col>
            <Col span={10} className={classNames(styles.drawerUserContainer)}>
              <UserOutlined style={{ fontSize: '22px', color: "black" }} />
              <div className={classNames(styles.user, styles.drawer)}>
                {user && user}
              </div>
            </Col>
            <Col span={20}>
              Sort By
              <Sort data={sortData} onChange={handleSortChange} value={sortValue} />
            </Col>
            <Col span={20}>
              Brand
              <Filter data={brands} onChange={handleBrandFilterChange} handleSearch={setBrandFilter} value={filters.selectedBrandFilters} />
            </Col>
            <Col span={20}>
              Model
              <Filter data={models} onChange={handleModelFilterChange} handleSearch={setModelFilter} value={filters.selectedModelFilters} />
            </Col>
            <Col span={20}>
              Cart
              <Cart items={items} />
            </Col>
          </Row>
        </div>
      </Drawer>
    </>
  )
}

export default Header;
