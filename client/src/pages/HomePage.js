import React from 'react';
import ReactTooltip from "react-tooltip";
import { Link } from 'react-router-dom';

function HomePage() {

    return (
        <div>
            <h3>Home</h3>
            <p>Select the table names to manage below or in the toolbar to navigate to each table's page</p>
        <div className = "toolBarLinks">
            <Link to="/books">
                <button
                type="button"
                className="button-medium"
                data-tip data-for="booksTip"
                aria-label="books">
                Books
                </button>
            </Link>
            <ReactTooltip delayShow={1000} id="booksTip" place="top" effect="solid">
                Go to the Books page.
            </ReactTooltip>

            <Link to="/authors">
                <button
                type="button"
                className="button-medium"
                data-tip data-for="authorsTip"
                aria-label="books">
                Authors
                </button>
            </Link>
            <ReactTooltip delayShow={1000} id="authorsTip" place="top" effect="solid">
                Go to the Authors page.
            </ReactTooltip>

            <Link to="/customers">
                <button
                type="button"
                className="button-medium"
                data-tip data-for="customersTip"
                aria-label="customers"
                >
                Customers
                </button>
            </Link>
            <ReactTooltip delayShow={1000} id="authorsTip" place="top" effect="solid">
                Go to the Customers page.
            </ReactTooltip>

            <Link to="/orders">
                <button
                type="button"
                className="button-medium"
                data-tip data-for="ordersTip"
                aria-label="orders"
                >
                Orders
                </button>
            </Link>
            <ReactTooltip delayShow={1000} id="authorsTip" place="top" effect="solid">
                Go to the Orders page.
            </ReactTooltip>

            <Link to="/books_authors">
                <button
                type="button"
                className="button-medium"
                data-tip data-for="books_authorsTip"
                aria-label="books_authors"
                >
                Books_Authors
                </button>
            </Link>
            <ReactTooltip delayShow={1000} id="books_authorsTip" place="top" effect="solid">
                Go to the Books_Authors page.
            </ReactTooltip>

            <Link to="/books_orders">
                <button
                type="button"
                className="button-medium"
                data-tip data-for="books_ordersTip"
                aria-label="books_orders"
                >
                Books_Orders
                </button>
            </Link>
            <ReactTooltip delayShow={1000} id="books_ordersTip" place="top" effect="solid">
                Go to the Books_Orders page.
            </ReactTooltip>
            </div>
        </div>
    );
}

export default HomePage;