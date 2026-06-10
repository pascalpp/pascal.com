import sanitizeHtml from 'sanitize-html';

export function unwrapArchivedComments(rawComments: string): string {
  return sanitizeArchivedComments(rawComments.replace(/<!--/g, '').replace(/-->/g, '').trim());
}

function sanitizeArchivedComments(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      'a',
      'b',
      'blockquote',
      'br',
      'code',
      'div',
      'em',
      'i',
      'p',
      'pre',
      'span',
      'strong',
      'ul',
      'ol',
      'li',
    ],
    allowedAttributes: {
      a: ['href', 'name', 'rel', 'target', 'title'],
      div: ['class'],
      span: ['class'],
    },
    allowedClasses: {
      div: ['commentbody', 'commentdivider'],
      span: ['commentauthorbox', 'commentdatebox', 'commentheader', 'commenttimebox'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    allowedSchemesAppliedToAttributes: ['href'],
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', { rel: 'nofollow noopener noreferrer' }, true),
    },
  });
}
