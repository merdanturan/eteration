import React from 'react'
import { Pagination } from 'antd';

const Paginator = ({
  defaultPageSize = 12,
  totalData,
  onChange,
  currentPage = 1
}) => {
  return (
    <Pagination
      defaultCurrent={1}
      total={totalData}
      defaultPageSize={defaultPageSize}
      onChange={onChange}
      current={currentPage}
      pageSizeOptions={[12]}
      hideOnSinglePage
    />
  )
}

export default Paginator