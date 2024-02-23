import './dropdown.less';

import { CSSTransition }            from 'react-transition-group';
import { isPuppeteer }              from '../util/env';
import Button                       from '../components/button';
import classnames                   from 'classnames';
import FocusTrap                    from 'focus-trap-react';
import React                        from 'react';
import throttle                     from 'lodash/throttle';
import useBoolean                   from '../hooks/use_boolean';

import { ChevronDown as ArrowIcon } from 'react-feather';


const DropdownContext       = React.createContext();
const minimumDropdownHeight = 100;
const bottomMargin          = 20;
const focusTrapOptions      = { allowOutsideClick: true };
const transitionTimeout     = isPuppeteer() ? 0 : 150;
const transitionClassNames  = {
  enter:       'enter',
  enterActive: 'entered',
  enterDone:   'entered',
  exit:        'exit',
  exitActive:  'exited',
  exitDone:    'exited',
};


export default function Dropdown({
  label,
  children,
  className,
  disabled,
  overlay = false,
  bottom,
  padded,
  ...props
}) {
  const ref = React.useRef();

  const [ dropdownIsOpen, openDropdown, closeDropdown, toggleDropdown ] = useBoolean(false);

  const [ right, setRight ] = usePosition(props.right);

  const context = React.useMemo(
    () => ({ dropdownIsOpen, openDropdown, closeDropdown, toggleDropdown, label, disabled, right, setRight, bottom }),
    [ dropdownIsOpen, openDropdown, closeDropdown, toggleDropdown, label, disabled, right, setRight, bottom ],
  );

  const classNames = classnames('dropdown', className, { right, bottom, padded });

  return (
    <DropdownContext.Provider value={context}>
      <span className={classNames}>
        <CSSTransition in={dropdownIsOpen} timeout={transitionTimeout} classNames={transitionClassNames} nodeRef={ref}>
          <FocusTrap active={dropdownIsOpen} focusTrapOptions={focusTrapOptions}>
            <span className="dropdown-transition" ref={ref}>
              {overlay && <DropdownOverlay/>}
              <DropdownContainer>
                {children}
              </DropdownContainer>
            </span>
          </FocusTrap>
        </CSSTransition>
      </span>
    </DropdownContext.Provider>
  );
}


function noop() {}

function usePosition(initialPosition) {
  const [ position, setPosition ] = React.useState(initialPosition);

  if (initialPosition)
    return [ initialPosition, noop ];
  else
    return [ position, setPosition ];
}


function DropdownOverlay() {
  return (
    <span className="dropdown-overlay"/>
  );
}


function DropdownHeader({ className, children, ...buttonProps }) {
  const { label, disabled, toggleDropdown } = Dropdown.useContext();

  const classNames = classnames('dropdown-header', className);
  return (
    <Button
      className={classNames}
      disabled={disabled}
      onClick={toggleDropdown}
      aria-haspopup="listbox"
      label={label}
      {...buttonProps}
    >
      {children}
    </Button>
  );
}


function DropdownArrow() {
  return (
    <span className="dropdown-arrow"><ArrowIcon/></span>
  );
}


function DropdownContainer({ children }) {
  const { dropdownIsOpen, closeDropdown } = Dropdown.useContext();

  const ref = React.useRef();

  React.useEffect(function closeDropdownWhenClickedOutside() {
    function clickListener(event) {
      const clickedOutside = !ref.current?.contains(event.target);
      if (clickedOutside)
        closeDropdown();
    }

    if (dropdownIsOpen)
      document.body.addEventListener('click', clickListener);

    return () => {
      document.body.removeEventListener('click', clickListener);
    };
  }, [ closeDropdown, dropdownIsOpen ]);

  return (
    <span className="dropdown-container" ref={ref}>
      {children}
    </span>
  );
}


function DropdownContent({ children }) {
  const ref                                         = React.useRef();
  const { dropdownIsOpen, right, setRight, bottom } = useDropdownContext();
  const [ maxHeight, setMaxHeight ]                 = React.useState(null);

  const [ scrollMarker, showScrollMarker, hideScrollMarker ] = useBoolean(false);

  React.useEffect(function addPositionListener() {
    if (dropdownIsOpen && !bottom) {
      const scrollParent = ref.current.closest('.scrollable, .page-content, body');

      const checkPosition = throttle(function checkPosition() {
        const rect       = ref.current.getBoundingClientRect();
        const parentRect = scrollParent.getBoundingClientRect();

        const topOffset       = rect.top - parentRect.top;
        const availableHeight = parentRect.height - topOffset - bottomMargin;
        const newMaxHeight    = Math.max(availableHeight, minimumDropdownHeight);
        setMaxHeight(newMaxHeight);

        const overlap = rect.right > window.innerWidth;
        if (!right)
          setRight(overlap);
      }, transitionTimeout);

      ref.current.scrollTo(0, 0);
      checkPosition();
      window.addEventListener('resize', checkPosition);
      scrollParent.addEventListener('scroll', checkPosition);
      return () => {
        window.removeEventListener('resize', checkPosition);
        scrollParent.removeEventListener('scroll', checkPosition);
      };
    } else {
      const timer = setTimeout(() => {
        setMaxHeight(null);
        setRight(null);
      }, transitionTimeout);
      return () => clearTimeout(timer);
    }
  }, [ dropdownIsOpen, setMaxHeight, right, setRight, bottom ]);

  React.useEffect(function checkScrollMarker() {
    if (maxHeight) {
      const element      = ref.current;
      const isScrollable = element.scrollHeight > maxHeight;
      const isAtTop      = element.scrollTop === 0;
      const needsMarker  = isScrollable && isAtTop;
      if (needsMarker)
        showScrollMarker();
      else
        hideScrollMarker();

      element.addEventListener('scroll', hideScrollMarker);
      return () => {
        element.removeEventListener('scroll', hideScrollMarker);
      };
    } else
      return () => {};
  }, [ maxHeight, showScrollMarker, hideScrollMarker, children ]);

  const style = maxHeight ? { '--dropdown-max-height': `${maxHeight}px` } : null;

  return (
    <span className="dropdown-content" ref={ref} style={style}>
      {children}
      {scrollMarker && <span className="scroll-marker"/>}
    </span>
  );
}


function DropdownItem({ ...buttonProps }) {
  return (
    <DropdownButtonItem Tag="span" {...buttonProps}/>
  );
}


function DropdownButtonItem({ children, className, onClick = () => {}, ...buttonProps }) {
  const { closeDropdown } = Dropdown.useContext();
  const classNames        = classnames('dropdown-item', className);

  async function onClickItem(event) {
    event.persist();
    await onClick(event);
    if (!event.defaultPrevented)
      closeDropdown();
  }

  return (
    <Button className={classNames} onClick={onClickItem} role="option" {...buttonProps}>
      {children}
    </Button>
  );
}


// helper to auto-open a dropdwon. render inside your dropdown and it will open
// on mount
function DropdownOpen() {
  const { openDropdown } = Dropdown.useContext();

  React.useEffect(function() {
    openDropdown();
  }, [ openDropdown ]);

  return null;
}


function useDropdownContext() {
  return React.useContext(DropdownContext);
}


Dropdown.useContext = useDropdownContext;

Dropdown.Header     = DropdownHeader;
Dropdown.Content    = DropdownContent;
Dropdown.Item       = DropdownItem;
Dropdown.ButtonItem = DropdownButtonItem;
Dropdown.Arrow      = DropdownArrow;
Dropdown.Open       = DropdownOpen;
