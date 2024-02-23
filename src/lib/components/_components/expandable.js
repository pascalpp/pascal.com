import './expandable.less';

import classnames from 'classnames';
import React      from 'react';
import useBoolean from '../hooks/use_boolean';


// <Expandable/>
// usage:
// return (
//   <div className="my-selector">
//     <Expandable>
//       {someText}
//     </Expandable>
//   </div>
// );

// You must also define the max number of lines you want to show in the
// collapsed state in your local stylesheet. You can define this value using the
// formula lineHeight x numberOfLines. You can use less variables and the less
// compiler will do the math for you, so you can easily change the number of
// lines later. For example:

// .my-selector {
//   @line-height: 21px;
//   @max-lines: 4;
//   line-height: @line-height;
//   .expandable {
//     &:not(.expanded) .expandable-container {
//       max-height: @line-height * @max-lines;
//     }
//   }
// }

// You can also apply local styles to the .expand and .collapse nodes which
// are rendered as needed.

const ExpandableContext = React.createContext({});

export default function Expandable({ children, className, showMore = 'Show more', showLess = 'Show less' }) {
  const container = React.useRef();
  const content   = React.useRef();

  const [ expanded, expand, collapse ]          = useBoolean(false);
  const [ needsExpandable, setNeedsExpandable ] = React.useState(false);
  const [ contentHeight, setContentHeight ]     = React.useState(0);

  const classNames = classnames('expandable', className, {
    expanded,
    'needs-expandable': needsExpandable,
  });

  const context = React.useMemo(
    () => ({ needsExpandable, expanded, expand, collapse }),
    [ needsExpandable, expanded, expand, collapse ],
  );

  React.useEffect(function measureContent() {
    const containerRect = container.current.getBoundingClientRect();
    const contentRect   = content.current.getBoundingClientRect();
    setNeedsExpandable(contentRect.height > containerRect.height);
    setContentHeight(contentRect.height);
  }, []);

  const style = getContainerStyle({ contentHeight, needsExpandable, expanded });

  function clickToExpandIfNeeded(event) {
    if (needsExpandable && !expanded) {
      event.preventDefault();
      event.stopPropagation();
      expand();
    }
  }

  return (
    <ExpandableContext.Provider value={context}>
      <div className={classNames}>
        <div className="expandable-container" ref={container} style={style} onClick={clickToExpandIfNeeded}>
          <div className="expandable-content" ref={content}>
            {children}
          </div>
        </div>
        <ShowMoreButton showMore={showMore}/>
        <ShowLessButton showLess={showLess}/>
      </div>
    </ExpandableContext.Provider>
  );
}

Expandable.Context    = ExpandableContext;
Expandable.useContext = useExpandableContext;


function ShowMoreButton({ showMore }) {
  const { needsExpandable, expanded, expand } = Expandable.useContext();

  function onClickShowMore(event) {
    event.preventDefault();
    event.stopPropagation();
    expand();
  }

  if (needsExpandable && !expanded && showMore)
    return <div className="expand" onClick={onClickShowMore}>{showMore}</div>;
  else
    return null;
}


function ShowLessButton({ showLess }) {
  const { needsExpandable, expanded, collapse } = Expandable.useContext();

  function onClickShowLess(event) {
    event.preventDefault();
    event.stopPropagation();
    collapse();
  }

  if (needsExpandable && expanded && showLess)
    return <div className="collapse" onClick={onClickShowLess}>{showLess}</div>;
  else
    return null;
}


function getContainerStyle({ contentHeight, needsExpandable, expanded }) {
  if (needsExpandable && expanded)
    return { maxHeight: `${contentHeight}px` };
  else
    return null;
}


function useExpandableContext() {
  return React.useContext(ExpandableContext);
}
