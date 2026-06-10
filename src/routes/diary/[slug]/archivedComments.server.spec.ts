import { describe, expect, it } from 'vitest';
import { unwrapArchivedComments } from './archivedComments.server';

describe('unwrapArchivedComments', () => {
  it('unwraps archived comments and preserves expected legacy comment markup', () => {
    const input = `<span class="commentheader">1 Comment</span>
<!--
<div class="commentdivider">
<span class="commentauthorbox">Posted by <a href="https://example.com">Raba</a></span>
<span class="commentdatebox">Monday, April 5, 2004</span>
</div>
<div class="commentbody">A <strong>good</strong> old comment.</div>
-->`;

    const actual = unwrapArchivedComments(input);

    expect(actual).toContain('<span class="commentheader">1 Comment</span>');
    expect(actual).toContain('<div class="commentdivider">');
    expect(actual).toContain('<span class="commentauthorbox">Posted by <a href="https://example.com" rel="nofollow noopener noreferrer">Raba</a></span>');
    expect(actual).toContain('<div class="commentbody">A <strong>good</strong> old comment.</div>');
  });

  it('removes scripts, active content, event handlers, and unsafe URL schemes', () => {
    const input = `<!--
<script>alert("xss")</script>
<style>body { display: none; }</style>
<iframe srcdoc="<script>alert(1)</script>"></iframe>
<meta http-equiv="refresh" content="0;url=https://example.com">
<base href="https://evil.example/">
<div class="commentbody" onclick="alert(1)">Hello</div>
<a href="javascript:alert(1)">bad</a>
<a href=" &#x6a;avascript:alert(1)">encoded</a>
<a href="//example.com">protocol relative</a>
<a href="mailto:friend@example.com">mail</a>
-->`;

    const actual = unwrapArchivedComments(input);

    expect(actual).not.toContain('<script');
    expect(actual).not.toContain('<style');
    expect(actual).not.toContain('<iframe');
    expect(actual).not.toContain('<meta');
    expect(actual).not.toContain('<base');
    expect(actual).not.toContain('onclick');
    expect(actual).not.toMatch(/javascript:/i);
    expect(actual).not.toContain('//example.com');
    expect(actual).toContain('<div class="commentbody">Hello</div>');
    expect(actual).toContain('<a rel="nofollow noopener noreferrer">bad</a>');
    expect(actual).toContain('<a rel="nofollow noopener noreferrer">encoded</a>');
    expect(actual).toContain('<a rel="nofollow noopener noreferrer">protocol relative</a>');
    expect(actual).toContain('<a href="mailto:friend@example.com" rel="nofollow noopener noreferrer">mail</a>');
  });
});
