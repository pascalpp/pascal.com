import PropTypes           from 'prop-types';
import PullToRefresh       from './pull_to_refresh';
import React               from 'react';
import ResourceNotFound    from './resource_not_found';
import ResourceUnavailable from './resource_unavailable';


export default class FetchFromServer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state       = {};
    this.handleRetry = this.handleRetry.bind(this);
  }

  // statuses can be one list of statuses, or an array of.
  static getDerivedStateFromProps(nextProps) {
    const { statuses }    = nextProps;
    const currentStatuses = Array.isArray(statuses) ? statuses : Array.of(statuses);
    return {
      statuses:              currentStatuses,
      isResourceUnavailable: currentStatuses.some(resourceUnavailable),
      isResourceNotFound:    currentStatuses.some(resourceNotFound),
    };
  }

  componentDidMount() {
    const { reloadOnMount } = this.props;
    if (reloadOnMount)
      this.load();
    else
      this.loadWhenNeeded();
  }

  componentDidUpdate() {
    if (this.props.reload || (!this.state.isResourceUnavailable && !this.state.isResourceNotFound))
      this.loadWhenNeeded();
  }

  loadWhenNeeded() {
    const { reload }   = this.props;
    const { statuses } = this.state;

    const pending    = statuses.some(isPending);
    const neverRead  = statuses.some(isUnread);
    const readFailed = statuses.some(failedToRead);
    const shouldLoad = (neverRead || readFailed || reload) && !pending;

    if (shouldLoad)
      this.load();
  }

  load() {
    const { load }     = this.props;
    const { statuses } = this.state;

    const deleted = statuses.some(isDeleted);

    if (!deleted) {
      // Ignore error, component will update based on resource status.
      Promise.resolve(load()).catch(() => {});
    }
  }

  handleRetry() {
    this.props.load();
  }

  render() {
    const { isResourceUnavailable } = this.state;
    const { isResourceNotFound }    = this.state;
    const { notFoundAction }        = this.props;
    const { notFoundTab }           = this.props;

    if (isResourceUnavailable)
      return <ResourceUnavailable handleRetry={this.handleRetry}/>;
    else if (isResourceNotFound)
      return <ResourceNotFound action={notFoundAction} tab={notFoundTab}/>;
    else {
      const { load }          = this.props;
      const { children }      = this.props;
      const { className }     = this.props;
      const { style }         = this.props;
      const { pullToRefresh } = this.props;
      if (pullToRefresh) {
        return (
          <PullToRefresh onRefresh={load} className={className} style={style}>
            {children || null}
          </PullToRefresh>
        );
      } else
        return children || null;
    }
  }
}


FetchFromServer.propTypes = {
  load:     PropTypes.func.isRequired,
  statuses: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]).isRequired,
};

FetchFromServer.defaultProps = {
  pullToRefresh: true,
  reloadOnMount: false,
};


function isDeleted(statuses) {
  return statuses.deleteStatus.succeeded;
}

function isUnread(statuses) {
  const { readStatus } = statuses;
  return readStatus.idle && !readStatus.succeeded;
}

function isPending(statuses) {
  return statuses.readStatus.pending;
}

function failedToRead(statuses) {
  return statuses.readStatus.failed;
}

function resourceUnavailable(statuses) {
  const { readStatusCode } = statuses;
  return readStatusCode && readStatusCode >= 500;
}

function resourceNotFound(statuses) {
  const { readStatusCode } = statuses;
  return readStatusCode && readStatusCode >= 400 && readStatusCode < 500;
}
