import React from 'react';


const Context = React.createContext();

export class Provider extends React.Component {

  render() {
    const value = {
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