import React from 'react';


// This is a hack for f7 pull to refresh
//
// F7 pull to refresh is started in the begin of app, and bind a touch event
// to the whole app when we have the `ptr-content`.
//
// F7 ignores the touch only when we have the class `ptr-refreshing`
// that means it is already loading a new content
//
// So this function make usage of this, when children is scrolling it adds a
// ptr-refreshing class to page-content, so we can prevent the pull to refresh
// happens

export default class PreventPullToRefreshWhenScrolling extends React.PureComponent {
  constructor(props) {
    super(props);
    this.elRef                = React.createRef();
    this.onScroll             = this.onScroll.bind(this);
    this.disablePullToRefresh = this.disablePullToRefresh.bind(this);
    this.enablePullToRefresh  = this.enablePullToRefresh.bind(this);
  }

  onScroll({ scrollTop }) {
    if (scrollTop > 0)
      this.disablePullToRefresh();
    else
      this.enablePullToRefresh();
  }

  enablePullToRefresh() {
    const element = this.getPageContent();
    if (!element)
      return;

    element.classList.remove('ptr-refreshing');
    element.classList.remove('prevent-transform');

    const preloader         = element.querySelector('.ptr-preloader');
    preloader.style.display = 'block';
  }

  disablePullToRefresh() {
    const element = this.getPageContent();
    if (!element)
      return;

    element.classList.add('ptr-refreshing');
    element.classList.add('prevent-transform');

    const preloader         = element.querySelector('.ptr-preloader');
    preloader.style.display = 'none';
  }

  getPageContent() {
    const container = this.elRef.current;
    if (container) {
      const parentContent = container.closest('.page-content[data-ptr-distance]');
      const childContent  = container.querySelector('.page-content[data-ptr-distance]');
      return parentContent || childContent;
    } else
      return undefined;
  }

  render() {
    const { children, disableHeight, className, ...props } = this.props;

    const style = disableHeight ? null : { height: '100%' };

    return (
      <div ref={this.elRef} style={style} className={className}>
        {children({
          ...props,
          onScroll:             this.onScroll,
          enablePullToRefresh:  this.enablePullToRefresh,
          disablePullToRefresh: this.disablePullToRefresh,
        })}
      </div>
    );
  }
}

export function withPreventPullToRefreshWhenScrolling(Component) {
  return function PreventPullToRefreshWhenScrollingContainer(componentProps) {
    const { disableHeight } = componentProps;

    return (
      <PreventPullToRefreshWhenScrolling disableHeight={disableHeight}>
        {preventProps => (
          <Component {...componentProps} {...preventProps}/>
        )}
      </PreventPullToRefreshWhenScrolling>
    );
  };
}
