import {
  _decorator,
  Collider2D,
  Component,
  Contact2DType,
  IPhysics2DContact,
  Label,
  Node,
  Sprite,
  SpriteFrame,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("box")
export class RedBox extends Component {
  @property({
    type: Label,
  })
  public scoreLabel: Label;

  @property({
    type: [SpriteFrame],
  })
  public spriteFrames: SpriteFrame[] = [];

  public score = 0;
  public sprite: Sprite;

  start() {
    let collider = this.node.getComponent(Collider2D);
    collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
  }

  onLoad() {
    this.sprite = this.node.getComponent(Sprite);
    this.sprite.spriteFrame = this.spriteFrames[Math.floor(Math.random() * 3)];
  }

  onBeginContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact
  ) {
    if (
      (otherCollider.name.includes("redDropZone") &&
        this.sprite.spriteFrame.name.includes("redBox")) ||
      (otherCollider.name.includes("blueDropZone") &&
        this.sprite.spriteFrame.name.includes("blueBox")) ||
      (otherCollider.name.includes("purpleDropZone") &&
        this.sprite.spriteFrame.name.includes("purpleBox"))
    ) {
      this.sprite.spriteFrame =
        this.spriteFrames[Math.floor(Math.random() * 3)];
      this.node.active = false;
      this.score++;

      this.scoreLabel.string = `Boxes Loaded: ${this.score}`;
    }
  }
}
