import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

export default function App() {

  const [items, setItems] = useState([]);

  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(
        //`https://jsonplaceholder.typicode.com/comments?_page=1&_limit=12`
        `http://localhost:3004/comments?_page=1&_limit=6`
      );
      const data = await res.json();
      setItems(data);
    };
    getComments();
  }, [])
  console.log(items);

const fetchComments = async (currentPage) => {
  const res = await fetch(
    `http://localhost:3004/comments?_page=${currentPage}&_limit=6`
  )
  const data = await res.json();
  return data;
}


  const handlePageClick = async (data) => {
    console.log(data.selected);
    let currentPage = data.selected + 1 
    const commentsformserver = await fetchComments(currentPage);
    setItems(commentsformserver);
  }  

  return (
    <div>
      {
        items.map((items) => {
          return(
            <div>
              <div>
                <div>
                  {/* <h5>ID :{items.id}</h5>
                  <h6>{items.email}</h6>
                  <p>{items.body}</p> */}
                  <h5>{items.id}</h5>
                  <h5>{items.productName}</h5>
                </div>
              </div>
            </div>
          );
        })
      }
      <ReactPaginate 
      previousLabel={'<<'}
      nextLabel={'>>'}
      breakLabel={'***'}
      pageCount={25}
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      onPageChange={handlePageClick}
      containerClassName={'pagination justify-content-center'}
      pageClassName={'page-item'}
      pageLinkClassName={'page-link'}
      previousClassName={'page-item'}
      previousLinkClassName={'page-link'}
      nextClassName={'page-item'}
      nextLinkClassName={'page-link'}
      breakClassName={'page-item'}
      breakLinkClassName={'page-link'}
      activeClassName={'active'}
      />
    </div>
  )
}

