import { Component } from "react";
import { TailSpin } from "react-loader-spinner";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import TransactionTable from "../TransactionsTable";
import "./index.css";

class Home extends Component {
  state = {
    month: "March",
    search: "",
    isLoading: false,
    page: 1,
    perPge: 5,
    transactionsData: [],
    statistics: {},
    barChartData: {},
  };
  onChangeMonth = (e) => {
    console.log(e.target.value);
    this.setState({ month: e.target.value, page: 1 }, this.getData);
  };

  onChangeSearch = (e) => {
    console.log(e.target.value);
    this.setState({ search: e.target.value }, this.getData);
  };

  getData = async () => {
    const { month, search, page, perPge } = this.state;
    this.setState({ isLoading: true });
    console.log(month);
    const response = await fetch(
      `roxiler-backed-production-9553.up.railway.app/transactions?month=${month}&search=${search}&page=${page}&perPage=${perPge}`
    );
    const data = await response.json();
    if (response.ok) {
      this.setState({ isLoading: false, transactionsData: data.data });
    }
    const response2 = await fetch(
      `https://roxiler-backed-production.up.railway.app/statistics?month=${month}`
    );
    const statisticsData = await response2.json();
    if (response2.ok) {
      this.setState({ isLoading: false, statistics: statisticsData });
    }
    const response3 = await fetch(
      `https://roxiler-backed-production.up.railway.app/items-in-price-range?month=${month}`
    );
    const priceRangeData = await response3.json();

    if (response3.ok) {
      const priceData = priceRangeData.data;
      const dataList = [
        { id: "0-100", count: priceData["0-100"] },
        { id: "101-200", count: priceData["101-200"] },
        { id: "201-300", count: priceData["201-300"] },
        { id: "301-400", count: priceData["301-400"] },
        { id: "401-500", count: priceData["401-500"] },
        { id: "501-600", count: priceData["501-600"] },
        { id: "601-700", count: priceData["601-700"] },
        { id: "701-800", count: priceData["701-800"] },
        { id: "801-900", count: priceData["801-900"] },
        { id: "901-above", count: priceData["901-above"] },
      ];
      console.log(dataList);
      this.setState({ isLoading: false, barChartData: dataList });
    }
  };

  componentDidMount() {
    this.getData();
  }

  onClickPrevious = () => {
    const { page } = this.state;
    if (page > 1) {
      this.setState({ page: page - 1 }, this.getData);
    }
  };

  onClickNext = () => {
    const { page } = this.state;

    this.setState({ page: page + 1 }, this.getData);
  };

  render() {
    const {
      month,
      search,
      isLoading,
      transactionsData,
      page,
      perPge,
      statistics,
      barChartData,
    } = this.state;

    return (
      <div className="bg-container">
        <div className="main-heading-container">
          <h1 className="heading1">
            Transaction <br /> Dashboard
          </h1>
        </div>
        <div className="content">
          <div className="filter-container">
            <input
              type="search"
              className="search"
              placeholder="Search Transaction"
              value={search}
              onChange={this.onChangeSearch}
            />
            <select
              onChange={this.onChangeMonth}
              className="select"
              name="months"
              value={month}
            >
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>
          {isLoading ? (
            <div className="spinner">
              <TailSpin
                height="50"
                width="50"
                color="black"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div>
          ) : (
            <div>
              <TransactionTable data={transactionsData} />
              <div className="filter-container">
                <p>Page no: {page}</p>
                <div className="button-container">
                  <button onClick={this.onClickPrevious} className="button">
                    <FaAngleLeft />
                  </button>
                  <button onClick={this.onClickNext} className="button">
                    <FaAngleRight />
                  </button>
                </div>
                <p>Per Page: {perPge}</p>
              </div>
              <div>
                <h1>Statistics - {month}</h1>
                <div className="statistics-container">
                  <div className="container2">
                    <p>Total Sale</p>
                    <p>{statistics.totalSalesAmount}</p>
                  </div>
                  <div className="container2">
                    <p>Total Sold Item</p>
                    <p>{statistics.totalSoldItems}</p>
                  </div>
                  <div className="container2">
                    <p>Total Not Sold Item</p>
                    <p>{statistics.totalNotSoldItems}</p>
                  </div>
                </div>
              </div>
              <div>
                <h1>Bar Chart Stats - {month}</h1>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={barChartData}
                    margin={{
                      top: 20,

                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="id" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 16 }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#6CE5E8" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Home;
