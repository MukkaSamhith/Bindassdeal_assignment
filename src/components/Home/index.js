import {Component} from 'react'
import './index.css'

const items = [
  {id: 1, name: 'Item1', category: 'A', date: '2024-06-01'},
  {id: 2, name: 'Item2', category: 'B', date: '2024-06-02'},
  {id: 3, name: 'Item3', category: 'A', date: '2024-06-03'},
]

class Home extends Component {
  state = {
    itemsList: items,
    originalList: items,
    search: '',
    toInsert: false,
    updateItem: false,
    updateItemId: null,
    calId: items.length + 1,
    name: '',
    category: '',
    date: '',
  }

  searchItem = event => {
    this.setState({search: event.target.value}, this.getResult)
  }

  getResult = () => {
    const {search, itemsList, originalList} = this.state
    if (search.length === 0) {
      this.setState({itemsList: originalList})
    } else {
      const values = itemsList.filter(each =>
        each.name.toLowerCase().includes(search.toLowerCase()),
      )
      this.setState({itemsList: values})
    }
  }

  logOut = () => {
    const {history} = this.props
    history.replace('/')
  }

  insertItem = () => {
    this.setState({
      toInsert: true,
      name: '',
      category: '',
      date: '',
    })
  }

  addName = event => {
    this.setState({name: event.target.value})
  }

  addCategory = event => {
    this.setState({category: event.target.value})
  }

  addDate = event => {
    this.setState({date: event.target.value})
  }

  addItem = event => {
    event.preventDefault()
    const {name, category, date, calId} = this.state
    const newItem = {
      id: calId,
      name,
      category,
      date,
    }
    this.setState(prevState => ({
      itemsList: [...prevState.itemsList, newItem],
      originalList: [...prevState.itemsList, newItem],
      toInsert: false,
      calId: prevState.calId + 1,
      name: '',
      category: '',
      date: '',
    }))
  }

  updateItem = id => {
    const {itemsList} = this.state
    const item = itemsList.find(each => each.id === id)
    this.setState({
      updateItem: true,
      updateItemId: id,
      name: item.name,
      category: item.category,
      date: item.date,
    })
  }

  saveUpdatedItem = event => {
    event.preventDefault()
    const {updateItemId, name, category, date} = this.state
    this.setState(prevState => ({
      itemsList: prevState.itemsList.map(item =>
        item.id === updateItemId
          ? {id: updateItemId, name, category, date}
          : item,
      ),
      updateItem: false,
      updateItemId: null,
      name: '',
      category: '',
      date: '',
    }))
  }

  deleteItem = id => {
    this.setState(prevState => ({
      itemsList: prevState.itemsList.filter(each => each.id !== id),
    }))
  }

  filterByCategory = event => {
    const {itemsList} = this.state
    const categoryList = itemsList.filter(
      each => each.category === event.target.value,
    )
    this.setState({itemsList: categoryList})
  }

  render() {
    const {
      itemsList,
      toInsert,
      updateItem,
      name,
      category,
      date,
      calId,
    } = this.state
    return (
      <div className="home-page">
        <div className="header">
          <div>
            <input
              type="text"
              placeholder="search"
              onChange={this.searchItem}
            />
            <select className="filter-bar" onChange={this.filterByCategory}>
              <option value="All">All Categories</option>
              <option value="A">Category A</option>
              <option value="B">Category B</option>
            </select>
          </div>
          <button type="button" onClick={this.logOut}>
            Logout
          </button>
        </div>
        {updateItem && (
          <form onSubmit={this.saveUpdatedItem}>
            <label htmlFor="editName">Name</label>
            <input
              type="text"
              id="editName"
              value={name}
              placeholder="Name"
              onChange={this.addName}
            />
            <br />
            <label htmlFor="editCategory">Category</label>
            <input
              type="text"
              id="editCategory"
              value={category}
              placeholder="Category"
              onChange={this.addCategory}
            />
            <br />
            <label htmlFor="editDate">Date</label>
            <input
              type="date"
              id="editDate"
              value={date}
              placeholder="Date"
              onChange={this.addDate}
            />
            <br />
            <button type="submit">Save</button>
          </form>
        )}
        {itemsList.map(each => (
          <div key={each.id} className="items-details">
            <div>
              <h3>Name: {each.name}</h3>
              <p>Category: {each.category}</p>
              <p>Date: {each.date}</p>
            </div>
            <div>
              <button type="button" onClick={() => this.updateItem(each.id)}>
                Update
              </button>
              <button type="button" onClick={() => this.deleteItem(each.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
        <div className="insert-container">
          <h4>Do you want to Insert --&gt;</h4>
          <button type="button" onClick={this.insertItem}>
            Insert
          </button>
        </div>
        {toInsert && (
          <form onSubmit={this.addItem}>
            <p>Id: {calId} </p>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              id="name"
              value={name}
              placeholder="Enter Name"
              onChange={this.addName}
            />
            <br />
            <label htmlFor="category">Category: </label>
            <input
              type="text"
              id="category"
              value={category}
              placeholder="Enter Category"
              onChange={this.addCategory}
            />
            <br />
            <label htmlFor="date">Date: </label>
            <input
              type="date"
              id="date"
              value={date}
              placeholder="Enter Date"
              onChange={this.addDate}
            />
            <br />
            <button type="submit">Add Item</button>
          </form>
        )}
      </div>
    )
  }
}

export default Home
