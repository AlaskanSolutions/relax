import Component from 'components/component';
import cloneDeep from 'lodash.clonedeep';
import React, {PropTypes} from 'react';

import Shadow from './shadow';
import styles from './index.less';

export default class TextShadow extends Component {
  static propTypes = {
    value: PropTypes.array,
    onChange: PropTypes.func.isRequired
  };

  static defaultProps = {
    value: []
  };

  getInitState () {
    return {
      editingShadow: false
    };
  }

  addNewClick () {
    this.props.onChange([...this.props.value, {
      color: '#000000',
      blur: '2px',
      x: '2px',
      y: '2px'
    }]);
    this.setState({
      editingShadow: this.props.value.length
    });
  }

  changeShadow (key, value) {
    if (this.state.editingShadow !== false) {
      const newValue = cloneDeep(this.props.value);
      newValue[this.state.editingShadow][key] = value;
      this.props.onChange(newValue);
    }
  }

  selectShadow (index) {
    if (this.state.editingShadow === index) {
      this.setState({
        editingShadow: false
      });
    } else {
      this.setState({
        editingShadow: index
      });
    }
  }

  removeShadow (index) {
    const newValue = cloneDeep(this.props.value);
    newValue.splice(index, 1);
    this.props.onChange(newValue);
  }

  render () {
    return (
      <div>
        {this.props.value.map(this.renderEntry, this)}
        <div className={styles.addButton} onClick={::this.addNewClick}>Add new shadow</div>
      </div>
    );
  }

  renderEntry (shadow, index) {
    return (
      <Shadow
        index={index}
        editing={this.state.editingShadow === index}
        shadow={shadow}
        changeShadow={::this.changeShadow}
        selectShadow={::this.selectShadow}
        removeShadow={::this.removeShadow}
        {...this.props}
      />
    );
  }
}
