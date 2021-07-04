import React from "react";
import queryString from "query-string";
import LeftPanel from "./leftDDRadio";
import axios from "axios";
export default class ShowData extends React.Component {
  state = {
    options: { q: "", C: 10 },
    data: {},
  };
  async fetchData() {
    const queryParam = queryString.parse(this.props.location.search);
    let searchStr = this.makeSearchString(queryParam);
    searchStr = searchStr.replace("orderby", "order-by");
    let str = "";
    if (searchStr !== "") {
      str = `https://content.guardianapis.com/search?api-key=58db565e-ef12-41fa-8902-d029985be863&${searchStr}`;
      let response = await axios.get(str);
      let { data } = response;
      this.setState({ data: data });
    }
    if (queryParam.q) {
      let s1 = { ...this.state };
      s1.options.q = queryParam.q;
      if (s1.data.response.currentPage === 1) {
        s1.options.C = 0;
      } else {
        s1.options.C = s1.options.C + 10;
      }
      this.setState(s1);
    }
  }
  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) this.fetchData();
  }
  handleChange = (e) => {
    const { currentTarget: input } = e;
    let options = { ...this.state };
    options[input.name] = input.value;
    this.setState({ options: options });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    let queryParam = queryString.parse(this.props.location.search);
    const { options } = this.state;
    queryParam = { ...queryParam, q: options.q };
    queryParam.section = "";
    queryParam.orderby = "";
    this.handleValue(queryParam);
  };
  handleValue = (option) => {
    option.page = "1";
    let str = "/home";
    this.callURL(str, option);
  };
  callURL = (url, option) => {
    let searchStr = this.makeSearchString(option);
    this.props.history.push({
      pathname: url,
      search: searchStr,
    });
  };
  makeSearchString = (option) => {
    let { page, section, q } = option;
    let orderby = option.orderby;
    let searchStr = "";
    searchStr = this.addToQuery(searchStr, "q", q);
    searchStr = this.addToQuery(searchStr, "orderby", orderby);
    searchStr = this.addToQuery(searchStr, "section", section);
    searchStr = this.addToQuery(searchStr, "page", page);
    return searchStr;
  };

  addToQuery = (str, paramName, paramVal) =>
    paramVal
      ? str
        ? `${str}&${paramName}=${paramVal}`
        : `${paramName}=${paramVal}`
      : str;
  handlePage = (incr) => {
    let queryParam = queryString.parse(this.props.location.search);
    let { page = "1" } = queryParam;
    let newPage = +page + incr;
    queryParam.page = newPage;
    this.callURL("/home", queryParam);
  };
  render() {
    const { response = {} } = this.state.data;
    const { options } = this.state;
    const {
      currentPage,
      orderBy,
      pageSize,
      pages,
      results = [],
      startIndex,
      total,
    } = response;
    const queryParam = queryString.parse(this.props.location.search);
    return (
      <div className="container">
        <div className="row">
          <div className="col-3">
            <LeftPanel option={queryParam} onOptionChange={this.handleValue} />
          </div>
          <div className="col-9">
            <div className="row my-2">
              <div className="col-10">
                <div className="form-group">
                  <input
                    type="text"
                    name="q"
                    className="form-control"
                    value={options.q}
                    onChange={this.handleChange}
                    placeholder="Enter Search text"
                  />
                </div>
              </div>
              <div className="col-2">
                <button className="btn btn-primary" onClick={this.handleSubmit}>
                  Submit
                </button>
              </div>
            </div>
            {startIndex ? (
              <h5>
                Showing {startIndex} to{" "}
                {currentPage == 1
                  ? total < pageSize
                    ? total
                    : pageSize
                  : +pageSize + options.C}{" "}
                of {total}
              </h5>
            ) : (
              ""
            )}
            <div className="row">
              {results.map((v, index) => (
                <div className="col-4 border text-center m-0.5 bg" key={index}>
                  <p className="text-center">{v.webTitle}</p>
                  <b>
                    Source : {v.sectionName} {v.webPublicationDate}
                  </b>
                  <br />
                  <a href={v.webUrl}>Preview</a>
                </div>
              ))}
            </div>
            <div className="row">
              <div className="col-2">
                {currentPage > 1 ? (
                  <button
                    className="btn btn-primary"
                    onClick={() => this.handlePage(-1)}
                  >
                    Prev
                  </button>
                ) : (
                  ""
                )}
              </div>
              <div className="col-8"></div>
              <div className="col-2">
                {startIndex ? (
                  total < pageSize ? (
                    ""
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={() => this.handlePage(1)}
                    >
                      Next
                    </button>
                  )
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
