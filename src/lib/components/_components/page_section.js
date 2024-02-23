import './page_section.less';

import classnames from 'classnames';
import React      from 'react';


// PageSection. Renders a title and children, if children is not null. Provides
// some padding on left and right, but not concerned with vertical spacing. put
// a bunch of PageSections inside a Column to control spacing.

//   T I T L E
// +--------------------------------+
// |                                |
// |  Content                       |
// |                                |
// +--------------------------------+

// PageSection does not draw a box around the content -- only to show that
// title is inset)


const PageSection = React.forwardRef(function PageSection({ title, label = title, indentTitle = true, className, children, style }, ref) {
  const classNames = classnames('page-section', className, { 'indent-title': indentTitle });

  if (children) {
    return (
      <div className={classNames} style={style} ref={ref} aria-label={label}>
        {title && <h2 className="page-section-title">{title}</h2>}
        {children}
      </div>
    );
  } else
    return null;
});

export default PageSection;
