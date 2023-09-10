---
title: Some thoughts on React
date: 2023-09-09T02:17:38.290Z
tags: [javascript, react, svelte, angular]
---

_Feel free to ignore this post. It's just for me, probably._

React is currently the goliath of javascript frameworks, but of course it's not perfect for every use case. Many other frameworks attempt to solve the same problems in different ways, or to solve different problems entirely. My work experience touches on React, SvelteKit, and Angular, so I'll be comparing those three. This is not a comprehensive comparison, just some thoughts on some of the things I like about React, the things I miss when I'm working in Svelte or Angular.

Let's take a look at a theoretical React component that renders a page of contacts. Setting aside the question of how the props are provided to the component, let's focus on the complexity of the rendering logic in the component, and some React patterns we can use to simplify it.

<!-- prettier-ignore -->
```jsx
// contacts_page.jsx
import styles from './contacts_page.less';

import Nav from '../components/nav';
import Subnav from '../components/subnav';
import FacebookLogo from './facebook_logo.svg';
import GoogleLogo from './google_logo.svg';
import QuickbooksLogo from './quickbooks_logo.svg';

export default function ContactsPage({ user, contacts, editContact, deleteContact }) {
	return (
		<div className={styles.scope}>
			<header>
				<Nav />
				<h1>Contacts Page</h1>
				{user && (
					<div className="user-info">
						<div className="user-name">{user.name}</div>
						{user.phone && <div className="user-phone">{user.phone}</div>}
						{user.email && <div className="user-email">{user.email}</div>}
					</div>
				)}
			</header>
			<main>
				{contacts?.length > 0 && (
					<ul className="contacts-list">
						{contacts.map((contact) => (
							<li className="contact card" key={contact.id}>
								{contact.photo && (
									<div className="contact-photo">
										<img src={contact.photo} alt={contact.name} />
									</div>
								)}
								{contact.phone && <div className="contact-phone">{contact.phone}</div>}
								{contact.email && <div className="contact-email">{contact.email}</div>}
								{contact.source && (
									<div className="contact-source">
										<span className="contact-source-label">Contact source:</span>
										<span className="contact-source-logo">
											{contact.source === 'facebook' && <FacebookLogo />}
											{contact.source === 'google' && <GoogleLogo />}
											{contact.source === 'quickbooks' && <QuickbooksLogo />}
										</span>
									</div>
								)}
								<div className="actions">
									<button onClick={() => editContact(contact.id)}>Edit</button>
									<button onClick={() => deleteContact(contact.id)}>Delete</button>
								</div>
							</li>
						))}
					</ul>
				)}
				{contacts?.length === 0 && (
          <div className="no-contacts">You have no contacts.</div>
        )}
			</main>
			<footer>
				<Subnav />
			</footer>
		</div>
	);
}
```

Kind of a lot going on there, and this is a pretty basic page. Here's what it's rendering:

- a header with a nav bar and some user info
- a main section with a list of contacts
- if there are contacts, it renders a card for each contact
- each contact card has a photo, contact info, and some actions
- if there are no contacts, it renders a 'no contacts' message
- and finally, a footer with some subnavigation

## How can we simplify this?

These are the steps I use for simplifying a React component like this one:

- Break the component into child components
- Move those child components further down _in the same file_
- Call those child components from the main component at the top of the file

This pattern relies on two things:

- React is just functions calling functions calling functions
- Javascript hoists functions so you can call them before they're defined

Let's try it out.

## Breaking out the ContactCard component

```jsx
function ContactCard({ contact, editContact, deleteContact }) {
	return (
		<li className="contact card">
			{contact.photo && (
				<div className="contact-photo">
					<img src={contact.photo} alt={contact.name} />
				</div>
			)}
			{contact.phone && <div className="contact-phone">{contact.phone}</div>}
			{contact.email && <div className="contact-email">{contact.email}</div>}
			{contact.source && (
				<div className="contact-source">
					<span className="contact-source-label">Contact source:</span>
					<span className="contact-source-logo">
						{contact.source === 'facebook' && <FacebookLogo />}
						{contact.source === 'google' && <GoogleLogo />}
						{contact.source === 'quickbooks' && <QuickbooksLogo />}
					</span>
				</div>
			)}
			<div className="actions">
				<button onClick={() => editContact(contact.id)}>Edit</button>
				<button onClick={() => deleteContact(contact.id)}>Delete</button>
			</div>
		</li>
	);
}
```

All we've done is move the contents of the map iterator from the main component into a new function called `ContactCard`. But having done so, we can now simplify that map iteration:

<!-- prettier-ignore -->
```jsx
{contacts.map((contact) => (
  <ContactCard key={contact.id} {...{ contact, editContact, deleteContact }} />
))}
```

_Note that we need to keep the key prop in the map iterator. [Learn more about rendering lists with keys in React.](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key)_

## Let's break it down some more

How atomic you want to get is subjective and will vary from one page or component to the next. For this example, let's break out:

- the user info
- the contacts list
- the no contacts message

<!-- prettier-ignore -->
```jsx
export default function ContactsPage({ user, contacts, editContact, deleteContact }) {
  const hasContacts = contacts?.length > 0;

	return (
		<div className={styles.scope}>
			<header>
				<Nav />
				<h1>Contacts Page</h1>
				{user && (
          <UserInfo {...{ user }}/>
        )}
			</header>

      <main>
        {hasContacts && (
          <ContactsList {...{ contacts, editContact, deleteContact }} />
        )}
        {!hasContacts && (
          <EmptyContacts />
        )}
			</main>

      <footer>
				<Subnav />
			</footer>
		</div>
	);
}

function UserInfo({ user }) {...}

function ContactsList({ contacts, editContact, deleteContact }) {...}

function ContactCard({ contact, editContact, deleteContact }) {...}

function EmptyContacts() {...}
```

Now it's much easier to comprehend what this page is doing at a glance, with the gory implementation details tucked away but still readily accessible without having to jump around to other files in the codebase. Before, the main component had several responsibilities, but now it only has one primary responsibilty: render its children and pass along the props they need to handle the responsibilities that have been delegated to them. Each child component is clearly-named according to its responsibility. And this delegation can be carried further: if a child has too many responsibilities, it can delegate some of those responsibilities to children of its own.

This arrangement allows you (and other devs on your team) to open the component and immediately get a high-level overview of what it does, and then drill down into the details when needed, by using the IDE (e.g. VSCode) to jump down to the definitions of those child components.

By keeping a child component in the same file with its parent, we're expressing the relationship between the two. Each child component is not something meant to be reused by other parts of the app; it's there to take on one of the responsibilities of its parent. (If only my children were like this. 😛) We're also expressing that any stylistic concerns are managed by the parent, so the child component can use classnames defined in the parent component's stylesheet, leveraging the parent's classname as a scoping mechanism (e.g. using [CSS Modules](https://github.com/css-modules/css-modules)).

## A note about Tailwind, Bootstrap, and other utility classname libraries

One of the key things contributing to the readability of the above example is that it is not littered with utility classnames. For example, suppose we want to render our contact cards in some sort of grid layout. We could use Tailwind's grid utility classnames to do that:

```jsx
<ul className="grid grid-cols-1 gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3 max-h-[33rem] overflow-hidden">
```

Now imagine we had those utility classnames throughout the markup. If we're trying to make content changes, we have a lot of visual noise to filter out when scanning the code. More than likely, we'll end up accidentally switching contexts and jumping to style concerns and forget what we were trying to do in the first place.

If we just use a semantic classname, we can keep the style concerns in the stylesheet, and the markup is much easier to read:

```jsx
<ul className="contacts-list">
```

When we want to make changes to the styling of that element, we can find that classname in the companion stylesheet and switch contexts deliberately. When we're focused on logic or content changes, style concerns are out of sight and out of mind.

_Caveat: I've never actually used Tailwind, so I might be wrong about how it's used in practice. I'm just inferring from the various examples I have seen, and they didn't appeal to me because of this mixing of concerns and context-switching. It seems to me that Tailwind is mostly just a terse API on top of CSS; rather than learn what all these cryptic classnames mean, I would recommend spending that time just learning CSS. 🤷‍♂️_

## What about SvelteKit?

First of all, I really love SvelteKit. This whole blog (and most of the website behind it) is built with SvelteKit (with much thanks to [this post by Josh Collinsworth](https://joshcollinsworth.com/blog/build-static-sveltekit-markdown-blog)). At my day job, I have also built an entire invoicing application with SvelteKit, complete with Stripe integration. SvelteKit provides a great dev UX out of the box, and enables you to deliver a great end-user experience with built-in features like server-side rendering, code-splitting, prefetching, and minimal JS bundle size (especially compared to React and many other frameworks).

One of the interesting things about Svelte components is that they mimic the traditional model of an html document, with javascript logic and styles encapsulated in `script` and `style` tags delivered alongside the rest of the html markup, all in the same file. Even better, the styles in the component are automatically scoped to the component, so we can use whatever classnames we want without worrying about style collisions with other components.

Here's the above example rewritten in Svelte:

<!-- prettier-ignore -->
```svelte
<script>
  // ContactsPage.svelte
	import Nav from '$lib/components/nav.svelte';
	import Subnav from '$lib/components/subnav.svelte';
	import FacebookLogo from './facebook_logo.svelte';
	import GoogleLogo from './google_logo.svelte';
	import QuickbooksLogo from './quickbooks_logo.svelte';

	export let user, contacts, editContact, deleteContact;
</script>

<div class="page contacts-page">
	<header>
		<Nav />
		<h1>Contacts Page</h1>
		{#if user}
			<div class="user-info">
				<div class="user-name">{user.name}</div>
				{#if user.phone}
					<div class="user-phone">{user.phone}</div>
				{/if}
				{#if user.email}
					<div class="user-email">{user.email}</div>
				{/if}
			</div>
		{/if}
	</header>
	<main>
		{#if contacts?.length > 0}
			<ul class="contacts-list">
				{#each contacts as contact}
					<li class="contact card" key={contact.id}>
						{#if contact.photo}
							<div class="contact-photo">
								<img src={contact.photo} alt={contact.name} />
							</div>
						{/if}
						{#if contact.phone}
							<div class="contact-phone">{contact.phone}</div>
						{/if}
						{#if contact.email}
							<div class="contact-email">{contact.email}</div>
						{/if}
						{#if contact.source}
							<div class="contact-source">
								<span class="contact-source-label">Contact source:</span>
								<span class="contact-source-logo">
									{#if contact.source === 'facebook'}
										<FacebookLogo />
									{/if}
									{#if contact.source === 'google'}
										<GoogleLogo />
									{/if}
									{#if contact.source === 'quickbooks'}
										<QuickbooksLogo />
									{/if}
								</span>
							</div>
						{/if}
						<div class="actions">
							<button on:click={() => editContact(contact.id)}>Edit</button>
							<button on:click={() => deleteContact(contact.id)}>Delete</button>
						</div>
					</li>
				{/each}
			</ul>
		{/else}
			<div class="no-contacts">You have no contacts.</div>
		{/if}
	</main>
	<footer>
		<Subnav />
	</footer>
</div>

<style lang="less">
	.contact-page {
		// styles here
	}
</style>
```

This markup is just as complex as our original React example. We can break it down in a similar fashion, moving parts of the markup to child components, _but Svelte doesn't allow us to keep those child components in the same file with their parent component._ So our only option is to break them out into separate files and colocate them next to this file, but the parent-child relationship is no longer expressed as clearly. Since I'm often working on several pages at once, I like that the React model only requires me to open one tab per page (or maybe two if I'm also working on the page's styles), whereas a Svelte component broken down in a similar fasion requires me to manage muliple files per page.

Furthermore, Svelte's automatic style-scoping now becomes something of a hindrance, as the parent can no longer easily manage the styles of its children, unless you wrap all child classnames in Svelte's `:global` marker, or opt out of Svelte's style-scoping entirely, by importing an external stylesheet.

Given all that, I tend not to bother breaking down Svelte components unless there are very compelling reasons to do so, and then I'll usually decouple those smaller components entirely, moving them to `$lib/components` instead of colocating them with their former parent page component. So as a rule my page-level Svelte components tend to feel a little messier than their React counterparts.

## What about Angular?

I've only worked with Angular for a few months, but so far I'm not a fan. It suffers from the same one-component-per-file bias that Svelte has. It's actually worse than that. Angular has a three-files-per-component bias, as a typical Angular component is comprised of three files: `widget.component.ts`, `widget.component.html`, and `widget.component.css`. So that's three tabs in your editor for working on one component, and the Angular convention of including `component` in each filename means those tabs are inordinately wide.

There's also an additional layer of abstraction between a component and the tag you use to render it. Consider this React example:

```jsx
// some_page.jsx
export default function SomePage() {
	return (
		<div>
			<h1>Some Page</h1>
			<Widget />
		</div>
	);
}

function Widget() {
	return <div>Widget</div>;
}
```

Put simply, to use a component in React, you define (or import) a function and render it as a tag. Pretty direct.

Here's the same thing in Angular:

```ts
// widget.component.ts
import { Component } from '@angular/core';

@Component({
	selector: 'widget',
	standalone: true,
	templateUrl: './widget.component.html',
	styleUrls: ['./widget.component.css'],
})
export class WidgetComponent {
	// component class logic here, omitted for this example
}
```

```html
<!-- widget.component.html -->
<div>Widget</div>
```

```ts
// some-page.component.ts
import { Component } from '@angular/core';
import { WidgetComponent } from './widget.component';

@Component({
	selector: 'some-page',
	standalone: true,
	imports: [WidgetComponent],
	templateUrl: './some-page.component.html',
	styleUrls: ['./some-page.component.css'],
})
export class SomePageComponent {}
```

```html
<!-- some-page.component.html -->
<h1>Some Page</h1>
<widget></widget>
```

So to use a component in Angular:

- define and export a class
- decorate it with a `selector` and some other metadata
- create a companion template and stylesheet
- import that class into some consumer component
- add it to that component's `imports` array (yes, import and then import again)
- render that component's selector in the consumer component's template

That's a lot of layers of abstraction compared to the React model. (And this is using Angular's somewhat newer "standalone" model; the older module-based approach is even more verbose, abstract, and indirect.)

So the parent-and-children pattern I often use in a single React module can't be easily replicated in Angular. (You can remove one layer of abstraction by defining the Angular component's template inline in the `@Component` decorator, but I'm not a fan of that approach, as it sort of inverts the relationship between the component and its template, since the template has to be defined in the decorator above the class logic.)

## In conclusion...

Javascript is a land of contrasts. [Thank you.](https://www.youtube.com/watch?v=hqz2fl9aJSM)
