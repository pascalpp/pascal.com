import './pull_to_refresh.less';

import classnames from 'classnames';
import React      from 'react';


export default class PullToRefresh extends React.PureComponent {
  constructor(props) {
    super(props);
    this.element = React.createRef();
  }

  componentDidMount() {
    this.$f7ready(app => {
      // When the component is used after the page init
      // we need to manually create the PTR
      if (!app.ptr.get(this.element.current))
        app.ptr.create(this.element.current);

      const { onRefresh } = this.props;

      // When the component is dragged down the screen, F7 triggers a
      // ptr:refresh event.  At that point, the UI shows the spinning loader.
      // When we're done refreshing, we're responsible for calling done() on the
      // component.
      this.element.current.addEventListener('ptr:refresh', ({ detail }) => {
        const done = detail;
        try {
          // ensure we remove class ptr-pull-up (f7 first time keeps the
          // class)
          this.element.current.classList.remove('ptr-pull-up');

          // no need to await, we don't want to show the PTR spinner
          // we would show our own
          onRefresh();
        } finally {
          done();
        }
      });
    });
  }

  render() {
    const { children, style } = this.props;
    const className           = classnames(
      'page-content',
      'ptr-content',
      this.props.className,
    );
    // F7 expects us to have a wrapper (ptr-content) element that can be pulled
    // down, and also expects page-content to be that wrapper, otherwise it has
    // a problem calculating scroll position, and it initiates PTR whenever user
    // scrolls up (not just when at top of page).
    return (
      <div className={className} style={style} ref={this.element} data-ptr-distance={60}>
        <PullToRefreshPreloader/>
        {children}
      </div>
    );
  }
}


function PullToRefreshPreloader() {
  return (
    <div className="ptr-preloader">
      <div className="ptr-arrow"></div>
    </div>
  );
}
