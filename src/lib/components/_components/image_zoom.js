import './image_zoom.less';

import * as QS  from 'querystring';
import Lightbox from 'react-image-lightbox';
import React    from 'react';


// TODO(@pascal): all the hash change stuff in here is out of date since we're
// not using hash navigation anymore. Need to refactor to use the real query
// string

export default class ImageZoom extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleHashChanged = this.handleHashChanged.bind(this);
    this.open              = this.open.bind(this);
    this.close             = this.close.bind(this);
    this.state             = {
      isOpen: false,
    };
  }

  componentDidMount() {
    const queryString = parseHashAsQueryString();
    this.setState({ isOpen: queryString.imageZoom === this.props.image });

    if (typeof window !== 'undefined')
      window.addEventListener('hashchange', this.handleHashChanged);
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined')
      window.removeEventListener('hashchange', this.handleHashChanged);
  }

  handleHashChanged() {
    const queryString = parseHashAsQueryString();
    const { isOpen }  = this.state;

    if (isOpen && !queryString.imageZoom)
      this.close();
  }

  open() {
    changeStatusBarColor('black');
    addImageZoomURL(this.props.image);
    this.setState({ isOpen: true });
  }

  close() {
    changeStatusBarColor('white');
    removeImageZoomURL(this.props.image);
    this.setState({ isOpen: false });
  }

  render() {
    const { children } = this.props;
    const { isOpen }   = this.state;
    const { image }    = this.props;

    return (
      <>
        {children({ open: this.open, close: this.close })}
        {isOpen && (
          <Lightbox
            mainSrc={image}
            onCloseRequest={this.close}
            reactModalStyle={{ overlay: { zIndex: 200000 } }}
          />
        )}
      </>
    );
  }
}


function changeStatusBarColor(color) {
  const { StatusBar } = window;

  if (StatusBar) {
    //  StatusBar.hide();
    StatusBar.overlaysWebView(false);
    StatusBar.backgroundColorByName(color);
    if (color === 'black')
      StatusBar.styleLightContent();
    else
      StatusBar.styleDefault();
    // StatusBar.show();
  }
}


function addImageZoomURL(url) {
  const separator = window.location.hash.includes('?') ? '&' : '?';
  const route     = window.location.hash.concat(`${separator}imageZoom=${url}`);

  window.history.pushState({}, window.title, route);
}


function removeImageZoomURL() {
  const queryString = parseHashAsQueryString();
  if (queryString.imageZoom) {
    const route = window.location.hash.replace(/[?&]imageZoom=[^&]*/, '');
    window.history.pushState({}, window.title, route);
  }
}


function parseHashAsQueryString() {
  const queryString = window.location.hash.split('?').slice(1).join();
  if (queryString)
    return QS.parse(queryString);
  else
    return {};
}
