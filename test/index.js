const createDOMFromString = (domString) => {
  const div = document.createElement('div')
  div.innerHTML = domString
  return div
}

class Component {
  constructor(props = {}) {
    this.props = props
  }
  setState(state) {
    const oldEl = this.el
    this.state = state
    this._renderDom()
    if (this.onStateChange) this.onStateChange(oldEl, this.el)
  }
  _renderDom() {
    this.el = createDOMFromString(this.render())
    if (this.onClick) {
      this.el.addEventListener('click', this.onClick.bind(this), false)
    }
    return this.el
  }
}

const mount = (component, wrapper) => {
  wrapper.appendChild(component._renderDom()) // 第一次插入DOM元素
  component.onStateChange = (oldEl, newEl) => {
    wrapper.insertBefore(newEl, oldEl) // 插入新的元素
    wrapper.removeChild(oldEl) //删除旧的元素
  }
}

class LikeButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLiked: false
    }
  }
  onClick() {
    this.setState({
      isLiked: !this.state.isLiked
    })
  }
  render() {
    return (
      `
        <button class="like-btn" style="background-color:${this.props.bgColor}">
          <span class="like-text">${this.state.isLiked ? '取消' : '点赞'}</span>
          <span>👍</span>
        </button>
      `
    )
  }
}

class RedBlueButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      color: 'red'
    }
  }
  onClick() {
    if (this.state.color === 'red') {
      this.setState({
        color: 'blue'
      })
    } else {
      this.setState({
        color: 'red'
      })
    }

  }
  render() {
    return (
      `
        <div style='color:${this.state.color}'>${this.state.color}</div>
      `
    )
  }
}