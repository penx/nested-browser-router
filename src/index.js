import React from 'react';
import PropTypes from 'prop-types';
import {
  Router, withRouter,
} from 'react-router-dom';

import {
  stripBasename, stripTrailingSlash, addLeadingSlash,
} from 'history/PathUtils';


/**
 * needs to override where basename is used
 * as per https://github.com/ReactTraining/history/blob/master/modules/createBrowserHistory.js
 */
const nestedHistory = (history, bn) => {
  const basename = bn
    ? stripTrailingSlash(addLeadingSlash(bn))
    : '';

  return {
    ...history,
    // action: history.action,
    // length: history.length,
    location: {
      ...history.location,
      pathname: stripBasename(history.location.pathname, basename),
    },
    createHref: location => basename + history.createHref(location),
    push: (path, state) => history.push(basename + path, state),
    listen: func => history.listen(location => func({
      ...location,
      pathname: stripBasename(location.pathname, basename),
    })),
    // match: spy(history.match, 'match'),
    // replace: spy(history.replace, 'replace'),
    // go: spy(history.go, 'go'),
    // goBack: spy(history.goBack, 'goBack'),
    // goForward: spy(history.goForward, 'goForward'),
    // block: spy(history.block, 'block'),
  };
};

const NestedBrowserRouter = withRouter(class extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    history: PropTypes.shapeOf({
      createHref: PropTypes.func,
      push: PropTypes.func,
      listen: PropTypes.func,
    }),
    basename: PropTypes.string.isRequired,
  }

  static defaultProps = {
    children: undefined,
    history: undefined,
  }

  constructor(props) {
    super(props);
    this.history = nestedHistory(props.history, props.basename);
  }

  render() {
    const { children } = this.props;
    return <Router history={this.history}>{children}</Router>;
  }
});

export default NestedBrowserRouter;
