import { useEffect, useState } from "react";

const Pagination = ({ pages, setCurrentPage, currentEmployee, sortedEmployees }) => {
    const numOfPages = [];
    const employees = localStorage.getItem('employees')

    for (let i = 1; i <= pages; i++) {
        numOfPages.push(i);
    }

    const [currentButton, setCurrentButton] = useState(1);
    const [arrOfCurrButtons, setArrOfCurrButtons] = useState([]);

    useEffect(() => {
        setCurrentPage(currentButton)
    }, [currentButton, setCurrentPage])

    useEffect(() => {
        let tempNumOfPages = [...arrOfCurrButtons];
        const dots = '...';

        if (numOfPages.length < 4) {
            tempNumOfPages = [...numOfPages]
        }
        else {
            if (currentButton >= 1 && currentButton <= 2) {
                tempNumOfPages = [1, 2, 3, dots, numOfPages.length]
            }
            else if (currentButton === 3) {
                const sliced = numOfPages.slice(0, 3)
                tempNumOfPages = [...sliced, dots, numOfPages.length]
            }
            else if (currentButton > 3 && currentButton < numOfPages.length - 2) {
                const sliced1 = numOfPages.slice(currentButton - 2, currentButton);
                const sliced2 = numOfPages.slice(currentButton, currentButton + 1);
                tempNumOfPages = ([1, dots, ...sliced1, ...sliced2, dots, numOfPages.length])
            }
            else if (currentButton > numOfPages.length - 3) {
                const sliced = numOfPages.slice(numOfPages.length - 3)
                tempNumOfPages = ([1, dots, ...sliced])
            }
        }

        setArrOfCurrButtons(tempNumOfPages)
    }, [currentButton, employees])

    return (
        <div className="clearfix">
            <div className="hint-text">Showing <b>{currentEmployee.length}</b> out of <b>{sortedEmployees.length}</b> entries</div>
            <ul className="pagination">
                <li className={`${currentButton === 1 ? 'page-item disabled' : 'page-item'}`}><a href="#!" className="page-link"
                    onClick={() => setCurrentButton((prev) => prev === 1 ? prev : prev - 1)}>Previous</a></li>

                {
                    arrOfCurrButtons.map((page, index) => {
                        return (
                            <li key={index} className={`${currentButton === page ? 'page-item active' : 'page-item'}`}>
                                <a href="#!" className="page-link"
                                    onClick={() => setCurrentButton(page)}>{page}</a>
                            </li>
                        )
                    })
                }

                <li className={`${currentButton === numOfPages.length ? 'page-item disabled' : 'page-item'}`}><a href="#!" className="page-link"
                    onClick={() => setCurrentButton((prev) => prev === numOfPages.length ? prev : prev + 1)}>Next</a></li>
            </ul>
        </div>
    )
}

export default Pagination;

/*
                <li className='page-item'><a href="#" className="page-link">1</a></li>
                <li className='page-item'><a href="#" className="page-link">2</a></li>
                <li className='page-item active'><a href="#" className="page-link">3</a></li>
                <li className='page-item'><a href="#" className="page-link">4</a></li>
                <li className='page-item'><a href="#" className="page-link">5</a></li>
                <li className='page-item'><a href="#">Next</a></li>
*/