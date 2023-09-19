---
latest: 0.1.11
---

# Changelog

### Version 0.1.11

- Added shift+left/right to move cards left and right in the flow.
- Added option+right to move a card down with a new empty parent.
- Added option+left to move a card left, replacing its parent, if empty.
- Added new root page to support multiple flows in the same document.
- Bug fixes for orphaned pages.

### Version 0.1.10

- Added shift+up/down arrow keys to reorder cards.

### Version 0.1.9

- Improved hotkeys for activating cards and editing descriptions
- Added tutorial flow as default document

### Version 0.1.8

- Save settings in localstorage
- Moved global styles to components

### Version 0.1.7

- Added aspect ratio toggle
- Better focus outlines on title and description

### Version 0.1.6

- Got markdown working in description editor
- Layout improvements

### Version 0.1.5

- Prevent keystrokes in description from bubbling up to page card
- Keep page outlines when focus is within page
- Fixed reset button so it doesn't require a reload
- Rearranged tools

### Version 0.1.4

- Add slider for active page scale
- Better transitions when activating a page

### Version 0.1.3

- Add slider for child page opacity

### Version 0.1.2

- Activate new page after creation
- Better focus outlines
- Removed some extraneous connection wiring

### Version 0.1.1

- Better transitions when activating a page
- Added 'Add sibling' placeholder below active page

### Version 0.1.0

- Keep siblings visible when activating a page
- Cleaned up store helpers

# Todo

- Multiple document support
- Some storage mechanism besides localstorage
- Drag and drop to rearrange cards
- Scale font size with page scale
- Better mobile UX
- Thicker wires for active connections

# Random ideas to try

- Top-align pages?
- Levels slider to hide children below a certain level?
- Don't tab to title unless the card is already active
- CSS to auto-show parents of active page (instead of clicking to make them active)
- Shift-click to activate multiple pages?
- Use transform: scale on whole flow instead of page height?
- Remove extra spikes on connection wiring?

<style>
	h1 {
		font-size: 20px;
		padding: 8px 12px;
		border-bottom: 1px solid #ddd;
		margin-bottom: 8px;
		margin-top: 24px;
	}

	h1:first-child {
		margin-top: 0px;
	}

 	h3 {
		padding: 0px 12px;
		margin: 0;
	}

	ul {
		margin: 0;
		margin-top: 0.5em;
		margin-bottom: 1em;
		padding: 0px 12px;
	}
	li {
		margin-left: 24px;
		margin-top: 2px;
	}
</style>
