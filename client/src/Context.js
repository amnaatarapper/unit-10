import React from 'react';
import Dataworker from './Dataworker';

const Context = React.createContext();

export class Provider extends React.Component {

  constructor() {
    super();
    this.dataworker = new Dataworker();
  }

  render() {
    const value = {
      data: this.dataworker,
    }

    return (
        <Context.Provider value={value}>
            {this.props.children }
        </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
    return function ContextComponent(props) {
      return (
        <Context.Consumer>
          {context => <Component {...props} context={context} />}
        </Context.Consumer>
      );
    }
  }