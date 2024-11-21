class Tree {
    constructor(trunkWidth, branchColor, leafColor) {
        this._trunkWidth = trunkWidth;
        this._branchColor = branchColor;
        this._leafColor = leafColor;
    }

    draw(context, startX, startY) {
        this.context = context;
        this.context.fillStyle = this._branchColor;
        this._level(startX, startY, this._trunkWidth, 0);
    }

    _level(startX, startY, trunkWidth, level) {
        if (level < 12) {
            const nextLevel = level + 1;
            const changeX = 100 / nextLevel;
            const changeY = 200 / nextLevel;
            const topRightX = startX + Math.random() * changeX;
            const topRightY = startY - Math.random() * changeY;
            const topLeftX = startX - Math.random() * changeX;
            const topLeftY = startY - Math.random() * changeY;
            this._branch(startX, startY, topRightX, topRightY, trunkWidth); // right branch
            this._branch(startX, startY, topLeftX, topLeftY, trunkWidth); // left branch

            const branchWidth = trunkWidth * 0.7;
            this._level(topRightX, topRightY, branchWidth, nextLevel);
            this._level(topLeftX, topLeftY, branchWidth, nextLevel);
        } else if (level === 12) {
            this._leaves(startX, startY, level);
        }
    }

    _leaves(startX, startY, level) {
        this.context.fillStyle = this._leafColor;
        this.context.beginPath();
        this.context.arc(startX, startY, Math.random() * level + 1, 0, 2 * Math.PI);
        this.context.fillStyle = this._leafColor;
        this.context.fill();
    }

    _branch(startX, startY, endX, endY, width) {
        this.context.beginPath();
        this.context.moveTo(startX + width / 4, startY);
        this.context.quadraticCurveTo(startX + width / 4, startY - width, endX, endY);
        this.context.lineWidth = width;
        this.context.lineCap = "round";
        this.context.stroke();
    }
}

class Forest {
    constructor(branchColor, leafColor, trunkWidth) {
        this._branchColor = branchColor;
        this._leafColor = leafColor;
        this._trunkWidth = trunkWidth;
    }

    draw(canvas, treeCount) {
        const context = canvas.getContext("2d");
        const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, "rgba(173,216,230,1)");
        gradient.addColorStop(1, "rgba(255,165,0,1)");
        this._background(context, gradient, canvas.width, canvas.height);
        this._fog = context.createLinearGradient(0, 0, 0, canvas.height);
        this._fog.addColorStop(0, "rgba(255,255,255,0.05)");
        this._fog.addColorStop(1, "rgba(255,165,0,0.05)");

        for (let i = 0; i < treeCount; i++) {
            const tree = new Tree(this._trunkWidth, this._branchColor, this._leafColor);
            tree.draw(context, canvas.width * Math.random(), canvas.height);
            this._background(context, this._fog, canvas.width, canvas.height);
        }
    }

    _background(context, gradient, width, height) {
        context.fillStyle = gradient;
        context.fillRect(0, 0, width, height);
    }
}
