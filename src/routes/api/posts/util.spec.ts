/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, it } from 'vitest';
import { getFrontMatterLines, parseFrontMatterLines, readPost } from './util';

describe('readPost', () => {
  it(`should return content of post at slug`, async () => {
    const expected = `---
title: Home again
date: 2004-04-20T03:51:00.000Z
original: 000169.php
tags: [nyc, running]
---

Now I’m home again, listening to the Kinks.

I feel kinda sad but I don’t really wanna go into it.

I’ll run tomorrow and it will hurt different and that will feel good. Then I’ll go to the Excellent Dumpling House and drown my sorrows in a big ass bowl of cold peanut noodles.

Ah, I feel better already.
`;

    const actual = await readPost('2004-04-20-home-again');
    expect(actual).toBe(expected);
  });
});

describe('getFrontMatterLines', () => {
  it('should return expected front matter lines from raw text', () => {
    const input = `
---
title: Lorem ipsum dolor sit amet consectetur adipisicing elit
date: 2004-04-20T03:51:00.000Z
tags: [nyc, running]
---

Now I’m home again, listening to the Kinks.

---

Ah, I feel better already.
`;

    const expected = [
      'title: Lorem ipsum dolor sit amet consectetur adipisicing elit',
      'date: 2004-04-20T03:51:00.000Z',
      'tags: [nyc, running]',
    ];

    const actual = getFrontMatterLines(input);
    expect(actual).toStrictEqual(expected);
  });
});

describe('parseFrontMatterLines', () => {
  it('should return expected metadata from front matter lines', () => {
    const input = [
      'title: Lorem ipsum dolor sit amet consectetur adipisicing elit',
      'date: 2004-04-20T03:51:00.000Z',
      'tags: [nyc, running]',
    ];

    const expected = {
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
      date: new Date('2004-04-20T03:51:00.000Z'),
      status: undefined,
      tags: ['nyc', 'running'],
      summary: undefined,
      updated: undefined,
    };

    const actual = parseFrontMatterLines(input);

    expect(actual.title).toBe(expected.title);
    expect(actual.date.toISOString()).toBe(expected.date.toISOString());
    expect(actual.status).toBe(expected.status);
    expect(actual.tags).toStrictEqual(expected.tags);
    expect(actual.summary).toBe(expected.summary);
    expect(actual.updated).toBe(expected.updated);
  });
});
