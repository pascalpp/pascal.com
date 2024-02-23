import './button.less';

import * as ENV             from '../util/env';
import { isOptionSelected } from '../hooks/use_selected';
import classnames           from 'classnames';
import Column               from '../components/column';
import React                from 'react';
import Row                  from '../components/row';
import useBoolean           from '../hooks/use_boolean';


// TODO: consider using aria-disabled instead of disabled. why
// disabling buttons while form submits is not the best approach.
// https://css-tricks.com/making-disabled-buttons-more-inclusive/

const Button = React.forwardRef(function Button({
  children,
  href,
  Tag      = getTag(href),        // auto-set Tag to 'a' for href, else 'button'
  external = getExternal(href),   // auto-set external for https hrefs
  target   = getTarget(external), // auto-set target if href is external
  rel      = getRel(external),    // auto-set rel if href is external
  onClick,
  label,
  role,
  value,
  className,
  disabled,
  loading,
  primary,
  secondary,
  danger,
  success,
  outline,
  active,
  link,
  tiny,
  small,
  medium,
  large,
  wide,
  nowrap,
  icon, // use this for icon-only buttons. label will not be visible
  iconTop,
  iconLeft,
  iconRight,
  hasIcon = (icon || iconTop || iconLeft || iconRight),
  renderNestedContent = shouldRenderNestedContent({ Tag, link, hasIcon }),
  ...buttonProps
}, externalRef) {
  const [ clickLoading, startLoading, stopLoading ] = useBoolean(false);

  const internalRef = React.useRef(null);
  const buttonRef   = externalRef || internalRef;

  const classNames = classnames('button', className, {
    'roundrect': primary || secondary || outline,
    link,
    'has-icon':  hasIcon,
    'top-icon':  !!iconTop,
    'only-icon': !!icon,
    external, // F7 requires this classname to opt-out of routing
    primary,
    secondary,
    danger,
    success,
    outline,
    active,
    'loading':   loading || clickLoading,
    tiny,
    small,
    medium,
    large,
    wide,
    nowrap,
  });

  function onClickButton(event) {
    const result = onClick && onClick(event);

    // If the result is a promise, show a loading spinner until it resolves
    if (isPromise(result)) {
      startLoading();
      result.finally(() => {
        if (buttonRef.current)
          stopLoading();
      });
    }

    // In Cordova, if the link is external, Framework7 calls InAppBrowser and
    // that triggers a routeChange in F7's router. Because the external route
    // doesn't match any of our routes this cause the `NotFoundPage` to show. We
    // set this flag to `true` and then we read it in the `routesBeforeEnter`
    // middleware. More info about the issue in:
    // https://github.com/broadly/broadly/issues/3137
    if (external && ENV.isCordova() && !event.isDefaultPrevented()) {
      window.isOpeningExternalLink = true;
      setTimeout(() => {
        window.isOpeningExternalLink = false;
      });
    }
  }

  return (
    <Tag
      className={classNames}
      href={href}
      onClick={onClickButton}
      aria-label={label}
      role={role}
      disabled={disabled || loading || clickLoading}
      target={target}
      rel={rel}
      value={value}
      ref={buttonRef}
      {...buttonProps}
    >
      {renderNestedContent && <ButtonContent {...{ children, label, icon, iconTop, iconLeft, iconRight }}/>}
      {!renderNestedContent && (children || label)}
    </Tag>
  );
});

function ButtonContent({ children, label, icon, iconTop, iconLeft, iconRight }) {
  return (
    <span className="button-content">
      {icon && <span className="icon">{icon}</span>}
      {iconTop && <span className="icon icon-top">{iconTop}</span>}
      {iconLeft && <span className="icon icon-left">{iconLeft}</span>}
      {!icon && <span className="button-label">{children || label}</span>}
      {iconRight && <span className="icon icon-right">{iconRight}</span>}
    </span>
  );
}

export default Button;


function isPromise(result) {
  return typeof result?.finally === 'function';
}


function getTag(href) {
  return href ? 'a' : 'button';
}

const httpRegex = /^((http|https):\/\/)/;

function getExternal(href) {
  return href && httpRegex.test(href);
}

function getTarget(external) {
  if (external) {
    if (ENV.isCordova())
      return '_system';
    else
      return '_blank';
  } else
    return null;
}


function getRel(external) {
  if (external)
    return 'noopener noreferrer';
  else
    return null;
}

// this allows us to apply roundrect styles to elements that are particular
// about their children, such as select tags, which only want options inside
// them. So we don't render button-content, button-label, etc.
function shouldRenderNestedContent({ Tag, link, hasIcon }) {
  // don't render links as nested content unless they have an icon
  if (link && !hasIcon)
    return false;
  else
    return Tag !== 'select';
}


function ButtonStack({ className, children }) {
  const classNames = classnames('button-stack', className);

  return (
    <Column className={classNames}>
      {children}
    </Column>
  );
}
Button.Stack = ButtonStack;


function ButtonRow({ children, className, mobileStack, narrowStack, ...props }) {
  const classNames = classnames('button-row', className, {
    'mobile-stack': mobileStack,
    'narrow-stack': narrowStack,
  });

  return (
    <Row className={classNames} {...props}>
      {children}
    </Row>
  );
}
Button.Row = ButtonRow;


function ButtonBar({ children, className, options, ...props }) {
  const classNames = classnames('button-bar', className);

  return (
    <div className={classNames}>
      {children}
      {options?.map(option => <ButtonBarButton key={option.value} option={option} {...props}/>)}
    </div>
  );
}
Button.Bar = ButtonBar;


function ButtonBarButton({ option, selected, onSelect, setSelected, ...props }) {
  const active = isOptionSelected(option, selected);

  function onClick(event) {
    if (active)
      setSelected(null);
    else
      onSelect(event);
  }

  return (
    <Button secondary {...option} {...{ active, onClick }} {...props}/>
  );
}
