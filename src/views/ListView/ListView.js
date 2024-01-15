import React, { useState, useMemo } from 'react'
import classNames from 'classnames';
import { generatePath, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'antd';

import Card from '../../components/Card/Card'
import Filter from '../../components/Filter/Filter';
import Sort from '../../components/Sort/Sort';
import Paginator from '../../components/Paginator/Paginator';
import { Routes } from '../../Routes';

import { addItem } from '../../stores/cartSlice';
import { setBrandFilters, setModelFilters } from '../../stores/filterSlice';
import { setSortValue } from '../../stores/sortSlice';

import styles from "./ListView.module.scss";

const sortData = [
    { value: "dateAsc", label: "Old to new" },
    { value: "dateDesc", label: "New to old" },
    { value: "priceDesc", label: "Price high to low" },
    { value: "priceAsc", label: "Price low to high" },
]

// To filter filter options by text
const filterSearchHandler = (data, field, filterVal) => {
    const array = [...new Set(data.map((item) => item[field]))]
    const filteredArray = array.filter((item) => item.toLowerCase().includes(filterVal?.toLowerCase()))
    return filteredArray
}

// To filter filter, sort data
const dataToRenderHandler = (data, currentPage, sortValue, selectedBrandFilters, selectedModelFilters, searchValue) => {
    let newData = [...data]
    if (selectedBrandFilters.length > 0) {
        newData = newData.filter(item => selectedBrandFilters.includes(item.brand));
    }

    if (selectedModelFilters.length > 0) {
        newData = newData.filter(item => selectedModelFilters.includes(item.model));
    }

    if(searchValue) {
        newData = newData.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()))
    }

    if (sortValue) {
        newData.sort((a, b) => {
            switch (sortValue) {
                case 'dateAsc':
                    return new Date(a.createdAt) - new Date(b.createdAt);
                case 'dateDesc':
                    return new Date(b.createdAt) - new Date(a.createdAt);
                case 'priceAsc':
                    return a.price - b.price;
                case 'priceDesc':
                    return b.price - a.price;
                default:
                    return 0; // No sort
            }
        });
    }

    const startIndex = (currentPage - 1) * 12;
    const endIndex = currentPage * 12;
    const filteredData = newData.slice(startIndex, endIndex);
    const filteredDataObj = { data: filteredData, total: newData.length }
    return filteredDataObj
}

const ListView = () => {
    const { data, status, error } = useSelector((state) => state.data);
    const { searchValue } = useSelector((state) => state.search);
    const filters = useSelector((state) => state.filter);
    const sortValue = useSelector((state) => state.sort);

    const [currentPage, setCurrentPage] = useState(1)
    const [brandFilterByText, setBrandFilterByText] = useState('')
    const [modelFilterByText, setModelFilterByText] = useState('')

    const brands = useMemo(() => filterSearchHandler(data, 'brand', brandFilterByText), [data, brandFilterByText])
    const models = useMemo(() => filterSearchHandler(data, 'model', modelFilterByText), [data, modelFilterByText])
    const dataToRender = useMemo(() =>
        dataToRenderHandler(data, currentPage, sortValue, filters.selectedBrandFilters, filters.selectedModelFilters, searchValue),
        [data, currentPage, sortValue, filters.selectedBrandFilters, filters.selectedModelFilters, searchValue]
    )

    const navigate = useNavigate();
    const dispatch = useDispatch();

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    const handleBrandFilterChange = (filters) => {
        dispatch(setBrandFilters(filters));
      };
    
      const handleModelFilterChange = (filters) => {
        dispatch(setModelFilters(filters));
      };

      const handleSortChange = (value) => {
        dispatch(setSortValue(value));
      };

    const handleDetail = (id) => {
        navigate(
            generatePath(Routes.Detail.Root, {
                id: id,
            })
        );
    };

    const handleAddToCart = (item) => {
        dispatch(addItem(item));
    }


    return (
        <Row justify="center" className={classNames(styles.root)}>
            <Col lg={6} xs={0}>
                <Row
                    gutter={[32, 24]}
                    justify="center"
                >
                    <Col span={20}>
                        Sort By
                        <Sort data={sortData} onChange={handleSortChange} value={sortValue} />
                    </Col>
                    <Col span={20}>
                        Brand
                        <Filter data={brands} onChange={handleBrandFilterChange} handleSearch={setBrandFilterByText} value={filters.selectedBrandFilters} />
                    </Col>
                    <Col span={20}>
                        Model
                        <Filter data={models} onChange={handleModelFilterChange} handleSearch={setModelFilterByText} value={filters.selectedModelFilters} />
                    </Col>
                </Row>
            </Col>
            <Col lg={18} xs={24}>
                <Row
                    gutter={[32, 24]}
                    justify="center"
                >
                    {dataToRender.data.map((item) => (
                        <Col lg={6} md={6} xs={12} key={item.id}>
                            <Card
                                key={item.id}
                                name={item.name}
                                img={item.image}
                                price={`${item.price} $`}
                                onClick={() => handleDetail(item.id)}
                                buttonAction={() => handleAddToCart(item)} />
                        </Col>
                    ))}
                    <Col span={24} className={classNames(styles.paginationContainer)}>
                        <Paginator totalData={dataToRender.total} onChange={setCurrentPage} currentPage={currentPage} />
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default ListView