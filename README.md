# 💩 Hold Your Poop
> A stupid game where you try not to poop your pants!

## Authorship
- Author: Yuto Nakashima
- GitHub: https://github.com/yuto-nkc0621
- Date: October 2026
- Version: 1.0

## User Story
- **As a** bored college student,
- **I want** to play a stupid game,
- **So that** I can have fun.

## Narrative
Hold Your Poop is a simple web game where players try
not to poop their pants.

Click HOLD to increase your score, but be careful!
Every click comes with a chance of pooping your pants.

Reach 90% to win!

## About the App

### Game Planning
- Game Ideas: https://github.com/yuto-nkc0621/hold-your-poop-game/issues/1
- Wireframe: https://github.com/yuto-nkc0621/hold-your-poop-game/wiki/Game-Wireframe

### Directory Structure

    hold-your-poop-game/
    ├── index.html
    ├── README.md
    ├── pages/
    │   └── full.html
    └── assets/
        ├── css/
        │   └── style.css
        └── js/
            ├── game.js
            └── full.js

### Technologies and Tools
- HTML5
- CSS3
- JavaScript
- jQuery
- jQuery UI
- Bootstrap 5
- Bootstrap Icons
- sessionStorage
- VS Code
- GitHub
- GitHub Pages

### Code Example

The HOLD button increases the poop level and score.

```javascript
$('#hold').on('click', () => {
    if (playing === true) {
        poopLevel += 10;
        score += 10;

        $('#poopLevel').text(poopLevel);
        $('#score').text(score);
    }
});



### Sprint 99

Future improvements for Hold Your Poop.

[View Sprint 99](https://github.com/yuto-nkc0621/hold-your-poop-game/milestones)


### Lighthouse Results (Concept Version)

- Performance: 100
- Accessibility: 63
- Best Practices: 100
- SEO: 90
