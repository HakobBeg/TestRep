

export class Node {
  Left: Node;
  Right: Node;
  expression: BooleanExpression;
  method: object;

  constructor(lft: Node, rght: Node, exp: BooleanExpression, meth: object) {
    this.expression = exp;
    this.Left = lft;
    this.Right = rght;
    this.method = meth;
  }
}


export function join(list1: Item[], list2: Item[]) {
  return Array.from(new Set(list1.concat(list2)));
}


export function cross(list1: Item[], list2: Item[]) {
  return list1.filter(element => list2.includes(element));
}

export class NodeBuilder {
  Left: Node = null;
  Right: Node = null;
  expression: BooleanExpression = null;
  method?: object = null;

  setLeft(lft: Node) {
    this.Left = lft;
    return this;
  }

  setRight(rght: Node) {
    this.Right = rght;
    return this;
  }

  setExpression(exp: BooleanExpression) {
    this.expression = exp;
    return this;
  }

  setMethod(meth: object) {
    this.method = meth;
    return this;
  }

  build() {
    return new Node(this.Left, this.Right, this.expression, this.method);
  }

}

// Expression class Implementation

export class BooleanExpression {
  leftOp: number | string;
  rightOp: number | string;
  linkMethod: object;
  result: object;

  constructor(lft: number | string, rght: number | string, linkMeth: object, res: object) {
    this.leftOp = lft;
    this.rightOp = rght;
    this.linkMethod = linkMeth;
    this.result = res;
  }
}


export class GreaterThan extends BooleanExpression {
  constructor(lft: number | string, rght: number | string, linkMeth: object) {
    super(lft, rght, linkMeth, () => {
      return this.leftOp > this.rightOp;
    });
  }
}


export class SmallerThan extends BooleanExpression {
  constructor(lft: number | string, rght: number | string, linkMeth: object) {
    super(lft, rght, linkMeth, () => {
      return this.leftOp < this.rightOp;
    });
  }
}


export class Equal extends BooleanExpression {
  constructor(lft: number | string, rght: number | string, linkMeth: object) {
    super(lft, rght, linkMeth, () => {
      // tslint:disable-next-line:triple-equals
      return this.leftOp == this.rightOp;
    });
  }
}


// Filter Model with Filter model builder

export class FilerModelBuilder {
  expressions: BooleanExpression[] = [];

  setExpression(exp: BooleanExpression) {
    this.expressions.push(exp);
    return this;
  }

  build() {
    return new FilterModel(this.expressions);
  }

}

export class FilterModel {
  tree: Node = null;

  constructor(expressions: BooleanExpression[]) {
    expressions.forEach(exp => this.addExpression(exp));
  }


  addExpression(exp: BooleanExpression) {
    if (this.tree === null) {
      this.tree = new NodeBuilder().setExpression(exp).build();
    } else {
      const tmp = (new NodeBuilder().setMethod(exp.linkMethod).setLeft(this.tree).setRight(new NodeBuilder().setExpression(exp).build())).build();
      this.tree = tmp;
      this.tree.method = tmp.method;
    }
  }
}
