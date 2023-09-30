---
latest: 0.2.3
---

<script>
	import './changelog.less';
</script>

# Changelog

### Version 0.2.3

- Much improved behavior when navigation from card to card, keeping the current card in view.
- Allow drilling down deep flows even when opacity is low.

### Version 0.2.2

- Can now toggle the alignment of flows between top-aligned and center-aligned.
- Improved description editor and scrolling.

### Version 0.2.1

- Focus trap inside toolbars.
- Settings tweaks.

### Version 0.2.0

- Major refactor of card layout, sizing, and connections.
- Improved keyboard navigation, with natural tab order.
- Titles can be up to 3 lines long, with truncation.
- Better transitions when activating a card.

<details>
	<summary>Older versions</summary>

### Version 0.1.14

- Settings UI improvements.

### Version 0.1.13

- Renamed Opacity setting to Visibility.
- Hide connections and show connection summary when Visibility is 0.
- Improved UX when adding an empty page above the current page.

### Version 0.1.12

- Align cards to top, with better wire connections.
- Hide deep children when opacity is 0.
- Improved keyboard navigation and focus handling.
- Fixed some data issues.
- Improved tutorial flow.

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

</details>

# Todo

- [ ] Multiple document support
- [ ] Undo support
- [ ] Some storage mechanism besides localstorage
- [ ] Drag and drop to rearrange cards
- [x] Scale font size with page scale
- [ ] Better mobile UX
- [ ] Checklists in Markdown
- [ ] Escape key in title: revert changes?
- [ ] Escape key in description: if changes, show confirm dialog before reverting?

# Random ideas I might try

- [ ] CSS to auto-show parents of active page (instead of clicking to make them active)
- [ ] Shift-click to activate multiple pages?
- [ ] Use transform: scale on whole flow instead of page height?
- [x] Remove extra spikes on connection wiring?
- [ ] Thicker wires for active connections?
- [x] scroll mask at bottom of description
- [x] fix scrollbar inset on description field (should hug the edge of the card)
- [ ] Delete to remove a page; option-delete to remove a page and its children?
- [ ] Hotkey cheat sheet
- [x] Make alignment a setting: top-aligned or center-aligned
- [ ] more styles for markdown so can do prototype UIs with buttons, cards, etc.
- [ ] Svelte transitions?

<details>
	<summary>Feedback from a guy I know.</summary>

- [x] Triangular bullets communicate possible accordion element. I had to click to make sure.
- [x] Firefox bug: Child cards show as some attached to the parent card, while others float detached. (:has bug)
- [x] When I saw "When you're ready, delete this card and create a new flow below." I thought "I'm ready to start, but I don't know how to delete yet!" Only after I started carding through did I realize that that instruction was intended to be followed after all the others.
- [ ] Often when editing I want to undo so I hit Esc rather than Enter. I'm used to that behavior. But Esc and Enter both save.
- [ ] Related: It is pretty neat that Cmd-Z does undo even after you've left the text field and returned to it!
- [ ] But it is sad I can't undo a card/branch deletion.
- [-] I would expect to be able to Tab an unexpanded card, but that has no effect
- [x] "Are you sure you want to remove this page and all of its connections?" shouldn't that be "card"?
- [x] Backspace works, but not Delete (Firefox?)
- [x] Overall I think the keyboard shortcuts are pretty intuitive.

</details>
