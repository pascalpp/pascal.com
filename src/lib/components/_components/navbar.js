import './navbar.less';

import Button                       from './button';
import childrenOfType               from '../util/children_of_type';
import MenuButton                   from '../menu/menu_button';
import React                        from 'react';
import Row                          from './row';
import useNavigation                from '../hooks/use_navigation';

import { ChevronLeft as BackArrow } from 'react-feather';


// Navbar
//
// Props:
// - children: (optional) the content of the navbar. Only a few types of content
//   are allowed directly inside the navbar. All are exported from this module:
//   Navbar.Left, Navbar.Right, etc. Typically custom navbar content should be
//   rendered inside Navbar.Left, Navbar.Right, or in the title prop.
// - title: (optional) the title in the center of the navbar
// - showBackButton (boolean, optional, defaults to true): By default, a back
//   button is shown on the left side of the navbar, unless:
//   - showBackButton is set to false
//   - children already contains a back button or cancel button (as determined
//     by the shouldAutoShowBackButton helper)
//
// Child components:
// - Navbar.Left: content to render on the left side of the navbar
// - Navbar.Right: content to render on the right side of the navbar
// - Navbar.BackButton: < Back button, rendered on the left side. By default it
//   navigates back to the previous page in the router history. Can provide an
//   href or an onClick handler to override the default behavior.
// - Navbar.CancelButton: basically a back button with no back arrow and a
//   different label
// - Navbar.SaveButton: a save button for use with full-page forms. Accepts
//   a formID which is used to associate the button with a specific form so that
//   clicking the button submits that form.

// Example usage:
//
// <Navbar title="Inbox"/>
//
// <Navbar title="Inbox" showBackButton={false}/>
//
// <Navbar title="Inbox" showBackButton={false}>
//   <Navbar.Right>
//     <Button link label="Add" href="/contacts/add"/>
//   </Navbar.Right>
// </Navbar>


export default function Navbar({ children, title, showMenuButton = false, showBackButton = shouldAutoShowBackButton(children) }) {
  return (
    <div className="navbar">
      <Row className="navbar-left">
        {showMenuButton && <MenuButton/>}
        {showBackButton && <Navbar.BackButton/>}
        {childrenOfType(children, Navbar.BackButton)}
        {childrenOfType(children, Navbar.CancelButton)}
        {childrenOfType(children, Navbar.Left)}
      </Row>
      <div className="navbar-title">{title}</div>
      <Row className="navbar-right">
        {childrenOfType(children, Navbar.Right)}
        {childrenOfType(children, Navbar.SaveButton)}
      </Row>
    </div>
  );
}


// helpers for pages to indicate where children should be rendered
Navbar.Left = function NavbarLeft({ children }) {
  return children || null;
};

Navbar.Right = function NavbarRight({ children }) {
  return children || null;
};


Navbar.Button = function NavbarButton({ iconLeft, label, className, onClick, formID }) {
  return (
    <Button link form={formID} {...{ iconLeft, label, className, onClick }}/>
  );
};


// If href and onClick are not provided, clicking the BackButton will go to the
// previous page in the router history. If there is no router history,
// navigateBackTo will construct a URL by lopping off the last param in the
// current route URL. Pages can override this behavior by providing an explicit
// BackButton with an href prop, or an onClick prop.
Navbar.BackButton = function BackButton({ iconLeft = <BackArrow/>, label = 'Back', className = 'back-button', href, onClick }) {
  const { navigateBackTo } = useNavigation();

  function defaultOnClick() {
    navigateBackTo(href);
  }

  return (
    <Navbar.Button {...{ iconLeft, label, className }} onClick={onClick || defaultOnClick}/>
  );
};


Navbar.CancelButton = function CancelButton({ label = 'Cancel', onClick }) {
  const iconLeft  = null; // no back arrow on cancel buttons
  const className = 'cancel-button';
  return (
    <Navbar.BackButton {...{ iconLeft, label, className, onClick }}/>
  );
};


Navbar.SaveButton = function SaveButton({ label = 'Save', formID }) {
  const className = 'save-button';
  return (
    <Navbar.Button {...{ label, className, formID }}/>
  );
};


function shouldAutoShowBackButton(children) {
  return countBackButtons(children) === 0;
}


// this helper recurses through children to determine if the page is trying to
// render its own back button or cancel button. if so, no need to auto-render a
// back button.
function countBackButtons(children) {
  if (!children)
    return 0;

  const backButtons   = React.Children.count(childrenOfType(children, Navbar.BackButton));
  const cancelButtons = React.Children.count(childrenOfType(children, Navbar.CancelButton));
  const childButtons  = backButtons + cancelButtons;

  const grandChildButtons = React.Children.map(children, child => {
    return countBackButtons(child?.props?.children);
  }).reduce((a, b) => a + b, 0);

  return childButtons + grandChildButtons;
}
