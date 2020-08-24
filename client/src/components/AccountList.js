import React, { Component } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Chart from "./Chart";

class AccountList extends Component {
  state = {
    editMode: false,
    editSubmissions: {},
    editList: [],
    enableGraph: false,
    displayGraph: false,
    dataArr:
      this.props.graph && this.props.graph.dataArr
        ? this.props.graph.dataArr
        : [],
    filteredTitle: "",
  };

  componentDidMount() {
    const { fetchList, filter } = this.props;
    fetchList(this.state);
    if (filter && filter.func) {
      filter.func();
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.fetchList !== this.props.fetchList) {
      this.props.fetchList();
    }
  }

  submit = (account) => {
    const { deleteFunc, submitParams } = this.props;
    let params;
    if (submitParams) {
      params = submitParams(account);
    } else {
      params = account.id || account.courseId;
    }
    deleteFunc(params);
  };

  genKey = (account, column) => {
    const { genKey } = this.props;
    let key;
    if (genKey) {
      key = genKey(account);
    } else {
      key = account.id || account.courseId;
    }

    if (column) {
      key += column;
    }
    // console.log(key);
    return key;
  };

  clickFilter = (item, filter, display) => {
    const { fetchList, average, graph } = this.props;

    this.setState({
      [filter.submit]: item[filter.submit],
    });
    fetchList({ [filter.submit]: item[filter.submit] });
    if (filter.subFilter && filter.subFilter.func) {
      this.setState({ filteredTitle: "", enableGraph: false });
      filter.subFilter.func({ [filter.submit]: item[filter.submit] });
    } else {
      this.setState({ filteredTitle: display, enableGraph: graph && true });
      if (graph) {
        graph.func({ courseId: item[filter.submit] });
      }
      if (average) {
        average.func({ courseId: item[filter.submit] });
      }
    }
  };

  clickSubFilter = (item, filter, display) => {
    const { fetchList, average, graph } = this.props;
    this.setState(
      {
        [filter.submit]: item[filter.submit],
        filteredTitle: display,
        enableGraph: graph && true,
      },
      () => {
        fetchList(this.state);
        if (graph) {
          graph.func(this.state);
        }
        if (average) {
          average.func(this.state);
        }
      }
    );
  };

  clickAll = () => {
    this.setState({ enableGraph: false });
    this.props.fetchList();
  };

  filterDropdown = () => {
    const { filter } = this.props;
    return (
      <div>
        <DropdownButton
          id="dropdown-basic-button"
          title="Filter"
          as={ButtonGroup}
        >
          <Dropdown.Item onClick={() => this.clickAll()}>All</Dropdown.Item>
          {filter.list.map((item) => (
            <Dropdown.Item
              onClick={() =>
                this.clickFilter(item, filter, item[filter.display])
              }
              key={item[filter.display]}
            >
              {item[filter.display]}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        {filter.subFilter && (
          <DropdownButton
            id="dropdown-basic-button"
            title="Filter"
            as={ButtonGroup}
          >
            <Dropdown.Item onClick={() => this.clickAll()}>All</Dropdown.Item>
            {filter.subFilter.list &&
              filter.subFilter.list.map((item) => (
                <Dropdown.Item
                  onClick={() =>
                    this.clickSubFilter(
                      item,
                      filter.subFilter,
                      item[filter.display]
                    )
                  }
                >
                  {item[filter.display]}
                </Dropdown.Item>
              ))}
          </DropdownButton>
        )}
      </div>
    );
  };

  changeEditSubmission = (event) => {
    const { edit } = this.props;
    const { editList } = this.state;
    let nam = event.target.name;
    let val = event.target.value;

    var doesNotExist = true;
    var newEditList = editList;
    var num = 0;
    newEditList.map((element, index) => {
      if (element[edit.contents] === nam) {
        num = index;
        doesNotExist = false;
      }
    });

    var editEl = { id: nam, [edit.columns]: val };
    if (doesNotExist) {
      newEditList.push(editEl);
      this.setState({ editList: newEditList });
    } else {
      newEditList[num] = editEl;
      this.setState({ editList: newEditList });
    }
  };

  sendGraphData = () => {
    const { graph, list } = this.props;
    const { dataArr, displayGraph } = this.state;
    var arr = dataArr;
    var barArr = graph.barX;
    if (graph.dataFetched) {
      graph.dataFetched.map((element) => {
        var num = element;
        for (var i = 0; i < arr.length; i++) {
          if (num <= barArr[i]) {
            arr[i]++;
            break;
          }
        }
      });
    } else {
      list.map((account) => {
        var num = account[graph.data];
        for (var i = 0; i < arr.length; i++) {
          if (num <= barArr[i]) {
            arr[i]++;
            break;
          }
        }
      });
    }

    this.setState({
      dataArr: arr,
      displayGraph: !displayGraph,
    });
  };

  graph = () => {
    const { enableGraph } = this.state;
    return (
      <div>
        <Button disabled={!enableGraph} onClick={() => this.sendGraphData()}>
          Graph
        </Button>
      </div>
    );
  };

  showList = () => {
    const {
      list,
      filter,
      deleteFunc,
      displayList,
      edit,
      graph,
      average,
    } = this.props;
    const {
      editMode,
      enableGraph,
      displayGraph,
      dataArr,
      filteredTitle,
    } = this.state;

    return (
      <div>
        <div className="list">
          {filter && filter.list && list && list[0] && this.filterDropdown()}
          {graph && this.graph()}
        </div>
        {(enableGraph || (average && average.value)) && (
          <div>
            <h4>{filteredTitle}</h4>
            <h5>Average: {average.value}</h5>
          </div>
        )}
        {displayGraph ? (
          <Chart
            chartData={{
              labels: graph.labelArr,
              datasets: [
                {
                  data: dataArr,
                  backgroundColor: graph.colorArr,
                },
              ],
            }}
            title="Grades"
            chartType="Bar"
          />
        ) : (
          <Table>
            <thead>
              <tr>
                {displayList
                  ? displayList.map(
                      (element) =>
                        ((enableGraph &&
                          filter.displayProps &&
                          filter.displayProps.has(element)) ||
                          !enableGraph) && <th key={element}> {element} </th>
                    )
                  : Object.keys(list[0]).map((prop) => (
                      <th key={prop}> {prop} </th>
                    ))}
              </tr>
            </thead>
            <tbody>
              {list.map((account) => (
                <tr key={this.genKey(account)}>
                  {Object.keys(account).map(
                    (value) =>
                      ((enableGraph &&
                        filter.properties &&
                        filter.properties.has(value)) ||
                        !enableGraph) && (
                        <td key={this.genKey(account, value)}>
                          {editMode && edit.columns === value ? (
                            <Form.Control
                              type="text"
                              placeholder={account[value]}
                              onChange={this.changeEditSubmission.bind(this)}
                              name={account[edit.contents]}
                            />
                          ) : (
                            account[value]
                          )}
                        </td>
                      )
                  )}
                  {deleteFunc && edit.view && (
                    <td>
                      <Button onClick={() => this.submit(account)}>-</Button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    );
  };

  submitEdittedRow = () => {
    this.state.editList.map((element) => {
      this.props.edit.func(element);
    });
    this.setState({ editMode: false });
  };

  editPanel = () => {
    const { editMode } = this.state;
    return (
      <div>
        <Button onClick={() => this.setState({ editMode: !editMode })}>
          Edit
        </Button>
        {editMode && (
          <Button onClick={() => this.submitEdittedRow()}>Save</Button>
        )}
      </div>
    );
  };

  render() {
    const { list, fetchList, edit } = this.props;
    return (
      <div className="App">
        {list !== undefined ? (
          <div>
            {this.showList()}
            {edit && edit.func && this.editPanel()}
          </div>
        ) : (
          <div>
            <h1>No List :(</h1>
            <button className="more" onClick={() => fetchList()}>
              Try Again?
            </button>
          </div>
        )}
      </div>
    );
  }
}
export default AccountList;
