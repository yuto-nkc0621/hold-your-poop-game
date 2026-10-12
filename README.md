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
Hold Your Poop is a simple web game where players try not to poop their pants.

Click HOLD to increase your score, but be careful! Every click comes with a chance of pooping your pants.

Reach 90% to win!

## About the App

### Game Planning
- [Game Ideas](https://github.com/yuto-nkc0621/hold-your-poop-game/issues/1)
- [Wireframe](https://github.com/yuto-nkc0621/hold-your-poop-game/wiki/Game-Wireframe)

### Directory Structure

```text
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
```

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
<<<<<<< HEAD



### Sprint 99

Future improvements for Hold Your Poop.

[View Sprint 99](https://github.com/yuto-nkc0621/hold-your-poop-game/milestones)


### Lighthouse Results (Concept Version)

=======
```

### Validation and Accessibility

**Nu HTML Validator**
- Concept Version: Add validation result
- Full Game: Add validation result

**Lighthouse Results (Concept Version)**
>>>>>>> 8d5f93b (Update README)
- Performance: 100
- Accessibility: 63
- Best Practices: 100
- SEO: 90
<<<<<<< HEAD
=======

**Lighthouse Results (Full Version)**
- Performance: Not tested yet
- Accessibility: Not tested yet
- Best Practices: Not tested yet
- SEO: Not tested yet

### Sprint 99

Future improvements for Hold Your Poop:

- [Add Sound Effects](https://github.com/yuto-nkc0621/hold-your-poop-game/issues/2)
- [Add Random Events](https://github.com/yuto-nkc0621/hold-your-poop-game/issues/3)
- [Add Extreme Mode](https://github.com/yuto-nkc0621/hold-your-poop-game/issues/4)

[View Sprint 99](https://github.com/yuto-nkc0621/hold-your-poop-game/milestones)

### Play the Game

- [Concept Version](https://yuto-nkc0621.github.io/hold-your-poop-game/)
- [Full Game](https://yuto-nkc0621.github.io/hold-your-poop-game/pages/full.html)
>>>>>>> 8d5f93b (Update README)
