import {
  _decorator,
  BoxCollider2D,
  Collider,
  Collider2D,
  Component,
  Contact2DType,
  EventKeyboard,
  Input,
  input,
  IPhysics2DContact,
  KeyCode,
  Node,
  RigidBody2D,
  Vec2,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("MoverBot")
export class MoverBot extends Component {
  public ridgidBody: RigidBody2D;
  public redBox: Node;
  public redBoxRigidBody: RigidBody2D;
  public booly = false;
  public otherCollider: Collider2D;

  onLoad() {
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    this.ridgidBody = this.node.getComponent(RigidBody2D);
    this.redBox = this.node.getChildByName("dropDownBox");
    console.log(this.redBox);
    this.redBoxRigidBody = this.redBox.getComponent(RigidBody2D);
  }

  start() {
    let collider = this.node.getComponent(Collider2D);
    collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
  }

  onKeyDown(event: EventKeyboard) {
    if (this.ridgidBody.linearVelocity.equals(new Vec2(0, 0))) {
      switch (event.keyCode) {
        case KeyCode.KEY_A:
          this.node.angle += 90;

          break;
        case KeyCode.KEY_D:
          this.node.angle -= 90;
          break;
        case KeyCode.SPACE:
          this.ridgidBody.linearVelocity =
            Math.abs(this.node.right.x) === 1
              ? new Vec2(this.node.right.x * 5, 0)
              : new Vec2(0, this.node.right.y * 5);
          break;
      }
    }
  }

  onKeyUp() {
    this.ridgidBody.linearVelocity = new Vec2(0, 0);
    this.redBoxRigidBody.linearVelocity = new Vec2(0, 0);
  }

  onBeginContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact
  ) {
    if (otherCollider.name.includes("boxPickup")) {
      if (!this.redBox.active) {
        this.booly = true;
      }
      otherCollider.node.active = false;
      this.otherCollider = otherCollider;
      this.redBox.setPosition(32, 0);
    }
  }

  update() {
    if (this.booly) {
      this.booly = false;
      this.redBox.active = true;
    }

    if (
      this.otherCollider &&
      !this.otherCollider.node.active &&
      !this.redBox.active
    ) {
      this.otherCollider.node.active = true;
    }
  }
}
